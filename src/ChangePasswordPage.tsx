import React, { useState } from 'react';

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    // Example: assumes localStorage based users
    const accStr = localStorage.getItem('loggedInAccount');
    if (!accStr) return setMessage('Not logged in.');
    const acc = JSON.parse(accStr);
    if (acc.password !== oldPassword) return setMessage('Old password is incorrect.');
    acc.password = newPassword;
    // Update accounts in localStorage too
    let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    accounts = accounts.map((a: { email: string; password: string }) => a.email === acc.email ? {...a, password: newPassword } : a);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('loggedInAccount', JSON.stringify(acc));
    setMessage('Password changed successfully.');
    setOldPassword('');
    setNewPassword('');
  }

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-white">Change Password</h1>
      <form className="flex flex-col gap-3" onSubmit={handleChangePassword}>
        <input
          className="rounded-lg p-2 border border-slate-700 bg-slate-800 text-white"
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />
        <input
          className="rounded-lg p-2 border border-slate-700 bg-slate-800 text-white"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button className="rounded-lg bg-indigo-500 text-white py-2 mt-1 hover:bg-indigo-600" type="submit">Change Password</button>
      </form>
      {message && <p className="mt-3 text-green-400">{message}</p>}
    </div>
  );
}

