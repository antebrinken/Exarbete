import { useState } from 'react';

export default function NotificationsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  // Add more notification options as needed

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-white">Notification Preferences</h1>
      <form className="flex flex-col gap-4">
        <label className="flex items-center text-slate-200">
          <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} className="mr-2"/>
          Email notifications
        </label>
        {/* Add controls for SMS, push, etc. */}
      </form>
      <p className="mt-4 text-slate-400 text-sm">Note: Not all notification options may be supported yet.</p>
    </div>
  );
}

