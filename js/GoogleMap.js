/**
 * Created by ian0214 on 2017/6/11.
 */
var googleMap = new AbstractMap("google");
googleMap.init = function (mapContainer, options) {
    this.map = new google.maps.Map(mapContainer, options);
};

googleMap.getCenter = function () {
    var gLatLng = this.map.getCenter();
    var latLngLiteral = {lat: gLatLng.lat(), lng: gLatLng.lng()};
    return latLngLiteral;
};

// latLngLiteral 格式 {lat: , lng: }
googleMap.setCenter = function (latLngLiteral) {
    console.log("google setCenter: "+latLngLiteral.lat+","+latLngLiteral.lng);
    this.map.setCenter(latLngLiteral);
};

googleMap.setDragEndHandler = function (dragEndHandler) {
    this.map.addListener('dragend', dragEndHandler);
};

googleMap.setZoomChangeHandler = function (handler) {
    this.map.addListener('zoom_changed', handler);
};

googleMap.refreshDisplay = function () {
    var states = this.displayModel;
    var options = {
        scaleControl : states.scaleOn.isOn,
        zoomControl : states.zoomOn.isOn
    };
    this.map.setOptions(options);
};

googleMap.setZoomLevel = function (zoomLevel) {
    this.map.setZoom(zoomLevel);
};

googleMap.getZoomLevel = function () {
    return this.map.getZoom();
};
