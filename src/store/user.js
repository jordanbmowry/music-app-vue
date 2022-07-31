import { defineStore } from 'pinia';
import { auth, userCollection } from '@/includes/firebase';

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(
        values['signup-email'],
        // eslint-disable-next-line comma-dangle
        values['signup-password']
      );

      await userCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values['signup-email'],
        age: values.age,
        country: values.country,
      });

      await userCred.user.updateProfile({
        displayName: values.name,
      });

      this.userLoggedIn = true;
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(
        values['login-email'],
        // eslint-disable-next-line comma-dangle
        values['login-password']
      );
      this.userLoggedIn = true;
    },
    async signOut() {
      await auth.signOut();

      this.userLoggedIn = false;
    },
  },
});
