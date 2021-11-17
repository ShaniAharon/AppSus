


export default {
    props: ['info'],
    template: `
        <section class="note-todos">
           <h2>{{info.label}}</h2>
            <ul>
                <li v-for="(todo,idx) in info.todos">
                    <span>{{todo.txt}}</span>  <span v-if="todo.doneAt"> | {{toShowTime(todo.doneAt)}}</span>
                    <!-- {{todo}} -->
                </li>
            </ul>
        </section>
    `,
    data() {
        return {

        };
    },
    methods: {
        toShowTime(time) {
            return new Date(time).toDateString()
        }

    },
    computed: {

    }
};