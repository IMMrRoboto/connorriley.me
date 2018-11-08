/*
* Author: Connor Riley
* Zoning map of Richmond, VA
* Version: 1.0
* www.connorriley.me
* Made with Google Maps APIs
* 
*/

//var globalMap;
var places = [];
var richmond = {lat: 37.551441, lng: -77.436056};

function start() {
    initMap('zone-map');
    //createBlankMap('retail-map');
}

function createBlankMap(blankMap) {

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

    var map = new google.maps.Map(document.getElementById(blankMap), {
        center: richmond,
        zoom: 13
    });
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);
}

function initMap(mapID) {

    //var layer = 'toner-lite';

    var map = new google.maps.Map(document.getElementById(mapID), {
        center: richmond,
        zoom: 12
    });

    //globalMap = map;

    customMapTypeId = 'rvazoningmap';

    /*try {
        map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
    } catch(e) {
        console.log(e);
        map.mapTypes.set(layer, new google.maps.StyledMapType());
    }*/
    map.mapTypes.set(customMapTypeId, new google.maps.StyledMapType());
    map.setMapTypeId(customMapTypeId);

    //getShapes(map, 'CARE');
    //getShapes(map, 'Enterprise Zones');
    getHistoric(map);

    map.data.setStyle(function(feature) {
        var id = feature.getId();
        console.log(id);
        var color = id == 'III' || id == '1' ? '#6e9489' : '#FF3800';
        return {
            fillColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: color,
            fillOpacity: 0.5
        };
    });

}

function getShapes(map, str) {
    jQuery.getJSON('inc/'+str+'.geojson', function(data) {
        map.data.addGeoJson(data, {idPropertyName: 'name'});
    });
}

function getHistoric(map) {
    jQuery.getJSON('inc/rows.json', function( data ) {
        console.log(data[0]);
    });
}

/*
function getShapes(map, str, color) {
    color='red';
    jQuery.getJSON('inc/'+str+'.geojson', function( data ) {
        console.log(data);
        var items = [];
        jQuery.each( data.features, function( key, val ) {
            var geometry = val.geometry.coordinates[0][0];
            var name = val.properties.name;
            var coords = [];
            var count = 0;
            jQuery.each( geometry, function( key, val ) {
                var lat = parseFloat(val[1]);
                var lng = parseFloat(val[0]);
                var set = {lat: lat, lng: lng};
                coords.push(set);
                count++;
            });
            console.log(count);
            var poly = new google.maps.Polygon({
                paths: coords,
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: color,
                fillOpacity: 0.35
            });
            poly.setMap(map);
        });

    });

}*/



jQuery(document).ready(function($) {

    start();
    //auto runs on click of default search buttons
    $('#developers-map-wrap input[type="radio"].auto-run').click(function(){
        {
            initMap('developers-map');
        }
    });

    $('#meta-map-wrap input[type="radio"].auto-run').click(function(){
        if ($(this).is(':checked'))
        {
            initMap('meta-map');
            $('button[name=meta-run-button]').fadeOut( "slow" );
        }
    });


    //Activate Map buttons
    $('button[name=run-button]').click(function(){
        initCustomMap();
    });

});
