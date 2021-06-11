
window.addEventListener("load", function() {
    let initialIndex = 1;
    let desktopScreen = 991;
    let slideWidth = window.innerWidth >= desktopScreen ? 33.3 : 100;
    let initialTransition = 0;
    let transitionNum = initialTransition;

    if(window.innerWidth > desktopScreen) {
        desktopFuncions()
    } else {
        mobileFunctions()
    }

    window.addEventListener("resize", function(){
        slideWidth = window.innerWidth >= desktopScreen ? 40 : 100;
        if(window.innerWidth > desktopScreen) {
            desktopFuncions()
        } else {
            mobileFunctions()
        }
    });

    function desktopFuncions(){
        scaleBlocks()
        hideListOnDesktop()
        testimonialsSlider(33.3)
    }

    function mobileFunctions(){
        displayListOnMobile()
        testimonialsSlider(100, true)
    }

    function displayListOnMobile(){
        // display list on mobile
        let listBtns = document.querySelectorAll('.swiper-wrapper .list-content h2');
        listBtns.forEach(function(item) {
            item.classList.add("inactiveList");
        })


        document.querySelector('.swiper-container').addEventListener("click", function(){
            document.querySelectorAll('.swiper-slide').forEach(function(item, index){
                if(!item.classList.contains('.swiper-slide-active')) {
                    listBtns[index].nextSibling.nextSibling.style.display = "none";
                }
            })
        })
    
        
        let inactiveBtns = document.querySelectorAll('.inactiveList');
        inactiveBtns.forEach(function(item, index){
            item.addEventListener("click", function(){
                let sibling =  item.nextSibling.nextSibling;
                let siblingStyle = window.getComputedStyle(sibling).display;
            
                if(siblingStyle === "none"){
                    item.classList.add("activeList")
                    item.classList.remove("inactiveList")
                } else {
                    item.classList.remove("activeList")
                    item.classList.add("inactiveList")
                }
            
                setTimeout(function(){
                    if(item.className === "activeList") {
                        listBtns.forEach(item => {
                            showListOnAction(inactiveBtns)
                        })
                    
                    } else {
                        listBtns.forEach(item => {
                            hideListOnAction(inactiveBtns)
                        })
                    }
                }, 100)
            
            })
        })
    }


    function hideListOnAction(inactiveBtns) {
        inactiveBtns.forEach(function(item){
            item.nextSibling.nextSibling.style.display = "none";
        })
        
    }

    function showListOnAction(inactiveBtns) {
        inactiveBtns.forEach(function(item){
            item.nextSibling.nextSibling.style.display = "block";
        })
        
    }

    function hideListOnDesktop(){
        let inactiveBtns = document.querySelectorAll('.inactiveList');

        if(inactiveBtns) {
            inactiveBtns.forEach(function(item) {
                item.classList.remove("inactiveList");
                item.classList.remove("activeList");
            })
        }
    }

    function scaleBlocks(){
        let blocks = document.querySelectorAll('.stories-section .before-after-blocks');
        blocks.forEach(item => {
            item.addEventListener("mouseover", function() {
                removeClass("active", blocks)
                item.classList.add("active");
            })

            item.addEventListener("mousedown", function() {

            })
            // swipe:
            item.addEventListener('mousedown', handleTouchStart, false);
            item.addEventListener('mousedown', handleTouchMove, false);
        })
    }

    function removeClass(className, blocks) {
        blocks.forEach(item => {
            item.classList.remove(className);
        })
    }


    function testimonialsSlider(sliderWidth, isMobile = false) {
        // CUSTOM TESTIMONIALS SLIDER
        let mainWrapper = document.querySelector(".t-slider-main-wrap");
        let swiperContainer = document.querySelector(".t-slider-inner");
        let swiperItems = document.querySelectorAll(".t-item");
        let itemsCount = swiperItems.length;
        window.addEventListener("resize", function() {
            if(window.innerWidth < 991) {
                slidesPerPage = 1;
                sliderWidth = 100;
            } else {
                slidesPerPage = 3;
                sliderWidth = 33.3;
            }
        });

        let arrowRight =  document.querySelector(".arrowRight");
        let arrowLeft =  document.querySelector(".arrowLeft");

        arrowRight.addEventListener("click", slideRight)
        arrowLeft.addEventListener("click", slideLeft)



        // slide to right and add slide if loop finished
        function slideRight(){
            let swiperItems = document.querySelectorAll(".t-item");
            let activeIndex = getActiveIndex(swiperItems)
            if(activeIndex === itemsCount - 1) {
                transitionItem(swiperContainer, initialTransition)
                changeDataActive(swiperItems, initialIndex)
                return;
            }
            let newTransition = transitionNum - sliderWidth;
            transitionItem(swiperContainer, newTransition)
            let newActiveIndex = activeIndex + 1;
            changeDataActive(swiperItems, newActiveIndex)
        }

        // slide to right and add slide if loop finished
        function slideLeft(){
            let swiperItems = document.querySelectorAll(".t-item");
            let activeIndex = getActiveIndex(swiperItems)
            if((activeIndex > 0 && !isMobile) || (isMobile && transitionNum < 0)) {
                let newTransition = transitionNum + sliderWidth;
                transitionItem(swiperContainer, newTransition)
                let newActiveIndex = activeIndex - 1;
                changeDataActive(swiperItems, newActiveIndex)
            } 
        }

        function transitionItem(slider, number){
            transitionNum = number;
            slider.style.transform = `translate(${ number }%)`;
        }


        function getActiveIndex(currentSlider) {
            let currentIndex = 0;
            currentSlider.forEach(function(item, index) {
                if(item.getAttribute("data-type") === "active") {
                    currentIndex = index;
                    return;
                } 
            })
            return parseInt(currentIndex);
        }

        function changeDataActive(currentSlider, newIndex) {
            currentSlider.forEach(function(item, index) {
                if(newIndex === index) {
                    item.setAttribute("data-type", "active")
                    return;
                } 
                item.removeAttribute("data-type")
            })
        }

    }

});