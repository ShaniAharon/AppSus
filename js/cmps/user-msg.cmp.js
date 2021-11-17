import { eventBus } from "../services/event-bus-service.js";



export default {
    template: `
        <div class="user-msg" :class="msg.type" v-if="msg">
            <p>{{msg.txt}}</p>
            <router-link v-if="msg.link" :to="msg.link">Check it Out</router-link>
            <span @click="clear">x</span>
        </div>
    `,
    data() {
        return {
            msg: null,
            timeOut: null,
        }
    },
    created() {
        eventBus.$on('message', this.setMsg);
    },
    destroyed() {
        eventBus.$off('message', this.setMsg);
    },
    methods: {
        setMsg(msg) {
            this.msg = msg;
            this.timeOut = setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        clear() {
            this.msg = null;
            clearTimeout(this.timeOut);
        }
    }
}