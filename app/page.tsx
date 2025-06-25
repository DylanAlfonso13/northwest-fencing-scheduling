
'use client'
import { useState } from 'react'
import Image from "next/image";
import ZipCodeStep from './steps/ZipCode'
import ContactInfoStep from './steps/ContactInfo'
// import TimeSelectionStep from './steps/TimeSelection'
// import ConfirmationStep from './steps/Confirmation'

export default function EstimateScheduler() {
  const [step, setStep] = useState(0)
  const [zipCode, setZipCode] = useState('')
  const [contact, setContact] = useState({
    firstName: '', lastName: '', email: '', phone: '', address1: '', address2: '', city: '', subdivision: '', cityType: '',
    isHOA: '', fenceLength: '', fenceType: '', survey: null, details: ''
  })
  const [selectedTime, setSelectedTime] = useState('')

  const next = () => setStep((s) => s + 1)
  const back = () => setStep((s) => s - 1)

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full">
        <div className="p-6">
        <Image
          src="/logo.png"
          alt="Northwest Cedar Logo"
          width={120}
          height={120}
        />
      </div>
        {step === 0 && (
          <ZipCodeStep zipCode={zipCode} setZipCode={setZipCode} next={next} />
        )}
        {step === 1 && (
          <ContactInfoStep contact={contact} setContact={setContact} next={next} back={back} />
        )}
        {/* {step === 2 && (
          <TimeSelectionStep selectedTime={selectedTime} setSelectedTime={setSelectedTime} next={next} back={back} />
        )}
        {step === 3 && (
          <ConfirmationStep selectedTime={selectedTime} contact={contact} />
        )} */}
      </div>
    </main>
  )
}
