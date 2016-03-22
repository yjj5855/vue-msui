import Vue from 'vue'

let App = Vue.extend({
    events: {
        //消息通知
        // admin_msg_notify : 'showMsgToast'
    },
    methods : {
        // showMsgToast(_this){
        //     $('.toast.bottom').unbind();
        //     $.toast('有消息,点击进入聊天!','2e3','bottom')
        //     setTimeout(()=>{
        //         $('.toast.bottom').on('click',()=>{
        //             _this.$router.go('/webapp/chat');
        //             //$('.toast.bottom').hide();
        //         })
        //     },100)
        // }
    }
});

export default App