


export default {
    props: ['desc'],
    template: `
        <div class="book-description">
            <p>{{textForShow}}</p>
            <button @click="toggleText">{{btnText}}</button> 
</div>
    `,
    data() {
        return {
            isLong: false,
            length: this.desc.length,
        }
    },
    methods: {
        toggleText() {
            this.isLong = !this.isLong
        }
    },
    computed: {
        textForShow() {
            return this.isLong ? this.desc : this.desc.substr(0, 100);
        },
        btnText() {
            return this.isLong ? 'Less' : 'More';
        }
    }

}