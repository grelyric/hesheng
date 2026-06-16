/* ========================================
   NAVBAR SCROLL EFFECT
   ========================================= */
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('#navbar').addClass('navbar-scrolled');
    } else {
        $('#navbar').removeClass('navbar-scrolled');
    }
    
    // Back to top button
    if ($(this).scrollTop() > 300) {
        $('#backToTop').addClass('show');
    } else {
        $('#backToTop').removeClass('show');
    }
});

/* ========================================
   BACK TO TOP CLICK
   ========================================= */
$('#backToTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 500);
});

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS (Hanya jika elemen ada)
   ========================================= */
$('a[href*="#"]').on('click', function(e) {
    if (this.hash !== '') {
        // Cek apakah elemen dengan id tersebut ada di halaman
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 600);
        }
    }
});

/* ========================================
   FILTER, SEARCH, DAN SCROLL PRODUK (Hanya jika elemen ada di halaman)
   ========================================= */
$(document).ready(function() {
    
    // Cek apakah elemen produk ada di halaman
    if ($('#searchInput').length === 0) {
        return; // Jika tidak ada, hentikan fungsi produk
    }
    
    // Function to update product count and filter
    function updateDisplay() {
        var searchValue = $('#searchInput').val().toLowerCase();
        var activeFilter = $('.category-btn.active').attr('data-filter');
        var visibleCount = 0;
        
        $('.product-item-scroll').each(function() {
            var productName = $(this).attr('data-name');
            var productCategory = $(this).attr('data-category');
            
            var matchesSearch = productName.indexOf(searchValue) > -1;
            var matchesFilter = (activeFilter === 'all' || productCategory === activeFilter);
            
            if (matchesSearch && matchesFilter) {
                $(this).show();
                visibleCount++;
            } else {
                $(this).hide();
            }
        });
        
        // Update counter di sidebar
        $('#productCountInfo').text(visibleCount);
        
        // Update count di tombol kategori
        $('#countAll').text($('.product-item-scroll').length);
        $('#countTerpal').text($('.product-item-scroll[data-category="terpal"]').length);
        $('#countParanet').text($('.product-item-scroll[data-category="paranet"]').length);
        
        // Refresh AOS setelah filter
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    // Search input
    $('#searchInput').on('keyup', function() {
        updateDisplay();
    });
    
    // Category filter
    $('.category-btn').click(function() {
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        updateDisplay();
    });
    
    // Initial display
    updateDisplay();
});

/* ========================================
   ACTIVE MENU DETECTION (Hanya jika section ada)
   ========================================= */
$(window).on('scroll', function() {
    // Cek apakah ada section di halaman
    var sections = $('section');
    if (sections.length === 0) {
        return; // Jika tidak ada section, hentikan
    }
    
    var scrollPosition = $(window).scrollTop() + 100;
    
    sections.each(function() {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            $('.navbar-nav .nav-link').removeClass('active');
            $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
        }
    });
});

// Trigger scroll saat halaman dimuat
$(document).ready(function() {
    $(window).trigger('scroll');
});

/* ========================================
   COUNTER ANIMATION (Statistik Produk)
   ========================================= */

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerText = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Cek apakah elemen counter ada di halaman
if ($('.counter').length > 0) {
    // Intersection Observer untuk mendeteksi saat elemen terlihat
    const observerOptions = {
        threshold: 0.5, // Muncul ketika 50% elemen terlihat
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElement = entry.target;
                const targetValue = parseInt(counterElement.getAttribute('data-target'));
                animateCounter(counterElement, 0, targetValue, 2000); // 2 detik
                observer.unobserve(counterElement); // Hanya sekali
            }
        });
    }, observerOptions);
    
    // Observer setiap elemen counter
    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });
}