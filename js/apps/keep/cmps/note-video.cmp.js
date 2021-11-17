


export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <h2>{{info.title}}</h2>
            <div class=iframe-container>
                <iframe width="100%" height="100%" :src="getProperURL"></iframe>
            </div>
                
            </iframe>
        </section>
    `,
    data() {
        return {

        };
    },
    methods: {
    },
    computed: {
        getProperURL() {
            const proper = 'embed';
            const urlArray = this.info.url.split('/');
            urlArray.splice(urlArray.length - 1, 0, proper);
            return urlArray.join('/')
        }
    }
};