var map;
var infowindow;

function initMap() {
    var carytown = {lat: 37.554123, lng: -77.483573}

    var customMapType = new google.maps.StyledMapType(
        [
            {
                elementType: 'labels',
                stylers: [{visibility: 'off'}]
            }
        ],
        {
            name: 'Custom Style'
        }
    );

    map = new google.maps.Map(document.getElementById('map'), {
        center: carytown,
        zoom: 16
    });

    infowindow = new google.maps.InfoWindow({maxWidth: 200});

    customMapTypeId = 'carrytown';

    service = new google.maps.places.PlacesService(map);
    service.radarSearch({
        location: carytown,
        radius: 500,
        types: ['store', 'shoe_store', 'restaurant', 'cafe', 'grocery_or_supermarket', 'clothing_store', 'point_of_interest', 'book_store', 'establishment', 'health']
    }, callback);

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createLabel(results[i]);
        }
    }
}

function createLabel(place) {

    var request = {
        reference : place.reference,
    };

    service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function(details, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var content_list = "<p style='color: #000'>" + details.name + ": </p><ul style='color: #000'>";
            for (var j = 0; j < details.types.length; j++) {
                content_list += '<li>' + details.types[j] + "</li>";
            }
            content_list += '</ul>';
            createMarker(details, content_list);
        } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            setTimeout(function() {
                createLabel(place);
            }, 200);
        }
    });
}

function createMarker(place, content_list) {
    var placeLoc = place.geometry.location;

    var resultColor = colorPicker(place.types[0]);

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        opacity: 0.75,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: resultColor,
            fillOpacity: .5,
            strokeColor: 'white',
            strokeWeight: .5,
            scale: 12
        }
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
        marker.setOpacity(1);
        marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: resultColor,
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: .5,
            scale: 14
        });
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
        marker.setOpacity(.75);
        marker.setIcon({
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: resultColor,
            fillOpacity: .5,
            strokeColor: 'white',
            strokeWeight: .5,
            scale: 12
        });
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(content_list);
        infowindow.open(map, this);
    });
}

function colorPicker(type) {
    switch (type) {
        case 'store':
            return 'blue';
        case 'clothing_store':
            return 'blue';
        case 'shoe_store':
            return 'blue';
        case 'bar':
            return 'green';
        case 'book_store':
            return 'yellow';
        case 'restaurant':
            return 'orange';
        case 'cafe':
            return 'orange';
        case 'meal_delivery':
            return 'orange';
        case 'grocery_or_supermarket':
            return 'purple';
        default:
            return 'grey';
    }
}
