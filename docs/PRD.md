# PRD: Candidate Screening Web App

**Product Name:** recruitment-web-app
**Version:** V1
**Author:** Founder's Office
**Date:** February 2026
**Status:** Draft

---

## 1. Overview

A mobile-first, self-serve screening web app that replaces the initial HR phone call for on-ground kitchen staff hiring. Candidates complete a guided conversational flow, and their structured responses are pushed to a Google Sheet for HR follow-up.

**One-liner:** Let candidates screen themselves via a WhatsApp-shared form, so HR only calls pre-informed, relevant applicants.

---

## 2. Problem Statement

- The HR team's outreach capacity is limited by the number of calls they can make per day.
- Initial screening calls are repetitive and largely qualify/disqualify based on a few key filters (location, field, availability).
- No structured data capture exists — all information lives in call notes or memory.

**This app converts a manual, time-intensive screening call into a scalable, structured, self-serve flow.**

---

## 3. Target Users

| User | Description |
|------|-------------|
| **Primary — Candidates** | Blue-collar, on-ground kitchen staff. Freshers or experienced. Comfortable with WhatsApp and basic smartphone usage. May have limited English literacy (can read basic product names). |
| **Secondary — HR Team** | Reviews submissions in Google Sheets, calls qualified candidates for next round. |
| **Stretch — Senior Ops Staff** | Kitchen managers or senior ops hires. Same flow with minor variations (salary range, inventory/wastage questions). |

---

## 4. Language Support

The app must support a **persistent toggle** visible on all screens throughout the entire flow, allowing the candidate to switch language at any point.

**Supported languages:**
- **Hinglish** (default)
- **Hindi**
- **Marathi**

Language selector should appear at the very top of the first screen and remain accessible (e.g., as a floating toggle or fixed header element) on every subsequent screen. All questions, options, info screens, FAQs, and button labels must be fully translated across all three languages.

---

## 5. User Flow

The app follows a **step-by-step conversational flow** — one question per screen, mobile-first, designed to feel low-friction and familiar.

### Phase 1: Basic Information (Single Page)

Capture the following on one screen:

| Field | Type | Required |
|-------|------|----------|
| Full Name | Text input | Yes |
| Phone Number | Numeric input (auto-detect via WhatsApp if possible) | Yes |
| Age | Numeric input | Yes |
| Current Employment Status | Single-select: Employed / Unemployed / Student / Other | Yes |
| Looking for a Job? | Single-select: Yes / No | Yes |

- If **"No"** on job search → Polite exit screen: *"No problem! We'll keep your details and reach out when something opens up."* (Details still captured to Google Sheet with status: `Not Looking`)
- If **"Yes"** → Proceed to Phase 2

---

### Phase 2: Screening Flow (Step-by-Step Conversational Screens)

**Step 1 — Location / Locality**
> "Where do you currently stay? (Area / Locality)"
- **Google Places Autocomplete** text input — as the candidate types, location suggestions appear for selection
- This ensures structured, recognizable locality data in the output

**Step 2 — Kitchen Selection (Multi-Select)**
> "Which of our kitchen locations can you travel to for work?"
- Display full list of active kitchen locations (multi-select checkboxes) — see Appendix A for the current list
- Option: "None of these work for me"
  - If none selected → Soft decline screen: *"We don't have a kitchen near you right now, but we're expanding. We'll reach out when we open a location closer to you."* (Details captured with status: `Location Mismatch`)

**Step 3 — Experience**
> "Do you have any work experience?"
- Yes → Sub-questions:
  - "Which company or companies have you worked in?" (Text input)
  - "How many years/months of experience?" (Dropdown: < 6 months / 6–12 months / 1–2 years / 2–5 years / 5+ years)
- No → Mark as Fresher, continue

**Step 4 — Work Background (Multi-Select)**
> "Have you worked in any of these areas before?"
- Multi-select options:
  - Kitchen / Cooking / Food Preparation
  - Restaurant / Café / QSR
  - Hospitality / Hotel
  - Rider / Food Delivery
  - Retail
  - Picker / Packer / Warehouse
  - Housekeeping / Cleaning
  - Manufacturing / Factory
  - None of these / Other (text input)

*Note: This is for data capture and profiling. All candidates continue regardless of selection — we welcome people from any background.*

**Step 5 — Availability to Join**
> "How soon can you join if selected?"
- Single-select: Immediately / Within 1 week / Within 2 weeks / Within 1 month / Not sure

**Step 6 — Role Level Determination (System Logic — No Screen Shown)**
Based on experience input from Step 3:
- **Fresher or < 1 year experience** → Junior role track
- **1–2 years in a related field** → Senior team member track
- **2+ years in a related field** → Kitchen Manager track

This is **system-determined**, not a question to the candidate.

**Step 7 — Salary Expectation**
> "What is your salary expectation per month? (in ₹)"
- Dropdown ranges: < ₹12,000 / ₹12,000–₹15,000 / ₹15,000–₹18,000 / ₹18,000–₹22,000 / ₹22,000+

**Step 8 — Inventory & Operations Experience (Senior / Manager Only)**
*This screen is shown only if the candidate is routed to the Senior or Kitchen Manager track.*
> "Have you worked on any of these before?"
- Multi-select options:
  - Stock taking
  - Wastage tracking
  - Variants (food/menu variants management)
  - Food cost control
  - Reconciliation of food cost
  - FIFO (First In, First Out)
  - None of these

---

### Phase 3: Information Screens (Post-Form)

After the form flow is complete, the candidate sees a sequence of **info screens** (swipeable or "Next" button). These are not questions — they are one-way communication.

**Screen A — About the Company**
Brief company overview:
- Multi-brand cloud kitchen operating in Mumbai
- 45+ brands, 25+ kitchens
- Growing fast with opportunities for advancement

**Screen B — Salary & Benefits (FYI)**
Display the salary range based on their determined role level:
- Junior / Fresher: ₹14,000 – ₹16,000 per month
- Senior Team Member: ₹16,000 – ₹18,000 per month
- Kitchen Manager: ₹20,000 – ₹24,000 per month

Additionally mention:
- Performance-based incentives and bonuses on top of base salary
- Details to be discussed with HR during your call

**Screen C — What to Expect on the Job**
- 10-hour shifts
- You will work with both veg and non-veg food
- You'll work across multiple brands and cuisines — great way to learn

**Screen D — Growth & Training**
- Dedicated training team to upskill you
- Clear path from junior roles into larger operations roles
- You'll learn multiple cuisines and kitchen operations

**Screen E — Confirmation & Next Steps**
- *"Thank you for your interest! Our HR team will review your application and call you back soon."*
- Candidate's submitted details shown as a summary (name, phone, selected kitchens, role level)

---

### Phase 4: FAQ & Support (Persistent Access)

Available via a **sticky button** at the bottom of the confirmation screen (and optionally on all screens).

**FAQ Accordion (Expandable Sections):**

**Q: What kind of work will I be doing?**
A: Your day-to-day work will include:
- **Picking & packing** — taking out the right items for each order
- **Heating & cooking** — the food comes frozen; you will heat it, fry it, or prepare it in simple ways as trained
- **Packing & sending** — once the food is ready, you pack it properly and hand it to the delivery person
- **Cleaning** — keeping your work area, equipment, and kitchen clean
- **Daily checklists** — completing simple checklists to make sure everything is in order

Don't worry if this is new to you — our training team will teach you everything step by step. For more details, our HR team will discuss this with you on the call.

**Q: Will I get food and/or stay?**
A: We do not provide food or stay as part of the role. If you have specific concerns, you can discuss them with our HR team during your call.

**Q: What are the shift timings?**
A: Shifts are 10 hours. Exact timings depend on the kitchen location and will be confirmed by HR.

**Q: Can I get a kitchen closer to my home?**
A: We'll try our best to place you at a convenient location. You can select your preferred kitchens in the form.

**Q: What if I have travel issues?**
A: Please discuss specific travel concerns with our HR team. We'll do our best to accommodate.

**WhatsApp Button:**
> "Still have questions? Chat with our HR team"
- Opens WhatsApp chat to the designated HR phone number with a pre-filled message: *"Hi, I just filled out the recruitment form and have a question."*

---

## 6. Data Output — Google Sheet

All submissions (including declined/mismatched candidates) are pushed to a Google Sheet via API.

### Sheet Schema

| Column | Source |
|--------|--------|
| Timestamp | Auto-generated |
| Full Name | Phase 1 |
| Phone Number | Phase 1 |
| Age | Phase 1 |
| Current Employment Status | Phase 1 |
| Looking for a Job | Phase 1 |
| Language Selected | App toggle |
| Locality (Google Places) | Phase 2, Step 1 |
| Selected Kitchen Location(s) | Phase 2, Step 2 |
| Has Experience | Phase 2, Step 3 |
| Previous Company/Companies | Phase 2, Step 3 |
| Experience Duration | Phase 2, Step 3 |
| Work Background Areas | Phase 2, Step 4 |
| Availability to Join | Phase 2, Step 5 |
| Determined Role Level | Phase 2, Step 6 (system) |
| Salary Expectation | Phase 2, Step 7 |
| Inventory/Ops Experience Areas | Phase 2, Step 8 (if applicable) |
| **Screening Status** | System-determined (see below) |

### Screening Status Values

| Status | Meaning |
|--------|---------|
| `Qualified` | Passed all screening steps, ready for HR call |
| `Not Looking` | Not currently searching for a job |
| `Location Mismatch` | No suitable kitchen location |

*Note: V1 does not hard-filter on work background or salary expectation — all candidates who pass location selection are marked as `Qualified`. HR makes the final call based on the full data row.*

---

## 7. Technical Requirements

| Requirement | Detail |
|-------------|--------|
| **Platform** | Mobile-first responsive web app (no native app needed) |
| **Hosting** | Lightweight — static frontend + serverless backend (e.g., Vercel/Netlify + Google Sheets API or Firebase) |
| **Authentication** | None required for candidates; optional admin login for future dashboard |
| **Google Sheets Integration** | Append row via Google Sheets API on form submission |
| **Google Places Autocomplete** | Integrate Google Places API for the locality text input field |
| **WhatsApp Integration** | Simple `https://wa.me/<number>?text=<prefilled>` link |
| **Language** | i18n support for Hinglish, Hindi, Marathi with a persistent toggle on all screens (static translations, no real-time translation) |
| **Performance** | Must load in < 3 seconds on 4G connections |
| **Browser Support** | Chrome (Android), Safari (iOS) — these cover 95%+ of the target audience |
| **Kitchen Locations List** | Configurable — stored as a simple JSON/config file, easily updatable without code changes |

---

## 8. Distribution Plan

| Channel | Method |
|---------|--------|
| **WhatsApp** | Direct link shared by HR team, existing employees, and referral networks |
| **Physical — Kitchen Banners** | QR code printed on banners outside all 25+ kitchen locations |
| **Referral** | Shareable link that employees can forward |

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Form completion rate | > 60% of those who open the link |
| HR call volume reduction | Reduce initial screening calls by 50%+ |
| Time-to-first-contact | Qualified candidates contacted within 48 hours |
| Qualified lead rate | > 40% of submissions are `Qualified` |

---

## 10. Out of Scope for V1

- Candidate login or application tracking portal
- Automated WhatsApp chatbot for FAQs
- Admin dashboard (Google Sheet is the dashboard for now)
- Pin code / GPS-based automatic kitchen matching
- Interview scheduling or calendar integration
- Document upload (Aadhaar, etc.)
- Hard filtering on work background or salary mismatch (HR reviews all data manually)

---

## 11. Future Considerations (V2+)

- **Admin Dashboard:** Filter, sort, and manage candidates with status tracking and notes
- **WhatsApp Chatbot:** AI-powered FAQ handling to reduce HR queries further
- **Location Intelligence:** Auto-suggest nearest kitchens based on pin code or GPS
- **Referral Tracking:** Track which employees/sources drive the most qualified candidates
- **Multi-stage Pipeline:** Move candidates through stages (Screened → Called → Interview → Hired) within the tool
- **Document Collection:** Aadhaar, PAN, bank details capture for onboarding
- **Smart Salary Flagging:** Auto-flag candidates whose expectation is significantly above the role range

---

## Appendix A: Kitchen Locations

*Stored as a configurable JSON/config file for easy updates without code changes.*

| Kitchen ID | Kitchen Name | City |
|------------|-------------|------|
| K001 | Andheri West | Mumbai |
| K002 | BKC | Mumbai |
| K003 | Borivali West | Mumbai |
| K004 | Chembur | Mumbai |
| K005 | Dahisar | Mumbai |
| K006 | Fort | Mumbai |
| K007 | Gamdevi | Mumbai |
| K008 | Goregaon | Mumbai |
| K009 | Juhu | Mumbai |
| K010 | Kalyani Nagar | Pune |
| K011 | Kandivali West | Mumbai |
| K012 | Kharadi | Pune |
| K013 | Malad | Mumbai |
| K014 | Marol | Mumbai |
| K015 | Mira Road | Mumbai |
| K016 | Mulund | Mumbai |
| K017 | Nesco | Mumbai |
| K018 | Oshiwara | Mumbai |
| K019 | Powai | Mumbai |
| K020 | Sion | Mumbai |
| K021 | Thane | Mumbai |
| K022 | Vasant Vihar | Mumbai |
| K023 | Vashi | Navi Mumbai |
| K024 | Worli | Mumbai |

*Total: 24 active locations. Note: Kalyani Nagar and Kharadi appear to be Pune locations — confirm if these should be included in the candidate-facing list or grouped separately.*

---

## Appendix B: Translation Requirements

All user-facing content must be translated into three languages. Below is the complete translation key map.

### B.1 — UI Elements & Navigation

| Key | Hinglish | Hindi | Marathi |
|-----|----------|-------|---------|
| `lang_toggle_hinglish` | Hinglish | Hinglish | Hinglish |
| `lang_toggle_hindi` | हिंदी | हिंदी | हिंदी |
| `lang_toggle_marathi` | मराठी | मराठी | मराठी |
| `btn_next` | Next | आगे बढ़ें | पुढे जा |
| `btn_back` | Back | पीछे जाएं | मागे जा |
| `btn_submit` | Submit | जमा करें | सबमिट करा |
| `btn_done` | Done | हो गया | झालं |
| `required_field` | This field is required | यह भरना ज़रूरी है | हे भरणे आवश्यक आहे |

### B.2 — Phase 1: Basic Information

| Key | Hinglish | Hindi | Marathi |
|-----|----------|-------|---------|
| `phase1_title` | Apni Basic Details Bharo | अपनी बुनियादी जानकारी भरें | तुमची मूलभूत माहिती भरा |
| `field_full_name` | Full Name | पूरा नाम | पूर्ण नाव |
| `field_phone` | Phone Number | फ़ोन नंबर | फोन नंबर |
| `field_age` | Age | उम्र | वय |
| `field_employment_status` | Abhi kya kar rahe ho? | अभी क्या कर रहे हैं? | सध्या काय करत आहात? |
| `opt_employed` | Employed (Job kar raha/rahi hoon) | नौकरी कर रहा/रही हूँ | नोकरी करत आहे |
| `opt_unemployed` | Unemployed (Abhi koi job nahi) | अभी कोई नौकरी नहीं | सध्या नोकरी नाही |
| `opt_student` | Student (Padhai kar raha/rahi hoon) | पढ़ाई कर रहा/रही हूँ | शिकत आहे |
| `opt_other` | Other | अन्य | इतर |
| `field_looking_for_job` | Kya aap job dhundh rahe ho? | क्या आप नौकरी ढूंढ रहे हैं? | तुम्ही नोकरी शोधत आहात का? |
| `opt_yes` | Haan | हाँ | हो |
| `opt_no` | Nahi | नहीं | नाही |
| `msg_not_looking` | Koi baat nahi! Hum aapki details save kar lenge aur jab kuch aayega toh batayenge. | कोई बात नहीं! हम आपकी जानकारी सहेज लेंगे और जब कुछ आएगा तो बताएंगे। | काही हरकत नाही! आम्ही तुमची माहिती जतन करू आणि काही आलं तर कळवू. |

### B.3 — Phase 2: Screening Flow

| Key | Hinglish | Hindi | Marathi |
|-----|----------|-------|---------|
| `step1_locality` | Aap kahan rehte ho? (Area / Locality) | आप कहाँ रहते हैं? (इलाक़ा / लोकैलिटी) | तुम्ही कुठे राहता? (एरिया / लोकॅलिटी) |
| `step1_placeholder` | Type karo, suggestion aayega... | टाइप करें, सुझाव आएगा... | टाइप करा, सूचना येईल... |
| `step2_kitchen_select` | Humari kin kitchen locations tak aap aa sakte ho kaam ke liye? | हमारी किन किचन लोकेशन तक आप काम के लिए आ सकते हैं? | आमच्या कोणत्या किचन लोकेशनवर तुम्ही कामासाठी येऊ शकता? |
| `step2_none_option` | Inme se koi bhi nahi chalega | इनमें से कोई भी नहीं चलेगा | यापैकी कोणतेही जमणार नाही |
| `msg_location_mismatch` | Abhi aapke paas koi kitchen nahi hai, lekin hum expand kar rahe hain. Jab koi naya kitchen khulega aapke paas, toh hum batayenge. | अभी आपके पास कोई किचन नहीं है, लेकिन हम बढ़ रहे हैं। जब कोई नया किचन खुलेगा आपके पास, तो हम बताएंगे। | सध्या तुमच्या जवळ किचन नाही, पण आम्ही वाढत आहोत. जेव्हा तुमच्या जवळ नवीन किचन उघडेल, तेव्हा कळवू. |
| `step3_experience` | Kya aapko koi kaam ka experience hai? | क्या आपको कोई काम का अनुभव है? | तुम्हाला कामाचा अनुभव आहे का? |
| `step3_company` | Kaunsi company ya companies mein kaam kiya hai? | कौन सी कंपनी या कंपनियों में काम किया है? | कोणत्या कंपनी किंवा कंपन्यांमध्ये काम केलं आहे? |
| `step3_duration` | Kitne saal/mahine ka experience hai? | कितने साल/महीने का अनुभव है? | किती वर्षे/महिने अनुभव आहे? |
| `opt_less_6m` | 6 mahine se kam | 6 महीने से कम | 6 महिन्यांपेक्षा कमी |
| `opt_6_12m` | 6–12 mahine | 6–12 महीने | 6–12 महिने |
| `opt_1_2y` | 1–2 saal | 1–2 साल | 1–2 वर्षे |
| `opt_2_5y` | 2–5 saal | 2–5 साल | 2–5 वर्षे |
| `opt_5_plus` | 5 saal se zyada | 5 साल से ज़्यादा | 5 वर्षांपेक्षा जास्त |
| `step4_work_background` | Kya aapne inme se kisi area mein kaam kiya hai pehle? | क्या आपने इनमें से किसी क्षेत्र में पहले काम किया है? | तुम्ही यापैकी कोणत्या क्षेत्रात आधी काम केलं आहे का? |
| `opt_kitchen` | Kitchen / Cooking / Khana Banana | किचन / खाना बनाना | किचन / स्वयंपाक |
| `opt_restaurant` | Restaurant / Café / QSR | रेस्टोरेंट / कैफ़े / QSR | रेस्टॉरंट / कॅफे / QSR |
| `opt_hospitality` | Hotel / Hospitality | होटल / हॉस्पिटैलिटी | हॉटेल / हॉस्पिटॅलिटी |
| `opt_rider` | Rider / Food Delivery | राइडर / फ़ूड डिलीवरी | रायडर / फूड डिलिव्हरी |
| `opt_retail` | Retail (Dukaan) | रिटेल (दुकान) | रिटेल (दुकान) |
| `opt_picker_packer` | Picker / Packer / Warehouse | पिकर / पैकर / वेयरहाउस | पिकर / पॅकर / वेअरहाउस |
| `opt_housekeeping` | Housekeeping / Safai | हाउसकीपिंग / सफ़ाई | हाउसकीपिंग / स्वच्छता |
| `opt_manufacturing` | Manufacturing / Factory | मैन्युफ़ैक्चरिंग / फ़ैक्ट्री | मॅन्युफॅक्चरिंग / फॅक्टरी |
| `opt_none_other` | Inme se kuch nahi / Other | इनमें से कुछ नहीं / अन्य | यापैकी काहीही नाही / इतर |
| `step5_availability` | Agar select ho gaye toh kitni jaldi join kar sakte ho? | अगर सिलेक्ट हो गए तो कितनी जल्दी जॉइन कर सकते हैं? | निवड झाल्यास किती लवकर जॉइन करू शकता? |
| `opt_immediately` | Turant | तुरंत | लगेच |
| `opt_1_week` | 1 hafte mein | 1 हफ़्ते में | 1 आठवड्यात |
| `opt_2_weeks` | 2 hafte mein | 2 हफ़्तों में | 2 आठवड्यांत |
| `opt_1_month` | 1 mahine mein | 1 महीने में | 1 महिन्यात |
| `opt_not_sure` | Pata nahi / Not sure | पता नहीं | माहीत नाही |
| `step7_salary` | Aapki salary expectation kitni hai per month? (₹ mein) | आपकी सैलरी उम्मीद कितनी है प्रति माह? (₹ में) | तुमची महिन्याची पगाराची अपेक्षा किती आहे? (₹ मध्ये) |
| `opt_sal_below_12k` | ₹12,000 se kam | ₹12,000 से कम | ₹12,000 पेक्षा कमी |
| `opt_sal_12_15k` | ₹12,000–₹15,000 | ₹12,000–₹15,000 | ₹12,000–₹15,000 |
| `opt_sal_15_18k` | ₹15,000–₹18,000 | ₹15,000–₹18,000 | ₹15,000–₹18,000 |
| `opt_sal_18_22k` | ₹18,000–₹22,000 | ₹18,000–₹22,000 | ₹18,000–₹22,000 |
| `opt_sal_22k_plus` | ₹22,000+ | ₹22,000+ | ₹22,000+ |
| `step8_inventory_title` | Kya aapne inme se kisi cheez pe kaam kiya hai pehle? | क्या आपने इनमें से किसी चीज़ पर पहले काम किया है? | तुम्ही यापैकी कशावर आधी काम केलं आहे का? |
| `opt_stock_taking` | Stock taking | स्टॉक टेकिंग | स्टॉक टेकिंग |
| `opt_wastage_tracking` | Wastage tracking | वेस्टेज ट्रैकिंग | वेस्टेज ट्रॅकिंग |
| `opt_variants` | Variants (food/menu variants) | वेरिएंट्स (खाने/मेनू वेरिएंट्स) | व्हेरिअंट्स (फूड/मेनू व्हेरिअंट्स) |
| `opt_food_cost` | Food cost control | फ़ूड कॉस्ट कंट्रोल | फूड कॉस्ट कंट्रोल |
| `opt_reconciliation` | Food cost reconciliation | फ़ूड कॉस्ट रिकन्सिलिएशन | फूड कॉस्ट रिकन्सिलिएशन |
| `opt_fifo` | FIFO (First In, First Out) | FIFO (पहले आया, पहले गया) | FIFO (आधी आलेलं, आधी वापरा) |
| `opt_none_inventory` | Inme se kuch nahi | इनमें से कुछ नहीं | यापैकी काहीही नाही |

### B.4 — Phase 3: Information Screens

| Key | Hinglish | Hindi | Marathi |
|-----|----------|-------|---------|
| `info_company_title` | Company ke baare mein | कंपनी के बारे में | कंपनीबद्दल |
| `info_company_1` | Hum ek multi-brand cloud kitchen hain jo Mumbai mein operate karte hain | हम एक मल्टी-ब्रांड क्लाउड किचन हैं जो मुंबई में ऑपरेट करते हैं | आम्ही मुंबईत चालणारे मल्टी-ब्रँड क्लाउड किचन आहोत |
| `info_company_2` | 45+ brands, 25+ kitchens | 45+ ब्रांड्स, 25+ किचन | 45+ ब्रँड्स, 25+ किचन |
| `info_company_3` | Tezi se badh rahe hain — aapke liye bahut growth ka mauka hai | तेज़ी से बढ़ रहे हैं — आपके लिए बहुत ग्रोथ का मौका है | वेगाने वाढत आहोत — तुमच्यासाठी खूप वाढीची संधी आहे |
| `info_salary_title` | Salary aur Benefits | सैलरी और बेनिफ़िट्स | पगार आणि फायदे |
| `info_salary_junior` | Junior / Fresher: ₹14,000 – ₹16,000 per month | जूनियर / फ़्रेशर: ₹14,000 – ₹16,000 प्रति माह | ज्युनिअर / फ्रेशर: ₹14,000 – ₹16,000 दरमहा |
| `info_salary_senior` | Senior Team Member: ₹16,000 – ₹18,000 per month | सीनियर टीम मेंबर: ₹16,000 – ₹18,000 प्रति माह | सीनिअर टीम मेंबर: ₹16,000 – ₹18,000 दरमहा |
| `info_salary_manager` | Kitchen Manager: ₹20,000 – ₹24,000 per month | किचन मैनेजर: ₹20,000 – ₹24,000 प्रति माह | किचन मॅनेजर: ₹20,000 – ₹24,000 दरमहा |
| `info_salary_bonus` | Iske upar incentives aur bonuses bhi milenge performance ke basis pe. HR call pe detail batayenge. | इसके ऊपर इंसेंटिव और बोनस भी मिलेंगे परफ़ॉर्मेंस के आधार पर। HR कॉल पर डिटेल बताएंगे। | यावर परफॉर्मन्सनुसार इन्सेंटिव्ह आणि बोनस मिळतील. HR कॉलवर तपशील सांगतील. |
| `info_job_title` | Kaam kaisa hoga | काम कैसा होगा | काम कसं असेल |
| `info_job_1` | 10 ghante ki shift hogi | 10 घंटे की शिफ़्ट होगी | 10 तासांची शिफ्ट असेल |
| `info_job_2` | Veg aur non-veg dono ka kaam hoga | वेज और नॉन-वेज दोनों का काम होगा | व्हेज आणि नॉन-व्हेज दोन्हींचं काम असेल |
| `info_job_3` | Multiple brands aur cuisines pe kaam karoge — bahut kuch seekhne milega | मल्टीपल ब्रांड्स और क्विज़ीन पर काम करोगे — बहुत कुछ सीखने मिलेगा | अनेक ब्रँड्स आणि पदार्थांवर काम कराल — खूप काही शिकायला मिळेल |
| `info_growth_title` | Training aur Growth | ट्रेनिंग और ग्रोथ | ट्रेनिंग आणि वाढ |
| `info_growth_1` | Dedicated training team hai jo aapko sikhayegi | डेडिकेटेड ट्रेनिंग टीम है जो आपको सिखाएगी | तुम्हाला शिकवणारी समर्पित ट्रेनिंग टीम आहे |
| `info_growth_2` | Junior se senior aur operations role tak grow karne ka clear path hai | जूनियर से सीनियर और ऑपरेशंस रोल तक ग्रो करने का क्लियर पाथ है | ज्युनिअर ते सीनिअर आणि ऑपरेशन्स रोलपर्यंत वाढण्याचा स्पष्ट मार्ग आहे |
| `info_confirm_title` | Thank you! | धन्यवाद! | धन्यवाद! |
| `info_confirm_msg` | Aapki application mil gayi hai! Humari HR team aapki details review karke jaldi call karegi. | आपकी एप्लिकेशन मिल गई है! हमारी HR टीम आपकी डिटेल्स रिव्यू करके जल्दी कॉल करेगी। | तुमचा अर्ज मिळाला आहे! आमची HR टीम तुमची माहिती तपासून लवकरच कॉल करेल. |

### B.5 — Phase 4: FAQs

| Key | Hinglish | Hindi | Marathi |
|-----|----------|-------|---------|
| `faq_title` | Aksar Puchhe Jaane Wale Sawaal | अक्सर पूछे जाने वाले सवाल | वारंवार विचारले जाणारे प्रश्न |
| `faq1_q` | Kaam mein kya kya karna hoga? | काम में क्या-क्या करना होगा? | कामात काय काय करावं लागेल? |
| `faq1_a` | Rozana ka kaam hoga: sahi items pick karna, frozen khana garam/fry karna jaise training mein sikhayenge, pack karna aur delivery person ko dena, apna area aur equipment saaf rakhna, aur daily checklists bharna. Naye ho toh tension mat lo — training team sab step by step sikhayegi. HR call pe aur details milenge. | रोज़ाना का काम होगा: सही आइटम पिक करना, फ़्रोज़न खाना गरम/फ़्राई करना जैसे ट्रेनिंग में सिखाएंगे, पैक करना और डिलीवरी पर्सन को देना, अपना एरिया और इक्विपमेंट साफ़ रखना, और डेली चेकलिस्ट भरना। नए हो तो टेंशन मत लो — ट्रेनिंग टीम सब स्टेप बाय स्टेप सिखाएगी। HR कॉल पर और डिटेल्स मिलेंगे। | रोजचं काम असेल: योग्य आयटम पिक करणे, फ्रोझन अन्न गरम/फ्राय करणे ट्रेनिंगमध्ये शिकवल्याप्रमाणे, पॅक करणे आणि डिलिव्हरी व्यक्तीला देणे, तुमचा एरिया आणि उपकरणे स्वच्छ ठेवणे, आणि दैनिक चेकलिस्ट भरणे. नवीन असाल तर काळजी करू नका — ट्रेनिंग टीम सर्व काही टप्प्याटप्प्याने शिकवेल. HR कॉलवर अधिक माहिती मिळेल. |
| `faq2_q` | Kya khana aur rehna milega? | क्या खाना और रहना मिलेगा? | जेवण आणि राहणं मिळेल का? |
| `faq2_a` | Hum khana ya rehna provide nahi karte. Agar koi specific concern hai toh HR team se call pe baat kar sakte ho. | हम खाना या रहना प्रोवाइड नहीं करते। अगर कोई स्पेसिफ़िक कंसर्न है तो HR टीम से कॉल पर बात कर सकते हैं। | आम्ही जेवण किंवा राहणं देत नाही. काही विशेष प्रश्न असल्यास HR टीमशी कॉलवर बोलू शकता. |
| `faq3_q` | Shift ka time kya hoga? | शिफ़्ट का टाइम क्या होगा? | शिफ्टची वेळ काय असेल? |
| `faq3_a` | Shift 10 ghante ki hogi. Exact timing kitchen location pe depend karti hai aur HR confirm karegi. | शिफ़्ट 10 घंटे की होगी। एग्ज़ैक्ट टाइमिंग किचन लोकेशन पर डिपेंड करती है और HR कन्फ़र्म करेगी। | शिफ्ट 10 तासांची असेल. नेमकी वेळ किचन लोकेशनवर अवलंबून असेल आणि HR कन्फर्म करेल. |
| `faq4_q` | Kya ghar ke paas ka kitchen mil sakta hai? | क्या घर के पास का किचन मिल सकता है? | घराजवळचं किचन मिळू शकतं का? |
| `faq4_a` | Hum poori koshish karenge aapko convenient location pe rakhne ki. Form mein aap apne preferred kitchens select kar sakte ho. | हम पूरी कोशिश करेंगे आपको सुविधाजनक लोकेशन पर रखने की। फ़ॉर्म में आप अपने पसंदीदा किचन सिलेक्ट कर सकते हैं। | आम्ही तुम्हाला सोयीच्या ठिकाणी ठेवण्याचा पूर्ण प्रयत्न करू. फॉर्ममध्ये तुम्ही तुमचे पसंतीचे किचन निवडू शकता. |
| `faq5_q` | Travel mein dikkat ho toh? | ट्रैवल में दिक्कत हो तो? | प्रवासात अडचण आली तर? |
| `faq5_a` | Travel ke baare mein HR team se baat karo call pe. Hum accommodate karne ki poori koshish karenge. | ट्रैवल के बारे में HR टीम से बात करो कॉल पर। हम एकोमोडेट करने की पूरी कोशिश करेंगे। | प्रवासाबद्दल HR टीमशी कॉलवर बोला. आम्ही सामावून घेण्याचा पूर्ण प्रयत्न करू. |
| `faq_whatsapp_btn` | Aur sawaal hain? HR team se WhatsApp pe baat karo | और सवाल हैं? HR टीम से WhatsApp पर बात करें | अजून प्रश्न आहेत? HR टीमशी WhatsApp वर बोला |
| `faq_whatsapp_prefill` | Hi, maine recruitment form bhara hai aur mera ek sawaal hai. | हाय, मैंने recruitment फ़ॉर्म भरा है और मेरा एक सवाल है। | हाय, मी recruitment फॉर्म भरला आहे आणि माझा एक प्रश्न आहे. |