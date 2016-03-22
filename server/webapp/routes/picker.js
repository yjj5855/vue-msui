'use strict';
function index(req, res) {
    // var vm;
    //
    // let tagClasses = [],
    //     contentList = [];
    //
    // vm = new Vue({
    //     replace: false,
    //     template: tpl,
    //     components : {
    //         articleItem : articleItem,
    //         qaItem : qaItem
    //     },
    //     data: {
    //         id : req.params.id,
    //         tagClasses : tagClasses,
    //         contentList : contentList
    //     }
    // });
    // vm.$on('vueServer.htmlReady', function (html) {
    //    
    // });
    res.render('layout');
}
exports.index = index;
//# sourceMappingURL=picker.js.map