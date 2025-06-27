"use client";
import { useState } from "react";
import { emptyContact } from "@/types/contact";
import Image from "next/image";
import ZipCodeStep from "./steps/ZipCode";
import ContactInfoStep from "./steps/ContactInfo";
import TimeSelectionStep from "./steps/TimeSelection";
import ConfirmationStep from "./steps/Confirmation";

export default function EstimateScheduler() {
  const [step, setStep] = useState(0);
  const [zipCode, setZipCode] = useState("");
  const [contact, setContact] = useState(emptyContact);
  const [selectedTime, setSelectedTime] = useState("");

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-6">
      <div className="w-full">
        <Image
          src="/logo.png"
          alt="Northwest Cedar Logo"
          width={120}
          height={120}
        />
        {step === 0 && (
          <ZipCodeStep zipCode={zipCode} setZipCode={setZipCode} next={next} />
        )}
        {step === 1 && (
          <ContactInfoStep
            contact={contact}
            setContact={setContact}
            next={next}
            back={back}
          />
        )}
        {step === 2 && (
          <TimeSelectionStep
            setSelectedTime={setSelectedTime}
            next={next}
            back={back}
          />
        )}
        {step === 3 && (
          <ConfirmationStep
            contact={contact}
            selectedTime={selectedTime}
          />
        )}
      </div>
    </main>
  );
}
