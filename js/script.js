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

        wrapper.addEventListener('mouseenter', stopCarousel);
        wrapper.addEventListener('mouseleave', continueCarousel);
        wrapper.addEventListener('touchstart', stopCarousel);
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

    /*Slide carousel*/

    function init(){
        transition(true);
        addSlideEvents();
        slidesConfig();
        changeSlide(0);
        startCarousel();
    }

    init();
}

slide();