import api from "@/lib/api/axios";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";

export default function ChangePasswordModal({ onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const validateError = changePasswordValidate(formData);
    if (validateError) {
      setError(validateError);
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.put("/profile/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      onClose();
    } catch (error) {
      console.error("Current password is incorrect");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-(--card) border border-(--border) rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-(--foreground)">
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-(--background) rounded transition"
          >
            <X className="w-5 h-5 text-(--muted-foreground)" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-(--desctuctive)/10 border border-(--destructive)/30 rounded-lg text-sm text-(--destructive)">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-(--foreground) mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
              <input
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full px-10 py-2 bg-(--background) border border-(--primary) rounded-lg text-(--foreground) focus:outline-none focus:border-(--primary)  transition"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    current: !showPasswords.current,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {" "}
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-(--foreground) mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
              <input
                type={showPasswords.newPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-10 py-2 bg-(--background) border border-(--primary) rounded-lg text-(--foreground) focus:outline-none focus:border-(--primary) transition"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    newPassword: !showPasswords.newPassword,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPasswords.newPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-(--foreground) mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--muted-foreground)" />
              <input
                type={showPasswords.confirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-10 py-2 bg-(--background) border border-(--primary) rounded-lg text-(--foreground) focus:outline-none focus:border-(--primary) transition"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    confirmPassword: !showPasswords.confirmPassword,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                {showPasswords.confirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-(--background) border border-(--border) rounded-lg font-semibold text-(--foreground) transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-(--primary) border border-(--border) disabled:bg-(--muted) rounded-lg font-semibold text-(--foreground) transition"
              >
                {isLoading ? "Saving..." : "Update Password"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function changePasswordValidate(formData) {
  if (
    !formData.currentPassword ||
    !formData.newPassword ||
    !formData.confirmPassword
  ) {
    return "Please fill in all fields";
  }
  if (formData.newPassword !== formData.confirmPassword) {
    return "Passwords do not match";
  }
  if (formData.newPassword.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}
