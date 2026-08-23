import React, { useState } from 'react';
import { Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Incorrect password');
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F7] flex items-center justify-center p-6 relative select-none">
      {/* Background Lighting Glow */}
      <div className="absolute w-[500px] h-[500px] bg-radial from-[#D9B36C]/10 via-[#3D1417]/20 to-transparent blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md apple-glass-card border border-[#2C2C2E] rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#000000] border border-[#D9B36C]/40 text-[#D9B36C] flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Lock className="w-6 h-6" />
        </div>

        <div className="text-center mb-8">
          <span className="text-[10px] font-cinzel uppercase tracking-[0.3em] text-[#D9B36C] block mb-2 font-bold">
            Studio Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif text-[#F5F5F7]">
            Digital Dream Admin
          </h1>
          <p className="text-xs text-[#86868B] font-light mt-2">
            Enter master studio password to access video controls.
          </p>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase font-cinzel tracking-[0.2em] text-[#86868B] font-semibold mb-2">
              Studio Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-[#000000] border border-[#2C2C2E] text-[#F5F5F7] placeholder-[#86868B]/40 text-sm focus:outline-none focus:border-[#D9B36C] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gold-gradient text-[#000000] font-bold text-xs font-cinzel tracking-[0.2em] uppercase shadow-xl shadow-[#D9B36C]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Unlock Video Studio</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#2C2C2E]/60 text-center">
          <p className="text-[10px] text-[#86868B] font-mono">
            Protected Studio Access • Session Secured
          </p>
        </div>

      </div>
    </div>
  );
}
