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
