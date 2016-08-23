/**
 * 移动官网
 * @since 2016.08.23
 */
define(function (require, exports, module) {
    //'评分'模块
    if($('#J_Rate').length){
        var rate = require('rate');

        $.rate({
            //评分区域对象
            rateObj: $('#J_RateItems'),

            //评分总星数(int)
            sumPoints: 5,

            //好评数(int)
            goodPoints: 2
        });
    }
});