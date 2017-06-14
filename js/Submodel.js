/**
 * Created by ian0214 on 2017/6/12.
 */
function State(isOn) {
    this.isOn = isOn;
    this.toString = function () {
        return this.isOn+"";
    }
}

var navigationModelPrototype = {
    switchModal: function () {

    }
};
var NavigationModel = function () {

};
NavigationModel.prototype = navigationModelPrototype;
NavigationModel.prototype.constructor = NavigationModel;

var searchInputPrototype = {
    onFocus: function () {
        $('#tip_input').css('width', '215px');
        $('.input-search-icon').css('right', 'calc(0% - 81px)');
    },

    onBlur: function () {
        $('#tip_input').css('width', '85px');
        $('.input-search-icon').css('right', '50px');
    }
};

var SearchInput = function (searchInputModel) {

};
SearchInput.prototype = searchInputPrototype;
var searchInput = new SearchInput();



//显示控制
var displayControlPrototype = {
    refreshDisplay: function () {
        // var states = this.displayStateArray;
        // var ids = this.displayToolIdArray;
        // for (var i = 0; i < states.length; i++) {
        //     var state = states[i];
        //     var id = ids[i];
        //     $("#" + id).prop("checked", state);
        // }
    },

    check: function (toolSource) {
        var toolName = toolSource.getAttribute("tool-name");
        // alert(toolName);
        var states = this.displayStateArray;
        var names = this.displayToolNameArray;
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            if (name === toolName) {
                // console.log(name+","+states[i]);
                states[i].isOn = !states[i].isOn;
                this.refreshDisplay();
                break;
            }
        }
    },

    changeWindowState: function (windowId) {
        this.windowOn = !this.windowOn;
        if (this.windowOn) {
            $("#" + windowId).show();
        }else{
            $("#" + windowId).hide();
        }
    },

    // 添加工具,分别有：状态，名称，id
    addTool: function (state, name, id) {
        this.displayStateArray.push(state);
        this.displayToolNameArray.push(name);
        this.displayToolIdArray.push(id);
    }
};

function DisplayControlModel() {
    // “显示控制”的工具栏弹窗状态
    this.windowOn = false;

    // 以下是默认的工具，注意：1. 禁止动态直接添加新的工具状态属性，应采用addTool函数添加。 2. 使用静态方式添加（直接修改代码）时，应在数组中一并添加
    this.centerAddressOn = new State(true);
    this.scaleOn = new State(true);
    this.zoomOn = new State(true);
    this.overlapWarnOn = new State(false);
    this.vehicleAggregationOn = new State(false);
    this.notationAggregationOn = new State(false);
    this.notationOn = new State(true);

    // 状态表
    this.displayStateArray = [
        this.centerAddressOn, this.scaleOn, this.zoomOn, this.overlapWarnOn, this.vehicleAggregationOn,
        this.notationAggregationOn, this.notationOn
    ];

    // 工具名称表
    this.displayToolNameArray = ["center_position", "scale", "toolbar", "overlap_warn", "cluster_car",
        "cluster_marker", "marker"];

    // html元素id表
    this.displayToolIdArray = [
        "center-position", "scale", "toolbar", "overlap-warn", "cluster-car", "cluster-marker", "marker"
    ];
}
DisplayControlModel.prototype = displayControlPrototype;

// 地图来源
var sourceModelPrototype = {
    changeWindowState : function (windowId) {
        this.windowOn = !this.windowOn;
        if(this.windowOn){
            $("#"+windowId).show();
        }else{
            $("#"+windowId).hide();
        }
    },

    changeMapSource : function (mapContainerId) {
        var ids = this.mapIdArray;
        var states = this.mapStateArray;
        for(var i=0;i<ids.length;i++){
            states[i] = false;
            if(mapContainerId === ids[i]){
                states[i] = true;
            }
        }
        this.refresh();
    },

    refresh : function () {
        var ids = this.mapIdArray;
        var states = this.mapStateArray;
        for(var i=0;i<states.length;i++){
            if(states[i]){
                $("#"+ids[i]).show();
            }else{
                $("#"+ids[i]).hide();
            }
        }
    }
};

function SourceModel() {
    this.windowOn = false;
    this.mapIdArray = ["baidu-map", "gaode-map", "google-map"];
    this.mapStateArray = [false, false, false];
}
SourceModel.prototype = sourceModelPrototype;
// var sourceModel = new SourceModel();


