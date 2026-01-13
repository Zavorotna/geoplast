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

    const dark = document.querySelector(".dark-bgc")
    if (document.querySelector(".burger")) {
        const burger = document.querySelector(".burger"),
            menu = document.querySelector(".nav"),
            cancel = document.querySelector(".cancel"),
            listItem = menu.querySelectorAll("a")

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

    //popup
    const buttons = document.querySelectorAll('.switch_btn'),
        blocks = document.querySelectorAll('.switch_block'),
        connectCta = document.querySelectorAll(".connect_cta"),
        popupConnect = document.querySelector('.popup'),
        cancelPopup = document.querySelector(".cancel_popup")

    connectCta.forEach(cta => {
        cta.addEventListener("click", () => {
            popupConnect.style.display = "block"
            dark.style.display = "block"
        })
    })
    cancelPopup.addEventListener("click", () => {
        popupConnect.style.display = "none"
        dark.style.display = "none"
    })
    dark.addEventListener("click", () => {
        popupConnect.style.display = "none"
        dark.style.display = "none"
    })

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')

            blocks.forEach(block => block.classList.remove('active'))

            const target = btn.dataset.target
            document.getElementById(target).classList.add('active')
        })
    })

    //get more news
    if(document.querySelector('#show-more-btn')) {
        let newsPerPage = 6,
            currentIndex = 0
    
        const allNews = Array.from(document.querySelectorAll('.news_cards figure.page_news'))
    
        allNews.forEach((news, index) => {
            if (index >= newsPerPage) news.style.display = 'none'
        })
        currentIndex = newsPerPage
    
        function showMoreNews() {
            const nextNews = allNews.slice(currentIndex, currentIndex + newsPerPage)
            
            nextNews.forEach(news => {
                news.style.display = 'block'
            })
    
            currentIndex += newsPerPage
    
            if (currentIndex >= allNews.length) {
                document.querySelector('#show-more-btn').style.display = 'none'
            }
        }
    
        document.querySelector('#show-more-btn').addEventListener('click', function(e){
            e.preventDefault()
            showMoreNews()
        })
    }


})