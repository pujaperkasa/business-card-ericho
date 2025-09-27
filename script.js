/* =================== KELAS UTAMA KARTU DIGITAL - VERSION 2.0 ==================== */

class DigitalBusinessCard {
    constructor() {
        this.card = document.getElementById('businessCard');
        this.flipBtn = document.getElementById('flipBtn');
        this.whatsappBtn = document.getElementById('whatsappBtn');
        this.emailBtn = document.getElementById('emailBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.loading = document.getElementById('loading');
        
        this.isFlipped = false;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        console.log('😊 Menginisialisasi Kartu Digital...');
        
        // Event listeners
        this.flipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.debouncedFlip();
        });
        
        this.card.addEventListener('click', (e) => {
            e.preventDefault();
            this.debouncedFlip();
        });
        
        // Tombol lainnya
        this.whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.shareOnWhatsApp();
        });
        
        this.emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendEmail();
        });
        
        this.downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.downloadCardAsPDF();
        });
        
        this.preloadImages();
        this.updateFlipButtonText();
        
        console.log('Kartu Digital siap digunakan!');
    }
    
    /* =================== DEBOUNCED FLIP - FIXED ===================== */ 
    debouncedFlip() { 
        if (this.isAnimating) return; 
        
        this.isAnimating = true; 
        this.flipCard(); 
        
        setTimeout(() => { 
            this.isAnimating = false; 
        }, 600);
    } 
    
    /* =================== FUNGSI FLIP KARTU - PERBAIKAN ===================== */ 
    flipCard() { 
        console.log('Memutar kartu...'); 
        
        this.isFlipped = !this.isFlipped; 
        
        requestAnimationFrame(() => { 
            if (this.isFlipped) { 
                this.card.classList.add('flipped'); 
            } else { 
                this.card.classList.remove('flipped'); 
            }
            
            this.updateFlipButtonText();
            console.log(`Status: ${this.isFlipped ? 'Belakang' : 'Depan'}`);
        });
    } 
    
    /* ================== UPDATE TEKS TOMBOL ================= */ 
    updateFlipButtonText() {
        const icon = this.flipBtn.querySelector('i');
        const textSpan = this.flipBtn.querySelector('span');
        
        if (this.isFlipped) {
            icon.className = 'fas fa-undo';
            textSpan.textContent = 'Lihat Depan';
        } else {
            icon.className = 'fas fa-sync-alt';
            textSpan.textContent = 'Lihat Belakang';
        }
    }
    
    /* ================== FUNGSI DOWNLOAD PDF BARU ================= */ 
    async downloadCardAsPDF() {
        this.setDownloadButtonState(true);
        this.showLoading(true);
        
        try {
            // Tunggu library jsPDF siap
            if (typeof window.jspdf === 'undefined') {
                throw new Error('Library PDF tidak tersedia');
            }
            
            const { jsPDF } = window.jspdf;
            
            // Ambil gambar dari elemen kartu
            const frontImage = await this.captureCardImage(false);
            const backImage = await this.captureCardImage(true);
            
            // Buat PDF baru
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [90, 54] // Ukuran kartu bisnis standar
            });
            
            // Tambahkan halaman depan
            pdf.addImage(frontImage, 'PNG', 0, 0, 90, 54);
            
            // Tambahkan halaman belakang
            pdf.addPage();
            pdf.addImage(backImage, 'PNG', 0, 0, 90, 54);
            
            // Simpan PDF
            pdf.save('Kartu-Bisnis-Ericho-Agil-Nugraha.pdf');
            
            this.showSuccess('PDF berhasil diunduh!');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            this.showError('Gagal mengunduh PDF. Silakan coba lagi.');
        } finally {
            this.showLoading(false);
            this.setDownloadButtonState(false);
        }
    }
    
    /* ================== CAPTURE CARD IMAGE ================= */ 
    async captureCardImage(isBackSide) {
        return new Promise((resolve, reject) => {
            // Simpan state flip sebelumnya
            const wasFlipped = this.isFlipped;
            
            // Jika perlu capture belakang, pastikan kartu dalam state flipped
            if (isBackSide && !wasFlipped) {
                this.card.classList.add('flipped');
            } else if (!isBackSide && wasFlipped) {
                this.card.classList.remove('flipped');
            }
            
            // Tunggu sebentar untuk render
            setTimeout(() => {
                html2canvas(this.card, {
                    scale: 2, // Kualitas tinggi
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null
                }).then(canvas => {
                    // Kembalikan ke state semula
                    if (isBackSide && !wasFlipped) {
                        this.card.classList.remove('flipped');
                    } else if (!isBackSide && wasFlipped) {
                        this.card.classList.add('flipped');
                    }
                    
                    resolve(canvas.toDataURL('image/png'));
                }).catch(reject);
            }, 100);
        });
    }
    
    /* ================== FUNGSI LAINNYA ================= */ 
    shareOnWhatsApp() {
        const phoneNumber = "6281282183532";
        const message = "Halo, saya tertarik dengan layanan Anda!";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
    
    sendEmail() {
        const emailAddress = "richopujaperkasa@gmail.com";
        const subject = "Informasi Kartu Bisnis Digital";
        const body = "Halo, saya tertarik dengan layanan Anda!";
        const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        try {
            window.location.href = mailtoLink;
        } catch (error) {
            this.showEmailFallback(emailAddress);
        }
    }
    
    showEmailFallback(emailAddress) {
        const fallbackHTML = `
            <div id="emailFallback" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:20px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:10000;text-align:center;color:#001824;max-width:90%;width:400px;">
                <h3 style="margin-bottom:15px;color:#B99362;">Email Client Tidak Terdeteksi</h3>
                <p>Silakan copy email address berikut:</p>
                <div style="background:#f5f5f5;padding:15px;border-radius:5px;margin:15px 0;font-family:monospace;">${emailAddress}</div>
                <button onclick="document.getElementById('emailFallback').remove()" style="background:#B99362;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;margin:5px;">Tutup</button>
                <button onclick="navigator.clipboard.writeText('${emailAddress}').then(() => alert('Email disalin!'))" style="background:#001824;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;margin:5px;">Copy Email</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', fallbackHTML);
    }
    
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
            textSpan.textContent = 'Unduh PDF';
        }
    }
    
    showLoading(show) {
        if (show) {
            this.loading.classList.add('active');
        } else {
            this.loading.classList.remove('active');
        }
    }
    
    showSuccess(message) {
        this.showNotification(message, '#4CAF50');
    }
    
    showError(message) {
        this.showNotification(message, '#ff4444');
    }
    
    showNotification(message, color) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${color};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    preloadImages() {
        const images = [
            'img/card-front-ericho-agil-nugraha-pt-puja-perkasa.png',
            'img/card-back-ericho-agil-nugraha-pt-puja-perkasa.png'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

/*================================================== INISIALISASI APLIKASI ================================================= */ 
document.addEventListener('DOMContentLoaded', function() {
    // Tunggu sampai semua resource loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
    
    function initApp() {
        setTimeout(() => {
            try {
                new DigitalBusinessCard();
                console.log('🎉 Aplikasi berhasil dimuat!');
                
                // Tambahkan CSS untuk animasi notifikasi
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOut {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
                
            } catch (error) {
                console.error('❌ Error:', error);
            }
        }, 100);
    }
});

/* =========================== KEYBOARD SHORTCUTS ======================= */ 
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !e.target.matches('button, input, textarea')) {
        e.preventDefault();
        const card = document.getElementById('businessCard');
        if (card) card.click();
    }
});