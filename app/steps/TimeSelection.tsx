// steps/TimeSelection.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import type { Dispatch, SetStateAction } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'

interface Props {
  setSelectedTime: Dispatch<SetStateAction<string>>
  next: () => void
  back: () => void
}

export default function TimeSelectionStep({
  setSelectedTime,
  next,
  back,
}: Props) {
  // — stub dates & times; swap these out for real data when you have it
  const dates = [
    'Saturday, June 28th',
    'Sunday, June 29th',
    'Monday, June 30th',
    'Tuesday, July 1st',
    'Wednesday, July 2nd',
    'Thursday, July 3rd',
    'Friday, July 4th',
    'Saturday, July 5th',
  ]
  const times = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
  ]

  // which date dropdown is open?
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleTimeClick = (date: string, time: string) => {
    if (confirm(`Confirm ${date} at ${time}?`)) {
      setSelectedTime(`${date} at ${time}`)
      next()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative w-full min-h-full flex flex-col items-center px-4"
    >
      <h2 className="text-3xl font-semibold mb-12">
        Select a date & time that works best for you
      </h2>

      <div className="w-full max-w-2xl space-y-4">
        {dates.map((date, idx) => {
          const isOpen = idx === openIndex
          return (
            <div key={date}>
              {/* date header */}
              <div
                onClick={() =>
                  setOpenIndex(isOpen ? null : idx)
                }
                className={`relative flex justify-center items-center cursor-pointer rounded-lg px-4 py-3 bg-brown-primary text-white text-xl ${
                  isOpen ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <span className='text-center'>{date}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 absolute right-4 transform transition-transform ${
                    isOpen ? '-rotate-180' : 'rotate-0'
                  }`}
                />
              </div>

              {/* times list */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-5 gap-2 mt-3">
                      {times.map((t) => (
                        <button
                          key={t}
                          onClick={() => handleTimeClick(date, t)}
                          className="rounded-md py-2 px-1 bg-brown-secondary text-white text-md hover:bg-blue-400"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* back/next nav */}
     <div className="mt-6 flex justify-center space-x-4">
        <Button
          variant="ghost"
          className="w-12 h-12 p-0 hover:bg-transparent focus:ring-0"
          onClick={back}
        >
          <ArrowLeftCircleIcon className="size-7 text-black" />
        </Button>
      </div>
    </motion.div>
  )
}
