import { motion, AnimatePresence } from "framer-motion";

interface ModalDateRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDateRequest = ({
  isOpen,
  onClose,
}: ModalDateRequestProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-teal-900/30 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 md:p-8 text-center border border-teal-50"
          >
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-teal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-teal-950 mb-2">
              Request Received!
            </h2>
            <p className="text-sm text-teal-700/80 mb-6 font-medium leading-relaxed">
              We have successfully received your request. We will send you a
              confirmation as soon as possible.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl w-full transition-colors shadow-md shadow-teal-200/50"
            >
              Continue
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
