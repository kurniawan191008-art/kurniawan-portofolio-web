// File: js/animation.js

export function initGlow() {
    let lastClientX = 0;
    let lastClientY = 0;
    const gridSize = 50; 
    
    // Variabel buat nyimpen kotak mana yang terakhir dilewatin
    let lastBoxX = null;
    let lastBoxY = null;

    // Fungsi buat nyiptain dan ngehapus kotak jejak
    const createTrailBox = (container, x, y) => {
        const box = document.createElement('div');
        box.className = 'grid-trail-box';
        
        // +1px biar warnanya pas di dalam garis kotak
        box.style.left = `${x + 1}px`;
        box.style.top = `${y + 1}px`;
        
        container.appendChild(box);

        // Hapus elemen dari DOM setelah 600ms (sesuai durasi animasi CSS)
        // Biar nggak menuhin memori (Anti nge-lag)
        setTimeout(() => {
            box.remove();
        }, 600); 
    };

    const updateGlowPosition = (clientX, clientY) => {
        const elementAtPoint = document.elementFromPoint(clientX, clientY);
        if (!elementAtPoint) return;

        const target = elementAtPoint.closest('.grid-glow-container');
        if (!target) {
            // Kalau kursor keluar dari container, reset lastBox
            lastBoxX = null;
            lastBoxY = null;
            return;
        }

        const rect = target.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Bikin koordinatnya nge-snap (nempel) ke ukuran kotak grid
        const boxX = Math.floor(x / gridSize) * gridSize;
        const boxY = Math.floor(y / gridSize) * gridSize;

        // CUMA bikin elemen kotak baru KALAU kursor pindah ke kotak yang beda
        if (boxX !== lastBoxX || boxY !== lastBoxY) {
            createTrailBox(target, boxX, boxY);
            
            // Update kotak terakhir ke kotak yang baru ini
            lastBoxX = boxX;
            lastBoxY = boxY;
        }
    };

    // Event listener pergerakan kursor
    document.addEventListener('mousemove', (e) => {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        updateGlowPosition(lastClientX, lastClientY);
    });

    // Event listener waktu scroll
    document.addEventListener('scroll', () => {
        updateGlowPosition(lastClientX, lastClientY);
    }, { capture: true, passive: true });
}