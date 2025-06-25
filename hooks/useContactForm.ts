import { useState } from "react";
import { Contact } from "@/types/contact";
import { isEmail, isPhone10, minFence } from "@/utils/validators";
import { formatPhone } from "@/utils/formatPhone";

export function useContactForm(
  contact: Contact,
  setContact: (c: Contact) => void
) {
  // track whether email/phone fields have been blurred
  const [touched, setTouched] = useState({ email: false, phone: false, fenceLength: false });

  // validation flags
  const emailValid = isEmail(contact.email);
  const phoneValid = isPhone10(contact.phone);
  const fenceValid = minFence(Number(contact.fenceLength));

  // ensure required fields are filled and fenceLength >= 100
  const requiredFilled = Boolean(
    contact.firstName &&
      contact.lastName &&
      minFence(Number(contact.fenceLength)) &&
      isEmail(contact.email) &&
      isPhone10(contact.phone) &&
      contact.address1 &&
      contact.city &&
      contact.cityType &&
      contact.isHOA &&
      contact.fenceType
  );

  // format phone input (delegates to util)
  const handlePhoneChange = (value: string) => {
    setContact({ ...contact, phone: formatPhone(value) });
  };

  return {
    touched,
    setTouched,
    emailValid,
    phoneValid,
    fenceValid,
    requiredFilled,
    handlePhoneChange,
  };
}
