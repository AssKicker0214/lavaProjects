/**
 * Created by ian0214 on 2017/6/12.
 */

function DisplayController(displayControlModel) {
    this.model = displayControlModel;
    this.itemClick = function (source) {
        this.model.check(source)
    };

    this.click = function () {
        this.model.changeWindowState("tools-window");
    };

    this.refreshDisplay = function () {
        this.model.refreshDisplay();

    }
}
// displayController.itemClick("adf");


////////////////////////////
function SourceController(sourceModel) {
    this.model = sourceModel;

    this.click = function () {
        this.model.changeWindowState("source-window");
    };

    this.sourceClick = function (mapId) {
        this.model.changeMapSource(mapId);
    };
}

//////////////////////////
function NavigationController(navigationModel) {
    this.model = navigationModel;

    var frequentlyUseCities = $(".frequently_used_city li");

    this.cityClick = function () {
        console.log("导航框被点击");
        //    导航图标切换
        if ($(".navigation_modal").is(':hidden')) {
            $('.top_menu').removeClass('open');
        } else {
            $('.top_menu').addClass('open');
        }

        // 展开弹窗
        $('.navigation_modal').toggle();
    };

    this.frequentUseSelect = function (selectedOne) {
        frequentlyUseCities.removeClass('li_active');
        $(selectedOne).addClass('li_active');
    }


}


var buttonGroupSwitch = {
    onClick: function () {
        if ($('.switch_group').attr('data-state') == 0) {
            $('.button_group').show();
            $('.switch_group').attr('data-state', 1);
            $('.switch_group i').addClass('font-active');
        } else {
            $('.button_group').hide();
            $('.switch_group').attr('data-state', 0);
            $('.switch_group i').removeClass('font-active');
            //重置所有状态
            // close_evey_window();
        }
    }
};
var toolMenuController = {
    buttonGroupSwitch: buttonGroupSwitch
};