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

  $('#drop_lc').fastselect();
  $('#drop_rc').fastselect();
  $('#drop_le').fastselect();
  $('#drop_lw').fastselect();
  $('#drop_re').fastselect();
  $('#drop_rw').fastselect();


  $("#drop_lc, #drop_rc").on("change", function(e) {
    // NProgress.start();
    var chosen_text = $(this).val();
    var side = "l"
    if ($(this)[0].id === "drop_rc") side = "r"
    console.log(side)
    var container = "";
    var img_container = "#zoom_img_"+side;

    if(chosen_text === "Eastern Conference") {
      container = "drop-container_"+side+"w";
      var hide = document.getElementById(container);
      if (hide.style.display !== 'none') {
          hide.style.display = 'none';
      }

      container = "drop-container_"+side+"e";
      var show = document.getElementById(container);
      console.log(show)
      if (show.style.display === 'none') {
          show.style.display = 'block';
      }
      img_url_container = "drop_"+side+"e";
      img_url_div = GetElementInsideContainer(container, img_url_container)
      console.log(img_url_div)
      default_text = $( "#drop_"+side+"e option:selected" ).text();
      img_url = "images/basketball/" + default_text + ".png";
      console.log(img_url)
      $(img_container)[0].setAttribute('src', img_url);
    }

    if(chosen_text === "Western Conference") {
      container = "drop-container_"+side+"e";
      var hide = document.getElementById(container);
      if (hide.style.display !== 'none') {
          hide.style.display = 'none';
      }

      container = "drop-container_"+side+"w";
      var show = document.getElementById(container);
      if (show.style.display === 'none') {
          show.style.display = 'block';
      }
      img_url_container = "drop_"+side+"w";
      img_url_div = GetElementInsideContainer(container, img_url_container)
      console.log(img_url_div)
      default_text = $( "#drop_"+side+"w option:selected" ).text();
      img_url = "images/basketball/" + default_text + ".png";
      console.log(img_url)
      $(img_container)[0].setAttribute('src', img_url);
    }
  });

  // function that replaces the image with the correct one
  // for the NBA project
  $("#drop_le, #drop_lw, #drop_re, #drop_rw").on("change", function(e) {
    NProgress.start();
    var chosen_text = $(this).val();
    console.log(chosen_text)
    var image_url = "images/basketball/" + chosen_text + ".png";
    var img_container = "#zoom_img_r";
    if($(this)[0].id === "drop_le" || $(this)[0].id === "drop_lw") img_container = "#zoom_img_l";

    // change the image to the correct one
    $(img_container)[0].setAttribute('src', image_url);
    toggleZoom();
    function waitFunction() {
      NProgress.done();
    }
    window.setTimeout(waitFunction, 2000);
  });

  function GetElementInsideContainer(containerID, childID) {
    var elm = {};
    var elms = document.getElementById(containerID).getElementsByTagName("*");
    console.log(elms)
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            break;
        }
    }
    return elm;
  }

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
      addZoom("#zoom_img_l");
      addZoom("#zoom_img_r");
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