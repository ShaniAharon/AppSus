



export default {
    template: `
                <div class="review-add" v-if="review">
                    <form action="" @submit.prevent = "saveReview">
                        <label for="fullName">Full Name:</label>
                        <input type="text" v-model="review.name" id="fullName" placeholder="Your Name" required>
                        <label for="rate">Rate:</label>
                        <select v-model="review.rate" id="rate" name="rate">
                            <option v-for="num in 5" :value="num">{{num}}</option>
                        </select>
                        <label for="date">Read on:</label>
                        <input v-model="review.date" type="date" id="date" name="date" required>
                        <label for="comments">Write a comment</label>
                        <textarea v-model="review.txt" name="comments" placeholder="Comments" rows="10" cols="30" required></textarea>
                        <button>Send</button>
                    </form>
                </div>
    `,
    data() {
        return {
            review: null,
        }
    },
    created() {
        this.review = this.defaultReview();
    },
    mounted() {
        this.$el.firstChild[0].focus();
    },
    methods: {
        saveReview() {
            this.$emit('save', { ...this.review });
            this.review = null;
            this.review = this.defaultReview();
        },
        defaultReview() {
            return {
                name: 'Book Reader',
                rate: '1',
                date: new Date(Date.now()).toLocaleDateString(),
                txt: '',
            }
        }

    },
    computed: {

    }
}