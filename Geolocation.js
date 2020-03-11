function Geolocation(map) {
  var locations = [
    'Estácio, Rio de Janeiro',
    'Oswaldo Cruz, Rio de Janeiro',
    'Engenho da Rainha, Rio de Janeiro',
    'Guadalupe, Rio de Janeiro',
    'Lins de Vasconclos, Rio de Janeiro',
    'Gogó da Ema, Rio de Janeiro',
    'Ilha do Fundão, Rio de Janeiro'
  ];
  var geocoder = new google.maps.Geocoder();
  var marker, count, endereco;
  var x = 0
  for (count = 0; count < locations.length; count++) {
    endereco = locations[x];
    geocoder.geocode({ address: endereco }, function (results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    x++;
  }
}

function initMap() {
  var center = { lat: -22.8576, lng: -43.2004 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: center
  });
  Geolocation(map);
}


