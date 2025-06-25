import { Contact } from './contact';

// --- Props Interface ---
export interface Props {
  contact: Contact;
  setContact: (c: Contact) => void;
  next: () => void;
  back: () => void;
}