<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <RouterLink :to="{ name: 'about' }" class="px-2 text-white"
              >About</RouterLink
            >
          </li>
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a @click.prevent="toggleAuthModal" class="px-2 text-white" href="#"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <RouterLink class="px-2 text-white" :to="{ name: 'manage' }"
                >Manage</RouterLink
              >
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapState, mapStores } from 'pinia';
import useAuthStore from '@/store/auth';
import useUserStore from '@/store/user';

export default {
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapStores(useUserStore),
  },
  name: 'AppHeader',
  methods: {
    ...mapActions(useAuthStore, ['toggleAuthModal']),

    signOut() {
      this.userStore.signOut();
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>
