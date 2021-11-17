import emailPreview from './email-preview.cmp.js';

export default {
  props: ['emails'],
  template: `
        <table class="mail-table">
            <tbody>
                <tr v-for="email in emails" :key="email.id" :class="['clickable', email.isRead ? 'read' : '']">
                  <email-preview :email="email" @stared="onToggleStar" @toggle="onToggleRead"  @click.native="select(email)" @remove="onRemove(email)"></email-preview>
                </tr>
            </tbody>
        </table>
             
    `,
  methods: {
    select(email) {
      this.$emit('selected', email);
    },
    onRemove(email) {
      this.$emit('remove',email);
    },
    onToggleRead(email){
        this.$emit('toggle',email);
    },
    onToggleStar(email){
        this.$emit('stared',email);
    }
  },
  components: {
    emailPreview,
  },
};
