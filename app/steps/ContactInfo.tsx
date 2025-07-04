import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { renderDropdown } from "@/components/ui/renderDropdown";
import { useContactForm } from "@/hooks/useContactForm";
import type { Props } from "@/types/props";

export default function ContactInfoStep({
  contact,
  setContact,
  next,
  back,
}: Props) {
  // hook encapsulates formatters, validation, touched state
  const {
    setTouched,
    emailValid,
    phoneValid,
    fenceValid,
    requiredFilled,
    handlePhoneChange,
  } = useContactForm(contact, setContact);

  // UI-only dropdown toggles
  const [openFence, setOpenFence] = useState(false);
  const [openCityType, setOpenCityType] = useState(false);
  const [openIsHOA, setOpenIsHOA] = useState(false);

  // dropdown options
  const fenceOptions = ["White Vinyl", "Traditional Cedar", "Black Aluminum"];
  const cityTypeOptions = ["City Limits", "Unincorporated"];
  const hoaOptions = ["Yes", "No"];

  return (
    <motion.div
      // animate-in/out transitions
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="relative w-full flex flex-col items-center px-4"
    >
      <h2 className="text-3xl font-semibold mb-12">
        Enter your contact information
      </h2>

      <form className="w-full max-w-4xl grid grid-cols-2 gap-12 mb-24">
        {/* Name */}
        <Input
          placeholder="First Name *"
          value={contact.firstName}
          onChange={(e) =>
            setContact({ ...contact, firstName: e.target.value })
          }
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
        <Input
          placeholder="Last Name *"
          value={contact.lastName}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />

        {/* Fence Length */}
        <Input
          placeholder="Fence Length (100ft min) *"
          type="number"
          value={contact.fenceLength}
          onChange={(e) =>
            setContact({ ...contact, fenceLength: e.target.value })
          }
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />

        {/* Email & Phone */}
        <Input
          type="email"
          placeholder="Email *"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
        <Input
          placeholder="Phone Number *"
          value={contact.phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />

        {/* Address */}
        <Input
          placeholder="Address Line 1 *"
          value={contact.address1}
          onChange={(e) => setContact({ ...contact, address1: e.target.value })}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
        <Input
          placeholder="Address Line 2"
          value={contact.address2 || ""}
          onChange={(e) => setContact({ ...contact, address2: e.target.value })}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />

        {/* City & Subdivision */}
        <Input
          placeholder="City *"
          value={contact.city}
          onChange={(e) => setContact({ ...contact, city: e.target.value })}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
        <Input
          placeholder="Subdivision Name"
          value={contact.subdivision || ""}
          onChange={(e) =>
            setContact({ ...contact, subdivision: e.target.value })
          }
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />

        {/* CityType & HOA dropdowns */}
        {renderDropdown(
          "City Limits or Unincorporated? *",
          contact.cityType,
          cityTypeOptions,
          openCityType,
          () => setOpenCityType((o) => !o),
          (val) => setContact({ ...contact, cityType: val })
        )}
        {renderDropdown(
          "Are you part of an HOA? *",
          contact.isHOA,
          hoaOptions,
          openIsHOA,
          () => setOpenIsHOA((o) => !o),
          (val) => setContact({ ...contact, isHOA: val })
        )}

        {/* File Upload */}
        <label className="col-span-1 h-12 flex items-center justify-between px-3 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer">
          <span className="text-sm text-gray-500">Upload Plat of Survey</span>
          <ArrowUpTrayIcon className="w-5 h-5 text-gray-500" />
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              setContact({ ...contact, survey: e.target.files?.[0] || null })
            }
          />
        </label>

        {/* Fence Type selection */}
        <div className="col-span-2">
          <div
            className="h-12 flex items-center justify-between px-3 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
            onClick={() => setOpenFence((o) => !o)}
          >
            <span
              className={`text-sm ${
                contact.fenceType ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {contact.fenceType || "Fence Type *"}
            </span>
            <ChevronDownIcon className="w-5 h-5 text-gray-500" />
          </div>
          <AnimatePresence>
            {openFence && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-12"
              >
                <div className="grid grid-cols-3 gap-4">
                  {fenceOptions.map((type) => (
                    <div
                      key={type}
                      className={`cursor-pointer flex flex-col items-center p-2 rounded-lg transition-colors ${
                        contact.fenceType === type
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        setContact({ ...contact, fenceType: type })
                      }
                    >
                      <Image
                        src={`/${type.toLowerCase().replace(/ /g, "-")}.png`}
                        alt={type}
                        width={200}
                        height={150}
                        className="rounded-lg"
                      />
                      <p className="text-center text-sm mt-2">{type}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Additional Comments */}
        <textarea
          className="col-span-2 p-3 text-sm bg-gray-100 rounded-lg border border-gray-200 placeholder-gray-400 focus:bg-white focus:border-gray-300 h-32 resize-none"
          placeholder="Additional Comments"
          value={contact.details || ""}
          onChange={(e) => setContact({ ...contact, details: e.target.value })}
        />

        {/* Validation messages */}
        {!contact.firstName && (
          <p className="col-span-2 text-red-500 text-sm">
            First name is required.{" "}
          </p>
        )}

        {!contact.lastName && (
          <p className="col-span-2 text-red-500 text-sm">
            Last name is required.{" "}
          </p>
        )}

        {!fenceValid && (
          <p className="col-span-2 text-red-500 text-sm">
            For estimates less than 100ft, please contact Freedom Fence: (630)-470-1846
          </p>
        )}

        {!emailValid && (
          <p className="col-span-2 text-red-500 text-sm">
            Please enter a valid email address.
          </p>
        )}

        {!phoneValid && (
          <p className="col-span-2 text-red-500 text-sm">
            Please enter a 10-digit phone number.
          </p>
        )}

        {!contact.address1 && (
          <p className="col-span-2 text-red-500 text-sm">
            Address Line 1 is required.
          </p>
        )}

        {!contact.city && (
          <p className="col-span-2 text-red-500 text-sm">
            City is required.
          </p>
        )}

        {!contact.cityType && (
          <p className="col-span-2 text-red-500 text-sm">
            Please select if you are in City Limits or Unincorporated.
          </p>
        )}

        {!contact.isHOA && (
          <p className="col-span-2 text-red-500 text-sm">
            Please indicate if you are part of an HOA.
          </p>
        )}

        {!contact.fenceType && (
          <p className="col-span-2 text-red-500 text-sm">
            Please select a fence type.
          </p>
        )}
      </form>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-4">
        <Button
          variant="ghost"
          className="w-12 h-12 p-0 hover:bg-transparent focus:ring-0"
          onClick={back}
        >
          <ArrowLeftCircleIcon className="size-7 text-black" />
        </Button>
        <Button
          variant="ghost"
          className="w-12 h-12 p-0 hover:bg-transparent focus:ring-0"
          onClick={next}
          disabled={!requiredFilled}
        >
          <ArrowRightCircleIcon className="size-7 text-black" />
        </Button>
      </div>
    </motion.div>
  );
}
