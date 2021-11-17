
import { noteServices } from '../services/note-services.cmp.js';
import notePreview from './note-preview.cmp.js'


export default {
    props: ['notes'],
    template: `
        <section v-if="notes" class="note-list">
                <note-preview v-for="(note, idx) in notes" draggable="true" @switchPlaces="switchPlaces" :key="note.id" :class="note.type" :note="note" @copiedNote="copiedNote" @noteChanged="noteChanged">
                    
                </note-preview>
        </section>
    `,
    components: {
        notePreview,
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        copiedNote(ev) {
            this.$emit('copiedNote', ev);
        },
        noteChanged(ev) {
            this.$emit('noteChanged');
        },
        switchPlaces(noteId, dropId) {
            this.$emit('switchPlaces', noteId, dropId);
            // console.log(noteId, dropId);
            // const idxDragged = this.notes.findIndex(note => note.id === noteId);
            // const idxToPlace = this.notes.findIndex(note => note.id === dropId);
            // console.log(idxDragged, idxToPlace);
            // const noteDragged = noteServices.getNoteById(noteId);

            // this.notes.splice(idxToPlace, 0, noteDragged);
            // this.notes.splice(idxDragged, 1);
        }

    },
    computed: {

    }



}