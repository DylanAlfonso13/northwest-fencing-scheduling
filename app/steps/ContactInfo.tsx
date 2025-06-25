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

interface Contact {
  firstName: string;
  lastName: string;
  fenceLength: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  subdivision?: string;
  cityType: string;
  isHOA: string;
  survey?: File | null;
  fenceType: string;
  details?: string;
}

interface Props {
  contact: Contact;
  setContact: (c: Contact) => void;
  next: () => void;
  back: () => void;
}

export default function ContactInfoStep({
  contact,
  setContact,
  next,
  back,
}: Props) {
  const [openFence, setOpenFence] = useState(false);
  const [openCityType, setOpenCityType] = useState(false);
  const [openIsHOA, setOpenIsHOA] = useState(false);

  // validate required fields
  const requiredFilled =
    contact.firstName &&
    contact.lastName &&
    Number(contact.fenceLength) >= 100 &&
    contact.email &&
    contact.phone &&
    contact.address1 &&
    contact.city &&
    contact.cityType &&
    contact.isHOA &&
    contact.fenceType;

  const fenceOptions = ["White Vinyl", "Traditional Cedar", "Black Aluminum"];
  const cityTypeOptions = ["City Limits", "Unincorporated"];
  const hoaOptions = ["Yes", "No"];

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    open: boolean,
    toggle: () => void,
    select: (val: string) => void
  ) => (
    <div className="col-span-1 relative">
      <div
        className="h-12 flex items-center justify-between px-3 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer"
        onClick={toggle}
      >
        <span
          className={`text-sm ${value ? "text-gray-800" : "text-gray-500"}`}
        >
          {value || label}
        </span>
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
          >
            {options.map((opt) => (
              <div
                key={opt}
                className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                  value === opt ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  select(opt);
                  toggle();
                }}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div
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
        {/* Use Input for consistency */}
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
        <Input
          placeholder="Fence Length (in feet, 100ft minimum) *"
          type="number"
          value={contact.fenceLength}
          onChange={(e) =>
            setContact({ ...contact, fenceLength: e.target.value })
          }
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
        <Input
          placeholder="Email *"
          type="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
        <Input
          placeholder="Phone Number *"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          className="col-span-1 h-12 text-sm bg-gray-100 focus:bg-white"
        />
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

        {/* Custom styled selects matching Input */}
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
        {/* File upload styled like Input */}
        <label className="col-span-1 h-12 flex items-center justify-between px-3 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer">
          <span className="text-sm text-gray-500">Upload Plat of Survey</span>
          <ArrowUpTrayIcon className="size-4 text-gray-500" />
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              setContact({ ...contact, survey: e.target.files?.[0] || null })
            }
          />
        </label>

        {/* Fence Type custom dropdown */}
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

        {/* Comments textarea styled like Input */}
        <textarea
          className="col-span-2 p-3 text-sm px-3 py-3 bg-gray-100 rounded-lg border border-gray-200 placeholder-gray-400 focus:bg-white focus:border-gray-300 h-32 resize-none"
          placeholder="Additional Comments"
          value={contact.details || ""}
          onChange={(e) => setContact({ ...contact, details: e.target.value })}
        />
      </form>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-4">
        <Button
          variant="ghost"
          className="w-12 h-12 p-0 hover:bg-transparent focus:ring-0"
          onClick={back}
        >
          <ArrowLeftCircleIcon className="size-7 text-gray-600" />
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
