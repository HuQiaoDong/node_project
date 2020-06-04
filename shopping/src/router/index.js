import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/register",
        name: "Register",
        // component: r => request(['../views/Register.vue'], r)
        component: () =>
            import("../views/Register.vue")
    },
    {
        path: '/login',
        name: 'Login',

        //懒加载组件
        component: r => require(['../views/Login.vue'], r)
    },
    {
        path: '/manage',
        name: 'Manage',

        //懒加载组件
        component: r => require(['../views/Manage.vue'], r),
        children: [{
            path: 'type',
            name: 'Type',
            component: r => require(['../views/Type.vue'], r)
        }, {
            path: 'goods',
            name: 'Goods',
            component: r => require(['../views/Goods.vue'], r)
        }, {
            path: 'goodsdesc/:id',
            name: 'GoodsDesc',
            component: r => require(['../views/GoodsDesc.vue'], r)
        }]
    },
    {
        path: "*",
        redirect: {
            name: "Register"
        }
    }
];

const router = new VueRouter({
    routes
});

export default router;