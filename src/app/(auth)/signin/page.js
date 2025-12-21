"use client";

import SignInForm from "@/components/auth/signin-form";
export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-(--card) p-8 rounded-xl shadow-xl border border-(--border)">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-(--primary) rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-(--primary-foreground)">
              MH
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-(--foreground)">
            Welcome Back
          </h1>
        </div>
        <SignInForm />
      </div>
    </main>
  );
}
