import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import Login from '../views/Login.vue'

// import AdEdit from '../views/AdEdit.vue'
// import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'



import SloganEdit from '../views/SloganEdit.vue'
import SloganList from '../views/SloganList.vue'


import CityEdit from '../views/CityEdit.vue'
import CityList from '../views/CityList.vue'

import OriginEdit from '../views/OriginEdit.vue'
import OriginList from '../views/OriginList.vue'

import PlaceEdit from '../views/PlaceEdit.vue'
import PlaceList from '../views/PlaceList.vue'

import TableEdit from '../views/TableEdit.vue'
import TableList from '../views/TableList.vue'

import QuizEdit from '../views/QuizEdit.vue'
import QuizList from '../views/QuizList.vue'

import MessageList from '../views/MessageList.vue'

import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            isPublic: true
        }
    },

    {
        path: '/',
        name: 'main',
        component: Main,
        children: [
            { path: '/categories/create', component: CategoryEdit },
            { path: '/categories/list', component: CategoryList },
            { path: '/categories/edit/:id', component: CategoryEdit, props: true },

            { path: '/items/edit/:id', component: ItemEdit, props: true },
            { path: '/items/list', component: ItemList },
            { path: '/items/create', component: ItemEdit },

            { path: '/articles/edit/:id', component: ArticleEdit, props: true },
            { path: '/articles/list', component: ArticleList },
            { path: '/articles/create', component: ArticleEdit },

            { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
            { path: '/admin_users/list', component: AdminUserList },
            { path: '/admin_users/create', component: AdminUserEdit },


            { path: '/slogans/edit/:id', component: SloganEdit, props: true },
            { path: '/slogans/list', component: SloganList },
            { path: '/slogans/create', component: SloganEdit },



            { path: '/cities/edit/:id', component: CityEdit, props: true },
            { path: '/cities/list', component: CityList },
            { path: '/cities/create', component: CityEdit },

            { path: '/origins/edit/:id', component: OriginEdit, props: true },
            { path: '/origins/list', component: OriginList },
            { path: '/origins/create', component: OriginEdit },


            { path: '/places/edit/:id', component: PlaceEdit, props: true },
            { path: '/places/list', component: PlaceList },
            { path: '/places/create', component: PlaceEdit },

            { path: '/tables/edit/:id', component: TableEdit, props: true },
            { path: '/tables/list', component: TableList },
            { path: '/tables/create', component: TableEdit },

            { path: '/quizzes/edit/:id', component: QuizEdit, props: true },
            { path: '/quizzes/list', component: QuizList },
            { path: '/quizzes/create', component: QuizEdit },


            { path: '/users/list', component: UserList },

            { path: '/messages/list', component: MessageList },

        ]
    },

]

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     if (!to.meta.isPublic && localStorage.token) {
//         return next('/login')
//     }
//     next()
// })

export default router