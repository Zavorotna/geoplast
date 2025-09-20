document.addEventListener("DOMContentLoaded", function () {
    //animation to section
    const animBlocks = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });


    animBlocks.forEach(block => {
        if (block.getBoundingClientRect().top < window.innerHeight) {
            const delay = block.dataset.delay || 0;
            console.log(block);
            setTimeout(() => {
                block.classList.add('show');
            }, delay);
        } else {
            observer.observe(block);
        }
    });

})