import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
        <section v-if="books" class="book-list">
            <div class="books-container" v-for="book in books" :key="book.id">            
            <book-preview :book="book" @click.native="selectBook(book)"></book-preview>
            

            </div>
        </section>
    `,
    components: {
        bookPreview,
    },
    data() {
        return {

        }
    },
    methods: {
        selectBook(book) {
            this.$emit('selected', book);
        }
    }

}