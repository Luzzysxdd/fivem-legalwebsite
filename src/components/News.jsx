"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const newsItems = [
  {
    category: "Operasyon",
    title: "Büyük Uyuşturucu Operasyonu Başarıyla Tamamlandı",
    excerpt:
      "K-9 birimimiz ve SWAT ekibinin koordineli çalışmasıyla Sandy Shores bölgesinde büyük bir uyuşturucu ağı çökertildi.",
    date: "25 Nisan 2026",
    tag: "Acil",
    tagColor: "bg-red-500/20 text-red-400",
  },
  {
    category: "Duyuru",
    title: "Yeni Dönem Başvuruları Açıldı",
    excerpt:
      "Blaine County Sheriff Departmanı olarak yeni dönem alımlarımız başlamıştır. Başvuru formunu doldurarak hemen başvurabilirsiniz.",
    date: "22 Nisan 2026",
    tag: "Yeni",
    tagColor: "bg-green-500/20 text-green-400",
  },
  {
    category: "Eğitim",
    title: "İleri Seviye Taktik Eğitimi Tamamlandı",
    excerpt:
      "SWAT birimimiz, 2 haftalık ileri seviye taktik eğitimini başarıyla tamamladı. Yeni taktik protokoller uygulamaya alındı.",
    date: "18 Nisan 2026",
    tag: "Eğitim",
    tagColor: "bg-blue-500/20 text-blue-400",
  },
  {
    category: "Toplum",
    title: "Toplum Güvenliği Bilgilendirme Toplantısı",
    excerpt:
      "Vatandaşlarla iş birliği kapsamında toplum güvenliği bilgilendirme toplantımız Paleto Bay'de gerçekleştirildi.",
    date: "15 Nisan 2026",
    tag: "Etkinlik",
    tagColor: "bg-purple-500/20 text-purple-400",
  },
];

export default function News() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="news" className="relative py-24 lg:py-32" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-blue/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-sheriff-gold mb-4">
              Son Gelişmeler
            </span>
            <h2 className="section-title">
              Haberler & Duyurular
            </h2>
          </div>
          <a
            href="#"
            className="hidden md:flex items-center gap-2 text-sm text-gray-500 hover:text-sheriff-gold transition-colors"
          >
            Tümünü Gör
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card glow-border p-6 group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
                <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white group-hover:text-sheriff-gold transition-colors mb-3 leading-tight">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                {item.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <time className="text-xs text-gray-600">{item.date}</time>
                <span className="text-xs text-electric-blue-light group-hover:text-white transition-colors flex items-center gap-1">
                  Devamını Oku
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
