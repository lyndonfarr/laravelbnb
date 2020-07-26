import ExampleComponent from './components/ExampleComponent.vue';
import Bookables from './bookables/Bookables.vue';
import BookableListItem from './bookables/BookableListItem.vue';
import VueRouter from 'vue-router';

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home',
    }
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

export default router;