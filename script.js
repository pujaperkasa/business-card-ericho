// script.js
// Data kontak
const contactInfo = {
    whatsapp: "81282183532",
    email: "richopujaperkasa@gmail.com"
};

// Preload images
function preloadImages() {
    const images = [
        'img/card-front-ericho-agil-nugraha-pt-puja-perkasa.png',
        'img/card-back-ericho-agil-nugraha-pt-puja-perkasa.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Fungsi WhatsApp
document.getElementById('whatsappBtn').addEventListener('click', function() {
    const message = " ";
    const whatsappUrl = `https://wa.me/62${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Fungsi Email
document.getElementById('emailBtn').addEventListener('click', function() {
    const subject = " ";
    const body = " ";
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
});

// Fungsi Simpan PNG - DOWNLOAD ASLI FILE PNG
document.getElementById('saveBtn').addEventListener('click', function() {
    const saveBtn = this;
    const originalText = saveBtn.innerHTML;
    
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Menyimpan...';
    saveBtn.disabled = true;

    // Download kedua gambar sebagai PNG original
    downloadBothPNGs();
    
    // Kembalikan state tombol setelah delay
    setTimeout(() => {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }, 2000);
});

// Download kedua file PNG asli
function downloadBothPNGs() {
    // Create temporary links untuk download file asli
    const frontLink = document.createElement('a');
    frontLink.href = 'img/card-front-ericho-agil-nugraha-pt-puja-perkasa.png';
    frontLink.download = 'Kartu-Nama-Depan-Ericho-Agil-Nugraha-PT-Puja-Perkasa.png';
    
    const backLink = document.createElement('a');
    backLink.href = 'img/card-back-ericho-agil-nugraha-pt-puja-perkasa.png';
    backLink.download = 'Kartu-Nama-Belakang-Ericho-Agil-Nugraha-PT-Puja-Perkasa.png';
    
    // Trigger download gambar depan
    frontLink.click();
    
    // Download gambar belakang setelah delay kecil
    setTimeout(() => {
        backLink.click();
        
        // Alert konfirmasi
        alert('Kedua kartu nama telah berhasil diunduh dalam format PNG asli dengan kualitas terbaik!');
    }, 500);
}

// Efek hover pada gambar kartu
const frontCard = document.getElementById('frontCard');
const backCard = document.getElementById('backCard');

frontCard.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
});

frontCard.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-5px) scale(1)';
});

backCard.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
});

backCard.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-5px) scale(1)';
});

// Preload images saat halaman load
document.addEventListener('DOMContentLoaded', function() {
    preloadImages();
    console.log('Kartu nama digital siap digunakan!');
});

// Tambahan: Klik gambar untuk preview lebih besar
frontCard.addEventListener('click', function() {
    window.open(this.src, '_blank');
});

backCard.addEventListener('click', function() {
    window.open(this.src, '_blank');
});
