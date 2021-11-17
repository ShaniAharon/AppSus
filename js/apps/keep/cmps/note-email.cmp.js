

export default {
    props: ['info'],
    template: `
        <section class=note-email>
            <h2>{{info.subject}}</h2>
            <p> {{info.body}}</p>
            <p>{{info.to}}</p>
            <span>{{toShowTime}}</span>
        </section> 
    `,
    data() {
        return {


        };
    },
    methods: {

    },
    computed: {
        toShowTime() {
            return new Date(parseInt(this.info.sentAt)).toDateString();
        }
    }
};
