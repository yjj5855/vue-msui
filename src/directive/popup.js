export default {
    bind: function () {
        
    },
    update: function (value) {
        if(this.modifiers && this.modifiers.open){
            $(this.el).on('click',()=>{
                $(value).removeClass('modal-out').css({ display : 'block'});
                setTimeout(()=>{
                    if($('.popup-overlay').length == 0){
                        $('body').append(`<div class="popup-overlay modal-overlay-visible"></div>`)
                    }else{
                        $('.popup-overlay').addClass('modal-overlay-visible')
                    }
                    $(value).addClass('modal-in');
                })
            })
        }else if(this.modifiers && this.modifiers.close){
            $(this.el).on('click',()=>{
                $(value).removeClass('modal-in').addClass('modal-out')
                $('.popup-overlay').removeClass('modal-overlay-visible')
                setTimeout(()=>{
                    $(value).removeClass('modal-out').css({ display : 'none'});
                },4e2)
            })
        }
    },
    unbind: function () {
        $(this.el).off('click');
    },
}