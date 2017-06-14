/**
 * Created by ian0214 on 2017/6/12.
 */
var districtLevelConverter = {
    districtToLevel: function(district) {
        var levelNum = NaN;
        if(district === "province"){
            levelNum = 8;
        }else if(district === "city"){
            levelNum = 10;
        }else if(district === "district"){
            levelNum = 12;
        }
        return levelNum;
    }
};

// 将来考虑单例模式
function MapController() {
    var self = this;

    // 子控制器
    this.sourceController = null;
    this.displayController = null;
    this.navigationController = null;

    // mapModels 应为只读属性
    this.mapModels = [];
    this.currentMap = null;

    // 高德行政区域查询对象
    var district = new AMap.DistrictSearch({
            subdistrict: 1,   //返回下一级行政区
            level: 'city',
            showbiz: false  //查询行政级别为 市
        }
    );

    // 控制器初始化，统一各个地图的状态,加载行政区域查询组件
    this.init = function () {
        this.mapModels.forEach(function (mapModel, p2, p3) {
            mapModel.updateZoomLevel(10);
            mapModel.updateCenterPosition({lat: 39.904989, lng: 116.405285});
        });

        this.displayController.refreshDisplay();
        this.enableDistrictSearch();
    };

    // 中心地址，逆地理编码
    var updateCenterPlace = function (latLngLiteral) {
        var displayText = "请选择";
        $.ajax({ //逆地理编码
                type: 'Post',
                url: 'http://restapi.amap.com/v3/geocode/regeo?',
                data: {'key': 'bfa27e6685b1b0251c29a7543f4c849d', 'location': latLngLiteral.lng + "," + latLngLiteral.lat},
                complete: function (re) {
                    var returnJson = $.parseJSON(re.responseText);
                    var addressComponent = returnJson.regeocode.addressComponent;
                    var zoom = self.mapModels[0].zoomLevel;
                    if (zoom <= 5) {
                        displayText = addressComponent.province;
                    } else if (zoom > 5 && zoom <= 9) {
                        if (city === '') {
                            displayText = addressComponent.province;
                        } else {
                            displayText = addressComponent.city;
                        }
                    } else if (zoom > 9) {
                        displayText = addressComponent.district;
                    }

                    $('#navigation_input').val(displayText);
                }
            }
        )
    };

    // 设置地图模型，并添加监听器
    this.setMapModels = function (mapModels) {
        this.mapModels = mapModels;
        // 注册监听事件
        this.mapModels.forEach(function (map, index, maps) {
            // 拖拽监听
            map.setDragEndHandler(function () {
                var latLngLiteral = map.getCenter();
                // debug
                console.log("拖拽：中心坐标="+JSON.stringify(latLngLiteral));

                // 更新中心地点（左上角显示）
                updateCenterPlace(latLngLiteral);

                maps.forEach(function (p1, p2, p3) {
                    // 更新其他的地图模型，事件源的地图模型由api自己维护
                    if (p1 !== map) {
                        p1.updateCenterPosition(latLngLiteral);
                    }
                })
            });

            // 缩放级别监听
            map.setZoomChangeHandler(function () {
                var zoomLevel = map.getZoomLevel();
                // map.updateCenterPosition(latLngLiteral);
                maps.forEach(function (p1, p2, p3) {
                    // 更新其他的地图模型，事件源的地图模型由api自己维护
                    if (p1 !== map) {
                        p1.updateZoomLevel(zoomLevel);
                    }
                })
            });
        })
    };

    // 选择常用城市列表中的一项
    this.selectCity = function (htmlObj) {
        var zoom = htmlObj.getAttribute("data-zoom");
        var center = htmlObj.getAttribute("data-center");
        var latLngArray = center.split(',');
        var latLngLiteral = {lat: parseFloat(latLngArray[1]), lng: parseFloat(latLngArray[0])};

        this.mapModels.forEach(function (map, p2, p3) {
            map.updateCenterPosition(latLngLiteral)
        });

        this.navigationController.frequentUseSelect(htmlObj);
    };

    this.displayItemClick = function (source) {
        this.displayController.itemClick(source);
        this.mapModels.forEach(function (map, p2, p3) {
            map.refreshDisplay();
        })
    };

    this.dragEndHandler = function () {
    };


    this.changeMapSource = function (mapContainerId) {
        sourceController.sourceClick(mapContainerId);
    };

    this.enableDistrictSearch = function () {
        district.search('中国', function (status, result) {
            if (status == 'complete') {
                getData(result.districtList[0]);
                // alert("dis");
            }
        });
    };

    // 获得的数据是行政区域，data的数据结构参考高德官网。以下代码getData和search摘自官网例子
    var getData = function (data) {
        // var bounds = data.boundaries;
        // if (bounds) {
        //     for (var i = 0, l = bounds.length; i < l; i++) {
        //         var polygon = new AMap.Polygon({
        //             map: map,
        //             strokeWeight: 1,
        //             strokeColor: '#CC66CC',
        //             fillColor: '#CCF3FF',
        //             fillOpacity: 0.5,
        //             path: bounds[i]
        //         });
        //         polygons.push(polygon);
        //     }
        //     map.setFitView();//地图自适应
        // }

        var subList = data.districtList;
        var level = data.level;

        var citySelect = $("#city");
        var districtSelect = $("#district");
        var nextLevel = '';

        //清空下一级别的下拉列表
        if (level === 'province') {
            nextLevel = 'city';
            citySelect.innerHTML = '';
            districtSelect.innerHTML = '';
            // areaSelect.innerHTML = '';
        } else if (level === 'city') {
            nextLevel = 'district';
            districtSelect.innerHTML = '';
            // areaSelect.innerHTML = '';
        }
        if (subList) {
            var contentSub = new Option('--请选择--');
            for (var i = 0, l = subList.length; i < l; i++) {
                var name = subList[i].name;
                var levelSub = subList[i].level;
                var cityCode = subList[i].citycode;
                // if(levelSub === 'street')
                if (i == 0) {
                    document.querySelector('#' + levelSub).add(contentSub);
                }
                contentSub = new Option(name);
                contentSub.setAttribute("value", levelSub);
                contentSub.center = subList[i].center;
                contentSub.adcode = subList[i].adcode;
                document.querySelector('#' + levelSub).add(contentSub);
            }
        }
    };

    this.search = function (obj, isLastLevel) {
        //清除地图上所有覆盖物
        // for (var i = 0, l = polygons.length; i < l; i++) {
        //     polygons[i].setMap(null);
        // }
        var option = obj[obj.options.selectedIndex];
        var keyword = option.text; //关键字
        var adcode = option.adcode;
        var districtStr = option.value;
        district.setLevel(districtStr); //行政区级别
        district.setExtensions('all');
        //行政区查询
        //按照adcode进行查询可以保证数据返回的唯一性
        district.search(adcode, function (status, result) {
            if (status === 'complete') {
                var districtData = result.districtList[0];
                // 建立城市列表下拉选项
                if(!isLastLevel){
                    getData(districtData);
                }

                // 更新地图中心点
                self.mapModels.forEach(function (mapModel, p2, p3) {
                    console.log("城市列表驱动地图更新");
                    mapModel.updateCenterPosition(districtData.center);
                    mapModel.updateZoomLevel(districtLevelConverter.districtToLevel(districtStr));
                    // mapModel.updateCenterPosition({lat: latLngArray[1], lng: latLngArray[2]});
                });

            }
        });
    };

    AMapUI.loadUI(['misc/PoiPicker'], function(PoiPicker) {

        var poiPicker = new PoiPicker({
            //city:'北京',
            input: 'tip_input'
        });

        poiPicker.on('poiPicked', function(poiResult) {

            var source = poiResult.source,
                poi = poiResult.item,
                info = {
                    source: source,
                    id: poi.id,
                    name: poi.name,
                    location: poi.location,
                    // location: poi.location.toString(),
                    address: poi.address
                };
            console.log("poi\n"+JSON.stringify(info));
            self.mapModels.forEach(function (map, p2, p3) {
                map.updateCenterPosition(info.location);
            })
            //map.setCenter(marker.getPosition());
        });

    });
}


// MapController.prototype.constructor = MapController;

