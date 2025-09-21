document.addEventListener("DOMContentLoaded", function () {
    //animation to section
    if(document.querySelector(".animate")) {
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
                setTimeout(() => {
                    block.classList.add('show');
                }, delay);
            } else {
                observer.observe(block);
            }
        });
    }

    if (document.querySelector(".stats")) {

        const counters = document.querySelectorAll('.counter'),
            speed = 100

        const animateCounters = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target,
                        updateCount = () => {
                        const target = +counter.getAttribute('data-target'),
                            current = +counter.innerText.replace(/\D/g, ''),
                            increment = Math.ceil(target / speed)

                        if (current < target) {
                            counter.innerText = current + increment > target ? target : current + increment
                            setTimeout(updateCount, 50)
                        } else {
                            counter.innerText = target
                        }
                    }

                    updateCount()
                    observer.unobserve(counter)
                }
            })
        }

        const observerCount = new IntersectionObserver(animateCounters, {
            threshold: 0.5
        })

        counters.forEach(counter => {
            observerCount.observe(counter)
        })
    }

    if (document.querySelector(".burger")) {
        const burger = document.querySelector(".burger"),
            menu = document.querySelector(".nav"),
            cancel = document.querySelector(".cancel"),
            listItem = menu.querySelectorAll("a"),
            dark = document.querySelector(".dark-bgc")

        burger.addEventListener("click", function () {
            menu.style.right = "-10px";
            dark.style.display = "block"
            dark.style.zIndex = "4"
        })

        function cancelBurger() {
            menu.style.right = "-100%";
            dark.style.zIndex = "6"
            dark.style.display = "none"
        }
        listItem.forEach(item => {
            item.addEventListener("click", cancelBurger)
        })
        cancel.addEventListener("click", function (e) {
            e.preventDefault()
            cancelBurger()
        })
        dark.addEventListener("click", cancelBurger)
    }

     //autoload video after click on document
    if (document.querySelector('video')) {
        const videos = document.querySelectorAll('video')
        setTimeout(() => {
            videos.forEach(item => {
                item.style.opacity = "1"
                item.play().catch(err => console.log("Autoplay blocked:", err));
            })
        }, 1000)
    }

})