import bookApp from './pages/book-app.cmp.js'
import bookHomePage from './pages/book-home-page.cmp.js'
import bookAboutPage from './pages/book-about-page.cmp.js'
import bookDetails from './pages/book-details.cmp.js'
import bookAddPage from './pages/book-add-page.cmp.js'

const routes = [
    {
        path: '/missbook/home',
        component: bookHomePage
    },
    {
        path: '/missbook/about',
        component: bookAboutPage
    },
    {
        path: '/missbook/book',
        component: bookApp,
        children: [
            {
                path: 'add',
                component: bookAddPage,
            },
        ],
    },
    {
        path: '/missbook/book/:bookId',
        component: bookDetails
    }
]


export const router = new VueRouter({ routes })