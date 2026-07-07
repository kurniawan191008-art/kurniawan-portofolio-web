import { initNavigation } from "./navigation.js";
import { handleLocationChange } from "./router.js";
// import { glow } from "./animation.js"

initNavigation();
handleLocationChange();

console.log("anjayy jalan cuy")
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // 1. Logika Efek Glow Mengikuti Kursor
    if (mainContent) {
        mainContent.addEventListener('mousemove', (e) => {
            const rect = mainContent.getBoundingClientRect();
            
            // Hitung koordinat X & Y kursor relatif terhadap batas kontainer #main-content
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Masukkan koordinat ke dalam CSS Variable
            mainContent.style.setProperty('--x', `${x}px`);
            mainContent.style.setProperty('--y', `${y}px`);
        });
    }

    mainContent.addEventListener('mouseleave', () => {
        // Reset koordinat ke -1000px supaya efek glownya "terlempar" keluar layar
        mainContent.style.setProperty('--x', '-1000px');
        mainContent.style.setProperty('--y', '-1000px');
    });
});