/* =========================================================
   TAPAK RIMBA — main.js
   Skrip bersama yang dipakai di seluruh halaman:
   - Toggle menu navigasi mobile
   - Tahun otomatis di footer
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  // Toggle navbar mobile
  var navToggle = document.querySelector('.nav-toggle');
  var navbar = document.querySelector('.navbar');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tutup menu saat salah satu link diklik (khusus mobile)
    var navLinks = navbar.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('nav-open');
      });
    });
  }

  // Tahun berjalan otomatis di footer
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Tab konten (dipakai di halaman detail produk, dashboard, dll)
  var tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');

        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        document.querySelectorAll('.tab-panel').forEach(function (panel) {
          panel.hidden = panel.id !== target;
        });
      });
    });
  }

  // Quantity stepper (dipakai di detail produk & keranjang)
  document.querySelectorAll('.qty-stepper').forEach(function (stepper) {
    var input = stepper.querySelector('input');
    var minus = stepper.querySelector('.qty-minus');
    var plus = stepper.querySelector('.qty-plus');
    if (!input) return;

    minus && minus.addEventListener('click', function () {
      var val = Math.max(1, parseInt(input.value || '1', 10) - 1);
      input.value = val;
    });
    plus && plus.addEventListener('click', function () {
      var val = parseInt(input.value || '1', 10) + 1;
      input.value = val;
    });
  });

  // Hapus item dari keranjang (tampilan saja, tanpa penyimpanan data)
  document.querySelectorAll('.cart-item-remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.cart-item');
      if (item) item.remove();
    });
  });

  // Tampilkan form alamat hanya jika metode "Diantar ke Alamat" dipilih (checkout)
  var deliveryRadios = document.querySelectorAll('input[name="metode-ambil"]');
  var addressBox = document.querySelector('.delivery-address');
  if (deliveryRadios.length && addressBox) {
    var syncAddress = function () {
      var selected = document.querySelector('input[name="metode-ambil"]:checked');
      addressBox.hidden = !selected || selected.value !== 'antar';
    };
    deliveryRadios.forEach(function (r) { r.addEventListener('change', syncAddress); });
    syncAddress();
  }

  // Tampilkan/sembunyikan password (login, register)
  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var field = btn.previousElementSibling;
      if (!field) return;
      field.type = field.type === 'password' ? 'text' : 'password';
    });
  });

  // Filter status riwayat sewa
  var statusTabs = document.querySelectorAll('.status-tab');
  var orderCards = document.querySelectorAll('.order-card');
  if (statusTabs.length && orderCards.length) {
    statusTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = tab.getAttribute('data-filter');

        statusTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');

        orderCards.forEach(function (card) {
          card.style.display = (filter === 'semua' || card.getAttribute('data-status') === filter) ? '' : 'none';
        });
      });
    });
  }

});
