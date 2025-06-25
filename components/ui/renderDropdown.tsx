// --- Reusable Dropdown Renderer ---
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    open: boolean,
    toggle: () => void,
    select: (val: string) => void
  ) => (
    <div className="col-span-1 relative">
      {/* Trigger */}
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

      {/* Options List */}
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