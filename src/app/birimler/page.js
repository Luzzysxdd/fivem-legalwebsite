"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const divisions = [
  {
    name: "K-9 Birimi",
    code: "K9",
    description:
      "Eğitimli polis köpekleri ile uyuşturucu tespiti, iz takibi, kayıp kişi arama ve kamu güvenliği operasyonlarında görev alır. K-9 ekibimiz düzenli eğitimlerle sürekli geliştirilmektedir.",
    duties: [
      "Uyuşturucu ve patlayıcı tespiti",
      "Kayıp şahıs iz takibi",
      "Şüpheli araç aramaları",
      "Kamu düzeni operasyonları",
      "Eğitim ve sertifikasyon programları",
    ],
    stats: { members: 12, operations: 156 },
    color: "sheriff-gold",
  },
  {
    name: "Hava Destek Birimi",
    code: "AIR",
    description:
      "Helikopter ve drone operasyonları ile havadan gözetim, araç/şüpheli takibi, acil müdahale desteği ve arama-kurtarma operasyonları gerçekleştirir.",
    duties: [
      "Havadan gözetim ve takip",
      "Arama-kurtarma operasyonları",
      "Acil durum hava desteği",
      "Drone ile keşif",
      "VIP koruma eskortları",
    ],
    stats: { members: 8, operations: 89 },
    color: "electric-blue",
  },
  {
    name: "SWAT Birimi",
    code: "SWAT",
    description:
      "Yüksek riskli operasyonlar, rehine kurtarma, silahlı müdahale ve özel taktik gerektiren olaylarda görev yapar. İleri seviye taktik eğitim almış uzman kadrodan oluşur.",
    duties: [
      "Rehine kurtarma operasyonları",
      "Yüksek riskli baskınlar",
      "VIP koruma görevleri",
      "Bomba imha desteği",
      "Taktik müzakere",
    ],
    stats: { members: 8, operations: 67 },
    color: "red-500",
  },
  {
    name: "Trafik Bürosu",
    code: "TRAFFIC",
    description:
      "Yol güvenliğinin sağlanması, trafik denetimi, hız kontrolü, alkol/uyuşturucu testi ve kaza inceleme operasyonlarını yürütür.",
    duties: [
      "Trafik denetim noktaları",
      "Hız ve alkol kontrolü",
      "Kaza inceleme ve raporlama",
      "Trafik akış yönetimi",
      "Özel konvoy eskortları",
    ],
    stats: { members: 15, operations: 312 },
    color: "green-500",
  },
];

function DivisionDetail({ division, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="glass-card glow-border p-8 lg:p-10"
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <span
              className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-${division.color}/10 text-${division.color} border border-${division.color}/20`}
            >
              {division.code}
            </span>
            <h2 className="font-heading font-bold text-2xl text-white">
              {division.name}
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">
            {division.description}
          </p>

          <div className="flex gap-6 mb-6">
            <div className="glass-card px-4 py-3 text-center">
              <div className="font-heading font-bold text-xl text-sheriff-gold">
                {division.stats.members}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">
                Personel
              </div>
            </div>
            <div className="glass-card px-4 py-3 text-center">
              <div className="font-heading font-bold text-xl text-electric-blue-light">
                {division.stats.operations}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-1">
                Operasyon
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-80 shrink-0">
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">
            Görev Alanları
          </h3>
          <ul className="space-y-3">
            {division.duties.map((duty, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 text-sheriff-gold mt-0.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duty}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function BirimlerPage() {
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
              Departman Birimleri
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Özel Operasyon Birimleri
            </h1>
            <p className="mt-6 text-gray-500 max-w-2xl">
              Her biri kendi alanında uzmanlaşmış birimlerimiz, toplum güvenliğini en üst
              düzeyde sağlamak için 7/24 görev başındadır.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="gradient-line" />

      {/* Divisions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {divisions.map((div, i) => (
            <DivisionDetail key={div.code} division={div} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
