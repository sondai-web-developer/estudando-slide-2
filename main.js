!function(){var e=document.querySelector('[data-slide="wrapper"]');function o(e){console.log("moveu")}document.querySelector('[data-slide="lista"]'),e.addEventListener("mousedown",(function(n){n.preventDefault(),e.addEventListener("mousemove",o),console.log("mousedown")})),e.addEventListener("mouseup",(function(n){console.log("acabou"),e.removeEventListener("mousemove",o)}))}();