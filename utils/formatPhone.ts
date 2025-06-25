// --- Phone Input Formatter ---
export const formatPhone = (value: string) => {
  // Strip non-digits, cap at 10 digits
  let digits = value.replace(/\D/g, "").slice(0, 10);
  let formatted = digits;

  // Format as (123)-456-7890 progressively
  if (digits.length >= 7) {
    formatted = `(${digits.substr(0, 3)})-${digits.substr(
      3,
      3
    )}-${digits.substr(6)}`;
  } else if (digits.length >= 4) {
    formatted = `(${digits.substr(0, 3)})-${digits.substr(3)}`;
  } else if (digits.length > 0) {
    formatted = `(${digits}`;
  }

  return formatted;
};
