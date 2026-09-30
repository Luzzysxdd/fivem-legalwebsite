"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getDevelopers } from "@/lib/auth";

const ranks = [
  {
    tier: "Komuta Kadrosu",
    members: [
      {
        name: "James Mitchell",
        rank: "Sheriff",
        badge: "⭐",
        department: "Departman Yönetimi",
        medals: ["Üstün Hizmet", "Liderlik"],
      },
      {
        name: "Sarah Johnson",
        rank: "Undersheriff",
        badge: "⭐",
        department: "Operasyonel Yönetim",
        medals: ["Üstün Hizmet"],
      },
    ],
  },
  {
    tier: "Üst Düzey Komutanlar",
    members: [
      {
        name: "Michael Torres",
        rank: "Assistant Sheriff",
        badge: "🔰",
        department: "SWAT Komutanı",
        medals: ["Cesaret Madalyası", "Taktik Üstünlük"],
      },
      {
        name: "Emily Chen",
        rank: "Commander",
        badge: "🔰",
        department: "K-9 Birimi",
        medals: ["Hizmet Şeridi"],
      },
      {
        name: "Robert Davis",
        rank: "Commander",
        badge: "🔰",
        department: "Hava Destek",
        medals: ["Uçuş Başarısı"],
      },
    ],
  },
  {
    tier: "Kıdemli Memurlar",
    members: [
      {
        name: "David Wilson",
        rank: "Captain",
        badge: "🛡️",
        department: "Trafik Bürosu",
        medals: ["Toplum Hizmeti"],
      },
      {
        name: "Jessica Brown",
        rank: "Lieutenant",
        badge: "🛡️",
        department: "Devriye Birimi",
        medals: [],
      },
      {
        name: "Carlos Martinez",
        rank: "Lieutenant",
        badge: "🛡️",
        department: "Soruşturma",
        medals: ["Dedektiflik"],
      },
      {
        name: "Amanda Lee",
        rank: "Sergeant",
        badge: "🛡️",
        department: "K-9 Eğitmen",
        medals: ["K-9 Uzmanlık"],
      },
    ],
  },
  {
    tier: "Memurlar",
    members: [
      {
        name: "Tyler Rodriguez",
        rank: "Senior Deputy",
        badge: "📛",
        department: "Devriye",
        medals: [],
      },
      {
        name: "Olivia Kim",
        rank: "Deputy",
        badge: "📛",
        department: "Devriye",
        medals: [],
      },
      {
        name: "Nathan Brooks",
        rank: "Deputy",
        badge: "📛",
        department: "Trafik",
        medals: [],
      },
      {
        name: "Sophia Patel",
        rank: "Deputy",
        badge: "📛",
        department: "SWAT Operatör",
        medals: ["Keskin Nişancı"],
      },
      {
        name: "Ethan Wright",
        rank: "Recruit",
        badge: "📛",
        department: "Eğitim",
        medals: [],
      },
      {
        name: "Ashley Cooper",
        rank: "Recruit",
        badge: "📛",
        department: "Eğitim",
        medals: [],
      },
    ],
  },
];

const rankHierarchy = [
  { name: "Sheriff", tier: "Komuta Kadrosu", color: "sheriff-gold", icon: "⭐", description: "Departmanın en üst rütbesi. Tüm operasyonlardan sorumludur." },
  { name: "Undersheriff", tier: "Komuta Kadrosu", color: "sheriff-gold", icon: "⭐", description: "Sheriff'in yardımcısı, operasyonel yönetimden sorumlu." },
  { name: "Assistant Sheriff", tier: "Üst Düzey Komutanlar", color: "electric-blue-light", icon: "🔰", description: "Belirli birim komutanlıklarını yönetir." },
  { name: "Commander", tier: "Üst Düzey Komutanlar", color: "electric-blue-light", icon: "🔰", description: "Özel birimlerin komutanı." },
  { name: "Captain", tier: "Kıdemli Memurlar", color: "green-400", icon: "🛡️", description: "Büro ve şube yöneticisi." },
  { name: "Lieutenant", tier: "Kıdemli Memurlar", color: "green-400", icon: "🛡️", description: "Vardiya ve ekip lideri." },
  { name: "Sergeant", tier: "Kıdemli Memurlar", color: "green-400", icon: "🛡️", description: "Saha amiri, devriye ekibi sorumlusu." },
  { name: "Staff Sergeant", tier: "Kıdemli Memurlar", color: "green-400", icon: "🛡️", description: "Kıdemli saha amiri." },
  { name: "Corporal", tier: "Memurlar", color: "gray-400", icon: "📛", description: "Kıdemli memur, ekip koordinatörü." },
  { name: "Senior Deputy", tier: "Memurlar", color: "gray-400", icon: "📛", description: "Deneyimli devriye memuru." },
  { name: "Deputy", tier: "Memurlar", color: "gray-400", icon: "📛", description: "Standart devriye memuru." },
  { name: "Cadet", tier: "Memurlar", color: "gray-400", icon: "📛", description: "Eğitim aşamasındaki aday memur." },
];

const tabs = [
  {
    id: "team",
    label: "Ekibimiz",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "ranks",
    label: "Rank Sistemi",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    id: "developers",
    label: "Geliştiriciler",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

function RankSection({ tier, members, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tierColors = {
    "Komuta Kadrosu": "sheriff-gold",
    "Üst Düzey Komutanlar": "electric-blue-light",
    "Kıdemli Memurlar": "green-400",
    Memurlar: "gray-400",
  };

  const color = tierColors[tier] || "gray-400";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-12"
    >
      <div className="flex items-center gap-4 mb-6">
        <h2 className={`font-heading font-bold text-xl text-${color}`}>
          {tier}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-xs text-gray-600 font-mono">
          {members.length} Personel
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05 }}
            className="glass-card glow-border p-5 group"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center text-2xl border border-white/5 shrink-0">
                {member.badge}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-sm text-white group-hover:text-sheriff-gold transition-colors truncate">
                  {member.name}
                </h3>
                <p className={`text-xs font-medium text-${color} mb-1`}>
                  {member.rank}
                </p>
                <p className="text-[11px] text-gray-600">
                  {member.department}
                </p>

                {member.medals.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {member.medals.map((medal) => (
                      <span
                        key={medal}
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-sheriff-gold/10 text-sheriff-gold border border-sheriff-gold/20"
                      >
                        {medal}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function RankHierarchySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tierColorMap = {
    "sheriff-gold": { bg: "bg-sheriff-gold/10", border: "border-sheriff-gold/20", text: "text-sheriff-gold" },
    "electric-blue-light": { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
    "green-400": { bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-400" },
    "gray-400": { bg: "bg-gray-500/10", border: "border-gray-500/20", text: "text-gray-400" },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-heading font-bold text-xl text-white">
          Rütbe Hiyerarşisi
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-xs text-gray-600 font-mono">
          {rankHierarchy.length} Rütbe
        </span>
      </div>

      <div className="space-y-3">
        {rankHierarchy.map((rank, i) => {
          const colors = tierColorMap[rank.color] || tierColorMap["gray-400"];
          return (
            <motion.div
              key={rank.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card glow-border p-5 group hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-5">
                {/* Rank Number */}
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0">
                  <span className="text-xs font-mono text-gray-600 font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center text-xl border border-white/5 shrink-0">
                  {rank.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading font-bold text-sm text-white group-hover:text-sheriff-gold transition-colors">
                      {rank.name}
                    </h3>
                    <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>
                      {rank.tier}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{rank.description}</p>
                </div>

                {/* Hierarchy Line */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <div className={`w-2 h-2 rounded-full ${colors.bg} ${colors.border} border`} />
                  {i < rankHierarchy.length - 1 && (
                    <div className="w-8 h-px bg-white/5" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function DevelopersSection() {
  const [devs, setDevs] = useState([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    setDevs(getDevelopers());
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-heading font-bold text-xl text-electric-blue-light">
          Geliştiriciler
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        <span className="text-xs text-gray-600 font-mono">
          {devs.length} Geliştirici
        </span>
      </div>

      {devs.length === 0 ? (
        <div className="glass-card glow-border p-12 text-center">
          <svg className="w-12 h-12 text-gray-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          <p className="text-gray-600 text-sm">Henüz geliştirici eklenmemiş.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devs.map((dev, i) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card glow-border p-6 group relative overflow-hidden"
            >
              {/* Subtle glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-electric-blue/10 transition-colors" />

              <div className="relative flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric-blue/20 to-electric-blue/5 flex items-center justify-center border border-electric-blue/20 shrink-0 overflow-hidden">
                  {dev.avatarUrl ? (
                    <img src={dev.avatarUrl} alt={dev.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold text-electric-blue-light">{dev.name.charAt(0)}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-sm text-white group-hover:text-electric-blue-light transition-colors truncate">
                    {dev.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{dev.username}</p>
                  {dev.role && (
                    <span className="inline-block mt-2 text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue-light border border-electric-blue/20">
                      {dev.role}
                    </span>
                  )}
                </div>

                {/* Code icon */}
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-gray-700 group-hover:text-electric-blue/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function PersonelPage() {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-sheriff-gold mb-4">
              Departman Kadrosu
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Personel Listesi
            </h1>
            <p className="mt-6 text-gray-500 max-w-2xl">
              Departmanımızın hiyerarşik yapısı ve tüm personel bilgileri.
              Rütbe ve madalya detayları ile birlikte.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex items-center gap-2 flex-wrap"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/[0.08] text-white border border-white/10 shadow-lg shadow-black/20"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <span className={`transition-colors duration-300 ${
                  activeTab === tab.id ? "text-sheriff-gold" : "text-gray-600 group-hover:text-gray-400"
                }`}>
                  {tab.icon}
                </span>
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-sheriff-gold rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeTab === "team" && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {ranks.map((rank, i) => (
                  <RankSection
                    key={rank.tier}
                    tier={rank.tier}
                    members={rank.members}
                    index={i}
                  />
                ))}
              </motion.div>
            )}

            {activeTab === "ranks" && (
              <motion.div
                key="ranks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RankHierarchySection />
              </motion.div>
            )}

            {activeTab === "developers" && (
              <motion.div
                key="developers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DevelopersSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}
