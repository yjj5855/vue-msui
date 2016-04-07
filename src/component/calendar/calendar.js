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

let rtl = false;
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
        waitAnimate(){
            $('.picker-calendar-months-wrapper').transitionEnd(()=> {
                this.animating = false;
            });
        },
        resetMonth(year,month,translate){

            let prevCalendar,nextCalendar;
            if(month === 0){
                prevCalendar = {
                    year : year - 1,
                    month: 11,
                    date : new Date(year - 1, 11),
                    monthsTranslate : translate - 1
                };
                nextCalendar = {
                    year : year,
                    month: month + 1,
                    date : new Date(year, month + 1),
                    monthsTranslate : translate + 1
                }
            }else if(month === 11){
                prevCalendar = {
                    year : year,
                    month: month - 1,
                    date : new Date(year, month - 1),
                    monthsTranslate : translate - 1
                };
                nextCalendar = {
                    year : year + 1,
                    month: 0,
                    date : new Date(year+1, 0),
                    monthsTranslate : translate + 1
                }
            }else{
                prevCalendar = {
                    year : year,
                    month: month - 1,
                    date : new Date(year, month - 1),
                    monthsTranslate : translate - 1
                };
                nextCalendar = {
                    year : year,
                    month: month + 1,
                    date : new Date(year, month + 1),
                    monthsTranslate : translate + 1
                }
            }
            this.monthList.pop();
            this.monthList.push(nextCalendar);
            this.monthList.shift();
            this.monthList.unshift(prevCalendar);

            this.translate = 'translate3d(' + (this.isH ? -translate*100 : 0) + '%, ' + (this.isH ? 0 : -translate*100) + '%, 0)'
            this.waitAnimate()
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
            this.monthList.pop();
            this.setCurrentNumber();
            //计算end

            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'
            this.waitAnimate()
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

            //计算
            let current = this.monthList[1];
            if(this.monthList[2].month == 11){
                this.monthList.push({
                    year : this.monthList[2].year + 1,
                    month: 0,
                    date : new Date(this.monthList[2].year+1, 0),
                    monthsTranslate : this.monthsTranslate + 1
                })
            }else{
                this.monthList.push({
                    year : this.monthList[2].year,
                    month: this.monthList[2].month + 1,
                    date : new Date(this.monthList[2].year,this.monthList[2].month+1),
                    monthsTranslate : this.monthsTranslate + 1
                })
            }
            this.monthList.shift();
            this.setCurrentNumber();
            //计算end

            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'
            this.waitAnimate()
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


            //计算
            let prev = this.monthList.shift();
            let current = this.monthList[0];
            this.monthList.unshift({
                year : current.year -1,
                month: current.month,
                date : new Date(current.year - 1, current.month),
                monthsTranslate : prev.monthsTranslate
            })
            this.monthList.unshift({
                year : this.monthList[0].year - 1,
                month: this.monthList[0].month,
                date : new Date(this.monthList[0].year - 1, this.monthList[0].month),
                monthsTranslate : this.monthsTranslate - 1
            })
            this.monthList.pop();
            this.setCurrentNumber();
            //计算end
            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'

            //计算之后重置为月份模式
            this.resetMonth(this.monthList[1].year,this.monthList[1].month,this.monthList[1].monthsTranslate);
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


            //计算
            let next = this.monthList.pop();
            let current = this.monthList[1];
            this.monthList.push({
                year : current.year + 1,
                month: current.month,
                date : new Date(current.year + 1, current.month),
                monthsTranslate : next.monthsTranslate
            })
            this.monthList.push({
                year : this.monthList[2].year + 1,
                month: this.monthList[2].month,
                date : new Date(this.monthList[2].year + 1,this.monthList[2].month),
                monthsTranslate : this.monthsTranslate + 1
            });
            this.monthList.shift();
            this.setCurrentNumber();
            //计算end

            this.translate = 'translate3d(' + (this.isH ? translate : 0) + '%, ' + (this.isH ? 0 : translate) + '%, 0)'

            //计算之后重置为月份模式
            this.resetMonth(this.monthList[1].year,this.monthList[1].month,this.monthList[1].monthsTranslate);

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
            console.log(!isTouched)
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
                // $('.picker-calendar-months-wrapper').transition(0);
                this.transition = 'transition-duration: 0ms;'
            }
            e.preventDefault();

            touchesDiff = this.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
            percentage = touchesDiff/(this.isH ? wrapperWidth : wrapperHeight);
            currentTranslate = (-this.monthsTranslate * this.inverter + percentage) * 100;

            // Transform wrapper
            this.translate = 'translate3d(' + (this.isH ? currentTranslate : 0) + '%, ' + (this.isH ? 0 : currentTranslate) + '%, 0)';

        },
        handleTouchEnd(e){
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            this.transition = '';
            isTouched = isMoved = false;

            touchEndTime = new Date().getTime();
            if (touchEndTime - touchStartTime < 300) {
                if (Math.abs(touchesDiff) < 10) {
                    this.resetMonth(this.monthList[1].year,this.monthList[1].month,this.monthList[1].monthsTranslate);
                }
                else if (touchesDiff >= 10) {
                    if (rtl) this.nextMonth();
                    else this.prevMonth();
                }
                else {
                    if (rtl) this.prevMonth();
                    else this.nextMonth();
                }
            }
            else {
                if (percentage <= -0.5) {
                    if (rtl) this.prevMonth();
                    else this.nextMonth();
                }
                else if (percentage >= 0.5) {
                    if (rtl) this.nextMonth();
                    else this.prevMonth();
                }
                else {
                    this.resetMonth(this.monthList[1].year,this.monthList[1].month,this.monthList[1].monthsTranslate);
                }
            }
            // Allow click
            setTimeout(()=>{
                allowItemClick = true;
            }, 100);
        }
    },
    beforeCompile(){
        for (var def in defaults) {
            if (typeof this.options[def] === 'undefined') {
                this.options[def] = defaults[def]
            }
        }
        this.$set('options',this.options);
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
        }else{
            prevCalendar = {
                year : year,
                month: month - 1,
                date : new Date(year, month - 1),
                monthsTranslate : translate - 1
            };
            nextCalendar = {
                year : year,
                month: month + 1,
                date : new Date(year, month + 1),
                monthsTranslate : translate + 1
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
            $(this.$el).find('.picker-calendar-months-wrapper').on($.touchEvents.start, this.handleTouchStart);
            $(this.$el).find('.picker-calendar-months-wrapper').on($.touchEvents.move, this.handleTouchMove);
            $(this.$el).find('.picker-calendar-months-wrapper').on($.touchEvents.end, this.handleTouchEnd);
        }
    }
}
