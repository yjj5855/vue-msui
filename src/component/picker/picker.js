import tpl from './picker.html'
import pickerCol from './picker-col'
export default {
    template : tpl,
    props: {
        open : {
            type : Boolean,
            default : false
        },
        //文字描述
        headerText: {
            type: String,
            default: '请选择'
        },
        //确定文本
        okText: {
            type: String,
            default: '确定'
        },
        //选中项
        val: {
            type: Array,
            default: [{
                text : '0',
                value : 0
            }]
        },
        //选项列表
        options: {
            type: Array,
            default : [
                {
                    values : [
                        {
                            text : '0',
                            value : 0
                        }
                    ]
                }
            ]
        },
        updateValuesOnMomentum:{
            type: Boolean,
            default: false
        },
        rotateEffect: {
            type: Boolean,
            default: true
        },
        momentumRatio: {
            type: Number,
            default: 7
        },
        //选择完回调
        success: {
            type: Function,
        }
    },
    data(){
        return {
            isMoved : false,
            isTouched : false
        }
    },
    methods: {
        ok(){
            this.open = false;
        },
        initPickerCol(colElement,updateItems){

        }
    },
    components: {
        pickerCol : pickerCol,
    },
    init(){
        console.log('picker init',this.$el)
    },
    ready(){
        let self = this;
        console.log('picker ready',this.$el);

        
        this.$watch('open',function (newVal) {
            if(newVal){
                this.$broadcast('open-picker')
            }
        })
    }
}
