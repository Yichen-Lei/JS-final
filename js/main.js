
var mapOpts = {
      center: [40, -75],
      zoom: 11
    };
var map = L.map('map', mapOpts);

var Stamen_TonerLite = L.tileLayer('https://api.mapbox.com/styles/v1/jiazuo/cjv1q09l53b821flit5ckay28/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWljaGVubGVpIiwiYSI6ImNrYTJjcGtrNDAxOWEzbW8zYTUzdDh1c2MifQ.UFxO2xXtWgzbt5AcM5s2Zg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      container: 'after',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
      center: [39.9526, -75.1652],
      zoom: 11
    }).addTo(map);



//boundary polygon style
var myStyle0 = function(feature) {
    return {color:'black',fillColor:"T",weight: 1.5,fillOpacity: 0};
};

//circle marker style
var myStyle = function(feature) {
  switch(feature.properties.STATE) {
    case 1: return {
      color: "#FF766D",
      opacity: 0.8,
      fillOpacity: 1
    };
    case 0: return {
      color: "#DD821F",
      opacity: 0.6,
      fillOpacity: 1
    };
  }
};

$('#count').click(function(){
  removeMarkers();
  $.getJSON('https://raw.githubusercontent.com/Yichen-Lei/JS-final/master/image/Hospitals.geojson',function(data){
      L.geoJson(data,{style: myStyle0}).addTo(map);
      });
});


var removeMarkers = function() {
    map.eachLayer(function (layer) {
    map.removeLayer(layer);
});
var Stamen_TonerLite = L.tileLayer('https://api.mapbox.com/styles/v1/jiazuo/cjv1q09l53b821flit5ckay28/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWljaGVubGVpIiwiYSI6ImNrYTJjcGtrNDAxOWEzbW8zYTUzdDh1c2MifQ.UFxO2xXtWgzbt5AcM5s2Zg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      container: 'after',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
      center: [39.9526, -75.1652],
      zoom: 11
    }).addTo(map);

var Boundary = $.getJSON("https://raw.githubusercontent.com/MUSA-620-Spring-2019/week-10/master/data/City_Limits.geojson",function(limit){
    L.geoJson(limit,{style: myStyle0}).addTo(map);
    });
};


// Show
$('#Show_Hospital').click(function(){
  removeMarkers();
  $.getJSON("https://raw.githubusercontent.com/Yichen-Lei/JS-final/master/image/Hospitals.geojson",
   function(data) {
      L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, myStyle(feature,latlng)).bindPopup('Name: '+feature.properties.HOSPITAL_NAME+"<dd>"+"</dd>"+
          'Address: '+feature.properties.STREET_ADDRESS+"<dd>"+"</dd>"+'ZIP_CODE: '+feature.properties.ZIP_CODE+"<dd>"+"</dd>"+'Phone: '+feature.properties.PHONE_NUMBER+"<dd>"+"</dd>"+'Type: '+feature.properties.HOSPITAL_TYPE);
        }
      }).addTo(map);
  });
});

$('#Show_Clinic').click(function(){
  removeMarkers();
  $.getJSON("https://raw.githubusercontent.com/Yichen-Lei/JS-final/master/image/Flu_shot.geojson",
   function(data) {
      L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, myStyle(feature,latlng)).bindPopup('Name: '+feature.properties.FACILITY_NAME+"<dd>"+"</dd>"+
          'Address: '+feature.properties.ADDRESS+"<dd>"+"</dd>"+'ZIP_CODE: '+feature.properties.ZIP+"<dd>"+"</dd>"+'Phone: '+feature.properties.PHONE_NUMBER+"<dd>"+"</dd>"+'Type: '+feature.properties.FACILITY);
        }
      }).addTo(map);
  });
});


$('#Hide_All').click(function(){
	removeMarkers();
	});

  //Filter hospital
  $('#mySelect').change(function(){
      removeMarkers()
      var value = $(this).val();
      $.getJSON("https://raw.githubusercontent.com/Yichen-Lei/JS-final/master/image/Hospitals.geojson",
       function(data) {
          L.geoJson(data, {
              pointToLayer: function(feature, latlng) { if (feature.properties.HOSPITAL_TYPE==value)
                { return L.circleMarker(latlng, myStyle(feature,latlng)).bindPopup('Name: '+feature.properties.HOSPITAL_NAME+"<dd>"+"</dd>"+
                'Address: '+feature.properties.STREET_ADDRESS+"<dd>"+"</dd>"+'ZIP_CODE: '+feature.properties.ZIP_CODE+"<dd>"+"</dd>"+'Phone: '+feature.properties.PHONE_NUMBER+"<dd>"+"</dd>"+'Type: '+feature.properties.HOSPITAL_TYPE);}
                }
          }).addTo(map);
      });
  });

  //Filter clinic
  $('#mySelect1').change(function(){
      removeMarkers()
      var value = $(this).val();
      $.getJSON("https://raw.githubusercontent.com/Yichen-Lei/JS-final/master/image/Flu_shot.geojson",
       function(data) {
          L.geoJson(data, {
              pointToLayer: function(feature, latlng) { if (feature.properties.FACILITY==value)
                { return L.circleMarker(latlng, myStyle(feature,latlng)).bindPopup('Name: '+feature.properties.FACILITY_NAME+"<dd>"+"</dd>"+
                'Address: '+feature.properties.ADDRESS+"<dd>"+"</dd>"+'ZIP_CODE: '+feature.properties.ZIP+"<dd>"+"</dd>"+'Phone: '+feature.properties.PHONE_NUMBER+"<dd>"+"</dd>"+'Type: '+feature.properties.FACILITY);}
                }
          }).addTo(map);
      });
  });
