"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RANKS, DIVISIONS, STATUSES, isBadgeNumberTaken } from "@/lib/auth";

export default function MemberModal({ member, onSave, onClose }) {
  const isEdit = !!member;
  const [form, setForm] = useState({
    badgeNumber: "", firstName: "", lastName: "", rank: "Cadet",
    division: "Devriye Birimi", status: "active", discordId: "",
    joinDate: new Date().toISOString().split("T")[0], notes: "", password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (member) {
      setForm({ ...member, password: member.password || "" });
    }
  }, [member]);

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.badgeNumber || !form.firstName || !form.lastName) {
      setError("Rozet numarası, ad ve soyad zorunludur."); return;
    }
    if (!isEdit && !form.password) {
      setError("Yeni üye için şifre gereklidir."); return;
    }
    if (isBadgeNumberTaken(form.badgeNumber, member?.id)) {
      setError("Bu rozet numarası zaten kullanılıyor."); return;
    }
    const saveData = { ...form };
    if (isEdit && !saveData.password) delete saveData.password;
    onSave(saveData);
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
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg glass-card p-6 max-h-[85vh] overflow-y-auto relative"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sheriff-gold/50 to-transparent" />

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-lg text-white">
              {isEdit ? "Üye Düzenle" : "Yeni Üye Oluştur"}
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
            {/* Badge & Names */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Rozet No</label>
                <input value={form.badgeNumber} onChange={(e) => handleChange("badgeNumber", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="001" className={inputCls + " font-mono tracking-widest"} />
              </div>
              <div>
                <label className={labelCls}>Ad</label>
                <input value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} placeholder="Ad" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Soyad</label>
                <input value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} placeholder="Soyad" className={inputCls} />
              </div>
            </div>

            {/* Rank & Division */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Rütbe</label>
                <select value={form.rank} onChange={(e) => handleChange("rank", e.target.value)} className={inputCls + " cursor-pointer"}>
                  {RANKS.map((r) => <option key={r} value={r} className="bg-[#111]">{r}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Birim</label>
                <select value={form.division} onChange={(e) => handleChange("division", e.target.value)} className={inputCls + " cursor-pointer"}>
                  {DIVISIONS.map((d) => <option key={d} value={d} className="bg-[#111]">{d}</option>)}
                </select>
              </div>
            </div>

            {/* Status & Join Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Durum</label>
                <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className={inputCls + " cursor-pointer"}>
                  {STATUSES.map((s) => <option key={s.value} value={s.value} className="bg-[#111]">{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Katılma Tarihi</label>
                <input type="date" value={form.joinDate} onChange={(e) => handleChange("joinDate", e.target.value)} className={inputCls + " cursor-pointer"} />
              </div>
            </div>

            {/* Password & Discord */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>{isEdit ? "Yeni Şifre (opsiyonel)" : "Şifre"}</label>
                <input type="text" value={form.password} onChange={(e) => handleChange("password", e.target.value)} placeholder={isEdit ? "Değiştirmek için girin" : "Şifre belirleyin"} className={inputCls + " font-mono"} />
              </div>
              <div>
                <label className={labelCls}>Discord ID</label>
                <input value={form.discordId} onChange={(e) => handleChange("discordId", e.target.value)} placeholder="Opsiyonel" className={inputCls} />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className={labelCls}>Notlar</label>
              <textarea value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} rows={2} placeholder="Opsiyonel notlar..." className={inputCls + " resize-none"} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">
                İptal
              </button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl font-heading font-bold text-sm text-black uppercase tracking-wider" style={{ background: "linear-gradient(135deg, #d4a843, #e8c971, #d4a843)" }}>
                {isEdit ? "Güncelle" : "Oluştur"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
