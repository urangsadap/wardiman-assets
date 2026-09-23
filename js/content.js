/* ==========================================================================
   content.js — SEMUA DATA KONTEN ADA DI SINI
   --------------------------------------------------------------------------
   Ubah teks, tambah item baru, atau ganti link cukup dengan mengedit file ini.
   Tidak perlu menyentuh index.html atau app.js.

   Tanda  ✏️ GANTI  = data placeholder yang perlu Anda isi dengan data asli.
   ========================================================================== */

const SITE = {

  /* ---------- Profil & kontak ---------- */
  profile: {
    name: "Wardiman",
    // ✏️ GANTI: foto profesional. Simpan di folder images/ lalu ubah nama file di bawah.
    // Rasio terbaik 4:5 (potret), minimal 800 × 1000 px. Format .jpg / .webp / .png / .svg
    photo: "images/wardiman-photo.svg",
    photoAlt: "Foto Wardiman",
    // ✏️ GANTI: nomor WhatsApp format internasional tanpa + dan tanpa spasi (contoh Indonesia: 6281234567890)
    whatsapp: "6281234567890",
    email: "halo@wardiman.my.id",
    // ✏️ GANTI: link "Lihat Semua Proyek" (mis. profil GitHub, Behance, atau halaman portofolio)
    allProjectsUrl: "https://github.com/"
  },

  /* ---------- Sosial media ---------- */
  // key "icon" harus salah satu: whatsapp, mail, instagram, facebook, tiktok, github
  socials: [
    { label: "WhatsApp",  icon: "whatsapp",  handle: "Chat langsung",    url: "" }, // otomatis dari nomor di atas
    { label: "Email",     icon: "mail",      handle: "halo@wardiman.my.id", url: "" }, // otomatis dari email di atas
    { label: "Instagram", icon: "instagram", handle: "@wardiman",        url: "https://instagram.com/" }, // ✏️ GANTI
    { label: "Facebook",  icon: "facebook",  handle: "Wardiman",         url: "https://facebook.com/" },  // ✏️ GANTI
    { label: "TikTok",    icon: "tiktok",    handle: "@wardiman",        url: "https://tiktok.com/" },    // ✏️ GANTI
    { label: "GitHub",    icon: "github",    handle: "wardiman",         url: "https://github.com/" }     // ✏️ GANTI
  ],

  /* ---------- Apa yang saya kerjakan ---------- */
  whatIDo: [
    { icon: "🌐", title: "Website",
      text: "Membuat website, landing page, dan platform informasi untuk personal, organisasi, lembaga, maupun usaha.",
      tags: ["Landing page", "Company profile", "Blog"] },
    { icon: "💻", title: "Web Application",
      text: "Mengembangkan aplikasi berbasis web untuk membantu pekerjaan administratif dan kebutuhan tertentu.",
      tags: ["Absensi", "Pendataan", "Dashboard"] },
    { icon: "🤖", title: "AI & Automation",
      text: "Mengeksplorasi penggunaan AI untuk mempercepat pekerjaan, membuat konten, dan membangun solusi digital.",
      tags: ["Prompting", "Konten", "Workflow"] },
    { icon: "📚", title: "Digital Product",
      text: "Mengembangkan ebook, template, course, dan produk digital yang bisa digunakan untuk belajar maupun bekerja.",
      tags: ["Ebook", "Template", "Course"] }
  ],

  /* ---------- Proyek ---------- */
  // Untuk mengganti gambar: taruh screenshot asli di folder images/ lalu ubah "cover" dan "gallery".
  // Kalau "link" dikosongkan, tombol "Kunjungi proyek" di jendela detail otomatis disembunyikan.
  // Teks problem / solution / result di bawah adalah DRAF umum — ✏️ GANTI dengan cerita asli Anda.
  projects: [
    {
      id: "mathlaul-anwar-jateng",
      title: "Mathla'ul Anwar Jawa Tengah",
      categories: ["Web Design", "Organization", "Information System"],
      summary: "Website informasi organisasi dan berbagai program Mathla'ul Anwar Jawa Tengah.",
      cover: "images/project-1-cover.svg",
      coverAlt: "Tampilan halaman depan website Mathla'ul Anwar Jawa Tengah",
      problem: "Informasi organisasi dan program kerja tersebar di banyak tempat, sehingga pengurus dan masyarakat sulit menemukan informasi yang mereka butuhkan.",
      solution: "Satu website resmi yang merapikan profil organisasi, program, dan kabar terbaru dalam tampilan yang jelas dan mudah dibuka dari ponsel.",
      technology: ["HTML", "CSS", "JavaScript"],
      role: "Perancang dan pengembang website",
      result: "Organisasi memiliki rumah informasi digital yang bisa diakses kapan saja.",
      link: "", // ✏️ GANTI: alamat website proyek
      gallery: ["images/project-1-gallery-1.svg", "images/project-1-gallery-2.svg"]
    },
    {
      id: "si-halal-mathlaul-anwar",
      title: "Si Halal Mathla'ul Anwar",
      categories: ["Website", "Digital Platform"],
      summary: "Platform informasi dan layanan yang dikembangkan untuk mendukung program halal Mathla'ul Anwar.",
      cover: "images/project-2-cover.svg",
      coverAlt: "Tampilan platform Si Halal Mathla'ul Anwar",
      problem: "Informasi dan layanan program halal belum punya satu pintu masuk yang jelas bagi pelaku usaha dan masyarakat.",
      solution: "Platform digital yang menyatukan informasi program dan alur layanan halal dalam satu tempat.",
      technology: ["HTML", "CSS", "JavaScript"],
      role: "Perancang dan pengembang platform",
      result: "Informasi program halal lebih mudah diakses dan dipahami.",
      link: "",
      gallery: ["images/project-2-gallery-1.svg", "images/project-2-gallery-2.svg"]
    },
    {
      id: "aplikasi-absensi-guru",
      title: "Aplikasi Absensi Guru",
      categories: ["Web App", "Firebase", "QR Code"],
      summary: "Aplikasi absensi berbasis QR Code dan lokasi untuk membantu pencatatan kehadiran guru.",
      cover: "images/project-3-cover.svg",
      coverAlt: "Tampilan aplikasi absensi guru berbasis QR Code",
      problem: "Pencatatan kehadiran guru secara manual memakan waktu dan rawan salah catat.",
      solution: "Absensi lewat pemindaian QR Code yang dicocokkan dengan lokasi, dengan data tersimpan di Firebase.",
      technology: ["JavaScript", "Firebase", "QR Code", "Geolocation"],
      role: "Perancang dan pengembang aplikasi",
      result: "Rekap kehadiran lebih rapi dan tidak perlu lagi dicatat manual.",
      link: "",
      gallery: ["images/project-3-gallery-1.svg", "images/project-3-gallery-2.svg"]
    },
    {
      id: "sadapixel",
      title: "Sadapixel",
      categories: ["Branding", "Digital Business"],
      summary: "Konsep brand digital yang menggabungkan layanan printing, website, dan produk digital.",
      cover: "images/project-4-cover.svg",
      coverAlt: "Tampilan konsep brand Sadapixel",
      problem: "Layanan printing, website, dan produk digital berjalan sendiri-sendiri tanpa identitas yang menyatukan.",
      solution: "Satu brand digital dengan identitas visual dan struktur layanan yang konsisten.",
      technology: ["Canva", "Branding", "Landing page"],
      role: "Pembuat konsep brand dan visual",
      result: "Layanan yang tersebar kini punya satu identitas yang mudah dikenali.",
      link: "",
      gallery: ["images/project-4-gallery-1.svg", "images/project-4-gallery-2.svg"]
    }
  ],

  /* ---------- Sedang saya kerjakan ---------- */
  // status: "building" (hijau) | "exploring" (kuning) | "planning" (biru) | "done" (abu-abu)
  building: [
    { title: "Teacher Attendance App", note: "Pengembangan absensi guru berbasis QR Code dan lokasi.", status: "building", updated: "Diperbarui bulan ini" },
    { title: "AI Content Workflow",    note: "Mencari alur kerja AI untuk membuat konten lebih cepat.", status: "exploring", updated: "Masih bereksperimen" },
    { title: "Digital Product Platform", note: "Tempat menampilkan dan menjual produk digital.", status: "planning", updated: "Tahap perencanaan" }
  ],
  statusLabels: {
    building:  "Building",
    exploring: "Exploring",
    planning:  "Planning",
    done:      "Selesai"
  },

  /* ---------- Tools & Skills ---------- */
  skills: [
    { group: "Web",             items: ["HTML", "CSS", "JavaScript", "Firebase", "Blogger"] },
    { group: "Design",          items: ["Canva", "UI Design", "Branding", "Digital Design"] },
    { group: "AI",              items: ["AI Tools", "Prompt Engineering", "AI Content Creation", "AI-assisted Development"] },
    { group: "Digital Product", items: ["Ebook", "Landing Page", "Online Course", "Digital Marketing"] }
  ],

  /* ---------- Layanan ---------- */
  services: [
    { title: "Website",
      text: "Website personal, lembaga, organisasi, UMKM, dan landing page." },
    { title: "Aplikasi Web",
      text: "Sistem sederhana untuk administrasi, pendataan, absensi, dan kebutuhan internal." },
    { title: "Digital Product",
      text: "Ebook, template, materi pembelajaran, dan produk digital." },
    { title: "AI & Digital Workflow",
      text: "Membantu menemukan cara menggunakan AI untuk membuat pekerjaan lebih cepat dan efisien." }
  ],

  /* ---------- Produk digital ---------- */
  // Produk unggulan (featured: true) tampil besar. Produk lain otomatis masuk daftar di bawahnya.
  products: [
    {
      featured: true,
      type: "Ebook",
      title: "CARA CEPAT NAMBAH INCOME",
      text: "Panduan praktis untuk menemukan peluang tambahan penghasilan dengan memanfaatkan kemampuan dan aset yang sudah dimiliki.",
      link: "" // ✏️ GANTI: link halaman produk / checkout. Kosong = tombol menuju form kontak.
    }
    // Contoh menambah produk baru (hapus tanda komentar):
    // , { type: "Template", title: "Template Absensi", text: "Deskripsi singkat.", link: "https://..." }
  ],
  // Jenis produk yang sedang disiapkan. status: "ready" jika sudah ada, "soon" jika belum.
  productTypes: [
    { icon: "📘", label: "Ebook",         status: "ready" },
    { icon: "🧩", label: "Template",      status: "soon" },
    { icon: "💻", label: "Web App",       status: "soon" },
    { icon: "🎓", label: "Online Course", status: "soon" },
    { icon: "🛠️", label: "Tools",         status: "soon" }
  ],

  /* ---------- Wardiman Lab ---------- */
  lab: [
    { icon: "🧪", title: "Web Experiments", text: "Eksperimen UI, website, landing page, dan aplikasi web.",
      latest: "Mencoba layout baru untuk halaman portofolio" },
    { icon: "🤖", title: "AI Experiments", text: "Eksperimen menggunakan AI untuk pekerjaan dan pembuatan konten.",
      latest: "Menguji alur prompt untuk draf konten" },
    { icon: "⚙️", title: "Automation", text: "Eksperimen membuat pekerjaan yang berulang menjadi lebih sederhana.",
      latest: "Merapikan proses rekap data yang berulang" },
    { icon: "💡", title: "Random Ideas", text: "Tempat menyimpan ide-ide digital yang mungkin suatu hari menjadi proyek nyata.",
      latest: "Daftar ide yang menunggu giliran" }
  ],

  /* ---------- Catatan / artikel ---------- */
  // Tombol filter hanya muncul untuk kategori yang sudah punya artikel.
  articleCategories: ["Semua", "Teknologi", "AI", "Website", "Digital Product", "Tutorial", "Catatan"],
  // date format YYYY-MM-DD. Kalau "url" diisi, tombol "Baca" membuka link itu (mis. artikel di Blogger).
  // Kalau kosong, tombol membuka ringkasan artikel.
  articles: [
    { title: "Cara Membuat Website Sederhana dengan HTML", category: "Tutorial", icon: "🧱", date: "2026-09-14",
      excerpt: "Langkah awal membuat halaman web pertama: struktur dasar HTML, teks, gambar, dan link.", url: "" },
    { title: "Mencoba Membuat Aplikasi Absensi Guru Berbasis QR", category: "Website", icon: "📲", date: "2026-09-07",
      excerpt: "Catatan proses membuat absensi dengan QR Code dan lokasi, dari ide sampai bisa dipakai.", url: "" },
    { title: "Bagaimana AI Membantu Pekerjaan Sehari-hari?", category: "AI", icon: "🤖", date: "2026-08-30",
      excerpt: "Contoh nyata memakai AI untuk menulis draf, merapikan ide, dan mempercepat pekerjaan rutin.", url: "" },
    { title: "Dari Ide Menjadi Produk Digital", category: "Digital Product", icon: "📦", date: "2026-08-22",
      excerpt: "Tahapan sederhana mengubah ide menjadi ebook atau template yang bisa dipakai orang lain.", url: "" },
    { title: "Belajar Membuat Website Tanpa Harus Menjadi Programmer", category: "Catatan", icon: "🌱", date: "2026-08-15",
      excerpt: "Anda tidak perlu jago coding untuk mulai. Ini alat dan cara belajar yang saya rekomendasikan.", url: "" }
  ],

  /* ---------- Perjalanan (timeline) ---------- */
  // ✏️ GANTI: isi dengan perjalanan Anda yang sebenarnya. Kolom "period" bebas: tahun, "Awal", "Kini", dll.
  timeline: [
    { period: "Awal", title: "Mulai tertarik pada website",
      text: "Belajar dasar HTML dan CSS, lalu membuat halaman-halaman sederhana." },
    { period: "Berkembang", title: "Membuat proyek untuk organisasi",
      text: "Membangun website dan platform informasi untuk lembaga dan organisasi." },
    { period: "Berkembang", title: "Membuat aplikasi web",
      text: "Mengembangkan aplikasi absensi berbasis QR Code, lokasi, dan Firebase." },
    { period: "Kini", title: "Menggabungkan web, AI, dan produk digital",
      text: "Mengeksplorasi AI, membuat produk digital, dan mendokumentasikannya di sini." },
    { period: "2026", title: "wardiman.my.id hadir",
      text: "Rumah digital pribadi untuk karya, eksperimen, dan catatan belajar." }
  ],

  /* ---------- Topik pada form kontak ---------- */
  contactTopics: ["Website", "Aplikasi Web", "Produk Digital", "AI & Digital Workflow", "Lainnya"]
};
