
import homePage from './pages/home-page.cmp.js'
import emailApp from './apps/mail/pages/email-app.cmp.js'
import emailDetails from './apps/mail/pages/email-details.cmp.js'
import emailCompose from './apps/mail/cmps/compose-email.cmp.js'
import noteApp from './apps/keep/pages/note-app.cmp.js'
// import noteAdd from './apps/keep/cmps/note-add.cmp.js'
import bookApp from './apps/books/pages/book-app.cmp.js'
import bookAddPage from './apps/books/pages/book-add-page.cmp.js'
import bookDetails from './apps/books/pages/book-details.cmp.js'
import bookMain from './apps/books/book-main.js'


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp,
        children: [
            {
                path: '/email/edit/:emailId?',
                component: emailCompose,
            }
        ]
    },
    {
        path: '/email/:emailId',
        component: emailDetails,
    },
    {
        path:'/missbook/home' ,
        component: bookMain,

    },
    // {
    //     path: '/missbook/book',
    //     component: bookApp,
    //     children: [
    //         {
    //             path: 'add',
    //             component: bookAddPage,
    //         },
    //     ],
    // },
    // {
    //     path: '/missbook/book/:bookId',
    //     component: bookDetails,

    // },
    {
        path: '/note/:noteId?',
        component: noteApp,
    },


]


export const router = new VueRouter({ routes })