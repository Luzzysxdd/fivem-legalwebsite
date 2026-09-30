"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loginMember } from "@/lib/auth";

export default function GirisPage() {
  const router = useRouter();
  const [badgeNumber, setBadgeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("badge");
  const [error, setError] = useState("");

  const handleBadgeLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!badgeNumber || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    if (!/^\d{3,6}$/.test(badgeNumber)) {
      setError("Rozet numarası 3-6 haneli bir sayı olmalıdır.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const member = loginMember(badgeNumber, password);
      if (member) {
        router.push("/");
      } else {
        setError("Geçersiz rozet numarası veya şifre.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDiscordLogin = () => {
    setIsLoading(true);
    // Discord OAuth redirect would go here
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#0d0d12]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sheriff-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-[120px]" />
        </div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Content */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          {/* Shield Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sheriff-gold to-sheriff-gold-dark flex items-center justify-center shadow-2xl shadow-sheriff-gold/20">
                <svg
                  className="w-10 h-10 text-black"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 9.04-7 10.18-3.87-1.14-7-5.51-7-10.18V6.3l7-3.12z" />
                  <path d="M12 7l-3.5 2v4c0 2.32 1.5 4.48 3.5 5 2-0.52 3.5-2.68 3.5-5V9L12 7z" />
                </svg>
              </div>
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl animate-glow-pulse" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center mb-8"
          >
            <h1 className="font-heading font-bold text-2xl text-white mb-2">
              Personel Girişi
            </h1>
            <p className="text-sm text-gray-500">
              BCSO personel paneline erişmek için giriş yapın
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            {/* Card top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sheriff-gold/60 to-transparent" />

            {/* Tab Selector */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-8">
              <button
                onClick={() => { setActiveTab("badge"); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "badge"
                    ? "bg-gradient-to-r from-sheriff-gold/20 to-sheriff-gold/10 text-sheriff-gold border border-sheriff-gold/20 shadow-lg shadow-sheriff-gold/5"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {/* Badge icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Rozet Girişi
              </button>
              <button
                onClick={() => { setActiveTab("discord"); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "discord"
                    ? "bg-gradient-to-r from-[#5865F2]/20 to-[#5865F2]/10 text-[#7289da] border border-[#5865F2]/20 shadow-lg shadow-[#5865F2]/5"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {/* Discord icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
                Discord
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-red-400">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Badge Login Form */}
            <AnimatePresence mode="wait">
              {activeTab === "badge" ? (
                <motion.form
                  key="badge-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleBadgeLogin}
                  className="space-y-5"
                >
                  {/* Badge Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Rozet Numarası
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-600 group-focus-within:text-sheriff-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      </div>
                      <input
                        id="badge-number"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Örn: 1234"
                        value={badgeNumber}
                        onChange={(e) => setBadgeNumber(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm font-mono tracking-widest focus:outline-none focus:border-sheriff-gold/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(212,168,67,0.08)] transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Şifre
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-600 group-focus-within:text-sheriff-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-sheriff-gold/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(212,168,67,0.08)] transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-gray-400 transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-4 h-4 rounded border border-white/10 bg-white/[0.03] peer-checked:bg-sheriff-gold/20 peer-checked:border-sheriff-gold/40 transition-all" />
                        <svg className="absolute inset-0 w-4 h-4 text-sheriff-gold opacity-0 peer-checked:opacity-100 transition-opacity p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Beni hatırla</span>
                    </label>
                    <a href="#" className="text-xs text-sheriff-gold/60 hover:text-sheriff-gold transition-colors">
                      Şifremi unuttum
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative py-3.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    style={{
                      background: "linear-gradient(135deg, #d4a843 0%, #e8c971 50%, #d4a843 100%)",
                      backgroundSize: "200% auto",
                      color: "#0a0a0a",
                    }}
                  >
                    <span className={`flex items-center justify-center gap-2 transition-all ${isLoading ? "opacity-0" : "opacity-100"}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                      Giriş Yap
                    </span>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      </div>
                    )}
                    {/* Hover shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="discord-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Discord Info */}
                  <div className="text-center space-y-3 py-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
                      Discord hesabınız ile hızlı ve güvenli şekilde giriş yapın. Sunucu üyeliğiniz otomatik doğrulanır.
                    </p>
                  </div>

                  {/* Discord Features */}
                  <div className="space-y-3">
                    {[
                      { icon: "⚡", text: "Hızlı tek tıklama ile giriş" },
                      { icon: "🔒", text: "OAuth2 güvenli kimlik doğrulama" },
                      { icon: "🔗", text: "Sunucu rolleriniz otomatik bağlanır" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                      >
                        <span className="text-base">{item.icon}</span>
                        <span className="text-xs text-gray-400">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Discord Login Button */}
                  <button
                    onClick={handleDiscordLogin}
                    disabled={isLoading}
                    className="w-full relative py-3.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider text-white overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group hover:shadow-[0_0_30px_rgba(88,101,242,0.3)] hover:-translate-y-[2px]"
                    style={{
                      background: "linear-gradient(135deg, #5865F2 0%, #7289da 50%, #5865F2 100%)",
                      backgroundSize: "200% auto",
                    }}
                  >
                    <span className={`flex items-center justify-center gap-2 transition-all ${isLoading ? "opacity-0" : "opacity-100"}`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                      </svg>
                      Discord ile Giriş Yap
                    </span>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                    {/* Hover shine */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs text-gray-600 bg-[#111]/80 backdrop-blur-sm">
                  GÜVENLİ BAĞLANTI
                </span>
              </div>
            </div>

            {/* Security Info */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span>SSL Korumalı</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Şifreli</span>
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>2FA Destekli</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-600 mt-6"
          >
            Yalnızca yetkili BCSO personeli erişebilir.{" "}
            <Link href="/" className="text-sheriff-gold/50 hover:text-sheriff-gold transition-colors">
              Ana Sayfaya Dön
            </Link>
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
