"use client";
import { useAuth } from "@/app/context/AuthContext";
import ChangePasswordModal from "@/components/profile/ChangePassowrdModal";
import EditProfileModal from "@/components/profile/EditProfileModal";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/tabs/ProfileTabs";
import { formatDate } from "@/lib/formatDate";
import { Calendar, Key, Mail, User } from "lucide-react";

import { useState } from "react";
export default function Profile() {
  const { user, loading } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  console.log("USER", user);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-(--muted-foreground)">Loading your profile...</p>
      </div>
    );
  }
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProfileHeader user={user} />
          <div className="mt-8 space-y-3 ">
            <button
              onClick={() => setShowEditModal(true)}
              className="w-full py-2 px-4 bg-(--primary)/90 hover:bg-(--primary)/90 text-(--primary-foreground) rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full py-2 px-4 bg-(--card) text-(--foreground) rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              Change Password
            </button>
          </div>
          <div className="mt-8 bg-(--card) rounded-lg border border-(--border) p-6 ">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase font-semibold text-(--muted-foreground) mb-1">
                  Email
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <p className="text-sm text-(--foreground)">{user.email}</p>
                </div>
              </div>
              <div className="border-t border-(--border) pt-4">
                <p className="text-sm text-(--muted-foreground) uppercase font-semibold mb-1">
                  Member Since
                </p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm text-(--foreground)">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <ProfileTabs />
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal user={user} onClose={() => setShowEditModal(false)} />
      )}
      {showPasswordModal && (
        <ChangePasswordModal
          user={user}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </main>
  );
}
