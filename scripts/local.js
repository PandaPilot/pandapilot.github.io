function findMaxHeight() {
    const carousel = document.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.item');
    const activeSlide = document.querySelector('.carousel-inner .item.active');

    let maxHeight = 0;

    carouselItems.forEach(item => {
        // Temporarily make the item visible to measure its height

        item.classList.add('active'); // Add 'active' if necessary to ensure full height

        if (carousel.offsetHeight > maxHeight) {
            maxHeight = carousel.offsetHeight;
        }

        // Revert styles after measurement

        item.classList.remove('active'); // Remove 'active' to revert to original state
    });
    activeSlide.classList.add('active');
    carousel.style.height = `${maxHeight}px`;
    // H_W_Ratio = maxHeight/carousel.offsetWidth;
}     
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var debouncedFindMaxHeight = debounce(function() {
    findMaxHeight();
}, 250);
window.onload = findMaxHeight;
window.onresize = debouncedFindMaxHeight;

$('#myCarousel').on('slid.bs.carousel', function () {
    // Get the index of the currently active slide
    var activeIndex = $(this).find('.carousel-indicators li.active').data('slide-to');

    // Update the indicators in both sets
    $('.carousel-indicators').each(function() {
        $(this).find('li').removeClass('active').eq(activeIndex).addClass('active');
    });
});