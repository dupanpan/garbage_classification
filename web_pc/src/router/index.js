import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Search from '../views/Search.vue'
import Slogan from '../views/Slogan.vue'
import Origin from '../views/Origin.vue'
import HandlePlace from '../views/HandlePlace.vue'
import Table from '../views/Table.vue'
import Policy from '../views/Policy.vue'
import Quiz from '../views/Quiz.vue'
import MBoard from '../views/MBoard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PolicyDetail from '../views/PolicyDetail.vue'
import News from '../views/News.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Main,
        children: [
            { path: '/', name: 'home', component: Home },

            { path: '/slogan/', name: 'slogan', component: Slogan, props: true },
            { path: '/search/', name: 'search', component: Search, props: true },
            { path: '/policy/', name: 'policy', component: Policy, props: true },
            // { path: '/quizzes/', component: Quiz, props: true },
            { path: '/mboard/', component: MBoard, props: true },
            { path: '/policy_details/:id', component: PolicyDetail, props: true },
            { path: '/origins/', component: Origin, props: true },
            { path: '/table/', component: Table, props: true },
            { path: '/handle_place/', component: HandlePlace, props: true },
            { path: '/news/', component: News, children: [] },
            { path: '/quizzes/', component: Quiz, props: true },
            { path: '/articles/:id', name: 'article', component: Article, props: true, }
        ]
    },


    { path: '/login/', component: Login, props: true },
    { path: '/register/', component: Register, props: true },
]

const router = new VueRouter({
    routes
})

export default router