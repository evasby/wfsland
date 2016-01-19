$(document).ready(function(){
  /***********************************/
  /***********************************/
  /***********************************/
  /***********************************/
  /***********************************/
  $('.up').click(function(e){
    e.preventDefault();
    $.scrollTo($(this).attr('href'), 400);
  });
  /***********************************/
  $('.menu_link').each(function(){
    $(this).click(function(e){
      e.preventDefault();
      $.scrollTo('#' + $(this).attr('href'), 400);
    });
  });
  /***********************************/
  /***********************************/
  /***********************************/
  /***********************************/
  var waypointUp = new Waypoint({
    element: document.getElementById('about'),
    handler: function(direction) {
      if (direction == 'down') {
         $('.up').addClass('up__show');
      } else {
         $('.up').removeClass('up__show');
      }
    }
  })
  /*TEMP******************************/
  $('header .button').colorbox({
    inline: true,
    href: "#popupFeedback",
  });

  
  /***********************************/
  $(".menu_toggle").click(function() {
    $(this).toggleClass("menu_toggle__on");
    //$(".main-mnu").slideToggle();
    $(".menu").toggleClass("menu__on");
    return false;
  });
  function heightDetect() {
    $(".header").css("height", $(window).height());
  };
  heightDetect();
  $(window).resize(function() {
    heightDetect();
  });
  /***********************************/
  $('[data-type="background"]').each(function(){
      var $bgobj = $(this); // создаем объект
      $(window).scroll(function() {
          var yPos = -($(window).scrollTop() / $bgobj.data('speed')); // вычисляем коэффициент 
          // Присваиваем значение background-position
          var coords = 'center '+ yPos + 'px';
          // Создаем эффект Parallax Scrolling
          $bgobj.css({ backgroundPosition: coords });
      });
  });

  $('.slider_list').bxSlider({
    mode: 'fade',
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    pager: true,
    controls: false
    //auto: true,
    //pause: 5000,
  });
  $('.clients_list').bxSlider({
    slideWidth: 181,
    minSlides: 1,
    maxSlides: 5,
    moveSlides: 1,
    pager: false,
    auto: true,
    slideMargin: 38,
    pause: 5000,
    autoHover: true,
    easing: 'linear'
  });
  /************************************************************************/
  var map;
  var myLatlng = new google.maps.LatLng(53.907179, 27.484561);
  var myCenter = new google.maps.LatLng(53.911500, 27.484561);
  function initialize() {
    var styles = [
      /*{
        stylers: [
          { hue: "#cccccc" },
          { saturation: -120 }
        ]
      },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }*/
    ];
    var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});
    var mapOptions = {
      zoom: 15,
      //center: new google.maps.LatLng(53.905497, 27.558681)
      center: myCenter,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    map = new google.maps.Map(document.getElementById('footer'),
        mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Webformat",
        icon: '../images/footer-marker.png'
    });
    marker.setMap(map);
    var contentString = '<div class="footer_wrap"><div class="footer_phone">+375 (44) <span>732 05 09</span></div><div class="footer_address"><b>г.Минск</b><br>ул. Притыцкого 29 оф 522</div><img src="../images/footer-wfs.png" alt="" /></div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infowindow.open(map,marker);


    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
  }
  google.maps.event.addDomListener(window, 'load', initialize);
  /************************************************************************/
});