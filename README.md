# Situs Portofolio Cyberpunk (Versi Statis)

Situs portofolio interaktif profesional dengan tema cyberpunk yang menampilkan efek neon, animasi glitch, dan elemen interaktif. Situs ini mencakup informasi profil pribadi, showcase proyek, bagian keahlian, pengakuan partner, dan pemutar musik interaktif.

## Fitur

- Desain bertema Cyberpunk dengan warna neon, efek glitch, dan UI futuristik
- Desain responsif yang terlihat bagus di semua perangkat
- Pemutar musik canggih dengan kontrol putar/jeda, volume, dan bar kemajuan
- Navigasi scrolling halus dengan elemen animasi
- UI modern dan bersih dengan estetika cyberpunk
- Efek animasi untuk pengalaman yang lebih menarik

## Cara Penggunaan

1. Buka file `index.html` di browser Anda
2. Navigasikan dengan menu di bagian atas 
3. Jelajahi berbagai bagian: Beranda, Tentang, Proyek, Keahlian, dan Partner
4. Gunakan pemutar musik di bagian bawah kanan layar

## Struktur File

```
├── index.html          # File HTML utama
├── css/
│   └── style.css       # Stylesheet situs
├── js/
│   └── script.js       # Kode JavaScript untuk interaktivitas
└── README.md           # Dokumentasi
```

## Cara Penyesuaian

### Informasi Profil

Untuk mengubah informasi profil, cari dan edit bagian berikut di `index.html`:

```html
<h1 class="hero-title glitch" data-text="Andi Cyber">Andi Cyber</h1>
<h2 class="hero-subtitle">Pengembang Digital Futuristik</h2>
```

### Proyek

Tambahkan proyek baru dengan menyalin template berikut dan menempatkannya di dalam div `projects-grid`:

```html
<div class="project-card animate-fade-in">
    <div class="project-image">
        <img src="URL_GAMBAR_ANDA" alt="Nama Proyek">
    </div>
    <div class="project-content">
        <h3 class="project-title">Nama Proyek</h3>
        <p class="project-description">Deskripsi proyek Anda.</p>
        <div class="project-tech">
            <span class="tech-tag" style="background-color: rgba(59, 130, 246, 0.1); color: rgb(59, 130, 246);">Teknologi1</span>
            <span class="tech-tag" style="background-color: rgba(34, 197, 94, 0.1); color: rgb(34, 197, 94);">Teknologi2</span>
        </div>
        <a href="#" class="project-link">Lihat Proyek</a>
    </div>
</div>
```

### Keahlian

Tambahkan keahlian baru dengan menyalin template berikut dan menempatkannya di dalam div `skills-container`:

```html
<div class="language-item animate-fade-in" style="background-color: rgba(WARNA_RGB, 0.1);">
    <div class="language-icon" style="color: rgb(WARNA_RGB);">
        <i class="CLASS_ICON_FONTAWESOME"></i>
    </div>
    <div class="language-name" style="color: rgb(WARNA_RGB);">NAMA_KEAHLIAN</div>
</div>
```

### Musik

Untuk mengubah musik latar, ubah atribut `src` pada tag audio:

```html
<audio id="audio-player" preload="metadata">
    <source id="audio-source" src="URL_FILE_AUDIO_ANDA" type="audio/mpeg">
    Browser Anda tidak mendukung pemutaran audio.
</audio>
```

## Lisensi

Kode sumber tersedia untuk penggunaan pribadi dan komersial. Kredit tidak diperlukan tetapi sangat dihargai.

---

Dibuat dengan ❤️ menggunakan HTML, CSS & JavaScript