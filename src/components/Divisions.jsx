"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const divisions = [
  {
    name: "K-9 Birimi",
    code: "K9",
    description:
      "Eğitimli polis köpekleri ile uyuşturucu tespiti, iz takibi ve kamu güvenliği operasyonlarında görev alır.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
      </svg>
    ),
    stats: "12 Aktif Tim",
    color: "from-amber-500/20 to-amber-600/5",
  },
  {
    name: "Hava Destek",
    code: "AIR",
    description:
      "Helikopter ve drone operasyonları ile havadan gözetim, takip ve acil müdahale desteği sağlar.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    stats: "3 Helikopter",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    name: "SWAT Birimi",
    code: "SWAT",
    description:
      "Yüksek riskli operasyonlar, rehine kurtarma ve özel müdahale gerektiren olaylarda görev yapar.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    stats: "8 Operatör",
    color: "from-red-500/20 to-red-600/5",
  },
  {
    name: "Trafik Bürosu",
    code: "TRAFFIC",
    description:
      "Yol güvenliği, trafik denetimi, hız kontrolü ve kaza inceleme operasyonlarını yürütür.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    stats: "15 Araç",
    color: "from-green-500/20 to-green-600/5",
  },
];

export default function Divisions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="divisions" className="relative py-24 lg:py-32" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sheriff-gold/3 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-electric-blue/3 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-sheriff-gold mb-4">
            Birimlerimiz
          </span>
          <h2 className="section-title mx-auto text-center after:left-1/2 after:-translate-x-1/2">
            Özel Operasyon Birimleri
          </h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto">
            Her biri kendi alanında uzmanlaşmış, profesyonel ekiplerimizle toplum güvenliğini sağlıyoruz.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div, i) => (
            <DivisionCard key={div.code} division={div} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionCard({ division, index, isInView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass-card glow-border p-8 cursor-pointer group"
    >
      <div className="flex items-start gap-6">
        {/* Icon */}
        <div
          className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${division.color} flex items-center justify-center text-white/80 group-hover:text-sheriff-gold transition-colors duration-300 border border-white/5`}
        >
          {division.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-heading font-bold text-lg text-white group-hover:text-sheriff-gold transition-colors">
              {division.name}
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-gray-500 border border-white/5">
              {division.code}
            </span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            {division.description}
          </p>

          {/* Expandable content */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={hovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-sheriff-gold font-medium">
                {division.stats}
              </span>
              <a
                href="/birimler"
                className="text-xs text-electric-blue-light hover:text-white transition-colors flex items-center gap-1"
              >
                Detaylı Bilgi
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
