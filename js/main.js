
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import { router } from './routes.js'
import userMsg from './cmps/user-msg.cmp.js'


const options = {
    el: '#app',
    router,
    template: `
        <section>
            <app-header></app-header>
            <user-msg></user-msg>
            <router-view></router-view>
            <app-footer></app-footer>
        </section>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg,
    },

}

new Vue(options)





