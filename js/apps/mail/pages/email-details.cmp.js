import {emailService} from '../services/email-services.js';


export default {
  template: `
        <section v-if="email" class="email-details email-app  ">
      <div class="email-display">
           
          <h2 class="mb-0">
            Subject: <strong>{{ email.subject }}</strong>
         </h2>
       <div>
         <em>To {{ email.to }} on {{ formatDate(email) }}</em>
      </div>
        <div>
        <img  v-if="email.imageUrl"  :src="formatImage" alt="">
          {{email.body}}
        </div>
    </div>

    <router-link to="/email" ><i class=" email-back-arrow fas fa-arrow-circle-left"></i></router-link>
        
        </section>
    `,
  data() {
    return {
      email: null,
     
    };
  },
  created() {
    const {emailId} = this.$route.params;
    emailService.getById(emailId).then((email) => (this.email = email));
  },
  mounted() {
    // this.putSrc();
  },
  methods: {
    formatDate(email) {
      // var day =new Date(email.sentAt).getDate();
      // var month=new Date(email.sentAt).getMonth()+1;
      // var year=new Date(email.sentAt).getFullYear();
      // var original_date= day +'/'+month+'/'+year;
      let date = new Date(email.sentAt).toLocaleString().replace(/\s/g, "");
      return  date; //original_date;
    },
  },
  computed: {
    formatImage(){
      if(this.email.imageUrl){
          return this.email.imageUrl;
      }
    }
  },
};
