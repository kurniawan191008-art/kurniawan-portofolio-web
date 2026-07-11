// File: js/animation.js

export function initGlow() {
    // 1. Simpan koordinat kursor terakhir secara global di dalam modul ini
    let lastClientX = 0;
    let lastClientY = 0;

    // 2. Bikin fungsi terpisah untuk menghitung dan update posisi glow
    const updateGlowPosition = (clientX, clientY) => {
        // Cari elemen yang tepat berada di bawah koordinat kursor saat ini
        const elementAtPoint = document.elementFromPoint(clientX, clientY);
        if (!elementAtPoint) return;

        // Cek apakah elemen tersebut atau parent-nya punya class grid-glow-container
        const target = elementAtPoint.closest('.grid-glow-container');
        if (!target) return;

        // Hitung ulang posisi kursor relatif terhadap elemen setelah di-scroll
        const rect = target.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Tembak variabel CSS terbarunya
        target.style.setProperty('--x', `${x}px`);
        target.style.setProperty('--y', `${y}px`);
    };

    // 3. Jalankan fungsi saat kursor bergerak (seperti biasa)
    document.addEventListener('mousemove', (e) => {
        // Rekam posisi kursor terbaru setiap kali bergerak
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        
        updateGlowPosition(lastClientX, lastClientY);
    });

    // 4. TAMBAHAN BARU: Jalankan juga fungsi saat halaman di-scroll
    // 'capture: true' digunakan agar mendeteksi scroll di container mana pun di dalam SPA
    // 'passive: true' digunakan agar performa scroll tetap mulus tanpa delay
    document.addEventListener('scroll', () => {
        updateGlowPosition(lastClientX, lastClientY);
    }, { capture: true, passive: true });
}
