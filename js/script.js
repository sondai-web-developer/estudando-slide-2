function slide(){
    const wrapper = document.querySelector('[data-slide="wrapper"]');
    const lista = document.querySelector('[data-slide="lista"]');

    let distFinalPosition = 0;
    let distStartX = 0;
    let distMovement = 0;
    let distMovePosition = 0;

    function moveSlide(distX){
        distMovePosition = distX;
        lista.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    function updatePosition(clientX){
        distMovement = (distStartX - clientX) * 1.6;
        return distFinalPosition - distMovement;
    }

    function onStart(event){
        event.preventDefault();
        distStartX = event.clientX;
        wrapper.addEventListener('mousemove', onMove);
    }

    function onMove(event){
        const finalPosition = updatePosition(event.clientX);
        moveSlide(finalPosition);
    }

    function onEnd(event){
        wrapper.removeEventListener('mousemove', onMove);
        distFinalPosition = distMovePosition;
    }

    function addSlideEvents(){
        wrapper.addEventListener('mousedown', onStart);
        wrapper.addEventListener('mouseup', onEnd);
    }

    function init(){
        addSlideEvents();
    }

    init();
}

slide();