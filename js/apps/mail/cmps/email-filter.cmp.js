export default {
  template: `
        <div class="email-filter">
            <label>Search</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
            <button class="btn-toggle-task" @click="toggleTaskBar"><i class="fas fa-bars"></i></button>
          <div class="filter-sort-container">
            <label> Read/UnRead</label>
            <select @change="filter" v-model="filterBy.read">
              <option value="read">Read</option>
              <option value="unRead">UnRead</option>
              <option value="all">All</option>
            </select>
          <label>Sort</label>
            <select @change="onSort" v-model="sort">
              <option value="date">date</option>
              <option value="subject">subject</option>
            </select>
          </div>
        </div>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        read: 'all',
      },
      sort: 'date',
    };
  },
  methods: {
    filter() {
      this.$emit('filtered', {...this.filterBy});
    },
    onSort() {
      this.$emit('sorted', this.sort);
    },
    toggleTaskBar(){
      this.$emit('toggled');
    }
  },
};
