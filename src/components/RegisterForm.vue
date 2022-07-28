<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <VeeForm
    @submit="register"
    :validation-schema="schema"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="name">Name</label>

      <VeeField
        id="name"
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="signup-email">Email</label>
      <VeeField
        id="signup-email"
        name="signup-email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="signup-email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="age">Age</label>
      <VeeField
        id="age"
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="signup-password">Password</label>
      <VeeField
        :bails="false"
        id="signup-password"
        name="signup-password"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </VeeField>
      <ErrorMessage class="text-red-600" name="signup-password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="confirm-password"
        >Confirm Password</label
      >
      <VeeField
        id="confirm-password"
        name="confirm-password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm-password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2" for="country">Country</label>
      <VeeField
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        id="country"
        name="country"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Anarctica">Anarctica</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- Terms of Service -->
    <div class="mb-3 pl-6">
      <VeeField
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        id="terms"
        name="terms"
        value="1"
      />
      <label for="terms" class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="terms" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        'signup-email': 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        'signup-password': 'required|min:9|max:100',
        'confirm-password': 'passwords_mismatch:@signup-password',
        country: 'required|country_excluded:Anarctica',
        terms: 'terms_of_service',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created.';

      console.log(values);
    },
  },
};
</script>
