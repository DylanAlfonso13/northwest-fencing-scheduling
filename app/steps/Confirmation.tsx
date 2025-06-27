// steps/Confirmation.tsx
'use client';

import { FC } from 'react';
import { Contact } from '@/types/contact';
import { motion } from 'framer-motion';

interface Props {
  contact: Contact;
  selectedTime: string;
}

const ConfirmationStep: FC<Props> = ({ contact, selectedTime }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="
      absolute
      top-1/2 left-1/2
      transform -translate-x-1/2 -translate-y-1/2
      w-1/2
      flex flex-col items-center
      py-6 px-4
      bg-brown-primary text-white
      rounded-lg shadow-lg
    "
  >
    <h2 className="text-3xl mb-6">Estimate Confirmed!</h2>
    <h2 className="text-3xl mb-6">{selectedTime}</h2>
    <h2 className="text-3xl mb-6">
      {contact.address1}
      {contact.address2 && `, ${contact.address2}`}
    </h2>
    <p className="px-4 text-xl text-center">
      You should be receiving a confirmation email shortly. If you have any
      further questions, call (815)-836-8731.
    </p>
  </motion.div>
);

export default ConfirmationStep;
