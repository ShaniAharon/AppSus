import { emailService } from '../services/email-services.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailDetails from './email-details.cmp.js';
import composeEmail from '../cmps/compose-email.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import { eventBus } from '../../../services/event-bus-service.js';


export default {
  template: `
        <section class="email-app">

         <div class="email-layout-container">

          <div class="email-container">
             <email-filter @toggled="toggleTask" @sorted="sortEmails" @filtered="setFilter" />
            <email-list :emails="emailsToShow" @stared="onToggleStar" @toggle="onToggleRead" @selected="selectEmail" @remove="onRemove" />
          </div>
          
            <section  class="email-side-bar">
              <email-folder-list @hideTask="toggleTask" :isShow="isShow" @composed="openCompose" @show="onShowFolder"/>
              <h3 class="unread-count"> <i class="far fa-envelope unread-count-icon"></i> : {{unReadCount}}</h3>
            </section>
         </div>
            
            <email-details v-if="selectedEmail" :email="selectedEmail" @close="closeDetails" />
            <compose-email @closed="closeCompose" v-if="compose" @draftRemove="refreshDraft"/>
        </section>
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: null,
      folder: 'inbox',
      compose: false,
      isShow: false,
    };
  },
  created() {
    this.onShowFolder('inbox');

  },
  methods: {
    loadEmails() {
      emailService.query().then((emails) => {
        this.emails = emails.filter(e => e.to !== 'user@appsus.com')
      });
    },
    selectEmail(email) {
      if (email.isDraft) {
        this.openCompose();
        setTimeout(() => {
          eventBus.$emit('openDraft', email);
        }, 200);
        return;
      }
      emailService.setAsRead(email).then(this.selectedEmail = email);
      this.$router.push('/email/' + email.id);
    },
    onToggleRead(email) {
      emailService.toggleRead(email).then(this.selectedEmail = email);
    },
    onToggleStar(email) {
      emailService.toggleStar(email).then(this.selectedEmail = email);
    },
    closeDetails() {
      this.selectedBook = null;
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    refBooks(newBooks) {
      this.emails = newBooks;
    },
    createMsg(txt,type,link = ''){
      const msg = {
        txt,
        type,
        link
    };
    eventBus.$emit('message', msg)
    },
    onRemove(email) {
      if (!email.removedAt) {
        email.removedAt = Date.now();
        emailService.save(email).then(email => this.onShowFolder(this.folder));
        this.createMsg('Email Moved To Trash','success');
        return;
      }
      emailService.remove(email.id).then(emails => {
        this.onShowFolder(this.folder)
        this.createMsg('Email As Been Deleted','success');
      });
    },
    sortEmails(sortBy) {
      if (sortBy === 'date') {
        return this.emails.sort((e1, e2) => e2.sentAt - e1.sentAt);
      } else
        return this.emails.sort((e1, e2) => e1.subject.toLowerCase() > e2.subject.toLowerCase() ? 1 : -1);
    },
    onShowFolder(folder) {
      this.folder = folder;
      emailService.getEmailsByFolder(folder).then(emails => this.emails = emails);
    },
    refreshDraft() {
      this.onShowFolder(this.folder);
    },
    openCompose() {
      this.compose = true;
    },
    closeCompose() {
      this.compose = false;
    },
    toggleTask(){
      this.isShow = !this.isShow;
    }
  },
  computed: {
    emailsToShow() {
      if (!this.filterBy) return this.emails;
      const searchStr = this.filterBy.title.toLowerCase();
      if (this.filterBy.read === 'all' && !searchStr) return this.emails;
      const byRead = this.filterBy.read === 'read' ? true : false;
      const emailsToShow = this.emails.filter((email) => {
        return (
          email.subject.toLowerCase().includes(searchStr) && email.isRead === byRead
        );
      });
      return emailsToShow;
    },
    unReadCount() {
      let count = 0;
      if (!this.emails) return;
      this.emails.filter((e) => {
        if (!e.isRead) {
          count++;
        }
      });
      return count;
    },
  },
  watch: {
    '$route.query': {
      handler() {
        const noteSent = this.$route.query;
        if(!noteSent.subject) return;
        emailService.noteToEmailEntity(noteSent).then(note => {
          this.openCompose();
        setTimeout(()=>{
          eventBus.$emit('makeNote', note);
        },200);
        })
      },
      immediate: true,
    }
    //   '$route.params.emailId': {
    //      handler() {
    //        const {emailId} = this.$route.params;
    //        if(!emailId) return;
    //         emailService.noteToEmailEntity(emailId).then(note => {
    //     this.openCompose();
    //     setTimeout(()=>{
    //       eventBus.$emit('makeNote', note);
    //       console.log('sent note');
    //     },200);
    //   })
    //      },
    //      immediate:true
    //    }
  },
  components: {
    emailList,
    emailFilter,
    emailDetails,
    composeEmail,
    emailFolderList

  },
};
