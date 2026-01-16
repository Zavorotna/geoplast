document.addEventListener("DOMContentLoaded", function () {
    //animation to section
    if(document.querySelector(".animate")) {
        const animBlocks = document.querySelectorAll('.animate')
    
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0
                    setTimeout(() => {
                        entry.target.classList.add('show')
                    }, delay)
                    observer.unobserve(entry.target)
                }
            })
        }, {
            threshold: 0.5
        })
    
    
        animBlocks.forEach(block => {
            if (block.getBoundingClientRect().top < window.innerHeight) {
                const delay = block.dataset.delay || 0
                setTimeout(() => {
                    block.classList.add('show')
                }, delay)
            } else {
                observer.observe(block)
            }
        })
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
            menu.style.right = "-10px"
            dark.style.display = "block"
            dark.style.zIndex = "4"
        })

        function cancelBurger() {
            menu.style.right = "-100%"
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
                item.play().catch(err => console.log("Autoplay blocked:", err))
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

    //перевірка відправки форми для телефону і імені
    const phoneInput = document.querySelectorAll('.phoneInput'),
        errorTel = document.querySelectorAll('.error-tel')
    phoneInput.forEach(item => {
        item.addEventListener('input', function () {
            let phoneNumber = item.value.trim()
            const mask = "+380"
        
            if (!phoneNumber.startsWith(mask)) {
                phoneNumber = mask + phoneNumber
            }
        
            let cleanedValue = phoneNumber.replace(/[^\d+]/g, "")
        
            if (cleanedValue.length > 13) {
                cleanedValue = cleanedValue.slice(0, 13)
            }
        
            const validInput = isValidPhoneNumber(cleanedValue)
        
            if (validInput && cleanedValue.length === 13) {
                item.style.borderColor = 'green'
                item.style.color = '#121212'

                errorTel.forEach(item => { 
                    item.innerText = ""
                })
            } else {
                item.style.borderColor = '#B80101'
                item.style.color = '#B80101'
                errorTel.forEach(item => { 
                    item.innerText = "Введіть коректний номер телефону"
                })
            }
        })
    })

    function validateForm(form) {
        const phoneInput = form.querySelector("input[name='userPhone']"),
            phoneNumber = phoneInput.value.trim()

        if (!phoneNumber || !isValidPhoneNumber(phoneNumber) || phoneNumber.length < 13) {
            errorTel.forEach(item => { 
                item.innerText =  "невірний формат"
            })
            return false
        }
        
        const inputFields = form.querySelectorAll("input[name='userName']")
        for (const inputField of inputFields) {
            const userInput = inputField.value.trim()
            if (userInput.length < 3) {
                return false
            }
            if (userInput.length > 30){
                return false
            }
        }
        return true
    }

    document.querySelectorAll("form[action='sendorder.php'], form[action='senddata.php'], form[action='sendcontact.php']").forEach(form => {
        form.addEventListener("submit", (e) => {
            if (!validateForm(form)) {
                e.preventDefault()
                console.log("+")
            }
        })
    })


    function isValidPhoneNumber(phoneNumber) {
        return /^\+?(\d{2})?([(]?\d{3}[)]?)\s?[-]?\s?(?:\d{3})\s?[-]?(?:\s?\d{2})\s?[-]?(?:\s?\d{2})$/.test(phoneNumber)
    }

    const inputMasks = document.querySelectorAll(".inputMask")

    inputMasks.forEach(function (inputMask) {
        inputMask.addEventListener("click", function () {
            if (!inputMask.value) {
                inputMask.value = "+380"
            }
        })

        inputMask.addEventListener("input", function () {
            let inputValue = inputMask.value
            let cleanedValue = inputValue.replace(/[^\d+]/g, "")

            inputMask.value = cleanedValue

            if (cleanedValue.length > 13) {
                inputMask.value = cleanedValue.slice(0, 13)
            }

            if (!cleanedValue.startsWith("+380")) {
                inputMask.value = "+380" + cleanedValue.slice(3)
            }
        })
    })

    // випадаючі блоки з інформацією
    function toggleVisibility(buttons, visibleClass, activeClass) {
        buttons.forEach((item) => {
            item.addEventListener("click", function (e) {
                e.preventDefault()
                const descriptionMore = item.nextElementSibling
                descriptionMore.classList.toggle(visibleClass)
                item.classList.toggle(activeClass)
            })
        })
    }

    const btnReadMore = document.querySelectorAll(".readmore")

    toggleVisibility(btnReadMore, "visible", "readmore-active")

    if (document.querySelector(".slider_block_main .slider")) {
        const sliderContainer = document.querySelector(".slide_group"),
            slides = document.querySelectorAll(".slide_main"),
            pag = document.querySelector(".slide_buttons"),
            next = document.querySelector(".next"),
            prev = document.querySelector(".prev"),
            parentSliderContainer = document.querySelector(".slider_container")
        
        let currentIndex = 0
        const totalSlides = slides.length

        if (slides.length <= 1) {
            next.style.display = "none"
            prev.style.display = "none"
        } else {
            next.style.display = "block"
            prev.style.display = "block"
        }

        function setContainerHeight() {
            const activeSlide = slides[currentIndex],
                img = activeSlide.querySelector('img')
            if (!img) return

            const containerWidth = parentSliderContainer.offsetWidth
            img.complete ? applyHeight(img) : img.addEventListener('load', () => applyHeight(img))

            function applyHeight(image) {
                const ratio = image.naturalWidth / image.naturalHeight
            }
        }

        function createPagination() {
            pag.innerHTML = ''
            slides.forEach((_, index) => {
                const button = document.createElement('button')
                button.classList.add('slide_button')
                if (index === currentIndex) button.classList.add('active')
                button.addEventListener('click', () => {
                    currentIndex = index
                    updateSlider()
                })
                pag.appendChild(button)
            })
            pag.style.display = slides.length > 1 ? "flex" : "none"
        }

        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${parentSliderContainer.offsetWidth * currentIndex}px)`

            pag.querySelectorAll('.slide_button').forEach((btn, i) => {
                btn.classList.toggle('active', i === currentIndex)
            })

            setContainerHeight()

            if (currentIndex === 0) {
                prev.classList.add('disabled')
                prev.disabled = true 
            } else {
                prev.classList.remove('disabled')
                prev.disabled = false
            }

            if (currentIndex === totalSlides - 1) {
                next.classList.add('disabled')
                next.disabled = true
            } else {
                next.classList.remove('disabled')
                next.disabled = false
            }
        }

        next.addEventListener("click", e => {
            e.preventDefault()
            if (currentIndex < totalSlides - 1) {
                currentIndex++
                updateSlider()
            }
        })

        prev.addEventListener("click", e => {
            e.preventDefault()
            if (currentIndex > 0) {
                currentIndex--
                updateSlider()
            }
        })

        // let currentIndex = 0
        let startX = 0
        let currentX = 0
        let isDragging = false
        const swipeThreshold = 50

        function onTouchStart(e) {
            isDragging = true
            startX = e.touches ? e.touches[0].clientX : e.clientX
            sliderContainer.style.transition = 'none'
        }

        function onTouchMove(e) {
            if (!isDragging) return
            currentX = e.touches ? e.touches[0].clientX : e.clientX
            const delta = currentX - startX
            sliderContainer.style.transform = `translateX(${-currentIndex * parentSliderContainer.offsetWidth + delta}px)`
        }

        function onTouchEnd() {
            if (!isDragging) return
            isDragging = false
            const delta = currentX - startX
            sliderContainer.style.transition = 'transform 0.3s ease'

            if (Math.abs(delta) > swipeThreshold) {
                if (delta < 0 && currentIndex < totalSlides - 1) currentIndex++
                if (delta > 0 && currentIndex > 0) currentIndex--
            }
            updateSlider() // плавно повертає в позицію currentIndex
        }


        sliderContainer.addEventListener('touchstart', onTouchStart, { passive: true })
        sliderContainer.addEventListener('touchmove', onTouchMove, { passive: true })
        sliderContainer.addEventListener('touchend', onTouchEnd)
        sliderContainer.addEventListener('touchcancel', onTouchEnd)

        // sliderContainer.addEventListener('pointerdown', onTouchStart)
        // sliderContainer.addEventListener('pointermove', onTouchMove)
        // sliderContainer.addEventListener('pointerup', onTouchEnd)
        // sliderContainer.addEventListener('pointerleave', onTouchEnd)

        let resizeTimeout
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => updateSlider(), 250)
        })

        createPagination()
        updateSlider()
    }

})