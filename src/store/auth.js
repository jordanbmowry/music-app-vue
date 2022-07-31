import { defineStore } from 'pinia';

export default defineStore('auth', {
  state: () => ({
    authModalShow: false,
  }),
  actions: {
    toggleAuthModal() {
      this.authModalShow = !this.authModalShow;
    },
  },
});
