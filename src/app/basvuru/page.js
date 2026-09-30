"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BasvuruPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    discord: "",
    experience: "",
    motivation: "",
    division: "",
    availability: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-md mx-4"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-2xl text-white mb-3">
              Başvurunuz Alındı!
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Başvurunuz incelemeye alınmıştır. Discord sunucumuzdan takip edebilirsiniz.
            </p>
            <a href="/" className="btn-gold px-8 py-3 text-sm">
              Ana Sayfaya Dön
            </a>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-sheriff-gold mb-4">
              Kariyer Fırsatı
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Başvuru Formu
            </h1>
            <p className="mt-6 text-gray-500 max-w-2xl">
              Blaine County Sheriff Departmanı&apos;na katılmak için aşağıdaki formu
              eksiksiz doldurun. Başvurunuz 48 saat içinde değerlendirilecektir.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card p-8 lg:p-10 space-y-6"
          >
            {/* Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors"
                  placeholder="Adınızı girin..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Yaş *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="16"
                  max="99"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors"
                  placeholder="Yaşınız"
                />
              </div>
            </div>

            {/* Discord */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Discord Kullanıcı Adı *
              </label>
              <input
                type="text"
                name="discord"
                required
                value={form.discord}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors"
                placeholder="örn: kullanici#1234"
              />
            </div>

            {/* Division */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Tercih Edilen Birim
              </label>
              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-dark-card">Birim seçin...</option>
                <option value="patrol" className="bg-dark-card">Devriye Birimi</option>
                <option value="k9" className="bg-dark-card">K-9 Birimi</option>
                <option value="swat" className="bg-dark-card">SWAT Birimi</option>
                <option value="traffic" className="bg-dark-card">Trafik Bürosu</option>
                <option value="air" className="bg-dark-card">Hava Destek</option>
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Haftalık Müsaitlik *
              </label>
              <select
                name="availability"
                required
                value={form.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-dark-card">Seçin...</option>
                <option value="10+" className="bg-dark-card">10+ saat</option>
                <option value="20+" className="bg-dark-card">20+ saat</option>
                <option value="30+" className="bg-dark-card">30+ saat</option>
                <option value="40+" className="bg-dark-card">40+ saat</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Önceki Deneyim
              </label>
              <textarea
                name="experience"
                rows="3"
                value={form.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors resize-none"
                placeholder="Varsa önceki roleplay veya emniyet deneyimlerinizi kısaca açıklayın..."
              />
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Motivasyon *
              </label>
              <textarea
                name="motivation"
                rows="4"
                required
                value={form.motivation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors resize-none"
                placeholder="Neden BCSO'ya katılmak istiyorsunuz?"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/5">
              <button
                type="submit"
                className="btn-gold w-full py-4 text-sm"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                Başvuruyu Gönder
              </button>
              <p className="text-[11px] text-gray-600 text-center mt-3">
                Başvurunuz gizli tutulacak ve sadece yetkili personel tarafından incelenecektir.
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
