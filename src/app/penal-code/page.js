"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const penalCodes = [
  // Suçlar - Şahsa Karşı
  { code: "PC-101", title: "Cinayet (1. Derece)", category: "Şahsa Karşı", severity: "Ağır", jail: "HWS (Hayat Boyu)", fine: "$50,000" },
  { code: "PC-102", title: "Cinayet (2. Derece)", category: "Şahsa Karşı", severity: "Ağır", jail: "60 Ay", fine: "$30,000" },
  { code: "PC-103", title: "Adam Öldürmeye Teşebbüs", category: "Şahsa Karşı", severity: "Ağır", jail: "45 Ay", fine: "$25,000" },
  { code: "PC-104", title: "Ağır Yaralama", category: "Şahsa Karşı", severity: "Ağır", jail: "30 Ay", fine: "$15,000" },
  { code: "PC-105", title: "Basit Saldırı", category: "Şahsa Karşı", severity: "Orta", jail: "10 Ay", fine: "$5,000" },
  { code: "PC-106", title: "Tehdit", category: "Şahsa Karşı", severity: "Hafif", jail: "5 Ay", fine: "$2,500" },
  { code: "PC-107", title: "Kaçırma / Rehin Alma", category: "Şahsa Karşı", severity: "Ağır", jail: "40 Ay", fine: "$20,000" },
  { code: "PC-108", title: "İşkence", category: "Şahsa Karşı", severity: "Ağır", jail: "50 Ay", fine: "$25,000" },

  // Suçlar - Mülke Karşı
  { code: "PC-201", title: "Silahlı Soygun", category: "Mülke Karşı", severity: "Ağır", jail: "35 Ay", fine: "$20,000" },
  { code: "PC-202", title: "Banka Soygunu", category: "Mülke Karşı", severity: "Ağır", jail: "50 Ay", fine: "$35,000" },
  { code: "PC-203", title: "Hırsızlık", category: "Mülke Karşı", severity: "Orta", jail: "10 Ay", fine: "$5,000" },
  { code: "PC-204", title: "Mala Zarar Verme", category: "Mülke Karşı", severity: "Hafif", jail: "5 Ay", fine: "$3,000" },
  { code: "PC-205", title: "Kundaklama", category: "Mülke Karşı", severity: "Ağır", jail: "25 Ay", fine: "$15,000" },
  { code: "PC-206", title: "Araç Hırsızlığı", category: "Mülke Karşı", severity: "Orta", jail: "15 Ay", fine: "$8,000" },
  { code: "PC-207", title: "İzinsiz Giriş", category: "Mülke Karşı", severity: "Hafif", jail: "3 Ay", fine: "$1,500" },

  // Suçlar - Uyuşturucu
  { code: "PC-301", title: "Uyuşturucu Bulundurma", category: "Uyuşturucu", severity: "Orta", jail: "10 Ay", fine: "$5,000" },
  { code: "PC-302", title: "Uyuşturucu Satışı", category: "Uyuşturucu", severity: "Ağır", jail: "25 Ay", fine: "$15,000" },
  { code: "PC-303", title: "Uyuşturucu İmalatı", category: "Uyuşturucu", severity: "Ağır", jail: "35 Ay", fine: "$25,000" },
  { code: "PC-304", title: "Uyuşturucu Kaçakçılığı", category: "Uyuşturucu", severity: "Ağır", jail: "45 Ay", fine: "$30,000" },

  // Trafik Suçları
  { code: "PC-401", title: "Dikkatsiz Sürüş", category: "Trafik", severity: "Hafif", jail: "-", fine: "$1,000" },
  { code: "PC-402", title: "Alkollü Araç Kullanma", category: "Trafik", severity: "Orta", jail: "8 Ay", fine: "$5,000" },
  { code: "PC-403", title: "Hız Sınırını Aşma", category: "Trafik", severity: "Hafif", jail: "-", fine: "$500" },
  { code: "PC-404", title: "Polisten Kaçma (Araçla)", category: "Trafik", severity: "Ağır", jail: "20 Ay", fine: "$10,000" },
  { code: "PC-405", title: "Ehliyetsiz Araç Kullanma", category: "Trafik", severity: "Hafif", jail: "3 Ay", fine: "$2,000" },
  { code: "PC-406", title: "Yarışma", category: "Trafik", severity: "Orta", jail: "10 Ay", fine: "$7,500" },

  // Kamu Düzenine Karşı
  { code: "PC-501", title: "Memura Mukavemet", category: "Kamu Düzeni", severity: "Orta", jail: "15 Ay", fine: "$7,500" },
  { code: "PC-502", title: "Görevli Memura Saldırı", category: "Kamu Düzeni", severity: "Ağır", jail: "30 Ay", fine: "$15,000" },
  { code: "PC-503", title: "Adalet Engelleme", category: "Kamu Düzeni", severity: "Orta", jail: "10 Ay", fine: "$5,000" },
  { code: "PC-504", title: "Resmi Evrakta Sahtecilik", category: "Kamu Düzeni", severity: "Ağır", jail: "20 Ay", fine: "$10,000" },
  { code: "PC-505", title: "Kamu Huzurunu Bozma", category: "Kamu Düzeni", severity: "Hafif", jail: "3 Ay", fine: "$1,500" },
  { code: "PC-506", title: "Rüşvet", category: "Kamu Düzeni", severity: "Ağır", jail: "25 Ay", fine: "$15,000" },

  // Silah Suçları
  { code: "PC-601", title: "Ruhsatsız Silah Taşıma", category: "Silah", severity: "Orta", jail: "10 Ay", fine: "$5,000" },
  { code: "PC-602", title: "Yasadışı Silah Satışı", category: "Silah", severity: "Ağır", jail: "30 Ay", fine: "$20,000" },
  { code: "PC-603", title: "Silahla Tehdit", category: "Silah", severity: "Orta", jail: "15 Ay", fine: "$8,000" },
  { code: "PC-604", title: "Patlayıcı Madde Bulundurma", category: "Silah", severity: "Ağır", jail: "40 Ay", fine: "$25,000" },
];

const categories = ["Tümü", ...new Set(penalCodes.map((p) => p.category))];

export default function PenalCodePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [activeSeverity, setActiveSeverity] = useState("Tümü");

  const filtered = useMemo(() => {
    return penalCodes.filter((item) => {
      const matchSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "Tümü" || item.category === activeCategory;
      const matchSeverity =
        activeSeverity === "Tümü" || item.severity === activeSeverity;
      return matchSearch && matchCategory && matchSeverity;
    });
  }, [search, activeCategory, activeSeverity]);

  const severityColor = (s) => {
    switch (s) {
      case "Ağır":
        return "bg-red-500/20 text-red-400 border-red-500/20";
      case "Orta":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
      case "Hafif":
        return "bg-green-500/20 text-green-400 border-green-500/20";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-sheriff-gold mb-4">
              Yasal Düzenlemeler
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Ceza Kanunu
            </h1>
            <p className="mt-6 text-gray-500 max-w-2xl">
              Blaine County yargılama bölgesinde geçerli olan ceza kanunu maddeleri,
              ceza süreleri ve para cezaları.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Search & Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Kanun maddesi veya kod ile ara..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/50 focus:ring-1 focus:ring-sheriff-gold/20 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-sheriff-gold text-black font-bold"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Severity Filter */}
            <div className="flex gap-2">
              {["Tümü", "Hafif", "Orta", "Ağır"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setActiveSeverity(sev)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-300 ${
                    activeSeverity === sev
                      ? sev === "Ağır"
                        ? "bg-red-500/30 text-red-300 border border-red-500/30"
                        : sev === "Orta"
                        ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/30"
                        : sev === "Hafif"
                        ? "bg-green-500/30 text-green-300 border border-green-500/30"
                        : "bg-sheriff-gold text-black"
                      : "bg-white/5 text-gray-500 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>

            {/* Results count */}
            <p className="text-xs text-gray-600">
              {filtered.length} sonuç bulundu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card overflow-hidden"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-6 py-4 font-heading font-bold text-xs uppercase tracking-wider text-gray-500">
                      Kod
                    </th>
                    <th className="text-left px-6 py-4 font-heading font-bold text-xs uppercase tracking-wider text-gray-500">
                      Suç Tanımı
                    </th>
                    <th className="text-left px-6 py-4 font-heading font-bold text-xs uppercase tracking-wider text-gray-500">
                      Kategori
                    </th>
                    <th className="text-left px-6 py-4 font-heading font-bold text-xs uppercase tracking-wider text-gray-500">
                      Derece
                    </th>
                    <th className="text-left px-6 py-4 font-heading font-bold text-xs uppercase tracking-wider text-gray-500">
                      Ceza Süresi
                    </th>
                    <th className="text-left px-6 py-4 font-heading font-bold text-xs uppercase tracking-wider text-gray-500">
                      Para Cezası
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <motion.tr
                      key={item.code}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-sheriff-gold font-bold">
                        {item.code}
                      </td>
                      <td className="px-6 py-4 text-white font-medium group-hover:text-sheriff-gold transition-colors">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {item.category}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${severityColor(
                            item.severity
                          )}`}
                        >
                          {item.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                        {item.jail}
                      </td>
                      <td className="px-6 py-4 text-electric-blue-light font-mono text-xs font-bold">
                        {item.fine}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-white/5">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-4 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-sheriff-gold font-bold">
                      {item.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${severityColor(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{item.category}</span>
                    <div className="flex gap-3">
                      <span>{item.jail}</span>
                      <span className="text-electric-blue-light font-bold">
                        {item.fine}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-gray-600 text-sm">
                  Aramanızla eşleşen sonuç bulunamadı.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
