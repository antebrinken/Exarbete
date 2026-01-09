import React from 'react';

export default function SettingsPage() {
  return (
    <div className="max-w-xl mx-auto my-16 p-6 bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-white">Settings</h1>
      <div className="space-y-5">
        <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-indigo-200">Change Password</h2>
          <a href="/settings/change-password" className="rounded bg-indigo-500 px-3 py-2 text-white font-semibold w-max hover:bg-indigo-600 transition">Change Password</a>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-red-300">Delete Account</h2>
          <a href="/settings/delete-account" className="rounded bg-red-500 px-3 py-2 text-white font-semibold w-max hover:bg-red-700 transition">Delete Account</a>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-indigo-200">Notification Preferences</h2>
          <a href="/settings/notifications" className="rounded bg-indigo-500 px-3 py-2 text-white font-semibold w-max hover:bg-indigo-600 transition">Manage Notifications</a>
        </div>
      </div>
    </div>
  );
}
