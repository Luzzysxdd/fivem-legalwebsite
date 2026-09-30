"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { loginAdmin } from "@/lib/auth";

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (loginAdmin(username, password)) {
        onSuccess();
      } else {
        setError("Geçersiz kullanıcı adı veya şifre.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sheriff-gold/[0.03] rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sheriff-gold to-sheriff-gold-dark flex items-center justify-center shadow-xl shadow-sheriff-gold/20">
            <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
        </div>

        <h1 className="text-center font-heading font-bold text-xl text-white mb-1">Admin Paneli</h1>
        <p className="text-center text-xs text-gray-500 mb-8">BCSO Yönetim Sistemi</p>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sheriff-gold/50 to-transparent" />

          {error && (
            <div className="px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-sheriff-gold/40 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-sheriff-gold/40 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider text-black disabled:opacity-50 relative overflow-hidden group"
            style={{ background: "linear-gradient(135deg, #d4a843, #e8c971, #d4a843)", backgroundSize: "200% auto" }}
          >
            <span className={loading ? "opacity-0" : ""}>{loading ? "" : "Giriş Yap"}</span>
            {loading && <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /></div>}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          <p className="text-center text-[10px] text-gray-600">
            Varsayılan: admin / bcso2024
          </p>
        </form>
      </motion.div>
    </div>
  );
}
