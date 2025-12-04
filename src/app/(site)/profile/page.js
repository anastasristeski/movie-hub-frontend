"use client";
import { useAuth } from "@/app/context/AuthContext";
import EditProfile from "@/components/profile/EditProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";
export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loding....
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        You must be signed in to view this page.
      </div>
    );
  }
  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
}

function formatMemberSince(user) {
  return "Unknown";
}
