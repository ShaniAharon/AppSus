
/* <book-filter>
• Allow the user to filter the books list by name and by price range
• Emits: filtered with a filterBy object: {byName: 'xx', fromPrice:0, toPrice:Infinity}
• Emits the current filter when Filter button is clicked */

export default {
    template: `
        <div class="book-filter">
            <div>
                <input v-model="filterBy.byName" type="text" placeholder="Search">
                <button @click="filter">Filter</button>
            </div>
            <div>
                <span>Min:</span><input v-model="filterBy.fromPrice" type="range" min="0" max="500"> <span>{{filterBy.fromPrice}}</span>
                <span>Max:</span> <input v-model="filterBy.toPrice" type="range" min="0" max="500"> <span>{{filterBy.toPrice}}</span>
            </div> 
            
        </div>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: 500
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', JSON.parse(JSON.stringify(this.filterBy)))
        }
    }
}