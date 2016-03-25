import tpl from './indicator.html'
export default {
    template : tpl,
    props: {
        option: {
            type: Object,
            default: {
            }
        }
    },
    data(){
        return {
            show : false
        }
    },
    methods: {
        
    },
    init(){

    },
    ready(){
        this.show = true;
    }
} 
