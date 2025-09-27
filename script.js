/* ==================== KELAS UTAMA KARTU DIGITAL ==================== */
class DigitalBusinessCard {
    constructor() {
        // ==================== ELEMENT DOM ====================
        this.card = document.getElementById('businessCard');
        this.flipBtn = document.getElementById('flipBtn');
        this.whatsappBtn = document.getElementById('whatsappBtn');
        this.emailBtn = document.getElementById('emailBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.loading = document.getElementById('loading');
        
        this.isFlipped = false;
        
        this.init();
    }
    
    /* ==================== INISIALISASI APLIKASI ==================== */
    init() {
        // Event listeners
        this.flipBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.flipCard();
        });
        
        this.card.addEventListener('click', (e) => {
            e.stopPropagation();
            this.flipCard();
        });
        
        this.whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.shareOnWhatsApp();
        });
        
        this.emailBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.sendEmail();
        });
        
        this.downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.downloadCard();
        });
        
        this.preloadImages();
        this.updateFlipButtonText();
    }
    
    /* ==================== FUNGSI BALIK KARTU ==================== */
    flipCard() {
        this.isFlipped = !this.isFlipped;
        this.card.classList.toggle('flipped', this.isFlipped);
        this.updateFlipButtonText();
    }
    
    /* ==================== UPDATE TEKS TOMBOL BALIK ==================== */
    updateFlipButtonText() {
        const icon = this.flipBtn.querySelector('i');
        const textSpan = this.flipBtn.querySelector('span');
        
        if (this.isFlipped) {
            icon.className = 'fas fa-undo';
            textSpan.textContent = 'Putar Kartu';
        } else {
            icon.className = 'fas fa-sync-alt';
            textSpan.textContent = 'Putar Kartu';
        }
    }
    
    /* ==================== FUNGSI WHATSAPP ==================== */
    shareOnWhatsApp() {
        const phoneNumber = "6281282183532";
        const message = "";
        
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    
    /* ==================== FUNGSI EMAIL YANG DIPERBAIKI ==================== */
    sendEmail() {
        const emailAddress = "richopujaperkasa@gmail.com";
        const subject = "";
        const body = ``;

        // Encode komponen URL
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);
        const mailtoLink = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
        
        console.log('Membuka email client:', mailtoLink);
        
        // Method 1: Direct window location (paling reliable)
        try {
            window.location.href = mailtoLink;
            return;
        } catch (error) {
            console.log('Method 1 gagal, mencoba method 2:', error);
        }
        
        // Method 2: Create anchor element
        try {
            const anchor = document.createElement('a');
            anchor.href = mailtoLink;
            anchor.style.display = 'none';
            anchor.target = '_blank';
            
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            
            // Hapus element setelah 1 detik
            setTimeout(() => {
                if (anchor.parentNode) {
                    anchor.parentNode.removeChild(anchor);
                }
            }, 1000);
            
            return;
        } catch (error) {
            console.log('Method 2 gagal, mencoba method 3:', error);
        }
        
        // Method 3: Window open
        try {
            const emailWindow = window.open(mailtoLink, '_blank');
            if (!emailWindow) {
                throw new Error('Popup diblokir');
            }
            return;
        } catch (error) {
            console.log('Method 3 gagal:', error);
        }
        
        // Method 4: Fallback - show email address
        this.showEmailFallback(emailAddress);
    }
    
    /* ==================== FALLBACK JIKA EMAIL CLIENT TIDAK BISA DIBUKA ==================== */
    showEmailFallback(emailAddress) {
        const fallbackHTML = `
            <div id="emailFallback" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                z-index: 10000;
                text-align: center;
                color: #001B24;
                max-width: 90%;
                width: 400px;
            ">
                <h3 style="margin-bottom: 15px; color: #B99362;">Email Client Tidak Terdeteksi</h3>
                <p>Silakan copy email address berikut ke aplikasi email Anda:</p>
                <div style="
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 5px;
                    margin: 15px 0;
                    font-family: monospace;
                    font-size: 1.1em;
                    word-break: break-all;
                ">${emailAddress}</div>
                <button onclick="document.getElementById('emailFallback').remove()" style="
                    background: #B99362;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 5px;
                ">Tutup</button>
                <button onclick="this.copyEmail('${emailAddress}')" style="
                    background: #001B24;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 5px;
                ">Copy Email</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', fallbackHTML);
        
        // Tambahkan fungsi copy ke window object
        window.copyEmail = function(email) {
            navigator.clipboard.writeText(email).then(() => {
                alert('Email berhasil disalin: ' + email);
            }).catch(() => {
                // Fallback untuk browser lama
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Email berhasil disalin: ' + email);
            });
        };
    }
    
    /* ==================== FUNGSI SIMPAN/UNDUH KARTU ==================== */
    async downloadCard() {
        this.setDownloadButtonState(true);
        this.showLoading(true);
        
        try {
            const imageFile = this.isFlipped ? 
                'img/card-back-ericho-agil-nugraha-pt-puja-perkasa.png' : 
                'img/card-front-ericho-agil-nugraha-pt-puja-perkasa.png';
            
            await this.downloadOriginalImage(imageFile);
            
        } catch (error) {
            console.error('Error downloading image:', error);
            this.showError('Gagal mengunduh gambar. Silakan coba lagi.');
        } finally {
            this.showLoading(false);
            this.setDownloadButtonState(false);
        }
    }
    
    /* ==================== DOWNLOAD GAMBAR ASLI ==================== */
    async downloadOriginalImage(imagePath) {
        try {
            const response = await fetch(imagePath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const blob = await response.blob();
            
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const side = this.isFlipped ? 'belakang' : 'depan';
            const filename = `kartu-nama-${side}-${timestamp}.png`;
            
            this.downloadBlob(blob, filename);
            
        } catch (error) {
            console.warn('Gagal fetch gambar asli, menggunakan html2canvas fallback:', error);
            await this.downloadWithHtml2Canvas();
        }
    }
    
    /* ==================== FALLBACK DENGAN HTML2CANVAS ==================== */
    async downloadWithHtml2Canvas() {
        const cardElement = this.isFlipped ? 
            this.card.querySelector('.card-back') : 
            this.card.querySelector('.card-front');
        
        const originalImage = new Image();
        const imagePath = this.isFlipped ? 
            'img/card-back-ericho-agil-nugraha-pt-puja-perkasa.png' : 
            'img/card-front-ericho-agil-nugraha-pt-puja-perkasa.png';
        
        return new Promise((resolve, reject) => {
            originalImage.onload = async () => {
                try {
                    const naturalWidth = originalImage.naturalWidth;
                    const naturalHeight = originalImage.naturalHeight;
                    
                    const canvas = await html2canvas(cardElement, {
                        scale: Math.max(2, naturalWidth / cardElement.offsetWidth),
                        useCORS: true,
                        allowTaint: false,
                        backgroundColor: null,
                        logging: false,
                        width: naturalWidth,
                        height: naturalHeight
                    });
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                            const side = this.isFlipped ? 'belakang' : 'depan';
                            const filename = `kartu-nama-${side}-${timestamp}.png`;
                            this.downloadBlob(blob, filename);
                            resolve();
                        } else {
                            reject(new Error('Gagal membuat blob'));
                        }
                    }, 'image/png', 1.0);
                    
                } catch (error) {
                    reject(error);
                }
            };
            
            originalImage.onerror = () => reject(new Error('Gagal memuat gambar asli'));
            originalImage.src = imagePath;
        });
    }
    
    /* ==================== FUNGSI UNTUK MENGATUR STATE TOMBOL DOWNLOAD ==================== */
    setDownloadButtonState(isLoading) {
        const icon = this.downloadBtn.querySelector('i');
        const textSpan = this.downloadBtn.querySelector('span');
        
        if (isLoading) {
            this.downloadBtn.disabled = true;
            icon.className = 'fas fa-spinner fa-spin';
            textSpan.textContent = 'Memproses...';
        } else {
            this.downloadBtn.disabled = false;
            icon.className = 'fas fa-download';
            textSpan.textContent = 'Unduh';
        }
    }
    
    /* ==================== FUNGSI UNDUH FILE ==================== */
    downloadBlob(blob, filename) {
        if (!blob) {
            this.showError('Gagal membuat file unduhan.');
            return;
        }
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    
    /* ==================== FUNGSI LOADING INDICATOR ==================== */
    showLoading(show) {
        if (show) {
            this.loading.classList.add('active');
        } else {
            this.loading.classList.remove('active');
        }
    }
    
    /* ==================== FUNGSI UNTUK MENAMPILKAN ERROR ==================== */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    /* ==================== PRELOAD GAMBAR ==================== */
    preloadImages() {
        const images = [
            'img/card-front-ericho-agil-nugraha-pt-puja-perkasa.png',
            'img/card-back-ericho-agil-nugraha-pt-puja-perkasa.png'
        ];
        
        let loadedCount = 0;
        const totalImages = images.length;
        
        images.forEach(src => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                console.log(`Gambar loaded: ${src} (${loadedCount}/${totalImages})`);
            };
            img.onerror = () => {
                console.error(`Gagal memuat gambar: ${src}`);
                this.showError(`Gambar "${src}" tidak ditemukan.`);
            };
            img.src = src;
        });
    }
}

/* ==================== ERROR HANDLING UNTUK GAMBAR ==================== */
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.error('Error loading image:', e.target.src);
        const imgName = e.target.src.split('/').pop();
        alert(`Gambar "${imgName}" tidak dapat dimuat. Pastikan file ada di folder "img/".`);
    }
}, true);

/* ==================== FALLBACK UNTUK html2canvas ==================== */
window.addEventListener('error', (e) => {
    if (e.target.src && e.target.src.includes('html2canvas')) {
        console.error('html2canvas failed to load');
        const downloadBtn = document.getElementById('downloadBtn');
        const icon = downloadBtn.querySelector('i');
        const textSpan = downloadBtn.querySelector('span');
        
        downloadBtn.disabled = true;
        icon.className = 'fas fa-exclamation-triangle';
        textSpan.textContent = 'Error';
        downloadBtn.title = 'Fitur simpan tidak tersedia. Pastikan koneksi internet aktif.';
        
        setTimeout(() => {
            alert('Library unduhan tidak dapat dimuat. Silakan refresh halaman atau periksa koneksi internet.');
        }, 1000);
    }
});

/* ==================== INISIALISASI APLIKASI ==================== */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new DigitalBusinessCard();
        console.log('✅ Kartu nama berhasil dimuat!');
    }, 100);
});

/* ==================== FUNGSI TAMBAHAN ==================== */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User switched tabs - pausing background processes');
    }
});

document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('card-front') || 
        e.target.classList.contains('card-back') ||
        e.target.closest('.card-front') || 
        e.target.closest('.card-back')) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.target.matches('button, input, textarea')) {
        e.preventDefault();
        const card = document.getElementById('businessCard');
        if (card) {
            card.click();
        }
    }
    
    if (e.code === 'Escape') {
        const loading = document.getElementById('loading');
        if (loading.classList.contains('active')) {
            loading.classList.remove('active');
            const downloadBtn = document.getElementById('downloadBtn');
            if (downloadBtn) {
                downloadBtn.disabled = false;
                const icon = downloadBtn.querySelector('i');
                const textSpan = downloadBtn.querySelector('span');
                icon.className = 'fas fa-download';
                textSpan.textContent = 'Unduh';
            }
        }
    }
});

/* ==================== PERFORMANCE OPTIMIZATION ==================== */
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}