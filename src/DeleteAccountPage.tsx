import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccountPage() {
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    if (confirm !== 'DELETE') {
      setMessage('Please type DELETE to confirm.');
      return;
    }
    // Remove account from accounts list and localStorage
    const accStr = localStorage.getItem('loggedInAccount');
    if (!accStr) return setMessage('Not logged in.');
    const acc = JSON.parse(accStr);
    let accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    accounts = accounts.filter(a => a.email !== acc.email);
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.removeItem('loggedInAccount');
    setMessage('Account deleted.');
    setTimeout(() => {
      navigate('/');
      window.dispatchEvent(new Event('login-status'));
    }, 800);
  }

  return (
    <div className="max-w-md mx-auto my-16 p-6 bg-slate-900 rounded-xl shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-white">Delete Account</h1>
      <form className="flex flex-col gap-3" onSubmit={handleDelete}>
        <label className="text-red-400 font-sm">Type DELETE to erase your account:</label>
        <input
          className="rounded-lg p-2 border border-red-600 bg-slate-800 text-white"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <button className="rounded-lg bg-red-600 text-white py-2 mt-1 hover:bg-red-700" type="submit">Delete Account</button>
      </form>
      {message && <p className="mt-3 text-red-400">{message}</p>}
    </div>
  );
}

