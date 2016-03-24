import tpl from './toast.html'
export default {
    template : tpl,
    props: {
        option: {
            type: Object,
            default: {
                content : ''
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
    init(){
        console.log('toast init')
    },
    ready(){
        console.log('toast ready');
        this.top = (- Math.round($(this.$el).outerHeight() / 2) + 'px');
        this.left = (- Math.round($(this.$el).outerWidth()) / 2 / 1.185 + 'px');
        $(this.$el).addClass('modal-in');
        setTimeout(()=>{
            $(this.$el).addClass('modal-out').removeClass('modal-in');
            setTimeout(()=>{
                this.$dispatch('modal-remove',this.option)
            },300)
        },this.duration)
    }
} 
