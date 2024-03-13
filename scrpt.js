const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim (){
  var t1 = gsap.timeline();
  t1.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  })
    .to(".boundingElem", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 2,
    delay: -1,
    stagger: .2
  })
  .from("#heroFooter", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut
  })
}
firstPageAnim()

var timeout;
function circleChapta (){
  // define default scale value
  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;
  window.addEventListener("mousemove", function(dets){
    clearTimeout(timeout);

    xScale = gsap.utils.clamp(.8, 1.2, dets.clientX);
    yScale = gsap.utils.clamp(.8, 1.2, dets.clientY);

    xPrev = dets.clientX;
    yPrev = dets.clientY;

    mouseFollow(xScale, yScale);
     timeout = setTimeout(() => {
      document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
    }, 100);
  })
}
circleChapta();

function mouseFollow (xScale, yScale){
  document.querySelector("#main").addEventListener("mousemove", function(dets){
    document.querySelector("#miniCircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale}, ${yScale})`
  })
}
mouseFollow();

document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var rDiff = 0;
  elem.addEventListener("mousemove", function (dets){

    var diff = (dets.clientY - elem.getBoundingClientRect().top);
    // console.log(diff)

    rDiff = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      display: "block",
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20,20, rDiff),
    })
  })

  elem.addEventListener("mouseleave", function (dets){
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      display: "none"
    })
  })
})