(()=>{"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}!function(){var t,n=document.querySelector('[data-slide="wrapper"]'),r=document.querySelector('[data-slide="lista"]'),o=0,a=0,i=0,u=0;function c(e){i=e,r.style.transform="translate3d(".concat(e,"px, 0, 0)")}function s(e){var t;"mousedown"===e.type?(e.preventDefault(),a=e.clientX,t="mousemove"):(a=e.changedTouches[0].clientX,t="touchmove"),n.addEventListener(t,d)}function d(e){var t="mousemove"===e.type?e.clientX:e.changedTouches[0].clientX;c(o-1.6*(a-t))}function l(e){var t="mouseup"===e.type?"mousemove":"touchmove";n.removeEventListener(t,d),o=i}function f(){return(t=r.children,function(t){if(Array.isArray(t))return e(t)}(t)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).map((function(e){var t,r;return{position:(t=e,r=(n.offsetWidth-t.offsetWidth)/2,-(t.offsetLeft-r)),element:e}}));var t}function m(e){var t=f()[e];c(t.position),f().length,o=t.position}function v(){clearInterval(t)}m(0),t=setInterval((function(){++u>f().length-1&&(u=0),m(u)}),5e3),n.addEventListener("mousedown",s),n.addEventListener("touchstart",s),n.addEventListener("mouseup",l),n.addEventListener("touchend",l),n.addEventListener("mouseenter",v),n.addEventListener("touchstart",v),f()}()})();