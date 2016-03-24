import tpl from './modal.html'
import toast from '../toast/toast'
export default {
    template : tpl,
    props: {

    },
    data(){
        return {
            modals : [
                
            ]
        }
    },
    components: {
        toast : toast
    },
    computed:{
        showOverlay(){
            for(let i=0;i<this.modals.length;i++){
                if(this.modals[i].overlay){
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        add(modal){
            this.modals.push(modal)
        },
        modalRemove(option){
            for(let i=0; i<this.modals.length; i++){
                if(this.modals[i] && option === this.modals[i].option){
                    this.modals.splice(i,1)
                }
            }
        }
    },
    events: {
        'modal-remove' : 'modalRemove'
    },
    init(){
        console.log('modal init')
    },
    ready(){
        console.log('modal ready');
    }
}
