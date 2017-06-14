/**
 * Created by ian0214 on 2017/6/8.
 */
// 对于接口实现没有提供编程上的检查机制，请遵循注释和文档（如果有的话）
// M in MVC
function AbstractMap(mapInitOptions) {
    this.name = mapInitOptions;

    //封装map，此处map可能为高德、谷歌、百度。由init函数赋值。
    this.map = null;

    //初始化地图赋值
    this.init = function () {
        this.AbstractFunctionNotOverrideException("init");
    };

    //latLngLiteral = {lat: , lng: }
    this.setCenter = function (latLngLiteral) {
        this.AbstractFunctionNotOverrideException("setCenter");
    };

    //获取地图中心点坐标，返回示例return {lat:0, lng:0}
    this.getCenter = function () {
        this.AbstractFunctionNotOverrideException("getCenter");
    };

    this.setZoomLevel = function (zoomLevel) {
        this.AbstractFunctionNotOverrideException("setZoomLevel");
    };

    this.getZoomLevel = function () {
        this.AbstractFunctionNotOverrideException("getZoomLevel");
    };

    this.refreshDisplay = function () {
        this.AbstractFunctionNotOverrideException("refreshDisplay");
    };

    this.setDragEndHandler = function (handler) {
        this.AbstractFunctionNotOverrideException("setDragEndHandler");
    };

    this.applyInitOptions = function (mapInitOptions) {
        alert("抽象方法applyInitOptions没有实现");
    };

    this.AbstractFunctionNotOverrideException = function (functionName) {
        alert("抽象函数"+functionName+"没有实现");
        throw new Error("抽象函数"+functionName+"没有实现");
    };

    this.updateCenterPosition = function (latLngLiteral) {
        this.centerPosition = latLngLiteral;
        this.setCenter(latLngLiteral);
    };

    this.updateZoomLevel = function(zoomLevel){
        this.zoomLevel = zoomLevel;
        this.setZoomLevel(zoomLevel);
    }
}



var MapModel = {
    // {lat: , lng: }
    centerPosition : {},

    displayModel : {},

    // 显示级别，aka 缩放级别
    zoomLevel : 12,


    updateDisplayModel : function (displayModel) {
        this.displayModel = displayModel;
    }

};

AbstractMap.prototype = MapModel;
AbstractMap.prototype.constructor = AbstractMap;



// AbstractMap.prototype = MapModel;
// AbstractMap.prototype.constructor = AbstractMap;
// alert(new AbstractMap().init());
function MapInitOptions(){
    this.scaleControl = null;
    this.zoomControl = null;
}
