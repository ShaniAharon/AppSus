export const noteServices = {
    query,
    addNote,
    removeNote,
    getNoteById,
    getEmptyNoteByType,
    editNote,
    emailToNoteEntity,
    // changeIdx,

}
import { storageService } from '../../../services/async-storage-service.js'
import { utilService } from '../../../services/util-service.js'


const NOTE_KEY = 'notes';
const gNotes = [

    {

        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Soccer at 6pm!"
        },
        style: {
            backgroundColor: "darkkhaki",
            fontSize: '16px'
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
            title: "Alice in action"
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Daily plans:",
            todos: [
                { txt: "Finish this", doneAt: null },
                { txt: "Mhm it's harder than I expected", doneAt: 187111111 },
                { txt: "On no", doneAt: Date.now() },
                { txt: "HELP! HELPPP!!", doneAt: null },
            ]
        },
        style: {
            backgroundColor: "lightpink",
            fontSize: '16px'
        }
    },
    { ///////////////////////////////////////////
        id: "n924",
        type: "note-audio",
        isPinned: false,
        info: {
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            title: 'What is that noise',
        },
        style: {
            backgroundColor: "lightskyblue",
            fontSize: '16px'
        }
    },
    {
        id: "n199",
        type: "note-video",
        isPinned: false,
        info: {   //https://www.youtube.com/embed/v=VOoXsOWE-rQ
            url: 'https://www.youtube.com/v=VOoXsOWE-rQ',
            title: 'chillout music',
        },
        style: {
            backgroundColor: "lightgreen",
            fontSize: '16px'
        }
    },
    {
        id: "n104",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "violet",
            fontSize: '16px'
        }
    },
    {
        id: "n105",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://www.cnet.com/a/img/-qQkzFVyOPEoBRS7K5kKS0GFDvk=/940x0/2020/04/16/7d6d8ed2-e10c-4f91-b2dd-74fae951c6d8/bazaart-edit-app.jpg",
            title: "Another bright day"
        },
        style: {
            backgroundColor: "lightblue",
            fontSize: '16px'
        }
    },
    {
        id: "n106",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get those done by midnight:",
            todos: [
                { txt: "Wake up successfully", doneAt: null },
                { txt: "Make my bed", doneAt: null },
                { txt: "Eat breakfast", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: "lightyellow",
            fontSize: '16px'
        }
    },
    {
        id: "n107",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Ofek's BD 6.8"
        },
        style: {
            backgroundColor: "darkkhaki",
            fontSize: '16px'
        }
    },
    { ///////////////////////////////////////////
        id: "n327",
        type: "note-audio",
        isPinned: false,
        info: {
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
            title: 'Uhm...',
        },
        style: {
            backgroundColor: "lightskyblue",
            fontSize: '16px'
        }
    },
    {
        id: "n108",
        type: "note-txt",
        isPinned: false,
        info: {
            txt: "Rent due on the 1st $1450"
        },
        style: {
            backgroundColor: "darkkhaki",
            fontSize: '16px'
        }
    },
    {
        id: "n109",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://www.happywalagift.com/wp-content/uploads/2020/12/Download-Merry-Christmas-HD-4k-Images-Wallpapers-6.jpg",
            title: "What a night"
        },
        style: {
            backgroundColor: "lightseagreen",
            fontSize: '16px'
        }
    },


]



function _createNotes() {
    var notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = gNotes;
        // console.log(gNotes)
        utilService.saveToStorage(NOTE_KEY, gNotes);
    }
}

function getNoteById(id) {
    return storageService.get(NOTE_KEY, id)
}

function query() {
    return storageService.query(NOTE_KEY);
}
// trying to fix my mess ups
function getEmptyNoteByType(type) {
    if (type === 'note-txt') {
        return {
            id: null,
            type: "note-txt",
            isPinned: false,
            info: {
                txt: null,
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }

    } else if (type === 'note-video') {
        return {
            id: null,
            type: "note-video",
            isPinned: false,
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }
    } else if (type === 'note-img') {
        return {
            id: null,
            type: "note-img",
            isPinned: false,
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }
    } else if (type === 'note-todos') {

        return {
            id: null,
            type: "note-todos",
            isPinned: false,
            info: {
                label: null,
                todos: [{ txt: null, doneAt: null }],
            },
            style: {
                backgroundColor: "lightgreen",
                fontSize: '16px'
            }
        }
    } else if (type === 'note-audio') {
        return {
            id: null,
            type: "note-audio",
            isPinned: false,
            info: {
                url: null,
                title: null,
            },
            style: {
                backgroundColor: "lightskyblue",
                fontSize: '16px'
            }
        }
    }
}


function editNote(editedNote) {
    console.log(editedNote);
    return storageService.put(NOTE_KEY, editedNote);
}

function addNote(newNote) {
    return storageService.post(NOTE_KEY, newNote);
}

function removeNote(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function emailToNoteEntity(emailObj) {
    const { to, subject, body, sentAt } = emailObj
    const emailNote = {
        id: null,
        type: "note-email",
        isPinned: false,
        info: {
            subject,
            body,
            to,
            sentAt,
        },
        style: {
            backgroundColor: "lightblue",
            fontSize: '16px'
        }
    }
    return Promise.resolve(emailNote);
}
//REF to graveyard:

// return storageService.post(NOTE_KEY, emailNote)

// return storageService.get('emails', emailId)
//     .then(email => {
//         // const  {subject,body,to,sentAt} = email
//         emailNote.info.subject = email.subject;
//         emailNote.info.body = email.body;
//         emailNote.info.to = email.to;
//         emailNote.info.sentAt = email.sentAt;
//         // storageService.post(NOTE_KEY, emailNote)
//         //     .then(newNote => {
//         //         console.log(newNote);
//         //         return newNote;
//         //     })
//         return emailNote;
//     })



// function changeIdx(noteDragged, dragId, idxToPlace) {
//     return storageService.remove(NOTE_KEY, dragId)
//         .then(() => {

//         })

// }

// async services does not offer a function to add to a certain Idx... perhaps i should create it in it?
// get back to it later

_createNotes();