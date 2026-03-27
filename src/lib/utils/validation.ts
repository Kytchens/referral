/** Validates an Indian mobile phone number (10 digits, starts with 6-9) */
export function isValidIndianPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone);
}
