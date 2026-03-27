import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";

const SHEET_NAME = "Referrals";
const SHEET_HEADERS = [
  "Referrer Name",
  "Referrer Phone",
  "Date",
  "Referral Link Used",
];

function formatDate(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

let cachedSheet: GoogleSpreadsheetWorksheet | null = null;
let headersReady = false;

async function getSheet(): Promise<GoogleSpreadsheetWorksheet> {
  if (cachedSheet) return cachedSheet;

  const auth = new JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    auth
  );
  await doc.loadInfo();

  let sheet = Object.values(doc.sheetsById).find(
    (s) => s.title === SHEET_NAME
  );

  if (!sheet) {
    sheet = await doc.addSheet({
      title: SHEET_NAME,
      headerValues: SHEET_HEADERS,
    });
    headersReady = true;
  }

  if (!headersReady) {
    let hasHeaders = false;
    try {
      await sheet.loadHeaderRow();
      hasHeaders = sheet.headerValues && sheet.headerValues.length > 0;
    } catch {}
    if (!hasHeaders) {
      await sheet.setHeaderRow(SHEET_HEADERS);
      await sheet.loadHeaderRow();
    }
    headersReady = true;
  }

  cachedSheet = sheet;
  return sheet;
}

export async function POST(request: Request) {
  try {
    const { referrerName, referrerPhone } = await request.json();

    if (!referrerName || typeof referrerName !== "string") {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const sheet = await getSheet();

    await sheet.addRow({
      "Referrer Name": referrerName.slice(0, 100),
      "Referrer Phone": referrerPhone
        ? `91${referrerPhone.replace(/\D/g, "").slice(0, 10)}`
        : "",
      "Date": formatDate(),
      "Referral Link Used": "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save referral:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 500 }
    );
  }
}
