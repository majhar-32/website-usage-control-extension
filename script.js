document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('[data-tab]');
    const sections = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            // Sync visual active state for all buttons (sidebar and top)
            tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === target));

            // Hide all sections and show the target one
            sections.forEach(s => {
                s.classList.remove('active');
                if(s.id === target) s.classList.add('active');
            });

            // Re-render chart if switching to Analytics
            if(target === 'analytics') renderChart();
        });
    });

    function renderChart() {
        const ctx = document.getElementById('weeklyChart')?.getContext('2d');
        if(!ctx) return;
        if(window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: [4, 3, 6, 2, 5, 2, 4], backgroundColor: '#00B4D8' }]
            }
        });
    }

    // Popup functionality
    const openBtn = document.getElementById('openDashboard');
    if (openBtn) {
        openBtn.addEventListener('click', () => chrome.tabs.create({ url: 'dashboard.html' }));
    }
});