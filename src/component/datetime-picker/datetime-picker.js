import tpl from './datetime-picker.html'
import picker from '../picker/picker'

export default {
    template : tpl,
    props: {
        headerText : {
            type : String,
            default: '请选择'
        },
        datetime : {
            type : String,
            default: ''
        },
        open: {
            type: Boolean,
            default: false
        },
    },
    components: {
        picker : picker,
    },
    data : ()=>{
        return {
            options : [
                {
                    values : []
                },
                {
                    values : []
                },
                {
                    values : []
                },
                {
                    values : []
                },
                {
                    divider: true,
                    content: ':'
                },
                {
                    values : []
                }
            ],
            datetimeValue : [
                {
                    text :  '2016',
                    value : 2016
                },
                {
                    text :  '04',
                    value : 4
                },
                {
                    text :  '30',
                    value : 30
                },
                {
                    text :  '12',
                    value : 12
                },
                {
                    text :  '0',
                    value : 0
                },
                {
                    text :  '23',
                    value : 23
                }
                
            ],
            year : '',
            month : ''
        }
    },
    methods : {
        ok(value){
            this.datetime =[
                [value[0].text,value[1].text,value[2].text].join('-'),
                [value[3].text > 9 ? value[3].text : '0'+value[3].text ,value[5].text,'00'].join(':')
            ].join(' ');
        },
        getDaysByMonthAndYear(value){
            
            let year = value[0].value;
            let month = value[1].value;
            let day = value[2].value;
            if(this.year == year && this.month == month){
                return;
            }else{
                this.year = year;
                this.month = month;
            }

            let int_d = new Date(year, parseInt(month), 1);
            let d = new Date(int_d - 1);

            this.initDay(d.getDate());

            //获取日期选择组件
            try{
                
                let dayPickerCol = this.$children[0].$children[2];
                if(day > this.options[2].values.length){
                    dayPickerCol.replaceValues(this.options[2],this.options[2].values[this.options[2].values.length-1]);
                }else{
                    dayPickerCol.replaceValues(this.options[2],value[2]);
                }
            }catch (e){
                
            }
            
        },
        initYear(){
            for (let i = 1950; i <= 2030; i++) {
                this.options[0].values.push({
                    text :  i,
                    value : i
                }); 
            }
        },
        initMonth(){
            for (let i = 1; i < 13; i++) {
                this.options[1].values.push({
                    text: i < 10 ? '0' + i : i,
                    value: i
                });
            }
        },
        initDay(max){
            this.options[2].values = [];
            for(let i=1; i<= (max||31);i++) {
                this.options[2].values.push({
                    text :  i < 10 ? '0' + i : i,
                    value : i
                });
            }
        },
        initHours(){
            for(let i = 0; i <= 23; i++){
                this.options[3].values.push({
                    text :  i ,
                    value : i
                });
            }
        },
        initMinutes(){
            for(let i = 0; i <= 59; i++){
                this.options[5].values.push({
                    text :  i < 10 ? '0' + i : i,
                    value : i
                });
            }
        }
    },
    init(){
        console.log('datetime-picker init')
    },
    beforeCompile(){
        this.initYear();
        this.initMonth();
        this.getDaysByMonthAndYear(this.datetimeValue);
        this.initHours();
        this.initMinutes();
    },
    ready(){
        let self = this;
        console.log('datetime-picker ready');
        
    }
}