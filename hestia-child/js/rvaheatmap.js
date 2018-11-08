/*
* Author: Connor Riley
* Heat Maps of Richmond, VA
* Version: 1.0
* www.connorriley.me
* Made with Google Maps APIs
*
*/
var globalMap;
var heatmap;
var infowindow;
var service;
var richmond = {lat: 37.551441, lng: -77.436056};

function start() {
    initMap('developers-map');
    createBlankMap('retail-map');
    createBlankMap('office-map');
    createBlankMap('public-map');
    createBlankMap('todo-map');
    createBlankMap('meta-map');
    createBlankMap('custom-map');
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

    var customMapType = new google.maps.StyledMapType(
        [
            {
                elementType: 'labels',
                stylers: [{visibility: 'on'}]
            }
        ],
        {
            name: 'Custom Style'
        }
    );

    var map = new google.maps.Map(document.getElementById(mapID), {
        center: richmond,
        zoom: 13
    });

    globalMap = map;

    infowindow = new google.maps.InfoWindow({maxWidth: 200});

    customMapTypeId = 'rvaheatmap';
    var selector = typeSelector(mapID);
    var types = selector[0];
    var keyword = selector[1];

    service =new google.maps.places.PlacesService(map);
    if(keyword != '') {
        service.radarSearch({
            location: richmond,
            radius: 5000,
            keyword: keyword
        }, callback);
    } else {
        service.radarSearch({
            location: richmond,
            radius: 5000,
            types: types
        }, callback);
    }

    var showBikeLanes = jQuery('#todo-bikelanes-select').prop("checked");

    if(mapID === 'todo-map' && showBikeLanes) {
        var bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map);
    }
    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

}

function initCustomMap() {
    var richmond = {lat: 37.551441, lng: -77.436056};

    var customMapType = new google.maps.StyledMapType(
        [
            {
                elementType: 'labels',
                stylers: [{visibility: 'on'}]
            }
        ],
        {
            name: 'Custom Style'
        }
    );

    var map = new google.maps.Map(document.getElementById('custom-map'), {
        center: richmond,
        zoom: 13
    });

    globalMap = map;

    infowindow = new google.maps.InfoWindow({maxWidth: 200});

    customMapTypeId = 'rvaheatmap';

    var keyword = jQuery('#user-keyword').val();


    service = new google.maps.places.PlacesService(map);
    service.radarSearch({
        location: richmond,
        radius: 5000,
        keyword: keyword
    }, callback);

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

}

function typeSelector(mapID) {
    var searchString = '#'+mapID+'-wrap input[name='+mapID+'-layer-scheme]:checked';
    var selected = jQuery(searchString).val();
    switch(selected){
            //Developers
        case 'booze':
            return [['bar', 'liquor_store', 'night_club'],''];
        case 'coffee':
            return ['','coffee'];
        case 'grocery':
            return [['grocery_or_supermarket'], ''];
        case 'gym':
            return [['gym'], ''];
        case 'restaurant':
            return [['restaurant', 'cafe', 'bakery', 'meal_takeaway'], ''];
        case 'parking':
            return [['parking'], ''];
            ///Retail
        case 'retail-all':
            return [['bakery', 'restaurant', 'cafe', 'food', 'grocery_or_supermarket', 'meal_delivery', 'meal_takeaway',
                     'beauty_salon', 'bicycle_store', 'book_store', 'car_dealer', 'florist', 'hair_care', 'movie_rental',
                     'pharmacy', 'shopping_mall', 'store', 'clothing_store', 'convenience_store', 'department_store',
                     'electronics_store', 'furniture_store', 'hardware_store', 'home_goods_store', 'jewelry_store',
                     'pet_store', 'shoe_store', 'liquor_store', 'beauty_salon', 'car_rental', 'hair_care', 'movie_rental',
                     'pharmacy', 'spa'],''];
        case 'retail-food':
            return [['bakery', 'restaurant', 'cafe', 'grocery_or_supermarket', 'meal_delivery', 'meal_takeaway', 'food'],''];
        case 'retail-goods':
            return [['beauty_salon', 'bicycle_store', 'book_store', 'car_dealer', 'florist', 'hair_care', 'movie_rental',
                     'pharmacy', 'shopping_mall', 'clothing_store', 'department_store',
                     'electronics_store', 'furniture_store', 'hardware_store', 'home_goods_store', 'jewelry_store',
                     'pet_store', 'shoe_store', 'liquor_store', 'convenience_store', 'store'], ''];
        case 'retail-service':
            return [['beauty_salon', 'car_rental', 'hair_care', 'movie_rental', 'spa', 'pharmacy' ], ''];
            //Office
        case 'office-other':
            return [['accounting', 'dentist', 'finance', 'physiotherapist', 'real_estate_agency', 'travel_agency'],''];
        case 'office-finance':
            return ['','finance'];
        case 'office-marketing':
            return ['', 'marketing'];
        case 'office-advertising':
            return ['', 'advertising'];
        case 'office-architect':
            return ['', 'architect'];
        case 'office-web':
            return ['','web'];
        case 'office-doctor':
            return [['doctor'],''];
        case 'office-lawyer':
            return [['lawyer'], ''];
            //Public
        case 'public-all':
            return [['school', 'city_hall', 'courthouse', 'embassy', 'fire_station', 'local_government_office', 'police',
                     'cemetery', 'church', 'hindu_temple', 'mosque', 'place_of_worship', 'synagogue', 'dentist', 'doctor',
                     'hospital'],''];
        case 'public-schools':
            return [['school'],''];
        case 'public-government':
            return [['city_hall', 'courthouse', 'embassy', 'fire_station', 'local_government_office', 'police'], ''];
        case 'public-religious':
            return [['cemetery', 'church', 'hindu_temple', 'mosque', 'synagogue', 'place_of_worship'], ''];
        case 'public-medical':
            return [['dentist', 'hospital', 'doctor'], ''];
            //Todo
        case 'todo-all':
            return [['amusement_park', 'aquarium', 'art_gallery', 'bowling_alley', 'casino', 'night_club', 'museum', 'zoo',
                     'gym', 'bicycle_store', 'health', 'stadium', 'campground', 'park', 'rv_park'],''];
        case 'todo-amusement':
            return [['amusement_park', 'aquarium', 'bowling_alley', 'casino', 'night_club', 'museum', 'zoo',
                     'stadium', 'art_gallery'],''];
        case 'todo-fitness':
            return [['gym', 'bicycle_store', 'stadium'], ''];
        case 'todo-greenspace':
            return [['campground', 'park', 'rv_park'], ''];
            //meta
        case 'meta-office':
            return [['accounting', 'dentist', 'finance', 'physiotherapist', 'real_estate_agency',
                     'travel_agency', 'doctor', 'lawyer'],''];
        case 'meta-retail':
            return [['bakery', 'restaurant', 'cafe',  'grocery_or_supermarket', 'meal_delivery', 'meal_takeaway',
                     'beauty_salon', 'bicycle_store', 'book_store', 'car_dealer', 'florist', 'hair_care', 'movie_rental',
                     'pharmacy', 'shopping_mall', 'spa', 'store', 'clothing_store', 'convenience_store', 'department_store',
                     'electronics_store', 'furniture_store', 'hardware_store', 'home_goods_store', 'jewelry_store',
                     'pet_store', 'shoe_store', 'liquor_store', 'beauty_salon', 'car_rental', 'hair_care', 'movie_rental',
                     'food', 'pharmacy'],''];
        case 'meta-public':
            return [['school', 'city_hall', 'courthouse', 'embassy', 'fire_station', 'local_government_office', 'police',
                     'cemetery', 'church', 'hindu_temple', 'mosque', 'synagogue', 'place_of_worship', 'hospital'],''];
            ///Custom
        case 'other':
            var kw = jQuery('#user-keyword').val();
            return ['', kw];
            //Default to none
        default:
            return [[''],''];
    }

}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var places = [];
        for (var i = 0; i < results.length; i++) {
            places[i] = results[i].geometry.location;
        }
//        createHeatMap(map);
        generateHeatMap(places);
    }
}

//function createHeatMap(globalMap) {
//    heatmap = new google.maps.visualization.HeatmapLayer({
//        data: places,
//        map: map
//    });
//    console.log(places);
//    heatmap.set('radius',25);
//    places = [];
//}

function generateHeatMap(places) {
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: places,
        map: globalMap
    });
    try {
        var oldData = heatmap.getData().j;
        var newData = oldData.concat(places);
    } catch(e) {
        var newData = places;
    }
    heatmap.setData(newData);
    heatmap.set('radius',25);
//    search(++searchNumG);
}

jQuery(document).ready(function($) {
    //auto runs on click of default search buttons
    $('#developers-map-wrap input[type="radio"].auto-run').click(function(){
        {
            initMap('developers-map');
        }
    });

    $('#retail-map-wrap input[type="radio"].auto-run').click(function(){
        if ($(this).is(':checked'))
        {
            initMap('retail-map');
            $('button[name=retail-run-button]').fadeOut( "slow" );
        }
    });

    $('#office-map-wrap input[type="radio"].auto-run').click(function(){
        if ($(this).is(':checked'))
        {
            initMap('office-map');
            $('button[name=office-run-button]').fadeOut( "slow" );
        }
    });

    $('#public-map-wrap input[type="radio"].auto-run').click(function(){
        if ($(this).is(':checked'))
        {
            initMap('public-map');
            $('button[name=public-run-button]').fadeOut( "slow" );
        }
    });

    $('#todo-map-wrap input[type="radio"].auto-run').click(function(){
        if ($(this).is(':checked'))
        {
            initMap('todo-map');
            $('button[name=todo-run-button]').fadeOut( "slow" );
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

    $('button[name=retail-run-button]').click(function(){
        initMap('retail-map');
        $(this).fadeOut( "slow" );
    });

    $('button[name=office-run-button]').click(function(){
        initMap('office-map');
        $(this).fadeOut( "slow" );
    });

    $('button[name=public-run-button]').click(function(){
        initMap('public-map');
        $(this).fadeOut( "slow" );
    });

    $('button[name=todo-run-button]').click(function(){
        initMap('todo-map');
        $(this).fadeOut( "slow" );
    });

    $('button[name=meta-run-button]').click(function(){
        initMap('meta-map');
        $(this).fadeOut( "slow" );
    });

    //Runs on bike lanes click
    $('#todo-bikelanes-select').click(function(){
        initMap('todo-map');
    });

    //runs custom search on enter key press
    $('#user-keyword').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
        {
            initCustomMap();
        }
    });
    
    $('.panel-title a').click(function(){$(this).parent().delay(500).slideUp(1000)});
});
