function slide(){
    const wrapper = document.querySelector('[data-slide="wrapper"]');
    const lista = document.querySelector('[data-slide="lista"]');

    function onStart(event){
        event.preventDefault();
        wrapper.addEventListener('mousemove', onMove);
        console.log('mousedown');
    }

    function onMove(event){
        console.log('moveu');
    }

    function onEnd(event){
        console.log('acabou');
        wrapper.removeEventListener('mousemove', onMove);
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