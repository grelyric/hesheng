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
   SMOOTH SCROLL FOR ANCHOR LINKS
   ========================================= */
$('a[href*="#"]').on('click', function(e) {
    if (this.hash !== '') {
        e.preventDefault();
        var hash = this.hash;
        
        // Gunakan animasi smooth scroll
        $('html, body').animate({
            scrollTop: $(hash).offset().top - 70
        }, 600);
    }
});

/* ========================================
   FILTER, SEARCH, DAN SCROLL PRODUK
   ========================================= */
$(document).ready(function() {
    
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
   ACTIVE MENU DETECTION (Saat Scroll)
   ========================================= */
$(window).on('scroll', function() {
    var scrollPosition = $(window).scrollTop() + 100; // Offset karena navbar fixed
    
    // Loop setiap section
    $('section').each(function() {
        var sectionTop = $(this).offset().top;
        var sectionBottom = sectionTop + $(this).outerHeight();
        var sectionId = $(this).attr('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Hapus class active dari semua menu
            $('.navbar-nav .nav-link').removeClass('active');
            // Tambah class active ke menu yang sesuai
            $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
        }
    });
});

// Trigger scroll saat halaman dimuat
$(document).ready(function() {
    $(window).trigger('scroll');
});

