$(document).ready(function(){
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
  $('.slider_list').bxSlider({
    //slideWidth: 181,
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
    slideMargin: 45,
    pause: 5000,
    autoHover: true,
    easing: 'linear'
  });
  /************************************************************************/
  var map;
  var myLatlng = new google.maps.LatLng(53.907179, 27.484561);
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
      center: myLatlng,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };
    map = new google.maps.Map(document.getElementById('footer'),
        mapOptions);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Webformat"
    });
    marker.setMap(map);
    var contentString = '<div class="main9_wrap"><img src="http://landing.wfs.by/sites/all/themes/landing/image/webformat.png" alt="" /><div class="main9_text">+375 44 732 05 09<br>г.Минск Притыцкого 29 оф 522</div></div>';
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