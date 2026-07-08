// Taruh ini di luar fungsi apa pun, biarkan jalan secara global
export function initGlow() {
    document.addEventListener('mousemove', (e) => {
        // Cari apakah kursor lagi nyentuh elemen yang punya class 'grid-glow-container'
        const target = e.target.closest('.grid-glow-container');

        // Kalau nggak nyentuh, berhentiin prosesnya (biar web tetap ringan)
        if (!target) return;

        // Kalau nyentuh, hitung koordinat HANYA untuk elemen tersebut
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS Variable di elemen yang lagi disentuh kursor
        target.style.setProperty('--x', `${x}px`);
        target.style.setProperty('--y', `${y}px`);
    });
}