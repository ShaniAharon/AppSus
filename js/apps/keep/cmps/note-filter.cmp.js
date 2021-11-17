

export default {
    template: `
        <div class="note-filter">
            <input v-model="filterBy.byName" @change="filter" type="text" placeholder="Search">
            <select v-model="filterBy.byType" name="byType" @change="filter">
                <option value="all">All</option>
                <option value="note-txt">Text</option>
                <option value="note-img">Image</option>
                <option value="note-video">Video</option>
                <option value="note-todos">Todos</option>
            </select>
        </div>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                byType: 'all',
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', JSON.parse(JSON.stringify(this.filterBy)))
        }
    }
}