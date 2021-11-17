import { noteServices } from '../services/note-services.cmp.js'

export default {
    props: ['selectedNote'],
    template: `
                <div class="note-add">
                    <button class="close-btn" @click="closeEditor">X</button>
                    
                    <select v-model="noteType" @change="setNoteForm" name="note-type">
                        <option value="note-txt">Text</option>
                        <option value="note-video">Video</option>
                        <option value="note-img">Image</option>
                        <option value="note-todos">Todo</option>
                        <option value="note-audio">Audio</option>

                    </select>
                    <form v-if="newNote" class="note-form" @submit.prevent = "saveNote">

                        <template v-if="(noteType === 'note-txt') && newNote"  >
                            <label for="comments">Write something</label>
                            <textarea v-model="newNote.info.txt" name="comments" placeholder="Your thoughts" rows="10" cols="30" required></textarea>
                        </template>

                        <template v-if="(noteType === 'note-video') && newNote">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.info.title" name="title" placeholder="Title..." required>
                            <label for="video">Add a video</label>
                            <input v-model="newNote.info.url" type="url" name="video" placeholder="https://video.com" required>
                        </template>

                        <template v-if="(noteType === 'note-img') && newNote">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.info.title" name="title" placeholder="Title..." required>
                            <br>
                            <label for="img">Add a photo</label>
                            <input v-model="newNote.info.url" type="url" name="img" placeholder="https://image.com" required>
                        </template>

                        <template v-if="(noteType === 'note-todos') && newNote">
                            <span>List label</span> 
                            <input v-model="newNote.info.label" type="text" placeholder="Enter a label">
                            <span>What to do?</span>
                            <input type="text" v-for="(todo,idx)  in newNote.info.todos" v-model="newNote.info.todos[idx].txt">
                            <button @click.stop.prevent="addTodo">+</button>

                        </template>

                            <template v-if="(noteType === 'note-email') && newNote">
                            <input v-model="newNote.info.subject" type="text" placeholder="Your email subject">
                            <textarea v-model="newNote.info.body" name="comments" placeholder="Your email body" rows="10" cols="30" required></textarea>
                            <span>{{newNote.info.sentAt}}</span>
                            <span>{{newNote.info.to}}</span>
                        </template>

                        <template v-if="(noteType === 'note-audio') && newNote">
                            <label for="title">Add a Title</label>
                            <input v-model="newNote.info.title" name="title" placeholder="Title..." required>
                            <br>
                            <label for="audio">Audio Url</label>
                            <input v-model="newNote.info.url" type="url" name="audio" placeholder="https://audio.com" required>
                            <!-- <span @click="isRecord = true">record</span>
                                <template v-if="isRecord">
                                    <button @click="startRecording">record</button>
                                    <button @click="stopRecording">stop</button>
                                    <div id="audio" class="audio" controls></div>
                                </template> -->

                        </template>

                        <button>Save</button>
                    </form>

                </div>
    `,
    data() {
        return {
            newNote: null,
            noteType: 'note-txt', //watchout!!!
            todo: { txt: null, doneAt: null },
            isEdited: false,
            // isRecord: false,
            // recorder: null,
        }
    },
    created() {
        if (this.selectedNote) {
            this.isEdited = true;
            this.noteType = this.selectedNote.type;
            this.newNote = JSON.parse(JSON.stringify(this.selectedNote));
            if (this.noteType === 'note-email') this.isEdited = false; // WORK IN PROGRESS
        } else {
            this.newNote = noteServices.getEmptyNoteByType(this.noteType);
        }
    },
    mounted() {

    },
    methods: {

        saveNote() {
            if (this.isEdited) {
                noteServices.editNote(this.newNote)
                    .then((note) => {
                        console.log(note, 'has been EDITED')
                        this.$emit('noteEdited', note)
                    })
                    .catch(err => console.log('Error', err))
            } else {
                noteServices.addNote(this.newNote)
                    .then((note) => {
                        console.log(note, 'has been ADDED')
                        this.$emit('noteAdd', note)
                    })
                    .catch(err => console.log('Error', err))
            }
        },
        addTodo() {
            this.newNote.info.todos.push(JSON.parse(JSON.stringify(this.todo)));
            this.todo = { txt: null, doneAt: null };

        },
        setNoteForm() {
            this.newNote = noteServices.getEmptyNoteByType(this.noteType);
        },
        closeEditor() {
            this.$emit('closeEditor');
        },

        // NOT WORKING:
        // startRecording() {
        //     var items = [];
        //     navigator.mediaDevices.getUserMedia({ audio: true })
        //         .then(function (stream) {
        //             console.log('stream', stream, 'recorder:', this.recorder);
        //             this.recorder = new MediaRecorder(stream);

        //             recorder.ondataavailable = (e) => {
        //                 console.log('recording', e);
        //                 items.push(e.data);
        //                 if (this.recorder.state == "inactive") {
        //                     var blob = new Blob(items, { type: "audio/*" });
        //                     var audio = document.getElementById("audio");
        //                     var mainaudio = document.createElement("audio");
        //                     mainaudio.setAttribute("controls", "controls");
        //                     audio.appendChild(mainaudio);
        //                     mainaudio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="audio/*" />';
        //                 }
        //             };
        //             this.recorder.start();

        //         })
        //         .catch(function (err) {
        //             console.log('ERROR', err);
        //         });
        // },
        // // NOT WORKING:
        // stopRecording() {
        //     this.recorder.stop();
        // }

    },

    computed: {

    }
}




