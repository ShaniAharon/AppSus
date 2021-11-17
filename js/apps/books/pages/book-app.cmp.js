import { bookService } from '../services/books.services.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'


export default {

    template: `
        <section class="book-app">
            <book-filter @filter="setFilter"></book-filter>
            <router-link class="add-book-anchor" to="/missbook/book/add">Add a Book</router-link>
            <router-view></router-view>
            <book-list v-if="books" :books="booksToShow"></book-list>
            
        </section>
    `,
    components: {
        bookList,
        bookFilter,
    },
    data() {
        return {
            books: null,
            filterBy: null,
        }
    },
    created() {
        eventBus.$on('added', this.updateBooks);
        bookService.query()
            .then(books => this.books = books)

    },
    destroyed() {
        eventBus.$off('added', this.updateBooks);
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        },
        updateBooks() {
            bookService.query()
                .then(books => this.books = books)
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const nameFilter = this.filterBy.byName.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return (book.title.toLowerCase().includes(nameFilter) && book.listPrice.amount <= this.filterBy.toPrice && book.listPrice.amount >= this.filterBy.fromPrice);

            });
            return booksToShow;
        }
    }

}