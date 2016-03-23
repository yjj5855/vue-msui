import tpl from './picker-col.html'



export default {
    template : tpl,
    props: {
        val: {
            type: Object,
            default: {
                text : '0',
                value : 0
            }
        },
        //选项列表
        option: {
            type: Object,
            default : {
                values : [
                    {
                        text : '0',
                        value : 0
                    }
                ]
            }
        },
        isMoved : {
            type: Boolean,
        },
        isTouched : {
            type: Boolean,
        }
    },
    data(){
        return {
            width : 0,
            activeIndex : 0, //选中项的下标
            animationFrameId : 0, //动画ID
            container : null, //组件最外层
            wrapper : null, //组件内容层
            items : [], //组件选项
            wrapperHeight : 0, //内容层高度
            itemHeight : 0, //单个选项高度
            itemsHeight : 0, //所有选项高度
            minTranslate : 0, //最小滚动位置
            maxTranslate : 0, //最大滚动位置
            allowItemClick : true, //允许选项点击
        }
    },
    methods: {
        //更换数据对象
        replaceValues(values){
            col.destroyEvents();
            this.option = values;

            this.calcSize();
            col.setValue(col.values[0], 0, true);
            col.initEvents();
        },
        //获取具体尺寸
        calcSize(){
            if(this.$parent.rotateEffect){
                $(this.container).removeClass('picker-items-col-absolute');
                if(!this.width) $(this.container).css({width:''})
            }
            let colWidth, colHeight;
            colWidth = 0;
            colHeight = this.container[0].offsetHeight;
            this.wrapperHeight = this.wrapper[0].offsetHeight;
            this.itemHeight = this.items[0].offsetHeight;
            this.itemsHeight = this.itemHeight * this.items.length;
            this.minTranslate = colHeight / 2 - this.itemsHeight + this.itemHeight / 2;
            this.maxTranslate = colHeight / 2 - this.itemHeight / 2;
            if (this.width) {
                colWidth = this.width;
                if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                this.container.css({width: colWidth});
            }
            if (this.$parent.rotateEffect) {
                if (!this.width) {
                    $(this.items).each(function () {
                        var item = $(this);
                        $(item).css({width:'auto'});
                        colWidth = Math.max(colWidth, $(item)[0].offsetWidth);
                        $(item).css({width:''});
                    });
                    $(this.container).css({width: (colWidth + 2) + 'px'});
                }
                $(this.container).addClass('picker-items-col-absolute');
            }
        },
        setValue(newValue,transition,valueCallbacks){
            if (typeof transition === 'undefined') transition = '';
            var newActiveIndex = this.aIndex(newValue)
            if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                return;
            }
            var newTranslate = -newActiveIndex * this.itemHeight + this.maxTranslate;
            // Update wrapper
            $(this.wrapper).transition(transition);
            $(this.wrapper).transform('translate3d(0,' + (newTranslate) + 'px,0)');

            // Watch items
            if (this.$parent.updateValuesOnMomentum && this.activeIndex && this.activeIndex !== newActiveIndex ) {
                $.cancelAnimationFrame(this.animationFrameId);
                $(this.wrapper).transitionEnd(function(){
                    $.cancelAnimationFrame(this.animationFrameId);
                });
                this.updateDuringScroll();
            }

            // Update items
            this.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
        },
        //更新选项
        updateItems(activeIndex, translate, transition, valueCallbacks){
            if (typeof translate === 'undefined') {
                translate = $.getTranslate(this.wrapper[0], 'y');
            }
            if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - this.maxTranslate)/this.itemHeight);
            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex >= this.items.length) activeIndex = this.items.length - 1;
            var previousActiveIndex = this.activeIndex;
            this.activeIndex = activeIndex;

            //设置新值

            this.val = this.option.values[this.activeIndex]
            if (this.$parent.rotateEffect) {
                $(this.items).transition(transition);
            }
            $(this.items[activeIndex]).transform('');


            // Set 3D rotate effect
            if (!this.$parent.rotateEffect) {
                return;
            }
            var percentage = (translate - (Math.floor((translate - this.maxTranslate)/this.itemHeight) * this.itemHeight + this.maxTranslate)) / this.itemHeight;

            var self = this;
            // 3D Transforms origin bug, only on safari
            var originBug = $.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !$.device.android;

            $(this.items).each(function () {
                var item = $(this);
                var itemOffsetTop = item.index() * self.itemHeight;
                var translateOffset = self.maxTranslate - translate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / self.itemHeight;

                var itemsFit = Math.ceil(self.height / self.itemHeight / 2) + 1;

                var angle = (-18*percentage);
                if (angle > 180) angle = 180;
                if (angle < -180) angle = -180;
                // Far class
                if (Math.abs(percentage) > itemsFit){
                    $(item).addClass('picker-item-far');
                } else {
                    $(item).removeClass('picker-item-far');
                }
                // Set transform
                $(item).transform('translate3d(0, ' + (-translate+itemOffset + self.maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
            });
        },
        updateDuringScroll(){
            this.animationFrameId = $.requestAnimationFrame(()=>{
                this.updateItems(undefined, undefined, 0);
                this.updateDuringScroll();
            });
        },
        aIndex(newValue){
            for(let i=0;i<this.option.values.length;i++){
                if(this.option.values[i].value == newValue.value){
                    return i;
                }
            }
            return -1;
        },
        handleClick(value){
            if (!this.allowItemClick) return;
            $.cancelAnimationFrame(this.animationFrameId);
            this.setValue(value);
        }
    },
    computed : {
        
    },
    components: {

    },
    init(){
        console.log('picker-col init',this.$el)
    },
    ready(){
        console.log('picker-col ready',this.$el);
        let self = this;
        this.container = $(this.$el);
        this.wrapper = $(this.container).find('.picker-items-col-wrapper');
        this.items = $(this.wrapper).find('.picker-item');

        //监听打开状态
        this.$on('open-picker',()=>{
            this.calcSize();
            $(this.wrapper).transform('translate3d(0,' + this.maxTranslate + 'px,0)').transition(0);
            if(this.updateItems){
                this.setValue(this.val,0)
            }
        })

    }
}
