

export default {
    props: ['info'],
    template: `
            <section class="note-audio">
            <h2>{{info.title}}</h2>
            <audio controls>
                <source :src="info.url" type="audio/ogg">
            </audio>


            </section>
    `,
    data() {
        return {
            // record: false,
        };
    },
    methods: {

    }
};