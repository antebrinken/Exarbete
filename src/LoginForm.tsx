import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const getAccounts = (): Array<{email: string, password: string}> => {
    return JSON.parse(localStorage.getItem('accounts') || '[]');
  };
  const saveAccount = (newAccount: {email: string, password: string}) => {
    const accounts = getAccounts();
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Fill in all fields');
      return;
    }
    if (mode === 'register') {
      const accounts = getAccounts();
      if (accounts.some(acc => acc.email === email)) {
        setMessage('Account already exists.');
        return;
      }
      saveAccount({ email, password });
      setMessage('Account created! You can now log in.');
      setMode('login');
      setEmail('');
      setPassword('');
      return;
    }
    if (mode === 'login') {
      const accounts = getAccounts();
      const acc = accounts.find(acc => acc.email === email);
      if (!acc) {
        setMessage('No such account. Please create one.');
        return;
      }
      if (acc.password !== password) {
        setMessage('Incorrect password.');
        return;
      }
      localStorage.setItem('loggedInAccount', JSON.stringify(acc));
      setMessage('Login successful!');
      window.dispatchEvent(new Event('login-status'));
      // Optionally redirect or close modal
      return;
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Enter your email to recover your account.');
      return;
    }
    const accounts = getAccounts();
    const acc = accounts.find(acc => acc.email === email);
    if (acc) {
      setMessage(`Login reminder:\nEmail: ${acc.email}\nPassword: ${acc.password}`);
    } else {
      setMessage('No account with that email.');
    }
  };

  return (
    <form onSubmit={mode === 'forgot' ? handleForgot : handleSubmit} style={{ maxWidth: 320, margin: '1rem auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>{mode === 'register' ? 'Create account' : mode === 'forgot' ? 'Forgot login details' : 'Login'}</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Email<br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            required
          />
        </label>
      </div>
      {mode !== 'forgot' && (
        <div style={{ marginBottom: 16 }}>
          <label>Password<br />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
              required
            />
          </label>
        </div>
      )}
      <button type="submit" style={{ width: '100%', padding: 10, borderRadius: 4, background: '#1976d2', color: 'white', border: 'none' }}>
        {mode === 'register' ? 'Create Account' : mode === 'forgot' ? 'Recover' : 'Login'}
      </button>
      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        {mode !== 'register' && (
          <span style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => { setMode('register'); setMessage(''); }}>Create account</span>
        )}
        {mode !== 'forgot' && (
          <span style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => { setMode('forgot'); setMessage(''); }}>Forgot login details?</span>
        )}
        {(mode === 'register' || mode === 'forgot') && (
          <span style={{ cursor: 'pointer', color: '#1976d2' }} onClick={() => { setMode('login'); setMessage(''); }}>Back to login</span>
        )}
      </div>
      {message && <p style={{ color: 'green', marginTop: 10, whiteSpace: 'pre-wrap' }}>{message}</p>}
    </form>
  );
};

export default LoginForm;
