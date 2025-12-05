"use client";
import { useAuth } from "@/app/context/AuthContext";
import api from "@/lib/api/axios";
import { X } from "lucide-react";
import { useState } from "react";

export default function EditProfileModal({ user, onClose }) {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.put("/profile/edit", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      });
      setUser(response.data);
      onClose();
    } catch (error) {
      console.error("Profile update error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-(--card) border border-(--border) rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-(--foreground)">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-(--background) rounded transition"
          >
            <X className="w-5 h-5 text-(--muted-foreground)" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-(--foreground) mb-2">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-2 bg-(--background) border border-(--primary) rounded-lg text-(--foreground) focus:outline-none focus:border-(--primary) transition"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-(--foreground) mb-2">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-2 bg-(--background) border border-(--primary) rounded-lg text-(--foreground) focus:outline-none  focus:border-(--primary) transition"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-(--foreground) mb-2">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-(--background) border border-(--primary) rounded-lg text-(--foreground) focus:otline-none focus:border-(--primary) transition"
              />
            </label>
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
              className="flex-1 px-4 py-2 bg-(--primary) hover:bg-(--primary)/80 disabled:bg-(--muted) border border-(--primary) rounded-lg font-semibold text-(--foreground) transition"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
