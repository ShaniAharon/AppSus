// import {eventBus} from '../services/event-bus-service.js'


export default {
    template: `
        <section class="book-about-page">
            <!-- <h3 ref="header">Learn more..</h3> -->
            <h1>Your fulfilling reading experience starts here</h1>
            <h1>We strive for maintain an inventory with the most unique and sought after books out there at affordable price</h1>
            
        </section>
    `,
    methods: {

    },
    created() {
        this.interval = setInterval(() => {
        }, 5000);
    },
    destroyed() {
        clearInterval(this.interval);
    },
    mounted() {
        // console.log(this.$refs.header);
    }
};