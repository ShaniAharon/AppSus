import { bookService } from '../services/books.services.js';
import { eventBus } from '../../../services/event-bus-service.js';

export default {
    template: `
        <section class="book-add-page">
            <h1>Web Search</h1>
            <p>Look for books you wish to add to our collection</p>
            <input v-model.lazy="txt" type="text"  placeholder="Search on the web">
            <!-- <span>{{txt}}</span> -->
            <button @click="searchFor">Search</button>
            <div v-if="books" class="search-results">
                <ul v-for="book in books">
                    <li>Title: {{book.volumeInfo.title}}</li>
                    <li>By: {{book.volumeInfo.authors}}</li>
                    <button @click="addBook(book.id)">Add</button>
                </ul>
            </div>

        </section>
    `,
    data() {
        return {
            txt: null,
            books: null,

        }
    },
    created() {
        console.log('add created');
    },
    mounted() {

    },
    methods: {
        searchFor() {
            bookService.getSearchResults(this.txt)
                .then(books => {
                    // console.log(books);
                    this.books = books;
                })
                .catch(err => console.log('Error, ', err));
        },
        addBook(id) {
            var book = this.books.find(book => book.id === id);

            bookService.addGoogleBook(book)
                .then((res) => {
                    eventBus.$emit('added');
                    const msg = {
                        txt: 'New Book Added!',
                        type: 'success',
                        link: '/missbook/book/' + res.id,
                    }
                    eventBus.$emit('message', msg)
                })
                .catch(err => {
                    console.log('Error', err);
                })

        }

    },
    computed: {
        arrayForDisplay(array) {
            return array.join(' | ');
        }
    },
};

