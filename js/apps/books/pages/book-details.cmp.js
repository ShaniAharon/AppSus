import { eventBus } from '../../../services/event-bus-service.js'
import bookDescription from '../cmps/book-description.cmp.js'
import { bookService } from '../services/books.services.js';
import reviewAdd from '../cmps/review-add.cmp.js'

export default {

    template: `
        <section v-if="book" class="book-details">
                <h2>{{book.title}}</h2>
                <h4>{{book.subtitle}}</h4>
                <span> By: {{authorsForDisplay}}</span>
                
                <span>Published: {{publishedDate}}</span>
                <book-description :desc="book.description"></book-description>
                <span>Pages: {{pageCount}}</span>
                <span>Language: {{book.language}}</span>
                <span>Genres: {{categoriesForDisplay}}</span>
                <span :class="colorForDisplay">Price: {{priceForDisplay}}</span>
                <img :src="book.thumbnail" />

                
                <span class="sale">{{saleForDisplay}}</span>

                <p v-if="book.reviews && book.reviews.length">What other people thought:</p>
                <div v-if="book.reviews" class="book-reviews" v-for="(review,idx) in book.reviews">
                    <button @click="deleteReview(idx)">X</button>
                    <span>By: {{review.name}}</span>
                    <span>Rated: {{review.rate}}</span>
                    <span>Commented: {{review.txt}}</span>        
                </div>

                <button @click="reviewToggle">{{btnTxt}}</button>
                <review-add v-if="isReviewOpen" @save="saveReview"></review-add>
                <div>
                    <router-link :to="'/missbook/book/'+prevBook">Previous</router-link> |
                    <router-link :to="'/missbook/book/'+nextBook">Next</router-link>
                </div>  

       </section>
    `,
    components: {
        bookDescription,
        reviewAdd,
    },
    data() {
        return {
            book: null,
            isReviewOpen: false,
            nextBook: null,
            prevBook: null,

        }
    },
    created() {
        // const { bookId } = this.$route.params;
        // bookService.getBookById(bookId)
        //     .then(book => {
        //         this.book = book;
        //     })
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getBookById(bookId)
                    .then(book => {
                        this.book = book;
                    })
                bookService.getNextAndPrevBook(bookId)
                    .then(res => {
                        this.nextBook = res.next;
                        this.prevBook = res.prev;
                    });
            },
            immediate: true
        }
    },
    methods: {
        reviewToggle() {
            this.isReviewOpen = !this.isReviewOpen;
        },
        saveReview(review) {
            bookService.addReview(this.book.id, review)
                .then(book => {
                    // console.log(this.book, book);
                    this.book = book;
                    const msg = {
                        txt: 'Review Added!',
                        type: 'success',
                        link: '/missbook/book/' + book.id,
                    }
                    eventBus.$emit('message', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error, ' + err,
                        type: 'failure',
                    }
                    eventBus.$emit('message', msg);
                })
        },
        deleteReview(reviewIdx) {
            bookService.deleteReview(this.book.id, reviewIdx)
                .then(book => {
                    this.book = book;
                    const msg = {
                        txt: 'Review Deleted!',
                        type: 'success',
                    }
                    eventBus.$emit('message', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error, ' + err,
                        type: 'failure',
                    }
                    eventBus.$emit('message', msg);
                })

        }

    },
    computed: {
        pageCount() {
            var text;
            if (this.book.pageCount > 500) text = 'Long Reading';
            else if (this.book.pageCount > 200) text = 'Decent Reading'
            else text = 'Light Reading'
            return `${this.book.pageCount} , ${text} `;
        },
        publishedDate() {
            var text = '';
            var { publishedDate } = this.book
            var CurrYear = new Date(Date.now()).getFullYear();
            if ((CurrYear - publishedDate) >= 10) text = 'Veteran Book!';
            else if (CurrYear - publishedDate <= 0) text = 'New Book!';
            return `${publishedDate}  ${text}`
        },
        authorsForDisplay() {
            if (!this.book.authors) return
            return this.book.authors.join(' | ');
        },
        categoriesForDisplay() {
            if (!this.book.categories) return
            return this.book.categories.join(' | ');
        },
        priceForDisplay() {
            var symbol;
            switch (this.book.listPrice.currencyCode) {
                case 'EUR':
                    symbol = '\u20AC';
                    break;
                case 'ILS':
                    symbol = '\u20AA';
                    break;
                case 'USD':
                    symbol = '$';
                    break;
            }
            return symbol + this.book.listPrice.amount;
        },
        saleForDisplay() {
            if (this.book.listPrice.isOnSale) return 'ON SALE!'
        },
        colorForDisplay() {
            if (this.book.listPrice.amount > 150) return 'red';
            else if (this.book.listPrice.amount < 20) return 'green';
            return;
        },
        btnTxt() {
            if (this.isReviewOpen) return 'Close';
            return 'Review';
        }
    }

}

