##  msui的vue版
##### 可以说是大部分抄袭了msui的代码 只是改成vue组件写法了,只是一个练习的项目,如果有问题请联系我下架.

##组件
##### 标题栏
##### 工具栏
##### 标签页
##### 对话框
##### 加载指示器
##### toast
##### popup
##### 日历
##### <a href="#picker">picker</a>
##### 日期时间
##### 下拉刷新
##### 无线滚动

### <div id="picker">picker</div>
#### 用法
    <picker header-text="请选择性别" :open.sync="isOpenMalePicker" :options="maleOptions" :val="male">

    </picker>
#### props
    //打开状态
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
    //选中项 和下面的options数组长度要相等
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
    updateValuesOnTouchmove:{
        type: Boolean,
        default: true
    },
    //是否开启3D效果
    rotateEffect: {
        type: Boolean,
        default: true
    },
    momentumRatio: {
        type: Number,
        default: 7
    },
    freeMode: {
        type: Boolean,
        default: false
    },