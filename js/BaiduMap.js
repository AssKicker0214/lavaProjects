/**
 * Created by ian0214 on 2017/6/12.
 */
var baiduMap = new AbstractMap("baidu");
baiduMap.convertor = new BMap.Convertor();
baiduMap.scaleControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
baiduMap.zoomControl = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM});

baiduMap.init = function () {
    this.map = new BMap.Map("baidu-map");
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    // this.map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
    this.map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
};

baiduMap.getCenter = function () {
    var point = this.map.getCenter();
    return {lat: point.lat, lng: point.lng};
};

baiduMap.setCenter = function (latLngLiteral) {
    this.convertor.translate([new BMap.Point(latLngLiteral.lng, latLngLiteral.lat)], 3, 5, function (data) {
        baiduMap.map.setCenter(data.points[0]);
        console.log("baidu set center: " + data.points[0].lat + "," + data.points[0].lng);
    });
};

baiduMap.setDragEndHandler = function (handler) {
    this.map.addEventListener('dragend', handler);
};

baiduMap.setZoomChangeHandler = function (handler) {
    this.map.addEventListener('zoomend', handler);
};

baiduMap.refreshDisplay = function () {
    var states = this.displayModel;
    if(states.scaleOn.isOn){
        this.map.addControl(this.scaleControl);
    }else{
        this.map.removeControl(this.scaleControl);
    }

    if(states.zoomOn.isOn){
        this.map.addControl(this.zoomControl);
    }else{
        this.map.removeControl(this.zoomControl);
    }
};

// 百度地图的缩放级别相当于谷歌和高德-1
baiduMap.setZoomLevel = function (zoomLevel) {
    this.map.setZoom(zoomLevel+1);
    // console.log("baidu zoom="/)
};

baiduMap.getZoomLevel = function () {
    return this.map.getZoom()-1;
};