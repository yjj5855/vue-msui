import tpl from './alert.html'
export default {
    template : tpl,
    props: {
        option: {
            type: Object,
            default: {
                title : '',
                content : '',
                okText : null,
                ok : null
            }
        },
        duration : {
            type : Number,
            default : 2000,
        },
    },
    data(){
        return {
            left : 0,
            top : 0,
            show : false
        }
    },
    methods: {
        ok(){
            if(typeof this.option.ok == 'function'){
                this.option.ok();
            }
            this.show = false;
            setTimeout(()=>{
                this.$dispatch('modal-remove',this.option)
            },300)
        }
    },
    init(){
       
    },
    ready(){
        this.top = (- Math.round($(this.$el).outerHeight() / 2) + 'px');
        // this.left = (- Math.round($(this.$el).outerWidth()) / 2 / 1.185 + 'px');
        this.show = true;
    }
} 
