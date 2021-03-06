require('./bootstrap');

import router from './routes';
import VueRouter from 'vue-router';
import Index from './Index';
import moment from 'moment';
import StarRating from './shared/components/StarRating.vue';

window.Vue = require('vue');

Vue.use(VueRouter);

Vue.filter('fromNow', dateTime => moment(dateTime).fromNow());

Vue.component('star-rating', StarRating);

const app = new Vue({
    el: '#app',
    router,
    components: {
        Index,
    }
});
