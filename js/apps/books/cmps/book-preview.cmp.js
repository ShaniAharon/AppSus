

export default {
    props: ['book'],
    template: `
        <section class="book-preview">
            <h2>{{book.title}}</h2>
            <h4>{{priceToShow}}</h4>
            <router-link :to="'/missbook/book/'+book.id">Details</router-link>
        </section>
    `,
    data() {
        return {
            
        }
    },
    computed: {
        priceToShow() {
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

    }

}