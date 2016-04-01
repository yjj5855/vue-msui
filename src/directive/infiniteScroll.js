let inf ;
let scroller ;
let scrollTop ;
let scrollHeight ;
let height ;
let distance ;
let virtualListContainer ;
let virtualList;
let onTop ;
let pageContainer;
let infiniteContent;
let loading;

export default {
    bind: function () {
        pageContainer = $(this.el);
        infiniteContent = pageContainer.hasClass('infinite-scroll')?pageContainer:pageContainer.find('.infinite-scroll');
        if(infiniteContent.length == 0) return;
        $(infiniteContent).on('scroll',this.handleInfiniteScroll.bind(this));
        //如果是顶部无限刷新，要将滚动条初始化于最下端
        pageContainer.forEach(function(v){
            if($(v).hasClass('infinite-scroll-top')){
                var height = v.scrollHeight - v.clientHeight;
                $(v).scrollTop(height);
            }
        });
    },
    update: function (promiseOrNull) {
        if(promiseOrNull == null){

        }else if(typeof promiseOrNull == 'function'){
            this.callback = promiseOrNull;
        }
    },
    unbind: function () {
        $(infiniteContent).off('scroll',this.handleInfiniteScroll.bind(this))
    },
    handleInfiniteScroll: function () {
        inf = $(this.el); 
        scroller = $(this.el);
        scrollTop = scroller.scrollTop();
        scrollHeight = scroller[0].scrollHeight;
        height = inf[0].offsetHeight;
        distance = inf[0].getAttribute('data-distance');
        virtualListContainer = inf.find('.virtual-list');
        onTop = inf.hasClass('infinite-scroll-top');

        
        if(!distance) distance = 50 ;
        if(typeof distance === 'string' && distance.indexOf('%') >= 0){
            distance = parseInt(distance,10) / 100 * height;
        }
        if(distance > height) distance = height;

        if(onTop){
            if(scrollTop < distance){
                if(!loading){
                    this.triggerInfinite()
                }
            }
        }else{
            if (scrollTop + height >= scrollHeight - distance) {
                if (virtualListContainer.length > 0) {
                    virtualList = virtualListContainer[0].f7VirtualList;
                    if (virtualList && !virtualList.reachEnd) return;
                }
                if(!loading){
                    this.triggerInfinite()
                }

            }
        }
    },
    triggerInfinite(){
        loading = true;
        //需要传入一个返回promise对象的方法来重置无限下拉
        this.callback().then((data)=>{
            loading = false;
        }).catch(()=>{
            loading = false;
        });
    }
}
