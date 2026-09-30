// Auth utility functions using localStorage

const ADMIN_KEY = "bcso_admin_auth";
const MEMBERS_KEY = "bcso_members";
const CURRENT_USER_KEY = "bcso_current_user";
const DEVS_KEY = "bcso_developers";

// Default admin credentials
const DEFAULT_ADMIN = {
  username: "admin",
  password: "bcso2024",
};

// Default members (seeded on first load)
const DEFAULT_MEMBERS = [
  {
    id: "1",
    badgeNumber: "001",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    rank: "Sheriff",
    division: "Komuta Kadrosu",
    status: "active",
    discordId: "",
    joinDate: "2024-01-15",
    notes: "Departman Şerifi",
    password: "sheriff001",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    badgeNumber: "012",
    firstName: "Mehmet",
    lastName: "Kaya",
    rank: "Undersheriff",
    division: "Komuta Kadrosu",
    status: "active",
    discordId: "",
    joinDate: "2024-02-10",
    notes: "",
    password: "under012",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    badgeNumber: "045",
    firstName: "Emre",
    lastName: "Demir",
    rank: "Captain",
    division: "Devriye Birimi",
    status: "active",
    discordId: "",
    joinDate: "2024-03-20",
    notes: "",
    password: "cap045",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    badgeNumber: "078",
    firstName: "Ali",
    lastName: "Öztürk",
    rank: "Lieutenant",
    division: "Dedektiflik Bürosu",
    status: "inactive",
    discordId: "",
    joinDate: "2024-04-05",
    notes: "İzinli",
    password: "lt078",
    createdAt: new Date().toISOString(),
  },
];

// ─── Admin Auth ─────────────────────────────────────────────
export function loginAdmin(username, password) {
  if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
    if (typeof window !== "undefined") {
      localStorage.setItem(ADMIN_KEY, JSON.stringify({ loggedIn: true, timestamp: Date.now() }));
    }
    return true;
  }
  return false;
}

export function isAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  const data = localStorage.getItem(ADMIN_KEY);
  if (!data) return false;
  try {
    const parsed = JSON.parse(data);
    // Session expires after 4 hours
    if (Date.now() - parsed.timestamp > 4 * 60 * 60 * 1000) {
      localStorage.removeItem(ADMIN_KEY);
      return false;
    }
    return parsed.loggedIn === true;
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_KEY);
  }
}

// ─── Member Auth (for login page) ───────────────────────────
export function loginMember(badgeNumber, password) {
  const members = getMembers();
  const member = members.find(
    (m) => m.badgeNumber === badgeNumber && m.password === password && m.status === "active"
  );
  if (member) {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify({ ...member, password: undefined, loggedInAt: Date.now() })
      );
    }
    return member;
  }
  return null;
}

export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function logoutMember() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

// ─── Members CRUD ───────────────────────────────────────────
export function getMembers() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(MEMBERS_KEY);
  if (!data) {
    // Seed defaults
    localStorage.setItem(MEMBERS_KEY, JSON.stringify(DEFAULT_MEMBERS));
    return DEFAULT_MEMBERS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getMemberById(id) {
  return getMembers().find((m) => m.id === id) || null;
}

export function addMember(member) {
  const members = getMembers();
  const newMember = {
    ...member,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    createdAt: new Date().toISOString(),
  };
  members.push(newMember);
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
  return newMember;
}

export function updateMember(id, updates) {
  const members = getMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index === -1) return null;
  members[index] = { ...members[index], ...updates };
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
  return members[index];
}

export function deleteMember(id) {
  const members = getMembers().filter((m) => m.id !== id);
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(members));
  return true;
}

export function isBadgeNumberTaken(badgeNumber, excludeId = null) {
  return getMembers().some((m) => m.badgeNumber === badgeNumber && m.id !== excludeId);
}

// ─── Developers CRUD ────────────────────────────────────────
const DEFAULT_DEVS = [
  { id: "dev1", name: "Luzzysxdd", username: "@Luzzysxdd", role: "Kurucu & Geliştirici", avatarUrl: "https://github.com/Luzzysxdd.png" },
];

export function getDevelopers() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(DEVS_KEY);
  if (!data) {
    localStorage.setItem(DEVS_KEY, JSON.stringify(DEFAULT_DEVS));
    return DEFAULT_DEVS;
  }
  try { return JSON.parse(data); } catch { return []; }
}

export function addDeveloper(dev) {
  const devs = getDevelopers();
  const newDev = { ...dev, id: "dev_" + Date.now().toString(36) };
  devs.push(newDev);
  localStorage.setItem(DEVS_KEY, JSON.stringify(devs));
  return newDev;
}

export function updateDeveloper(id, updates) {
  const devs = getDevelopers();
  const i = devs.findIndex((d) => d.id === id);
  if (i === -1) return null;
  devs[i] = { ...devs[i], ...updates };
  localStorage.setItem(DEVS_KEY, JSON.stringify(devs));
  return devs[i];
}

export function deleteDeveloper(id) {
  const devs = getDevelopers().filter((d) => d.id !== id);
  localStorage.setItem(DEVS_KEY, JSON.stringify(devs));
  return true;
}

// ─── Constants ──────────────────────────────────────────────
export const RANKS = [
  "Cadet",
  "Deputy",
  "Senior Deputy",
  "Corporal",
  "Sergeant",
  "Staff Sergeant",
  "Lieutenant",
  "Captain",
  "Commander",
  "Assistant Sheriff",
  "Undersheriff",
  "Sheriff",
];

export const DIVISIONS = [
  "Komuta Kadrosu",
  "Devriye Birimi",
  "Dedektiflik Bürosu",
  "SWAT",
  "Trafik Birimi",
  "Havacılık Birimi",
  "Deniz Birimi",
  "K9 Birimi",
  "Eğitim Birimi",
];

export const STATUSES = [
  { value: "active", label: "Aktif", color: "green" },
  { value: "inactive", label: "İnaktif", color: "yellow" },
  { value: "suspended", label: "Askıya Alındı", color: "red" },
  { value: "retired", label: "Emekli", color: "gray" },
];
