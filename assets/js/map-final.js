let osm = new ol.layer.Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});

//[LSMap, aspect, dtm, dusaf,faults, ndvi, Plan,population,profile, rivers, roads,slope,tnt ]
var LSMap = new ol.layer.Image({
    title: 'Landslide Susceptibility Map',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_02:LandslideSusceptibilityMap' }
    }),
    visible: true
});




var slope = new ol.layer.Image({
    title: 'Slope',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_02:slope' }
    }),
   
    visible: false
});

var aspect = new ol.layer.Image({
    title: 'Aspect',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:aspect' }
    }),
    visible: false
});

var dtm = new ol.layer.Image({
    title: 'DTM',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:dtm' }
    }),
    visible: false
});

var dusaf = new ol.layer.Image({
    title: 'DUSAF',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:dusaf' }
    }),
    visible: false
});

var faults = new ol.layer.Image({
    title: 'Faults',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:faults' }
    }),
    visible: false
});

var ndvi = new ol.layer.Image({
    title: 'NDVI',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:ndvi' }
    }),
    visible: false
});

var plan = new ol.layer.Image({
    title: 'Plan Curve',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:plan' }
    }),
    visible: false
});

var population = new ol.layer.Image({
    title: 'Population',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:population' }
    }),
    visible: false
});

var profile = new ol.layer.Image({
    title: 'Profile',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:profile' }
    }),
    visible: false
});

var rivers = new ol.layer.Image({
    title: 'Rivers',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:rivers' }
    }),
    visible: false
});

var roads = new ol.layer.Image({
    title: 'Roads',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/wms',
        params: { 'LAYERS': 'gisgeoserver_02:roads' }
    }),
    visible: false
});



/*aspect.on('propertychange', function (e) {
    console.log(e);
    LSMap.getSource().updateParams({ 'STYLES': '	LandslideSusceptibilityMap_reclass_style' })
});
aspect.setVisible(false);*/


var colombiaRivers = new ol.layer.Image({
    title: 'Colombia rivers',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gis:COL_rivers' }
    }),
    minResolution: 1000,
    maxResolution: 5000
});


//Add the layers to layer groups
let basemapLayers = new ol.layer.Group({
    title: "Base Maps",
    layers: [osm]
});
let overlayLayers = new ol.layer.Group({
    title: "Overlay Layers",
    layers: [slope,roads,rivers,profile,population,plan,ndvi,faults,dusaf,dtm,aspect, LSMap]
})

let map = new ol.Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, overlayLayers],
    view: new ol.View({
        center: ol.proj.fromLonLat([9.12, 45.85]),
        zoom: 12
    }),
});


// Add the map controls:
map.addControl(new ol.control.ScaleLine()); //Controls can be added using the addControl() map function
map.addControl(new ol.control.FullScreen());
map.addControl(new ol.control.OverviewMap());
map.addControl(
    new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-control',
        placeholder: '0.0000, 0.0000'
    })
);


//Add the layer switcher control
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);


//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AmLLrl_rk8MTN085CA4BpwMqT52VtwV_0-wo2vkb_msAyoUP7y-C4ILtoGa4nkMd";
var bingRoads = new ol.layer.Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});
var bingAerial = new ol.layer.Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});

//Get the list of basemaps and Extend the list using the .extend() function adding the 2 new layers
basemapLayers.getLayers().extend([bingRoads, bingAerial]);


//Add the Stamen base layers
var stamenWatercolor = new ol.layer.Tile({
    title: 'Stamen Watercolor',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'watercolor'
    })
});
var stamenToner = new ol.layer.Tile({
    title: 'Stamen Toner',
    type: 'base',
    visible: false,
    source: new ol.source.Stamen({
        layer: 'toner'
    })
});
//Get the list of basemaps and Extend the list using the .extend() function adding the 2 new layers
basemapLayers.getLayers().extend([stamenWatercolor, stamenToner]);


// //Add the WFS layer
// let vectorSource = new ol.source.Vector({});
// const vectorLayer = new ol.layer.Vector({
//     title: "Colombia water areas",
//     source: vectorSource,
//     style: new ol.style.Style({
//         stroke: new ol.style.Stroke({
//             color: 'rgb(58, 255, 81)',
//             width: 4
//         })
//     }),
//     zIndex: 10
// });
// overlayLayers.getLayers().extend([vectorLayer]);

// function loadFeatures(response) {
//     vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(response))
// }

// let tnt = new ol.source.Vector({});
// const vectorLayer = new ol.layer.Vector({
//     title: "Test/Train Points",
//     source: tnt,
//     style: new ol.style.Style({
//         stroke: new ol.style.Stroke({
//             color: 'rgb(58, 255, 81)',
//             width: 4
//         })
//     }),
//     zIndex: 10
// });
// overlayLayers.getLayers().extend([vectorLayer]);

// function loadFeatures(response) {
//     tnt.addFeatures(new ol.format.GeoJSON().readFeatures(response))
// }

//var base_url = "https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_02/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=gisgeoserver_02%3Atnt&maxFeatures=50&outputFormat=text%2Fjavascript";
// var wfs_url = base_url;
// wfs_url += "service=WFS&"
// wfs_url += "version=1.1.0&"
// wfs_url += "request=GetMap&"
// wfs_url += "typeName=gis%3ACOL_water_areas&"
// wfs_url += "outputFormat=text%2Fjavascript&"
// wfs_url += "srsname=EPSG:3857&"
// wfs_url += "format_options=callback:loadFeatures"
//$.ajax({ url: wfs_url, dataType: 'jsonp' });


//Add the code for the Pop-up
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var popup = new ol.Overlay({
    element: container
});
map.addOverlay(popup);
//This is the event listener for the map. It fires when a single click is made on the map.
map.on('singleclick', function (event) {
    //This iterates over all the features that are located on the pixel of the click (can be many)
    var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
        return feature;
    });

    //If there is a feature, open the popup by setting a position to it and put the data from the feature
    if (feature != null) {
        var pixel = event.pixel;
        var coord = map.getCoordinateFromPixel(pixel);
        popup.setPosition(coord);
        content.innerHTML =
            '<h5>Colombia Water Areas</h5><br><b>Name: </b>' +
            feature.get('NAME') +
            '</br><b>Description: </b>' +
            feature.get('HYC_DESCRI');
    } else {
        //Only if the aspect layer is visible, do the GetFeatureInfo request
        if (aspect.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = aspect.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (slope.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = slope.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (dtm.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = dtm.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (dusaf.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = dusaf.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (rivers.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = rivers.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (roads.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = roads.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (LSMap.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = LSMap.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (faults.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = faults.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (profile.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = profile.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (population.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = population.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (plan.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = plan.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        if (ndvi.getVisible()) {
            var viewResolution = (map.getView().getResolution());
            var url = ndvi.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });

            if (url) {
                var pixel = event.pixel;
                var coord = map.getCoordinateFromPixel(pixel);
                popup.setPosition(coord);
                //We do again the AJAX request to get the data from the GetFeatureInfo request
                $.ajax({ url: url })
                    .done((data) => {
                        console.log(data);
                        //Put the data of the GetFeatureInfo response inside the pop-up
                        //The data that arrives is in HTML
                        content.innerHTML = data;
                    });
            }
        }
        
        

        
    }

});
//This closes the pop-up when the X button is clicked
closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
};


// Adding map event for pointermove
map.on('pointermove', function (event) {
    var pixel = map.getEventPixel(event.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});


var legend_landslide = document.getElementById("legend_landslide");
var legend_aspect = document.getElementById("legend_aspect");
var legend_slope = document.getElementById("legend_slope");
var legend_dtm = document.getElementById("legend_dtm");
var legend_dusaf = document.getElementById("legend_dusaf");
var legend_river = document.getElementById("legend_rivers");
var legend_road = document.getElementById("legend_roads");
var legend_fault = document.getElementById("legend_faults");
var legend_tnt = document.getElementById("legend_tnt");
var legend_profile = document.getElementById("legend_profile");
var legend_population = document.getElementById("legend_population");
var legend_plan = document.getElementById("legend_plan");
var legend_ndvi = document.getElementById("legend_ndvi");

addEventListener("mousemove", function () {
    switch(LSMap.getVisible()){
        case true:
            legend_landslide.innerHTML =  "<img src='assets/img/legend/landslide.jpg' alt='legend' width=20%>";
            break;
        case false:
            legend_landslide.innerHTML = "";
            break;
    }
    switch(aspect.getVisible()){
        case true:
            legend_aspect.innerHTML =  "<img src='assets/img/legend/aspect.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_aspect.innerHTML = "";
            break;
    }
    switch(slope.getVisible()){
        case true:
            legend_slope.innerHTML =  "<img src='assets/img/legend/slope.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_slope.innerHTML = "";
            break;
    }
    switch(dtm.getVisible()){
        case true:
            legend_dtm.innerHTML =  "<img src='assets/img/legend/dtm.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_dtm.innerHTML = "";
            break;
    }
    switch(dusaf.getVisible()){
        case true:
            legend_dusaf.innerHTML =  "<img src='assets/img/legend/dusaf.jpg ' alt='legend' width='20%'>";
            break;
        case false:
            legend_dusaf.innerHTML = "";
            break;
    }
    switch(rivers.getVisible()){
        case true:
            legend_river.innerHTML =  "<img src='assets/img/legend/rivers.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_river.innerHTML = "";
            break;
    }
    switch(roads.getVisible()){
        case true:
            legend_road.innerHTML =  "<img src='assets/img/legend/roads.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_road.innerHTML = "";
            break;
    }
    switch(faults.getVisible()){
        case true:
            legend_fault.innerHTML =  "<img src='assets/img/legend/faults.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_fault.innerHTML = "";
            break;
    }
    
    switch(profile.getVisible()){
        case true:
            legend_profile.innerHTML =  "<img src='assets/img/legend/profile.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_profile.innerHTML = "";
            break;
    }
    switch(population.getVisible()){
        case true:
            legend_population.innerHTML =  "<img src='assets/img/legend/population.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_population.innerHTML = "";
            break;
    }
    switch(plan.getVisible()){
        case true:
            legend_plan.innerHTML =  "<img src='assets/img/legend/plan.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_plan.innerHTML = "";
            break;
    }
    switch(ndvi.getVisible()){
        case true:
            legend_ndvi.innerHTML =  "<img src='assets/img/legend/ndvi.jpg' alt='legend' width='20%'>";
            break;
        case false:
            legend_ndvi.innerHTML = "";
            break;
    }



});