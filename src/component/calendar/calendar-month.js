import tpl from './calendar-month.html'


export default {
    template : tpl,
    props: {
        value : {
            default: ''
        },
        translate : {
            type : Number,
            default: 0
        }
    },
    data(){
        return {
            date : '',
            year : '',
            month : '',
            day : '',

            dayArray : [
                [],[],[],[],[],[]
            ],
            currentValues : []
        }
    },
    methods: {
        daysInMonth(date) {
            var d = new Date(date);
            return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
        },
        jisuan(){
            let daysInPrevMonth,
                daysInMonth,
                firstDayOfMonthIndex;

            
            this.dayArray = [
                [],[],[],[],[],[]
            ];
            this.currentValues = [];
            //初始化年月日
            this.date = new Date(this.value);
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();
            this.day = this.date.getDate();


            daysInPrevMonth = this.daysInMonth(new Date(this.date.getFullYear(), this.date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000);
            daysInMonth = this.daysInMonth(this.date);
            firstDayOfMonthIndex = new Date(this.date.getFullYear(), this.date.getMonth()).getDay();
            if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

            let dayDate, i, j,
                rows = 6, cols = 7,
                monthHTML = '',
                dayIndex = 0 + (this.$parent.options.firstDay - 1),
                today = new Date().setHours(0,0,0,0),
                minDate = this.$parent.options.minDate ? new Date(this.$parent.options.minDate).getTime() : null,
                maxDate = this.$parent.options.maxDate ? new Date(this.$parent.options.maxDate).getTime() : null;
            
            if (this.$parent.options.values && this.$parent.options.values.length) {
                for (i = 0; i < this.$parent.options.values.length; i++) {
                    this.currentValues.push(new Date(this.$parent.options.values[i]).setHours(0,0,0,0));
                }
            }

            for (i = 1; i <= rows; i++) {
                var rowHTML = '';
                var row = i;
                for (j = 1; j <= cols; j++) {
                    var col = j;
                    dayIndex ++;
                    var dayNumber = dayIndex - firstDayOfMonthIndex;
                    var addClass = '';
                    if (dayNumber < 0) {
                        dayNumber = daysInPrevMonth + dayNumber + 1;
                        addClass += ' picker-calendar-day-prev';
                        dayDate = new Date(this.month - 1 < 0 ? this.year - 1 : this.year, this.month - 1 < 0 ? 11 : this.month - 1, dayNumber).getTime();
                    }
                    else {
                        dayNumber = dayNumber + 1;
                        if (dayNumber > daysInMonth) {
                            dayNumber = dayNumber - daysInMonth;
                            addClass += ' picker-calendar-day-next';
                            dayDate = new Date(this.month + 1 > 11 ? this.year + 1 : this.year, this.month + 1 > 11 ? 0 : this.month + 1, dayNumber).getTime();
                        }
                        else {
                            dayDate = new Date(this.year, this.month, dayNumber).getTime();
                        }
                    }
                    // Today
                    if (dayDate === today) addClass += ' picker-calendar-day-today';
                    // Selected
                    if (this.currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                    // Weekend
                    if (this.$parent.options.weekendDays.indexOf(col - 1) >= 0) {
                        addClass += ' picker-calendar-day-weekend';
                    }
                    // Disabled
                    if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                        addClass += ' picker-calendar-day-disabled';
                    }

                    dayDate = new Date(dayDate);
                    var dayYear = dayDate.getFullYear();
                    var dayMonth = dayDate.getMonth();

                    // console.log(this.dayArray[row-1])
                    this.dayArray[row-1].push({
                        className : addClass,
                        dayYear : dayYear,
                        dayMonth : dayMonth,
                        dayNumber : dayNumber,
                    });
                }
            }

        }
    },
    watch : {
        'value' : function (val) {
            console.log(val)
            this.jisuan();
        }
    },
    computed : {
        transformStyle(){
            return 'translate3d('+(this.translate)+'00%, 0%, 0px);';
        }
    },
    beforeCompile(){
        this.jisuan();
    },
    ready(){
        
    }
}
