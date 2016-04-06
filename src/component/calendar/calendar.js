import tpl from './calendar.html'
import calendarMonth from './calendar-month'

let defaults = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    firstDay: 1, // First day of the week, Monday
    weekendDays: [0, 6], // Sunday and Saturday
    multiple: false,
    dateFormat: 'yyyy-mm-dd',
    direction: 'horizontal', // or 'vertical'
    minDate: null, 
    maxDate: null,
    touchMove: true,
    animate: true,
    closeOnSelect: true,
    monthPicker: true,
    yearPicker: true,
    weekHeader: true,
    // Common settings
    values : [],
    scrollToInput: true,
    inputReadOnly: true,
    toolbar: true,
    toolbarCloseText: 'Done',
    /* Callbacks
     onMonthAdd
     onChange
     onOpen
     onClose
     onDayClick
     onMonthYearChangeStart
     onMonthYearChangeEnd
     */
}

let col;
let allowItemClick = true;
let isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;


export default {
    template : tpl,
    props: {
        open : {
            type : Boolean,
            default : false
        },
        options: {
            type: Object,
            default: {
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月' , '九月' , '十月', '十一月', '十二月'],
                dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                firstDay: 1, // First day of the week, Monday
                weekendDays: [0, 6], // Sunday and Saturday
                multiple: false,
                dateFormat: 'yyyy-mm-dd',
                direction: 'horizontal', // or 'vertical'
                minDate: null,
                maxDate: null,
                touchMove: true,
                animate: true,
                closeOnSelect: true,
                monthPicker: true,
                yearPicker: true,
                weekHeader: true,
                // Common settings
                values : [],
                scrollToInput: true,
                inputReadOnly: true,
                toolbar: true,
                toolbarCloseText: 'Done',
            }
        }
    },
    data(){
        return {
            monthsTranslate : 0,
            animating : false,
            chooseType : 'm', //m,y
            translate : 0,
            transition : '', //滑动时变换时间要为0ms

            monthList : [

            ],
            currentMonthNumber : '',
            currentYearNumber : ''
        }
    },
    events : {
        'change-month' : ()=>{
            
        } 
    },
    components: {
        'calendar-month' : calendarMonth,
    },
    computed : {
        isH(){
            return this.options.direction === 'horizontal';
        },
        inverter(){
            return 1
        }
    },
    methods: {
        setCurrentNumber(){
            this.currentYearNumber = this.monthList[1].year;
            this.currentMonthNumber = this.options.monthNames[this.monthList[1].month];
        },
        prevMonth(transition){
            if (typeof transition === 'undefined' || typeof transition === 'object') {
                transition = '';
                if (!this.options.animate) transition = 0;
            }

            this.monthsTranslate --;
            this.animating = true;

            let translate = (-this.monthsTranslate * 100) * this.inverter;
            this.transition = transition;
            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'


            //当前是一月的话
            let current = this.monthList[1];
            if(this.monthList[0].month == 0 ){
                this.monthList.unshift({
                    year : this.monthList[0].year - 1,
                    month: 11,
                    date : new Date(this.monthList[0].year - 1, 11),
                    monthsTranslate : this.monthsTranslate - 1
                });
            }else{
                this.monthList.unshift({
                    year : this.monthList[0].year,
                    month: this.monthList[0].month - 1,
                    date : new Date(this.monthList[0].year, this.monthList[0].month - 1),
                    monthsTranslate : this.monthsTranslate - 1
                })
            }
            if(this.chooseType == 'y'){
                if(current.month == 11){
                    this.monthList[2] = {
                        year : current.year + 1,
                        month: 0,
                        date : new Date(current.year, 0),
                        monthsTranslate : current.monthsTranslate
                    }
                }else{
                    this.monthList[2] = {
                        year : current.year,
                        month: current.month + 1,
                        date : new Date(current.year, current.month + 1),
                        monthsTranslate : current.monthsTranslate
                    } 
                }
            }
            this.monthList.pop();
            this.setCurrentNumber();
            this.chooseType = 'm';
            //计算end
            
        },
        nextMonth(transition){
            if (typeof transition === 'undefined' || typeof transition === 'object') {
                transition = '';
                if (!this.options.animate) transition = 0;
            }

            this.monthsTranslate ++;
            this.animating = true;

            let translate = (-this.monthsTranslate * 100) * this.inverter;
            this.transition = transition;
            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'

            //计算
            let current = this.monthList[1];
            if(this.monthList[this.monthList.length-1].month == 11){
                this.monthList.push({
                    year : this.monthList[this.monthList.length-1].year + 1,
                    month: 0,
                    date : new Date(this.monthList[this.monthList.length-1].year+1, 0),
                    monthsTranslate : this.monthsTranslate + 1
                })
            }else{
                this.monthList.push({
                    year : this.monthList[this.monthList.length-1].year,
                    month: this.monthList[this.monthList.length-1].month + 1,
                    date : new Date(this.monthList[this.monthList.length-1].year,this.monthList[this.monthList.length-1].month+1),
                    monthsTranslate : this.monthsTranslate + 1
                })
            }
            if(this.chooseType == 'y'){
                if(current.month == 0){
                    this.monthList[0] = {
                        year : current.year - 1,
                        month: 11,
                        date : new Date(current.year - 1, 11),
                        monthsTranslate : current.monthsTranslate
                    }
                }else{
                    this.monthList[0] = {
                        year : current.year,
                        month: current.month - 1,
                        date : new Date(current.year, current.month - 1),
                        monthsTranslate : current.monthsTranslate
                    }
                }
            }
            this.monthList.shift();
            this.setCurrentNumber();
            this.chooseType = 'm';
            //计算end
        },
        prevYear(transition){
            if (typeof transition === 'undefined' || typeof transition === 'object') {
                transition = '';
                if (!this.options.animate) transition = 0;
            }

            this.monthsTranslate --;
            this.animating = true;

            let translate = (-this.monthsTranslate * 100) * this.inverter;
            this.transition = transition;
            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'


            //计算
            if(this.monthList[0].year != this.monthList[1].year - 1){
                let current = this.monthList.shift();
                this.monthList.unshift({
                    year : current.year - 1,
                    month: current.month + 1,
                    date : new Date(current.year - 1,current.month + 1),
                    monthsTranslate : current.monthsTranslate
                })
            }
            this.monthList.unshift({
                year : this.monthList[0].year - 1,
                month: this.monthList[0].month,
                date : new Date(this.monthList[0].year - 1, this.monthList[0].month),
                monthsTranslate : this.monthsTranslate - 1
            })
            this.monthList.pop();
            this.setCurrentNumber();
            this.chooseType = 'y';
            //计算end
        },
        nextYear(transition){
            if (typeof transition === 'undefined' || typeof transition === 'object') {
                transition = '';
                if (!this.options.animate) transition = 0;
            }

            this.monthsTranslate ++;
            this.animating = true;

            let translate = (-this.monthsTranslate * 100) * this.inverter;
            this.transition = transition;
            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'


            //计算 1.判断下一个是否为下一年的日历
            if(this.monthList[this.monthList.length-1].year != this.monthList[this.monthList.length-2].year + 1 ){
                let current = this.monthList.pop();
                this.monthList.push({
                    year : current.year + 1,
                    month: current.month - 1,
                    date : new Date(current.year + 1,current.month - 1),
                    monthsTranslate : current.monthsTranslate
                })
            }
            this.monthList.push({
                year : this.monthList[this.monthList.length-1].year + 1,
                month: this.monthList[this.monthList.length-1].month,
                date : new Date(this.monthList[this.monthList.length-1].year + 1,this.monthList[this.monthList.length-1].month),
                monthsTranslate : this.monthsTranslate + 1
            });
            this.monthList.shift();
            this.setCurrentNumber();
            //计算end
        },
        handleTouchStart(e){
            if (isMoved || isTouched) return;
            // e.preventDefault();
            isTouched = true;
            touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();
            percentage = 0;
            allowItemClick = true;
            isScrolling = undefined;
            startTranslate = currentTranslate = this.monthsTranslate;
        },
        handleTouchMove(e){
            if (!isTouched) return;

            touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (typeof isScrolling === 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
            }
            if (this.isH && isScrolling) {
                isTouched = false;
                return;
            }
            e.preventDefault();
            if (this.animating) {
                isTouched = false;
                return;
            }
            allowItemClick = false;
            if (!isMoved) {
                // First move
                isMoved = true;
                wrapperWidth = $('.picker-calendar-months-wrapper')[0].offsetWidth;
                wrapperHeight = $('.picker-calendar-months-wrapper')[0].offsetHeight;
                $('.picker-calendar-months-wrapper').transition(0);
            }
            e.preventDefault();

            touchesDiff = this.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
            percentage = touchesDiff/(this.isH ? wrapperWidth : wrapperHeight);
            currentTranslate = (this.monthsTranslate * this.inverter + percentage) * 100;

            // Transform wrapper
            this.translate = 'translate3d(' + (this.isH ? currentTranslate : 0) + '%, ' + (this.isH ? 0 : currentTranslate) + '%, 0)';

        }
    },
    beforeCompile(){
        for (var def in defaults) {
            if (typeof this.options[def] === 'undefined') {
                this.options[def] = defaults[def]
            }
        }
        this.$set('options',this.options);
        console.log(this.options)
    },
    ready(){
        let initDate = this.options.values[0];
        let date = new Date(initDate);
        let year = date.getFullYear();
        let month = date.getMonth();

        let prevCalendar,currentCalendar,nextCalendar;
        if(month === 0){
            prevCalendar = {
                year : year - 1,
                month: 11,
                date : new Date(year - 1, 11),
                monthsTranslate : -1
            };
            nextCalendar = {
                year : year,
                month: month + 1,
                date : new Date(year, month + 1),
                monthsTranslate : 1
            }
        }else if(month === 11){
            prevCalendar = {
                year : year,
                month: month - 1,
                date : new Date(year, month - 1),
                monthsTranslate : -1
            };
            nextCalendar = {
                year : year + 1,
                month: 0,
                date : new Date(year+1, 0),
                monthsTranslate : 1
            }
        }
        currentCalendar = {
            year : year,
            month: month,
            date : new Date(year, month),
            monthsTranslate : 0
        };
        this.monthList = [prevCalendar,currentCalendar,nextCalendar]
        this.setCurrentNumber();
        
        //绑定触摸事件
        if (this.options.touchMove) {
            $(this.el).find('.picker-calendar-months-wrapper').on($.touchEvents.start, this.handleTouchStart);
            $(this.el).find('.picker-calendar-months-wrapper').on($.touchEvents.move, handleTouchMove);
            $(this.el).find('.picker-calendar-months-wrapper').on($.touchEvents.end, handleTouchEnd);
        }
    }
}
