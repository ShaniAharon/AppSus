
import noteTxt from './note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteEmail from '../cmps/note-email.cmp.js'
import noteAudio from '../cmps/note-audio.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js'
import { noteServices } from '../services/note-services.cmp.js'

export default {
    props: ['note'],
    template: `
        <section class="note-preview" :style="note.style"  @dragstart="startDrag($event,note)" @drop="onDrop($event,note.id)" @dragenter.prevent @dragover.prevent>
            <div class="note-control-box">
                <button @click.stop.prevent="removeNote"><i class="far fa-trash-alt"></i></button>
                <button @click.stop.prevent="openEditor"><i class="far fa-edit"></i></button> <!--watchout for native -->
                <span :class="{yellow: note.isPinned }" @click.stop="setPinned"><i class="fas fa-thumbtack"></i></span>
                <button @click.stop.prevent="copyNote"><i class="far fa-copy"></i></button>
                <router-link :to="'/email/edit/'+getQueryString"><i class="far fa-envelope"></i></router-link>
                <button @click.stop.prevent="toggleColors"><i class="fas fa-palette"></i></button>
                <div v-if="colorOpen" class="color-options">
                    <!-- <transition name="color-fade"> -->
                    <span @click.stop.prevent="setColor(color)" class="color-span" v-for="color in colors" :style="{ 'background-color': color }">Co</span>
                    <!-- </transition> -->
                </div>
            </div>
            <component  
                        :is="note.type" 
                        :info="note.info"> 
            </component>
        </section>
    `,
    data() {
        return {
            edit: false,
            txt: null,
            styleObj: {
                backgroundColor: null,
                fontSize: '16px',
            },
            colorOpen: false,
            colors: ['darkkhaki', 'lightyellow', 'lightblue', 'white', 'violet', 'lightgray', 'lightgreen', 'lightcoral', 'lightpink', 'lightseagreen', 'tomato'],
            // qString: null,

        }
    },
    methods: {
        removeNote() {
            noteServices.removeNote(this.note.id)
                .then(note => {
                    this.$emit('noteChanged');
                    this.alertUser('Note Deleted');
                })
        },
        setColor(color) {
            this.note.style.backgroundColor = color;
            noteServices.editNote(this.note)
                .then(note => {
                    this.$emit('noteChanged');
                })
        },
        openEditor() {
            eventBus.$emit('editNote', this.note);
        },
        toggleColors() {
            this.colorOpen = !this.colorOpen;
        },
        setPinned() {
            this.note.isPinned = !this.note.isPinned
            noteServices.editNote(this.note)
                .then(note => {
                    this.$emit('noteChanged');
                })
        },
        copyNote() {
            this.$emit('copiedNote', JSON.parse(JSON.stringify(this.note)));
        },
        startDrag(ev, note) {
            console.log('u are draggin!');
            console.log('being moved dragged:', note, ev);
            ev.dataTransfer.dropEffect = 'move';
            ev.dataTransfer.effectAllowed = 'move';
            ev.dataTransfer.setData('noteId', note.id);
        },
        onDrop(ev, dropId) {
            const noteId = ev.dataTransfer.getData('noteId');
            console.log(noteId);
            this.$emit('switchPlaces', noteId, dropId);
        },
        alertUser(txt, link) {
            const msg = {
                txt,
                type: 'success',
                link,
            }
            eventBus.$emit('message', msg)
        }
    },
    computed: {
        getQueryString() {
            const type = this.note.type;
            const info = this.note.info;
            let qString;
            switch (type) {
                case 'note-txt':
                    qString = `?subject=My Note&body=${info.txt}`
                    break;
                case 'note-img':
                case 'note-video':
                    qString = `?subject=${info.title}&body=${info.url}`
                    break;
                case 'note-todos':
                    qString = `?subject=${info.label}&body=${info.todos}}`
                    break;
                case 'note-email':
                    qString = `?subject=${info.subject}&body=${info.body}`
                    break;
            }
            // console.log('qs', qString);
            return qString;
        }
    },
    components: {
        noteImg,
        noteTxt,
        noteTodos,
        noteVideo,
        noteEmail,
        noteAudio
    }

}