"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DevModal({ dev, onSave, onClose }) {
  const isEdit = !!dev;
  const [form, setForm] = useState({
    name: "", username: "", role: "Geliştirici", avatarUrl: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (dev) setForm({ ...dev });
  }, [dev]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.username) {
      setError("Ad ve kullanıcı adı zorunludur."); return;
    }
    onSave(form);
  };

  const inputCls = "w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-sheriff-gold/30 transition-all placeholder-gray-600";
  const labelCls = "block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md glass-card p-6 relative"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-lg text-white">
              {isEdit ? "Geliştirici Düzenle" : "Geliştirici Ekle"}
            </h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Avatar Preview */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {form.avatarUrl ? (
                  <img src={form.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                )}
              </div>
            </div>

            <div>
              <label className={labelCls}>Profil Fotoğrafı URL</label>
              <input value={form.avatarUrl} onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })} placeholder="https://..." className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>İsim</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="İsim Soyisim" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Kullanıcı Adı</label>
                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="@username" className={inputCls} />
              </div>
            </div>

            <div>
              <label className={labelCls}>Rol</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputCls + " cursor-pointer"}>
                {["Geliştirici", "Kurucu", "Tasarımcı", "Moderatör", "Yönetici"].map((r) => (
                  <option key={r} value={r} className="bg-[#111]">{r}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">İptal</button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl font-heading font-bold text-sm text-black uppercase tracking-wider" style={{ background: "linear-gradient(135deg, #3b82f6, #60a5fa, #3b82f6)" }}>
                {isEdit ? "Güncelle" : "Ekle"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
