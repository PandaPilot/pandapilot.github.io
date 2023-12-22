function findMaxHeight() {
    const carousel = document.querySelector('.carousel-inner');
    const carouselItems = carousel.querySelectorAll('.carousel-item');
    const activeSlide = document.querySelector('.carousel-inner .carousel-item.active');

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

var myCarousel = document.querySelector('#myCarousel');

myCarousel.addEventListener('slid.bs.carousel', function () {
    // Get the index of the currently active slide
    var activeIndex = this.querySelector('.carousel-indicators .active').getAttribute('data-bs-slide-to');

    // Update all indicators in both sets
    var allIndicators = this.querySelectorAll('.carousel-indicators button');
    allIndicators.forEach(function(indicator) {
        indicator.classList.remove('active');
    });

    // Activate the corresponding indicators in both sets
    this.querySelectorAll('.carousel-indicators').forEach(function(indicatorSet) {
        var newActiveIndicator = indicatorSet.querySelector('button[data-bs-slide-to="' + activeIndex + '"]');
        if (newActiveIndicator) {
            newActiveIndicator.classList.add('active');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.scrolly');
    const sections = document.querySelectorAll('section');

    // Function to update active link
    function updateActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 50 < sections[index].offsetTop) {}

        links.forEach((link) => link.classList.remove('active'));
        links[index].classList.add('active');
    }

    // Event listener for click
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Event listener for scroll
    window.addEventListener('scroll', updateActiveLink);
});
