
import bookAppHeader from './cmps/book-app-header.cmp.js'
import bookAppFooter from './cmps/book-app-footer.cmp.js'
import { router } from './book-routes.js'
import userMsg from './cmps/user-msg.cmp.js'


export default {
    router,
    template: `
        <section class="missbook">
            <book-app-header></book-app-header>
            <user-msg></user-msg>
            <router-view></router-view>
            <!-- <book-app-footer></book-app-footer> -->
        </section>
    `,
    components: {
        bookAppHeader,
        bookAppFooter,
        userMsg,
    },
    // router,



}



