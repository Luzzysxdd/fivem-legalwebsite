"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isAdminLoggedIn, logoutAdmin, getMembers, addMember, updateMember, deleteMember, getDevelopers, addDeveloper, updateDeveloper, deleteDeveloper, STATUSES } from "@/lib/auth";
import AdminLogin from "@/components/admin/AdminLogin";
import MemberModal from "@/components/admin/MemberModal";
import DevModal from "@/components/admin/DevModal";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { id: "members", label: "Üyeler", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" },
  { id: "devs", label: "Geliştiriciler", icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [members, setMembers] = useState([]);
  const [devs, setDevs] = useState([]);
  const [search, setSearch] = useState("");
  const [memberModal, setMemberModal] = useState(null); // null=closed, {}=new, {member}=edit
  const [devModal, setDevModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sideOpen, setSideOpen] = useState(true);

  useEffect(() => {
    setAuthed(isAdminLoggedIn());
    if (isAdminLoggedIn()) {
      setMembers(getMembers());
      setDevs(getDevelopers());
    }
  }, []);

  const refresh = () => { setMembers(getMembers()); setDevs(getDevelopers()); };

  if (!authed) return <AdminLogin onSuccess={() => { setAuthed(true); refresh(); }} />;

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    inactive: members.filter((m) => m.status !== "active").length,
  };

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    return !q || m.firstName.toLowerCase().includes(q) || m.lastName.toLowerCase().includes(q) || m.badgeNumber.includes(q) || m.rank.toLowerCase().includes(q);
  });

  const statusColor = (s) => {
    const map = { active: "bg-green-500", inactive: "bg-yellow-500", suspended: "bg-red-500", retired: "bg-gray-500" };
    return map[s] || "bg-gray-500";
  };

  const handleSaveMember = (data) => {
    if (memberModal?.id) { updateMember(memberModal.id, data); }
    else { addMember(data); }
    refresh(); setMemberModal(null);
  };

  const handleDeleteMember = (id) => { deleteMember(id); refresh(); setDeleteConfirm(null); };

  const handleSaveDev = (data) => {
    if (devModal?.id) { updateDeveloper(devModal.id, data); }
    else { addDeveloper(data); }
    refresh(); setDevModal(null);
  };

  const handleDeleteDev = (id) => { deleteDeveloper(id); refresh(); setDeleteConfirm(null); };

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className={`${sideOpen ? "w-64" : "w-16"} transition-all duration-300 bg-[#0a0a0a] border-r border-white/5 flex flex-col flex-shrink-0`}>
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sheriff-gold to-sheriff-gold-dark flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          {sideOpen && <span className="font-heading font-bold text-sm text-white truncate">BCSO Admin</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${tab === t.id ? "bg-sheriff-gold/10 text-sheriff-gold border border-sheriff-gold/20" : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]"}`}>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              {sideOpen && <span className="font-medium">{t.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-white/5 space-y-1">
          <button onClick={() => setSideOpen(!sideOpen)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] transition-all">
            <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${sideOpen ? "" : "rotate-180"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
            {sideOpen && <span className="font-medium">Daralt</span>}
          </button>
          <button onClick={() => { logoutAdmin(); setAuthed(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            {sideOpen && <span className="font-medium">Çıkış</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl">
          <AnimatePresence mode="wait">
            {/* ─── Dashboard ─── */}
            {tab === "dashboard" && (
              <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading font-bold text-2xl text-white mb-1">Dashboard</h1>
                <p className="text-sm text-gray-500 mb-8">BCSO departman genel durumu</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Toplam Personel", value: stats.total, color: "from-sheriff-gold/20 to-sheriff-gold/5", border: "border-sheriff-gold/20", text: "text-sheriff-gold" },
                    { label: "Aktif Personel", value: stats.active, color: "from-green-500/20 to-green-500/5", border: "border-green-500/20", text: "text-green-400" },
                    { label: "İnaktif / Diğer", value: stats.inactive, color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/20", text: "text-orange-400" },
                  ].map((s, i) => (
                    <div key={i} className={`rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} p-5`}>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{s.label}</p>
                      <p className={`font-heading font-bold text-3xl ${s.text}`}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Recent members */}
                <h2 className="font-heading font-bold text-base text-white mb-4">Son Eklenen Personel</h2>
                <div className="space-y-2">
                  {members.slice(-5).reverse().map((m) => (
                    <div key={m.id} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className={`w-2 h-2 rounded-full ${statusColor(m.status)}`} />
                      <span className="font-mono text-xs text-sheriff-gold w-12">#{m.badgeNumber}</span>
                      <span className="text-sm text-white flex-1">{m.firstName} {m.lastName}</span>
                      <span className="text-xs text-gray-500">{m.rank}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ─── Members ─── */}
            {tab === "members" && (
              <motion.div key="members" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <h1 className="font-heading font-bold text-2xl text-white mb-1">Üye Yönetimi</h1>
                    <p className="text-sm text-gray-500">{members.length} kayıtlı personel</p>
                  </div>
                  <button onClick={() => setMemberModal({})} className="btn-gold text-xs px-5 py-2.5">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Yeni Üye
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative max-w-md">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="İsim, rozet no veya rütbe ara..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white placeholder-gray-600 focus:outline-none focus:border-sheriff-gold/30 transition-all" />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                        <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Rozet</th>
                        <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">İsim</th>
                        <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Rütbe</th>
                        <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Birim</th>
                        <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        <th className="text-left px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Şifre</th>
                        <th className="text-right px-4 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((m) => (
                        <tr key={m.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-sheriff-gold">#{m.badgeNumber}</td>
                          <td className="px-4 py-3 text-white font-medium">{m.firstName} {m.lastName}</td>
                          <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{m.rank}</td>
                          <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{m.division}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${m.status === "active" ? "bg-green-500/10 text-green-400" : m.status === "suspended" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusColor(m.status)}`} />
                              {STATUSES.find((s) => s.value === m.status)?.label || m.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-500 hidden lg:table-cell">{m.password}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => setMemberModal(m)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-sheriff-gold transition-colors" title="Düzenle">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                                </svg>
                              </button>
                              <button onClick={() => setDeleteConfirm({ type: "member", id: m.id, name: `${m.firstName} ${m.lastName}` })} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors" title="Sil">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-600 text-sm">Sonuç bulunamadı.</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ─── Developers ─── */}
            {tab === "devs" && (
              <motion.div key="devs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div>
                    <h1 className="font-heading font-bold text-2xl text-white mb-1">Geliştiriciler</h1>
                    <p className="text-sm text-gray-500">Site geliştiricilerini yönetin — footer&apos;da görünür</p>
                  </div>
                  <button onClick={() => setDevModal({})} className="inline-flex items-center px-5 py-2.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider text-white" style={{ background: "linear-gradient(135deg, #3b82f6, #60a5fa, #3b82f6)" }}>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Geliştirici Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {devs.map((d) => (
                    <div key={d.id} className="glass-card p-5 relative group">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent" />
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {d.avatarUrl ? (
                            <img src={d.avatarUrl} alt={d.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-heading font-bold text-xl text-gray-600">{d.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-heading font-bold text-white truncate">{d.name}</p>
                          <p className="text-xs text-gray-500">{d.username}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-electric-blue/10 text-[10px] font-medium text-electric-blue-light">{d.role}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setDevModal(d)} className="flex-1 py-1.5 rounded-lg bg-white/5 text-xs text-gray-400 hover:text-white transition-colors">Düzenle</button>
                        <button onClick={() => setDeleteConfirm({ type: "dev", id: d.id, name: d.name })} className="py-1.5 px-3 rounded-lg bg-red-500/5 text-xs text-red-400/60 hover:text-red-400 transition-colors">Sil</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      {memberModal !== null && (
        <MemberModal member={memberModal?.id ? memberModal : null} onSave={handleSaveMember} onClose={() => setMemberModal(null)} />
      )}
      {devModal !== null && (
        <DevModal dev={devModal?.id ? devModal : null} onSave={handleSaveDev} onClose={() => setDevModal(null)} />
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()} className="glass-card p-6 max-w-sm w-full text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-white mb-1">Silme Onayı</h3>
              <p className="text-sm text-gray-400 mb-6"><span className="text-white font-medium">{deleteConfirm.name}</span> silinecek. Bu işlem geri alınamaz.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400">İptal</button>
                <button onClick={() => deleteConfirm.type === "member" ? handleDeleteMember(deleteConfirm.id) : handleDeleteDev(deleteConfirm.id)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-sm text-red-400 font-medium hover:bg-red-500/30 transition-colors">Sil</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
