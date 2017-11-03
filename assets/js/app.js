
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const event_hub_obj = new Vue();
Vue.mixin({
    data: function(){
        "use strict";
        return {
            event_hub_obj: event_hub_obj,
        }
    }
});


import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true });


Vue.component(
    'app',
    require('./App.vue')
);
Vue.component(
    'code-mirror',
    require('./components/CodeMirror.vue')
);
Vue.component(
    'markdown-preview',
    require('./components/MarkdownPreview.vue')
);
Vue.component(
    'index',
    require('./app/Index.vue')
);
const app = new Vue({
    el: '#app'
});

