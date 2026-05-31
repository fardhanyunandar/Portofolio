import React, { useEffect, useRef, useState } from "react";
import {
  Github, Mail, Phone, MapPin, ExternalLink, Code2,
  Briefcase, GraduationCap, Award, ChevronRight, Menu, X,
  Linkedin, Cpu, Layers, Sparkles, Eye, Sun, Moon, Check,
} from "lucide-react";

import laporPublikImg from "./assets/LaporPublik.webp";
import wareTrackImg from "./assets/WareTrack.webp";
import dashboardInstitutImg from "./assets/Dashboard-Institut.webp";
import darulFikriDigitalImg from "./assets/Darul Fikri Digital.webp";
import darulQuranRahmanImg from "./assets/Darul Quran Rahman.webp";
import profileImg from "./assets/FardhanMaulana.webp";
import zakiPropertyImg from "./assets/zakiProperty.webp";
import absensiKuImg from "./assets/AbsensiKu.webp";

const ROLES = ["Junior Web Developer", "Python Flask Developer", "PHP Developer", "UI Enthusiast"];

const App = () => {
  // ─── UI State ───────────────────────────────────────────────
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isDark, setIsDark] = useState(true);
  const [showToast, setShowToast] = useState(false);

  // ─── Typing Animation ────────────────────────────────────────
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // ─── Animated Skill Bars ─────────────────────────────────────
  const skillsRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  // ─── Refs ────────────────────────────────────────────────────
  const drawerRef = useRef(null);
  const closeBtnRef = useRef(null);

  // ────────────────────────────────────────────────────────────
  // Effects
  // ────────────────────────────────────────────────────────────

  // Navbar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Typing animation
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        const next = current.slice(0, displayText.length - 1);
        setDisplayText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Skill bars intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSkillsVisible(true);
      },
      { threshold: 0.25 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  // Mobile menu focus trap & scroll lock
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const root = drawerRef.current;
        if (!root) return;
        const focusable = Array.from(
          root.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const current = document.activeElement;
        if (!e.shiftKey && current === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && current === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  // ────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userData.email);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // ────────────────────────────────────────────────────────────
  // Data
  // ────────────────────────────────────────────────────────────

  const userData = {
    name: "FARDHAN MAULANA YUNANDAR",
    role: "Junior Web Developer",
    location: "Tangerang, Banten",
    phone: "088214486502",
    email: "fardhanyundr@gmail.com",
    socials: {
      github: "https://github.com/fardhanyunandar",
      linkedin: "https://linkedin.com/in/fardhan-maulana-yunandar",
    },
    summary:
      "Junior Web Developer dengan latar belakang Teknik Komputer dan Jaringan serta pendidikan Pengembangan Perangkat Lunak di PeTIK YBM PLN Jombang. Berpengalaman membangun web application menggunakan Python Flask, PHP MVC, dan MySQL.",
    skills: {
      languages: [
        { name: "HTML", level: "90%", color: "bg-orange-500" },
        { name: "CSS", level: "85%", color: "bg-blue-500" },
        { name: "JavaScript", level: "80%", color: "bg-yellow-400" },
        { name: "Python Flask", level: "75%", color: "bg-blue-600" },
        { name: "PHP", level: "80%", color: "bg-indigo-500" },
        { name: "React", level: "60%", color: "bg-indigo-300" },
      ],
      tools: ["MySQL", "Git & GitHub", "Bootstrap 5", "Tailwind CSS", "RESTful API"],
      softSkills: ["Komunikatif", "Bertanggung jawab", "Disiplin", "Cepat belajar", "Manajemen waktu", "Teliti"],
    },
    projects: [
      {
        title: "Lapor Publik",
        tech: ["Python", "Flask", "MySQL", "Google Maps API"],
        description: "Sistem pelaporan masyarakat dengan GPS otomatis dan notifikasi WhatsApp real-time.",
        category: "Fullstack",
        accent: "from-blue-500 to-cyan-400",
        github: "https://github.com/fardhanyunandar/LaporPublik",
        live: null,
        image: laporPublikImg,
      },
      {
        title: "WareTrack",
        tech: ["PHP", "MVC", "MySQL"],
        description: "Manajemen inventaris gudang dengan dashboard stok real-time dan critical alert.",
        category: "System",
        accent: "from-purple-500 to-pink-400",
        github: "https://github.com/fardhanyunandar/Inventaris-Barang",
        live: null,
        image: wareTrackImg,
      },
      {
        title: "Dashboard Institut",
        tech: ["PHP", "MVC", "MySQL"],
        description: "Sistem akademik untuk pengelolaan data mahasiswa, CRUD, dan ekspor statistik.",
        category: "System",
        accent: "from-emerald-500 to-teal-400",
        github: "https://github.com/fardhanyunandar/Dasboard-Institut",
        live: null,
        image: dashboardInstitutImg,
      },
      {
        title: "Darul Fikri Digital",
        tech: ["Bootstrap 5", "JS", "AOS"],
        description: "Website profil pesantren modern multi-halaman dengan animasi interaktif.",
        category: "Landing Page",
        accent: "from-orange-500 to-yellow-400",
        github: "https://github.com/fardhanyunandar/DarulFikriDigital",
        live: "https://fardhanyunandar.github.io/DarulFikriDigital/",
        image: darulFikriDigitalImg,
      },
      {
        title: "Darul Qur'an Rahman",
        tech: ["HTML", "CSS", "JS"],
        description: "Website profil lembaga sosial dengan desain islami dan fitur donasi.",
        category: "Landing Page",
        accent: "from-blue-600 to-indigo-500",
        github: "https://github.com/fardhanyunandar/DarulQuranRahman",
        live: "https://fardhanyunandar.github.io/DarulQuranRahman/",
        image: darulQuranRahmanImg,
      },
      {
        title: "AbsensiKu",
        tech: ["Python", "Flask", "SQLite", "Flask-Login"],
        description: "Aplikasi ini adalah sistem absensi siswa berbasis web dengan fitur administrasi sekolah modern dan manajemen data yang lengkap.",
        category: "Fullstack",
        accent: "from-blue-600 to-indigo-500",
        github: "https://github.com/fardhanyunandar/AbsensiKu",
        live: null,
        image: absensiKuImg,
      },
      {
        title: "Zaki Property Group",
        tech: ["HTML", "CSS", "JS"],
        description: "Website ini merupakan platform pemasaran properti yang menawarkan jual beli dan sewa berbagai jenis properti di Indonesia.",
        category: "Landing Page",
        accent: "from-blue-600 to-indigo-500",
        github: "https://github.com/fardhanyunandar/Zaki-Property-Group",
        live: "https://zaki.santripetikjombang.com/",
        image: zakiPropertyImg,
      },
    ],
    education: [
      {
        institution: "PeTIK II YBM PLN Jombang",
        major: "Software Development",
        period: "2025 - 2026",
        desc: "Fokus pada pengembangan aplikasi web modern dan arsitektur perangkat lunak.",
      },
      {
        institution: "SMKIT Nurantika",
        major: "Teknik Komputer dan Jaringan",
        period: "2022 - 2025",
        desc: "Dasar-dasar jaringan, server, dan infrastruktur IT.",
      },
    ],
  };

  // ────────────────────────────────────────────────────────────
  // Shared class helpers (dark/light aware)
  // ────────────────────────────────────────────────────────────
  const bg = isDark ? "bg-[#0f172a]" : "bg-slate-50";
  const bgNav = isDark ? "bg-[#0f172a]/80" : "bg-white/80";
  const bgCard = isDark ? "bg-white/5" : "bg-white";
  const bgCardHover = isDark ? "hover:bg-white/[0.07]" : "hover:bg-slate-50";
  const borderCard = isDark ? "border-white/10" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";
  const bgToolTag = isDark ? "bg-[#0f172a]" : "bg-slate-100";
  const bgSkillTrack = isDark ? "bg-white/5" : "bg-slate-200";

  // ────────────────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────────────────

  return (
    <div className={`min-h-screen ${bg} ${textPrimary} font-sans selection:bg-blue-500/30 transition-colors duration-300`}>

      {/* ── Background Blurs ──────────────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px]" />
      </div>

      {/* ── Toast ─────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className={`flex items-center gap-3 px-6 py-3 ${isDark ? "bg-[#1e293b]" : "bg-white"} border ${borderCard} rounded-2xl shadow-2xl ${textPrimary} text-sm font-medium`}>
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-white" />
          </div>
          Email berhasil disalin!
        </div>
      </div>

      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? `${bgNav} backdrop-blur-xl border-b ${borderCard} py-4` : "bg-transparent py-6"
        } ${isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span className={`text-xl font-bold tracking-tight bg-gradient-to-r ${isDark ? "from-white to-slate-400" : "from-slate-900 to-slate-500"} bg-clip-text text-transparent`}>
              Fardhan<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center gap-1 ${isDark ? "bg-white/5" : "bg-slate-100"} p-1 rounded-full border ${borderCard} backdrop-blur-md`}>
            {["Profil", "Keahlian", "Proyek", "Edukasi", "Kontak"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); scrollToSection(item.toLowerCase()); }}
                className={`px-5 py-2 text-sm font-medium ${isDark ? "hover:text-white hover:bg-white/10 text-slate-400" : "hover:text-slate-900 hover:bg-white text-slate-500"} rounded-full transition-all`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right side: dark toggle + hire me + burger */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark((v) => !v)}
              aria-label="Toggle dark mode"
              className={`w-10 h-10 rounded-full ${isDark ? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200"} border flex items-center justify-center transition-all`}
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Hire Me */}
            <a
              href={`mailto:${userData.email}`}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Hire Me
            </a>

            {/* Burger */}
            <button
              className={`md:hidden ${isDark ? "text-white" : "text-slate-900"}`}
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      <div className={`md:hidden fixed inset-0 z-[60] ${isMenuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          ref={drawerRef}
          className={`absolute left-0 top-0 w-full ${isDark ? "bg-[#0f172a]" : "bg-white"} border-b ${borderCard} shadow-2xl transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <span className={`text-xl font-bold ${textPrimary}`}>Fardhan<span className="text-blue-500">.</span></span>
            <button ref={closeBtnRef} className={`${isDark ? "text-white" : "text-slate-900"} p-1`} onClick={() => setIsMenuOpen(false)}>
              <X size={28} />
            </button>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-2">
            {["Profil", "Keahlian", "Proyek", "Edukasi", "Kontak"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToSection(item.toLowerCase()); }}
                className={`px-5 py-4 rounded-2xl text-sm font-semibold ${isDark ? "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"} border transition-all active:scale-[0.98]`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section id="profil" className="relative pt-44 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
              <Sparkles size={14} /> Exploring Personal Vision
            </div>

            <h1 className={`text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter ${textPrimary}`}>
              Building Digital <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Experiences.
              </span>
            </h1>

            {/* Typing Role */}
            <div className="flex items-center gap-2 text-lg font-mono text-blue-400 h-7">
              <span className={textSecondary}>&gt;</span>
              <span>{displayText}</span>
              <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse" />
            </div>

            <p className={`text-lg md:text-xl ${textSecondary} leading-relaxed max-w-2xl`}>
              Saya <span className={`${textPrimary} font-medium`}>Fardhan Maulana</span>, seorang Junior Web Developer yang bersemangat dalam menciptakan solusi web yang efisien dan estetik. Spesialis dalam Python Flask & PHP.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); scrollToSection("proyek"); }}
                className={`group relative px-8 py-4 ${isDark ? "bg-white text-[#0f172a]" : "bg-slate-900 text-white"} rounded-2xl font-bold transition-all hover:scale-105 flex items-center gap-2`}
              >
                Lihat Proyek <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={userData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-2xl ${isDark ? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200"} border flex items-center justify-center transition-all`}
                >
                  <Github size={22} />
                </a>
                <a
                  href={userData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-2xl ${isDark ? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200"} border flex items-center justify-center transition-all`}
                >
                  <Linkedin size={22} />
                </a>
                {/* Copy email button */}
                <button
                  onClick={handleCopyEmail}
                  title="Salin email"
                  className={`w-14 h-14 rounded-2xl ${isDark ? "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200"} border flex items-center justify-center transition-all`}
                >
                  <Mail size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="lg:col-span-5 relative group">
            <div className={`relative z-10 aspect-square rounded-[3rem] ${isDark ? "bg-gradient-to-br from-white/10 to-transparent border-white/10" : "bg-gradient-to-br from-slate-200 to-transparent border-slate-200"} border p-4 backdrop-blur-sm`}>
              <div className={`w-full h-full rounded-[2.5rem] ${isDark ? "bg-[#1e293b]" : "bg-slate-100"} flex items-center justify-center overflow-hidden relative`}>
                <img src={profileImg} alt={userData.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              </div>
            </div>
            <div className="absolute inset-0 bg-blue-600/20 rounded-[3rem] blur-2xl -z-10 scale-90 group-hover:scale-100 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section id="keahlian" ref={skillsRef} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-6 tracking-tight`}>
                Keahlian & <span className="text-blue-500">Teknologi</span>
              </h2>
              <p className={textSecondary}>Berfokus pada pengembangan backend yang kuat dan antarmuka pengguna yang responsif.</p>
            </div>
            <div className="flex gap-3">
              <div className={`p-4 rounded-2xl ${bgCard} border ${borderCard} text-blue-400`}><Cpu size={32} /></div>
              <div className={`p-4 rounded-2xl ${bgCard} border ${borderCard} text-indigo-400`}><Layers size={32} /></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Skill bars */}
            <div className="space-y-8">
              <h3 className={`text-xl font-bold ${textPrimary} flex items-center gap-3`}>
                <div className="w-2 h-8 bg-blue-600 rounded-full" /> Proficiency
              </h3>
              <div className="grid gap-6">
                {userData.skills.languages.map((skill, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between mb-3">
                      <span className={`font-bold ${textSecondary} group-hover:${textPrimary} transition-colors`}>{skill.name}</span>
                      <span className="text-sm font-mono text-blue-400">{skill.level}</span>
                    </div>
                    <div className={`h-3 ${bgSkillTrack} rounded-full border ${isDark ? "border-white/5" : "border-slate-200"} p-0.5`}>
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: skillsVisible ? skill.level : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Soft Skills */}
            <div className={`${bgCard} border ${borderCard} rounded-[2.5rem] p-10`}>
              <h3 className={`text-xl font-bold ${textPrimary} mb-8`}>Ecosystem & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {userData.skills.tools.map((tool, i) => (
                  <span
                    key={i}
                    className={`px-5 py-3 rounded-2xl ${bgToolTag} border ${borderCard} ${textSecondary} hover:border-blue-500 hover:${textPrimary} transition-all`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className={`mt-12 pt-12 border-t ${isDark ? "border-white/5" : "border-slate-100"}`}>
                <h3 className={`text-xl font-bold ${textPrimary} mb-6`}>Soft Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  {userData.skills.softSkills.map((skill, i) => (
                    <div key={i} className={`flex items-center gap-2 ${textSecondary} text-sm`}>
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" /> {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────── */}
      <section id="proyek" className={`py-32 px-6 ${isDark ? "bg-white/[0.02]" : "bg-slate-100/60"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className={`text-4xl md:text-5xl font-black ${textPrimary} mb-6 tracking-tight`}>Portfolio Showcase</h2>
            <div className="flex justify-center flex-wrap gap-3">
              {["all", "System", "Fullstack", "Landing Page"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                    activeTab === tab
                      ? isDark ? "bg-white text-black border-white" : "bg-slate-900 text-white border-slate-900"
                      : isDark ? "text-slate-500 border-white/10 hover:border-white/30" : "text-slate-400 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  {tab === "all" ? "Semua" : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.projects
              .filter((p) => activeTab === "all" || p.category === activeTab)
              .map((project, idx) => (
                <div
                  key={idx}
                  className={`group ${bgCard} rounded-[2.5rem] overflow-hidden border ${borderCard} hover:border-blue-500/30 transition-all hover:-translate-y-2 flex flex-col shadow-sm`}
                >
                  <div className={`h-56 p-8 flex items-center justify-center relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${project.accent}`}>
                    {project.image && (
                      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    )}
                    <Briefcase size={80} className="text-white/20 absolute -bottom-4 -left-4 rotate-12" />
                    <div className="relative w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-white shadow-xl">
                      <Code2 size={40} />
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <span className={`px-3 py-1 ${isDark ? "bg-white/5 border-white/5" : "bg-blue-50 border-blue-100"} rounded-full text-[10px] font-bold text-blue-400 border uppercase w-fit mb-4`}>
                      {project.category}
                    </span>
                    <h3 className={`text-2xl font-bold ${textPrimary} mb-4 group-hover:text-blue-400 transition-colors`}>{project.title}</h3>
                    <p className={`${textSecondary} text-sm leading-relaxed mb-8 flex-grow`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t, i) => (
                        <span key={i} className={`text-[11px] font-mono ${textMuted}`}>#{t}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl ${isDark ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"} border text-xs font-bold transition-all`}
                      >
                        <Github size={14} /> Source
                      </a>
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                        >
                          <Eye size={14} /> Demo
                        </a>
                      ) : (
                        <div className={`flex items-center justify-center gap-2 py-3 rounded-xl ${isDark ? "bg-white/5 border-white/5 text-slate-600" : "bg-slate-50 border-slate-100 text-slate-300"} border text-xs font-bold cursor-not-allowed`}>
                          No Demo
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Education ─────────────────────────────────────────── */}
      <section id="edukasi" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className={`text-4xl font-black ${textPrimary} mb-16 tracking-tight flex items-center gap-4`}>
              Pendidikan <div className={`h-px ${isDark ? "bg-white/10" : "bg-slate-200"} flex-grow`} />
            </h2>
            <div className="space-y-12 relative">
              <div className={`absolute left-6 top-4 bottom-4 w-px ${isDark ? "bg-white/5" : "bg-slate-200"}`} />
              {userData.education.map((edu, idx) => (
                <div key={idx} className="relative pl-16 group">
                  <div className={`absolute left-0 top-0 w-12 h-12 rounded-2xl ${isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"} border flex items-center justify-center z-10 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all`}>
                    <GraduationCap size={20} className={`${textSecondary} group-hover:text-white`} />
                  </div>
                  <div className={`p-8 rounded-3xl ${bgCard} border ${borderCard} ${bgCardHover} transition-all`}>
                    <span className="text-sm font-mono text-blue-500 mb-2 block">{edu.period}</span>
                    <h3 className={`text-2xl font-bold ${textPrimary} mb-2`}>{edu.institution}</h3>
                    <p className={`text-lg ${isDark ? "text-slate-300" : "text-slate-600"} mb-4`}>{edu.major}</p>
                    <p className={`text-sm ${textMuted} leading-relaxed`}>{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="relative p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white group overflow-hidden">
              <Award size={200} className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-1000" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                  <Award size={32} />
                </div>
                <h2 className="text-4xl font-black mb-6 leading-tight">Achievement <br /> Of Excellence</h2>
                <p className="text-blue-100 text-lg mb-6 max-w-sm">Sertifikasi dan pencapaian yang menjadi bukti dedikasi saya dalam belajar dan membangun solusi digital.</p>
                <div className="p-8 rounded-[2rem] bg-black/20 backdrop-blur-md border border-white/10 space-y-6">
                  <div>
                    <p className="text-2xl font-bold mb-2">Best Web Design Award</p>
                    <p className="text-blue-300 text-sm font-mono">Final Project Web Design @ PeTIK II</p>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-xl font-bold mb-2">Belajar Dasar AI - Dicoding</p>
                    <p className="text-blue-300 text-sm font-mono">Sertifikasi Pembelajaran Dasar Kecerdasan Buatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────── */}
      <section id="kontak" className={`py-32 px-6 ${isDark ? "bg-white/[0.02]" : "bg-slate-100/60"}`}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className={`text-5xl md:text-6xl font-black ${textPrimary} mb-6 tracking-tight`}>
            Mari{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Berkolaborasi
            </span>
          </h2>
          <p className={`${textSecondary} text-lg leading-relaxed mb-16 max-w-xl mx-auto`}>
            Terbuka untuk peluang kerja, proyek freelance, maupun sekadar berdiskusi soal teknologi. Jangan ragu untuk menghubungi!
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {/* Email card */}
            <div className={`p-6 rounded-3xl ${bgCard} border ${borderCard} text-left ${bgCardHover} transition-all group`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Mail size={22} />
              </div>
              <p className={`text-xs ${textMuted} uppercase tracking-widest mb-1`}>Email</p>
              <p className={`${textPrimary} font-medium text-sm mb-4 break-all`}>{userData.email}</p>
              <button
                onClick={handleCopyEmail}
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
              >
                Salin <ExternalLink size={11} />
              </button>
            </div>

            {/* WhatsApp card */}
            <div className={`p-6 rounded-3xl ${bgCard} border ${borderCard} text-left ${bgCardHover} transition-all group`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Phone size={22} />
              </div>
              <p className={`text-xs ${textMuted} uppercase tracking-widest mb-1`}>WhatsApp</p>
              <p className={`${textPrimary} font-medium text-sm mb-4`}>{userData.phone}</p>
              <a
                href={`https://wa.me/62${userData.phone.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
              >
                Chat <ExternalLink size={11} />
              </a>
            </div>

            {/* Location card */}
            <div className={`p-6 rounded-3xl ${bgCard} border ${borderCard} text-left ${bgCardHover} transition-all group`}>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <MapPin size={22} />
              </div>
              <p className={`text-xs ${textMuted} uppercase tracking-widest mb-1`}>Lokasi</p>
              <p className={`${textPrimary} font-medium text-sm mb-4`}>{userData.location}</p>
              <span className={`text-xs ${textMuted}`}>Indonesia</span>
            </div>
          </div>

          <a
            href={`mailto:${userData.email}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105"
          >
            Kirim Email Sekarang <Mail size={20} />
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className={`py-12 border-t ${borderCard} text-center px-6`}>
        <div className="max-w-7xl mx-auto space-y-4">
          <p className={`${textSecondary} text-sm font-medium`}>
            Copyright &copy; {new Date().getFullYear()}{" "}
            <span className={textPrimary}>{userData.name}</span>. Seluruh hak cipta dilindungi undang-undang.
          </p>
          <p className={`${textMuted} text-xs leading-relaxed max-w-2xl mx-auto`}>
            Konten di situs ini tidak boleh direproduksi tanpa izin tertulis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;