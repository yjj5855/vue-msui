import tpl from './template.html'
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
        //选择完回调
        success: {
            type: Function,
        }
    },
    data(){
        return {

        }
    },
    components: {

    },
    init(){
        console.log('picker init',this.$el)
    },
    ready(){
        console.log('picker ready',this.$el)
    }
}