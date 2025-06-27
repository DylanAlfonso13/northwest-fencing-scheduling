import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  zipCode: string;
  setZipCode: (val: string) => void;
  next: () => void;
}

export default function ZipCodeStep({ zipCode, setZipCode, next }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col"
    >
      <div className="flex-grow flex flex-col items-center mt-32 text-center px-4">
        <h2 className="text-3xl font-semibold mb-2">
          Welcome to the estimate scheduler.
        </h2>
        <p className="text-3xl font-semibold mb-6">
          To get started, enter your zip code
        </p>
        <div className="relative w-full max-w-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (zipCode) next();
            }}
          >
            <Input
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="pr-10 h-12 text-xl bg-gray-100 focus:bg-white"
            />
            <Button
              type="submit"
              variant={"ghost"}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 p-0 hover:bg-transparent focus:ring-0"
              disabled={!zipCode}
            >
              <ArrowRightCircleIcon className="text-black size-7" />
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
