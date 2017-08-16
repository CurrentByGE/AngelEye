// var citymap = {
//         p1: {
//           center: {lat: 37.7549, lng: -122.4194},
//           population: 100
//         },
//         p2: {
//           center: {lat: 37.7949, lng: -122.4054},
//           population: 200
//         },
//         p3: {
//           center: {lat: 37.7679, lng: -122.4794},
//           population: 300
//         }
//       };
/* Data points defined as an array of LatLng objects */


function initMap() {

    // Create the map
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 37.7516, lng: -122.2005},
        mapTypeId: 'roadmap'
    });

    google.maps.event.addListener(map, 'mousemove', function (event) {
              displayCoordinates(event.latLng);               
          });

    function displayCoordinates(pnt) {

            var lat = pnt.lat();
            lat = lat.toFixed(4);
            var lng = pnt.lng();
            lng = lng.toFixed(4);
            console.log("new google.maps.LatLng(" + lat + ", " + lng + ")");
            heatMVC.push(new google.maps.LatLng(lat, lng));
            
        }

    var heatMVC = new google.maps.MVCArray();

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMVC
    });
    heatmap.setMap(map);


// Construct the circle for each value in citymap
// for (var city in citymap) {
//     // Add the circle for this city to the map
//     var cityCircle = new google.maps.Circle({
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35,
//     map: map,
//     center: citymap[city].center,
//     radius: Math.sqrt(citymap[city].population) * 100
//     });
// }

// Move the fake person
// window.setInterval(function() {
//     for (var city in citymap) {
//         var p = cityCircle.getCenter();
//         var g = p.lat();
//         var m = p.lng();   
//         if(Math.random() > .5)
//         {
//             g += .001;
//             m += .001;
//         }
//         else
//         {
//             g -= .001;
//             g -= .001;
//         }
        
//         cityCircle.setCenter(new google.maps.LatLng(g,m));
//     }  
// }, 1000);
}