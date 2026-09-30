"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.__luzzysxd_signature_logged) {
      window.__luzzysxd_signature_logged = true;
      console.log(
        "%c 🛡️ Blaine County Sheriff Office Platform %c\n%c Developed & Designed by Luzzysxdd %c\n%c GitHub: https://github.com/Luzzysxdd \n Telif Hakkı (c) 2026 Luzzysxdd. Tüm hakları saklıdır. ",
        "background: #0f172a; color: #f59e0b; font-size: 13px; font-weight: bold; padding: 6px 10px; border-radius: 4px; border: 1px solid #f59e0b;",
        "",
        "background: #1e293b; color: #38bdf8; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;",
        "",
        "color: #94a3b8; font-size: 11px; font-style: italic; line-height: 1.5;"
      );
    }
  }, []);

  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-black" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Section */}
        <div className="py-16 text-center border-b border-white/5">
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-4">
            Ekibimize Katılın
          </h3>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Blaine County Sheriff Departmanı&apos;nda kariyer fırsatlarını keşfedin ve topluma hizmet edin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/basvuru" className="btn-gold px-8 py-3">
              Başvuru Yap
            </a>
            <a href="#" className="btn-outline-blue px-8 py-3">
              Discord&apos;a Katıl
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sheriff-gold to-sheriff-gold-dark flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <span className="font-heading font-bold text-white">BCSO</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Blaine County Sheriff Office — Toplumu korumak ve adaleti sağlamak için 7/24 görev başındayız.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Anasayfa", href: "/" },
                { label: "Birimler", href: "/birimler" },
                { label: "Personel", href: "/personel" },
                { label: "Başvuru", href: "/basvuru" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-sheriff-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Kaynaklar
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Ceza Kanunu", href: "/penal-code" },
                { label: "Departman Politikaları", href: "#" },
                { label: "Eğitim Rehberi", href: "#" },
                { label: "SSS", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-sheriff-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">
              İletişim
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sheriff-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Blaine County, San Andreas
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-sheriff-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                info@bcso.site
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500">
            © 2026 Blaine County Sheriff Office. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Geliştirici & Tasarım:</span>
            <a
              href="https://github.com/Luzzysxdd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-sheriff-gold hover:text-white hover:border-sheriff-gold/50 hover:bg-sheriff-gold/10 transition-all font-semibold group"
              title="GitHub - Luzzysxdd"
            >
              <svg className="w-3.5 h-3.5 fill-current opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Luzzysxdd</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
