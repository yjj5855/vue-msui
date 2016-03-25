import tpl from './modal.html'
import toast from '../toast/toast'
import alert from '../alert/alert'
import preloader from '../preloader/preloader'
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
        // toast : toast,
        // alert : alert,
        // preloader : preloader
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
                    break;
                }
            }
        },
        hidePreloader(){
            for(let i=0; i<this.modals.length; i++){
                if(this.modals[i] && 'preloader' === this.modals[i].type){
                    this.modals.splice(i,1)
                }
            }
        },
        hideIndicator(){
            for(let i=0; i<this.modals.length; i++){
                if(this.modals[i] && 'indicator' === this.modals[i].type){
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
