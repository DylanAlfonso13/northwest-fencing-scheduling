import type { Dispatch, SetStateAction } from 'react';
import type { Contact } from './contact';

export interface Props {
  contact: Contact;
  setContact: Dispatch<SetStateAction<Contact>>;
  next: () => void;
  back: () => void;
}
