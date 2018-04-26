//svg animated js
  
TweenMax.set('svg', {
    visibility: 'visible'
  });
  
  
  var ftl = new TimelineMax({ repeat: -1, yoyo: true, repeatDelay: 2 });
  
  ftl.fromTo('.base-mask', 0.6, { attr:{height: 5} }, { attr:{height: 100}, ease: Power2.easeIn})
    .to('.base-mask', 0.4, { attr:{height: 228}, ease: Power2.easeOut})
    .fromTo('.sidebars-mask', 0.6, { attr:{height: 5} }, { attr:{height: 100}, ease: Power2.easeIn}, "-=0.8")
    .to('.sidebars-mask', 0.4, { attr:{height: 166}, ease: Power2.easeOut}, "-=0.2")
    .from('.fback-p-transp', 1, { y: 200, ease: Elastic.easeOut.config(0.9, 0.8) }, "-=0.6")
    .from('.fback-p', 0.6, { y: 200, ease: Power2.easeInOut }, "-=1.0" )
    .from('.fback-c-transp', 1, { y: 285, ease: Elastic.easeOut.config(0.9, 0.8) }, "-=0.9")
    .from('.fback-c', 0.6, { y: 285, ease: Power2.easeInOut }, "-=1.0" )
    .from('.fback-l', 0.6, { y: 158, ease: Power2.easeInOut }, "-=1" )
    .from('.fback-r', 0.6, { y: 208, ease: Power2.easeInOut }, "-=0.9" )
    .from('.vs', 0.6, { y:100, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.5")
    .from('.fyear-l', 0.6, { x:20, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.5")
    .from('.fyear-r', 0.6, { x:-20, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.6")
    .from('.totals-base-circ', 0.3, { scale: 0, transformOrigin: '50% 50%' }, "-=0.7")
    .to('.totals-base-circ', 0.6, { morphSVG:'.totals-base', ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.5")
    .from('.totals-title', 0.3, { opacity: 0 }, "-=0.6")
    .from('.total-l', 0.6, { x:20, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.5")
    .from('.total-r', 0.6, { x:-20, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.6")
    .from('.fup', 0.6, { y: 20, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.5")
    .from('.fperc', 0.6, { y: 20, opacity: 0, ease: Elastic.easeOut.config(1.1, 0.7) }, "-=0.5")
     
  
  
  /*  ==========================================================================
      SLIDER
      ========================================================================== */  
  
  var $slider = $('#slider'),
      sliderValue = { value: 0 };
  
  $slider.slider({
    range: false,
    min: 0,
    max: 100,
    step: .1,
    start: function() {
      ftl.pause();
    },
    slide: function(event, ui) {
      ftl.progress(ui.value / 100);
    },
    stop: function() {
      ftl.play();
    }
  });
  
  ftl.eventCallback("onUpdate", function() {
    sliderValue.value = ftl.progress() * 100;
    $slider.slider(sliderValue);
  });

  //finish