/**
 * 评分模块
 * @author zym
 * @version 1.0
 * @since 2016-08-22
 */
define(function(require, exports, module) {
    var Rate = function(options) {
        this.settings = $.extend({}, Rate.defaults, options);

        this.init();
    };

    Rate.prototype ={
        /**
         * 初始化
         */
        init : function() {
            this.create();
        },

        /**
         * 创建
         */
        create: function() {
            var _this = this,
                opts = _this.settings;

            //处理评分数
            var totalPoints;
            if(~~opts.sumPoints >= 2 && ~~opts.sumPoints >= ~~opts.goodPoints){
                totalPoints = ~~opts.sumPoints;
            }else{
                opts.sumPoints = 5;
                opts.goodPoints = 0;

                totalPoints = opts.sumPoints;
            }

            _this.totalPoints = totalPoints;

            _this.renderRateHtml(_this.totalPoints,~~opts.goodPoints,'init');

            _this.bindEvent();
        },

        /**
         * 渲染评分
         */
        renderRateHtml: function(totalPoints, goodPoints, flag){
            var _this = this,
                opts = _this.settings;

            if(flag === 'init'){
                var rateHtml = '';
                for(var i=0; i<totalPoints; i++){
                    rateHtml = (i+1 <= goodPoints) ? rateHtml + '<li data-index="'+ i +'" class="current"></li>' : rateHtml + '<li data-index="'+ i +'"></li>';
                }

                opts.rateObj.html(rateHtml);
            }else{
                opts.rateObj.find('li').removeClass('current');

                for(var i=0; i<totalPoints; i++){
                    if(i+1 <= goodPoints){
                        opts.rateObj.find('li').eq(i).addClass('current');
                    }
                }
            }
        },

        /**
         * 绑定事件
         */
        bindEvent: function(){
            var _this = this,
                opts = _this.settings;

            opts.rateObj.delegate('li','click',function(){
                var $this = $(this),
                    curIndex = ~~$this.attr('data-index');

                _this.renderRateHtml(_this.totalPoints,curIndex+1,'notInit');
            });
        }
    };

    // 默认配置
    Rate.defaults = {
        //评分区域对象
        rateObj: null,

        //评分总星数
        sumPoints: 5,

        //好评数
        goodPoints: 0
    };

    var rRate = function(options) {
        new Rate(options);
    };

    window.rRate = $.rRate = $.rate = rRate;
});