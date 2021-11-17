import { noteServices } from '../services/note-services.cmp.js'

import noteList from '../cmps/note-list.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import { eventBus } from '../../../services/event-bus-service.js';
import noteAdd from '../cmps/note-add.cmp.js'



// • Apps Integration - Allow sending a note content straight into the compose-message page in misterEmail (use queryString Params)


export default {
    template: `
    <section class="note-app">
        <h1>Welcome to Notes!</h1>
        <div class="note-task-bar"> 
            <note-filter @filter="setFilter"></note-filter>
            <button @click="toggleModal">Add</button>
        </div>
        <note-add v-if="modalOpened" :selectedNote="selectedNote" @noteAdd="addNote" @noteEdited="updateNote" @closeEditor="closeModal"></note-add>
        <note-list v-if="notes" :notes="notesToShow" @copiedNote="copyNote" @noteChanged="noteChanges" @switchPlaces="switchPlaces"></note-list>

    </section> 
    `,
    data() {
        return {
            modalOpened: false,
            notes: null,
            filterBy: {
                byName: '',
                byType: 'all',
            },
            selectedNote: null,
        };
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
            console.log('Note App Says Filter has changed!', this.filterBy);
            this.notesToShow;
        },
        toggleModal(id) {
            // console.log('opening');
            this.modalOpened = !this.modalOpened;
        },
        closeModal() {
            // console.log('closing');
            this.modalOpened = false;
            this.selectedNote = null;
            // if (this.$route.params.noteId) this.$router.push('/note');
        },
        addNote(ev) {
            this.closeModal(); 
            console.log('NOTE ADDED! received at APP',)
            noteServices.query()
                .then(notes => {
                    this.notes = notes;
                    this.sortByPin; 
                    this.alertUser('Note Added');
                })
        },
        updateNote(ev) {
            console.log('NOTE EDITED! received at APP!');
            this.closeModal();
            noteServices.query()
                .then(notes => {
                    this.notes = notes;
                    this.sortByPin; 
                })
        },
        copyNote(copy) {
            noteServices.addNote(copy)
                .then((note) => {
                    console.log('COPY ADDED!', note)
                    noteServices.query()
                        .then(notes => {
                            this.notes = notes;
                            this.alertUser('Note Copied');
                        })
                })
                .catch(err => console.log('Error', err))
        },
        openEditor(note) {
            // console.log('parent received opening editor', this.modalOpened)
            this.selectedNote = note;
            // console.log(this.selectedNote, note);
            this.toggleModal();
        },
        noteChanges() {
            console.log('received Note Changes!');
            noteServices.query()
                .then(notes => {
                    this.notes = notes;
                    this.sortByPin;
                })
        },
        alertUser(txt, link) {
            const msg = {
                txt,
                type: 'success',
                link,
            }
            eventBus.$emit('message', msg)
        },
        switchPlaces(noteId, dropId) {
            console.log(noteId, dropId, 'in APP');
            const idxDragged = this.notes.findIndex(note => note.id === noteId);
            const idxToPlace = this.notes.findIndex(note => note.id === dropId);
            console.log(idxDragged, idxToPlace);
            const movedNote = JSON.parse(JSON.stringify(this.notes[idxDragged]))
            this.notes.splice(idxDragged, 1);
            this.notes.splice(idxToPlace, 0, movedNote);
            
        },
        // see if i can do it with the server
        // switchPlaces(noteId, dropId) {
        //     console.log(noteId, dropId, 'in APP');
        //     const idxDragged = this.notes.findIndex(note => note.id === noteId);
        //     const idxToPlace = this.notes.findIndex(note => note.id === dropId);
        //     console.log(idxDragged, idxToPlace);
        //     const movedNote = JSON.parse(JSON.stringify(this.notes[idxDragged]))
        //     noteServices.changeIdx(movedNote, noteId, idxToPlace)
        //         .then(note => {
        //             this.notes.splice(idxDragged, 1);
        //             this.notes.splice(idxToPlace, 0, movedNote);

        //         })
        // }


    },
    created() {
        // console.log(this.$route.params)
        noteServices.query()
            .then(notes => {
                this.notes = notes
                this.sortByPin
            });
        eventBus.$on('editNote', this.openEditor);

    },
    destroyed() {
        console.log('no longer here');
        eventBus.$off('editNote', this.openEditor);
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            var filteredByType;
            if (this.filterBy.byType === 'all') filteredByType = this.notes;
            else filteredByType = this.notes.filter(note => note.type === this.filterBy.byType);
            if (!this.filterBy.byName) {
                // console.log(filteredByType);
                return filteredByType;
            }
            var filteredNotes = filteredByType.filter((note) => {
                if (note.type === 'note-email') return false; // put it here cause email breaks the code get back to it later
                var values = Object.values(note.info);
                if (note.type === 'note-todos') {
                    if (note.info.label.toLowerCase().includes(this.filterBy.byName.toLowerCase())) return note;
                    var todoValues = Object.values(note.info.todos);
                    if (todoValues.some(val => val.txt.toLowerCase().includes(this.filterBy.byName.toLowerCase()))) return note;
                    else return false;
                }
                // if (note.type === 'note-img' || note.type === 'note-video') values = note.info.title
                // else if (note.type === 'note-txt') values = note.info.txt
                // if (values.toLowerCase().includes(this.filterBy.byName.toLowerCase())) return note
                if (values.some(val => val.toLowerCase().includes(this.filterBy.byName.toLowerCase()))) return note;
            })
            return filteredNotes;
        },
        sortByPin() {
            this.notes.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1
                else return 1
            })
        }


    },
    watch: {
        '$route.query': {
            handler() {
                // console.log('watching');
                const emailSent = this.$route.query;
                if (!emailSent.subject) return;
                noteServices.emailToNoteEntity(emailSent)
                    .then(emailNote => {
                        this.openEditor(emailNote);
                        this.$router.push('/note');
                    })
            },
            immediate: true
        }
        // old func Graveyard:

        // '$route.params.noteId': {
        //     handler() {
        //         console.log('watching');
        //         const { noteId } = this.$route.params;
        //         // const emailId = 'qwer';
        //         console.log(noteId);
        //         if (!noteId) return;
        //         noteServices.emailToNoteEntity(noteId)
        //             .then(emailNote => {
        //                 this.openEditor(emailNote);
        //                 this.$router.push('/note');
        //             })
        //     },
        //     immediate: true
        // }
    },
    components: {
        noteList,
        noteFilter,
        noteAdd,
    }
};