import tpl from './actions.html'
export default {
    template : tpl,
    props: {
        option: {
            type: Array,
            default: [

            ]
        }
    },
    data(){
        return {
            show : false
        }
    },
    methods: {
        ok(button){
            button.onClick();
            this.show = false;
            setTimeout(()=>{
                this.$dispatch('modal-remove',this.option)
            },300)
        },
        cancel(){
            this.show = false;
            setTimeout(()=>{
                this.$dispatch('modal-remove',this.option)
            },300)
        }
    },
    init(){
       
    },
    ready(){
        setTimeout(()=>{
            this.show = true;
        },100)
    }
} 
