$('.home.index').ready(function() {
  var animate, switch_east, switch_west, zoom;

  // grab an element
  var header_elem = document.querySelector("header");
  // construct an instance of Headroom, passing the element
  var headroom  = new Headroom(header_elem, {
    "tolerance" : {
      up : 20,
      down : 0
    }
  });
  headroom.init(); 

  // scroll to the right place when clicking links
  $('a.page-scroll').bind('click', function(e) {
    var link_text = $(this)[0].innerText;
    if(link_text === "Contact" || link_text === "Projects") {
      $('html, body').scrollTop($($(this).attr('href')).offset().top - 100 + 'px');
    } else {
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 70 + 'px' }, 800, 'linear');
    }
  });

  $('#drop_e').fastselect();
  $('#drop_w').fastselect();

  // function that replaces the image with the correct one
  // for the NBA project
  $("#drop_e, #drop_w").on("change", function(e) {
    NProgress.start();
    var chosen_text = $(this).val();
    var image_url = "images/" + chosen_text + ".png";
    var img_container = "#zoom_img_w";
    if($(this)[0].id === "drop_e") img_container = "#zoom_img_e";

    // change the image to the correct one
    $(img_container)[0].setAttribute('src', image_url);
    toggleZoom();
    function waitFunction() {
      NProgress.done();
    }
    window.setTimeout(waitFunction, 2000);
  });

  // zoom functions
  var zoom_active = true;
  removeZoom = function() {
    if ($('.navbar').width() < 767) {
      zoom_active = false;
      // Remove zoom container from DOM
      $('.zoomContainer').remove();
    }
  };

  addZoom = function(elem_id) {
    $(elem_id).elevateZoom({
      zoomWindowPosition: 1,
      zoomWindowOffetx: -250,
      zoomWindowFadeIn: 500,
      zoomWindowFadeOut: 500,
      zoomWindowWidth: 250,
      zoomWindowHeight: 250
    });
  };

  addZoomWrapper = function() {
    if($('.navbar').width() > 767) {
      // Add zoom containers to DOM
      zoom_active = true;
      addZoom("#zoom_img_e");
      addZoom("#zoom_img_w");
    }  
  };

  toggleZoom = function() {
    addZoomWrapper();
    $(window).resize(function() {
      console.log("Dirk");
      if(zoom_active === true) {
        removeZoom();
      } else {
        addZoomWrapper();
      }
    });
  };

  // initially call toggleZoom
  toggleZoom();

});