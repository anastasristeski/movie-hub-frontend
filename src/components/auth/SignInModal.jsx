import { X } from "lucide-react";
import SignInForm from "./SignInForm";

export default function SignInModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-(--card) border border-(--border) rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sign In</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <SignInForm onSuccess={onClose} />
      </div>
    </div>
  );
}
