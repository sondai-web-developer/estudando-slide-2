function slide(){
    const wrapper = document.querySelector('[data-slide="wrapper"]');
    const lista = document.querySelector('[data-slide="lista"]');

    let distFinalPosition = 0;
    let distStartX = 0;
    let distMovement = 0;
    let distMovePosition = 0;

    let slideArray = [];

    let slideIndex = {};

    let carousel;

    const prevElement = document.querySelector('[data-arrow-nav="prev"]');
    const nextElement = document.querySelector('[data-arrow-nav="next"]');

    let control;
    let controlArray;

    const changeEvent = new Event('changeEvent');

    function transition(active){
        lista.style.transition = active ? 'transform .3s' : '';
    }

    function moveSlide(distX){
        distMovePosition = distX;
        lista.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    function updatePosition(clientX){
        distMovement = (distStartX - clientX) * 1.6;
        return distFinalPosition - distMovement;
    }

    function onStart(event){
        let movetype;
        if(event.type === 'mousedown'){
            event.preventDefault();
            distStartX = event.clientX;
            movetype = 'mousemove';
        }else{
            distStartX = event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        wrapper.addEventListener(movetype, onMove);
        transition(false);
    }

    function onMove(event){
        const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = updatePosition(pointerPosition);
        moveSlide(finalPosition);
    }

    function onEnd(event){
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        wrapper.removeEventListener(movetype, onMove);
        distFinalPosition = distMovePosition;
        transition(true);
        changeSlideOnEnd();
        distMovement = 0;
    }

    function changeSlideOnEnd(){
        if(distMovement > 120 && slideIndex.next !== undefined){
            activeNextSlide();
        }else if(distMovement < -120 && slideIndex.prev !== undefined){
            activePrevSlide();
        } else {
            changeSlide(slideIndex.active);
        }
    }

    function addSlideEvents(){
        wrapper.addEventListener('mousedown', onStart);
        wrapper.addEventListener('touchstart', onStart);
        wrapper.addEventListener('mouseup', onEnd);
        wrapper.addEventListener('touchend', onEnd);
    }

    /*Slide config*/

    function slidePosition(slide){
        const margin = (wrapper.offsetWidth - slide.offsetWidth) / 2;
        return -(slide.offsetLeft - margin);
    }

    function slidesConfig(){
        slideArray = [...lista.children].map((element) => {
            const position = slidePosition(element);
            return { position, element }
        });

        return slideArray;
    }

    function slideIndexNav(index){
        const slideArray = slidesConfig();
        const last = slideArray.length - 1;

        slideIndex = {
            prev: index ? index - 1 : undefined,
            active: index,
            next: index === last ? undefined : index + 1,
        }
    }

    function changeSlide(index){
        const slideArray = slidesConfig()[index];
        moveSlide(slideArray.position);
        slideIndexNav(index);
        distFinalPosition = slideArray.position;
        wrapper.dispatchEvent(changeEvent);
        checkPrevSlide();
        checkNextSlide();
    }

    function activePrevSlide(){
        if(slideIndex.prev !== undefined) changeSlide(slideIndex.prev);
    }

    function activeNextSlide(){
        if(slideIndex.next !== undefined) changeSlide(slideIndex.next);
    }

    /*Slide config*/

    /*Slide carousel*/

    function startCarousel(){
        const slideTotal = slidesConfig().length - 1;
        carousel = setInterval(() => {
            changeSlide(slideIndex.active);
            slideIndex.active++;

            if(slideIndex.active > slideTotal){
                slideIndex.active = 0;
            }
        }, 5000);
    }

    function stopCarousel(){
        clearInterval(carousel);
    }

    function continueCarousel(){
        startCarousel();
    }

    function addCarouselEvents(){
        window.addEventListener('load', startCarousel);
        wrapper.addEventListener('mouseenter', stopCarousel);
        wrapper.addEventListener('mouseleave', continueCarousel);
        wrapper.addEventListener('touchstart', stopCarousel);
    }

    /*Slide carousel*/

    function debounce(callback, delay) {
        let timer;
        return (...args) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                callback(...args);
                timer = null;
            }, delay);
        };
    }

    function onResize(){
        setTimeout(() => {
            slidesConfig();
            changeSlide(slideIndex.active);
        }, 1000);
    }

    function addResizeEvent(){
        const debouncedOnResize = debounce(onResize, 200);

        window.addEventListener('resize', debouncedOnResize);
    }

    /*Navegação*/

    function activatePrevArrow(){
        prevElement.addEventListener('click', activePrevSlide);
        prevElement.style.opacity = `100%`;
        prevElement.style.cursor = 'pointer';
    }

    function activateNextArrow(){
        nextElement.addEventListener('click', activeNextSlide);
        nextElement.style.opacity = `100%`;
        nextElement.style.cursor = 'pointer';
    }

    function disablePrevArrow(){
        prevElement.removeEventListener('click', activePrevSlide);
        prevElement.style.opacity = `30%`;
        prevElement.style.cursor = 'auto';
    }

    function disableNextArrow(){
        nextElement.removeEventListener('click', activeNextSlide);
        nextElement.style.opacity = `30%`;
        nextElement.style.cursor = 'auto';
    }

    function checkPrevSlide(){
        if(slideIndex.prev === undefined){
            disablePrevArrow();
        }else if(slideIndex.prev !== undefined){
            activatePrevArrow();
        }
    }

    function checkNextSlide(){
        if(slideIndex.next === undefined){
            disableNextArrow();
        }else if(slideIndex.next !== undefined){
            activateNextArrow();
        }
    }
    
    /*Navegação*/

    /*Paginação*/

    function createControl(){
        const control = document.createElement('ul');
        control.dataset.control = 'slide';
        const slideArray = slidesConfig();

        slideArray.forEach((item, index) => {
            control.innerHTML += `<li><a href="#slide${index + 1}">${index + 1}</a></li>`;
        });

        wrapper.appendChild(control);

        return control;
    }

    function eventControl(item, index){
        item.addEventListener('click', (event) => {
            event.preventDefault();
            changeSlide(index);
        });
        wrapper.addEventListener('changeEvent', activeControlItem);
    }

    function activeControlItem(){
        controlArray.forEach(item => item.classList.remove('ativar'));
        controlArray[slideIndex.active].classList.add('ativar');
    }

    function addControl(customControl){
        control = document.querySelector(customControl) || createControl();
        controlArray = [...control.children];
        activeControlItem();
        controlArray.forEach((item, index) => {
            eventControl(item, index);
        });
    }

    /*Paginação*/

    function init(){
        transition(true);
        addSlideEvents();
        slidesConfig();
        addCarouselEvents();
        addResizeEvent();
        changeSlide(0);
        addControl();
    }

    init();
}

slide();