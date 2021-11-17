// import { eventBus } from '../../../services/event-bus-service.js'

export default {
    props: ['info'],
    template: `
        <section class=note-txt>
            <h2>{{info.txt}}</h2>

        </section>
    `,
    data() {
        return {


        };
    },
    methods: {

    }
};