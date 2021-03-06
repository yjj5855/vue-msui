let isTouched, isMoved, touchesStart = {},
    isScrolling, touchesDiff, touchStartTime, container, refresh = false,
    useTranslate = false,
    startTranslate = 0,
    translate, scrollTop, wasScrolled, triggerDistance, dynamicTriggerDistance;


export default {
    bind: function () {
        container = $(this.el);
        container.addClass('native-scroll');

        if(container.attr('data-ptr-distance')){
            dynamicTriggerDistance = true;
        }else{
            triggerDistance = 44; //默认下拉距离
        }

        this.initEvents();
    },
    update: function (promiseOrNull) {
        if(promiseOrNull == null){

        }else if(typeof promiseOrNull == 'function'){
            this.callback = promiseOrNull;
        }else{
            console.log('下拉刷新指令 必须是一个返回promise的function')
        }
    },
    unbind: function () {
        this.initEvents(true)
    },
    initEvents(detach){
        let method = detach?'off':'on';
        $(this.el)[method]($.touchEvents.start,this.handleTouchStart.bind(this));
        $(this.el)[method]($.touchEvents.move, this.handleTouchMove.bind(this));
        $(this.el)[method]($.touchEvents.end, this.handleTouchEnd.bind(this));
    },
    handleTouchStart(e){
        if (isTouched) {
            if ($.device.android) {
                if ('targetTouches' in e && e.targetTouches.length > 1) return;
            } else return;
        }
        isMoved = false;
        isTouched = true;
        isScrolling = undefined;
        wasScrolled = undefined;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();
        /*jshint validthis:true */
        container = $(this.el);
    },
    handleTouchMove : function(e){
        if (!isTouched) return;
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        if (!isScrolling) {
            isTouched = false;
            return;
        }

        scrollTop = container[0].scrollTop;
        if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true;

        if (!isMoved) {
            /*jshint validthis:true */
            container.removeClass('transitioning');
            if (scrollTop > container[0].offsetHeight) {
                isTouched = false;
                return;
            }
            if (dynamicTriggerDistance) {
                triggerDistance = container.attr('data-ptr-distance');
                if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
            }
            startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
            if (container[0].scrollHeight === container[0].offsetHeight || !$.device.ios) {
                useTranslate = true;
            } else {
                useTranslate = false;
            }
            useTranslate = true;
        }
        isMoved = true;
        touchesDiff = pageY - touchesStart.y;

        if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
            // iOS 8 fix
            if ($.device.ios && parseInt($.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

            if (useTranslate) {
                e.preventDefault();
                translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                container.transform('translate3d(0,' + translate + 'px,0)');
            } else {}
            if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
                refresh = true;
                container.addClass('pull-up').removeClass('pull-down');
            } else {
                refresh = false;
                container.removeClass('pull-up').addClass('pull-down');
            }
        } else {

            container.removeClass('pull-up pull-down');
            refresh = false;
            return;
        }
    },
    handleTouchEnd(e){
        if (!isTouched || !isMoved) {
            isTouched = false;
            isMoved = false;
            return;
        }
        if (translate) {
            container.addClass('transitioning');
            translate = 0;
        }
        container.transform('');
        if (refresh) {
            //防止二次触发
            if(container.hasClass('refreshing')) return;
            container.addClass('refreshing');
            container.trigger('refresh');
        } else {
            container.removeClass('pull-down');
        }
        isTouched = false;
        isMoved = false;

        //需要传入一个返回promise对象的方法来关闭加载提示状态
        this.callback().then((data)=>{
            this.pullToRefreshDone(container)
        }).catch(()=>{
            this.pullToRefreshDone(container)
        });
    },
    pullToRefreshDone(container){
        $(window).scrollTop(0);//解决微信下拉刷新顶部消失的问题
        container = $(container);
        if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
        container.removeClass('refreshing').addClass('transitioning');
        container.transitionEnd(function() {
            container.removeClass('transitioning pull-up pull-down');
        });
    }
}
