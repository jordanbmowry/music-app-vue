<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <div
    v-if="login_show_alert"
    class="text-white text-center font-bold p-4 mb-4"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="login-email">Email</label>
      <VeeField
        id="login-email"
        name="login-email"
        type="login-email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="login-email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="login-password">Password</label>
      <VeeField
        id="login-password"
        name="login-password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="login-password" />
    </div>
    <button
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
import { mapActions } from 'pinia';
import useUserStore from '@/store/user';

export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        'login-email': 'required|email',
        'login-password': 'required|min:9|max:100',
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'Please wait! We are logging you in.',
    };
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = 'Please wait! We are logging you in.';

      try {
        await this.authenticate(values);
      } catch (error) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = 'Invalid login details.';
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = 'Success! You are now logged in.';
      window.location.reload();
    },
  },
};
</script>
