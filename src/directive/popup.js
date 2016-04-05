export default {
    bind: function () {
        
    },
    update: function (value) {
        if(this.modifiers && this.modifiers.open){
            $(this.el).on('click',()=>{
                $(value).removeClass('modal-out').css({ display : 'block'});
                setTimeout(()=>{
                    $(value).addClass('modal-in');
                    $('.modal-overlay').addClass('modal-overlay-visible')
                })
            })
        }else if(this.modifiers && this.modifiers.close){
            $(this.el).on('click',()=>{
                $(value).removeClass('modal-in').addClass('modal-out')
                setTimeout(()=>{
                    $(value).removeClass('modal-out').css({ display : 'none'});
                    $('.modal-overlay').remove('modal-overlay-visible')
                },5e2)
            })
        }
    },
    unbind: function () {
        $(this.el).off('click');
    },
}