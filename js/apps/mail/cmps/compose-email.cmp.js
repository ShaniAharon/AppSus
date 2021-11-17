import { emailService } from '../services/email-services.js'
import { eventBus } from '../../../services/event-bus-service.js';

export default {
  template: `
      <section class="compose-email ">
          <div class="overlay" @click="closeModal"></div>
          <div class="modal-card">
            <h3 class="compose-header"><span>New Email</span> </h3>
            <input type="text" ref="textInput" placeholder="To" v-model="newEmail.to">
            <input type="text" placeholder="Subject" v-model="newEmail.subject">
            <textarea v-model="newEmail.body"  cols="30" rows="30"></textarea>
            <button class="compose-send" @click="addNewEmail">Send</button>
          </div>
      </section>
    `,
  data() {
    return {
      newEmail: {
        to: '',
        subject: '',
        body: ''
      },
      isOpen: true,
      saveInterval: null,
    };
  },
  created() {
    eventBus.$on('openDraft', this.putData);
    eventBus.$on('makeNote', this.createNote);
   
    this.saveInterval = setInterval(()=> {
      if(this.newEmail.to || this.newEmail.subject || this.newEmail.body){
        emailService.saveDraft(this.newEmail).then(d => {
          this.createMsg('Saved As Draft...','success');
        });
       } 
       else this.newEmail = {
        to: '',
        subject: '',
        body: ''
       }
    },5000);
  },
  mounted(){
    this.$refs.textInput.focus();
  },
  destroyed() {
    clearInterval(this.saveInterval);
  },
  methods: {
    createMsg(txt,type,link = ''){
      const msg = {
        txt,
        type,
        link
    };
    eventBus.$emit('message', msg)
    },
    addNewEmail(){      
       emailService.addEmail(this.newEmail).then(email => {
        this.createMsg('Sent New Email','success');
         if(this.newEmail.isDraft){
          emailService.removeDraft(email.id).then(e =>{
            this.$emit('draftRemove');
            this.closeModal();
        });
         }else{
          this.newEmail = {
            to: '',
            subject: '',
            body: ''
           };
           this.closeModal();
         }
       });
    },
    putData(draft){
      this.newEmail = draft;
    },
    createNote(noteEmail){
        this.newEmail = noteEmail;
    },

    closeModal(){
        this.isOpen = false;
        this.$emit('closed');
    }
  },
};
