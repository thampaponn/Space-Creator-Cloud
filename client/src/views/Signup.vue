<script>
import axios from "axios";
import { required, email, minLength, maxLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: "",
      studentId: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      submitted: false,
    };
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      studentId: { required, maxLength: maxLength(8) },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, sameAsPassword: sameAs(this.password) }
    }
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      this.signup();
    },
    resetForm() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.studentId = '';
      this.password = '';
      this.confirmPassword = '';
      this.submitted = false;
    },
    async signup() {
      try {

        const res = await axios.post("http://localhost:3000/api/auth/register", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          studentId: this.studentId,
          password: toString(this.password)
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        this.resetForm();
        this.$router.push("/signin");
        this.$swal({
          position: 'bottom-end',
          icon: 'success',
          title: 'Sign up success!',
          showConfirmButton: false,
          timer: 2000
        })
      } catch
      (error) {
        this.$swal(error.response.data.error)
        console.log(error.response.data.error);
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-content-center align-items-center h-screen">
    <div class="flex justify-content-center">
      <div
        class="flex flex-column align-items-center justify-content-center w-30rem h-30rem p-8 bglinear border-round-left-xl shadow-5">
        <img class="flex flex-column w-5 my-4" src="../assets/img/logo.png" alt="">
        <label class="flex flex-column bg-transparent text-4xl font-bold text-white my-2" for="">SPACE CREATOR</label>
        <div class="flex flex-column bar bg-white my-2"></div>
        <label class="flex flex-column bg-transparent text-lg font-bold text-yellow-400 my-2" for="">your space, your
          choice</label>
      </div>
      <div
        class="flex flex-column align-items-center justify-content-center w-30rem h-30rem bg-white font-normal text-white border-round-right-xl shadow-5">

        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="flex flex-column" action="">

          <div class="flex-column">
            <label class="flex text-black-alpha-90 justify-content-start mx-4" for="email"
              :class="{ 'p-error': v$.email.$invalid && submitted }">Email</label>
            <div class="flex">
              <InputText class="flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1" id="email" name="email"
                v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" />
            </div>
            <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="flex ml-4 p-error">{{
              v$.email.required.$message.replace('Value', 'Email') }}</small>
          </div>

          <div class="flex flex-column mt-2">
            <label class="flex text-black-alpha-90 justify-content-start mx-4" for="studentid"
              :class="{ 'p-error': v$.studentId.$invalid && submitted }">Student ID</label>
            <div class="flex">
              <InputText type="number" class="input flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1" id="studentid"
                name="studentid" v-model="v$.studentId.$model"
                :class="{ 'p-invalid': v$.studentId.$invalid && submitted }" />
            </div>
            <small v-if="(v$.studentId.$invalid && submitted) || v$.studentId.$pending.$response"
              class="flex ml-4 p-error">{{
                v$.studentId.required.$message.replace('Value', 'Student ID') }}</small>
          </div>

          <div class="flex mt-2 justify-content-between">
            <div class="mx-4">
              <label class="flex text-black-alpha-90 justify-content-start" for="firstName"
                :class="{ 'p-error': v$.firstName.$invalid && submitted }">First name</label>
              <div class="flex">
                <InputText class="flex p-inputtext-sm h-2rem w-full shadow-1 mt-1" id="firstName" name="firstName"
                  v-model="v$.firstName.$model" :class="{ 'p-invalid': v$.firstName.$invalid && submitted }" />
              </div>
              <small v-if="(v$.firstName.$invalid && submitted) || v$.firstName.$pending.$response"
                class="flex flex-column p-error">{{
                  v$.firstName.required.$message.replace('Value', 'First name') }}</small>
            </div>
            <div class="mx-4">
              <label class="flex text-black-alpha-90 justify-content-start" for="lastName"
                :class="{ 'p-error': v$.firstName.$invalid && submitted }">Last name</label>
              <div class="flex">
                <InputText class="flex p-inputtext-sm h-2rem w-full shadow-1 mt-1" id="lastName" name="lastName"
                  v-model="v$.lastName.$model" :class="{ 'p-invalid': v$.lastName.$invalid && submitted }" />
              </div>
              <small v-if="(v$.lastName.$invalid && submitted) || v$.lastName.$pending.$response"
                class="flex flex-column p-error">{{
                  v$.lastName.required.$message.replace('Value', 'Last name') }}</small>
            </div>
          </div>

          <div class="flex flex-column mt-2">
            <label class="flex text-black-alpha-90 justify-content-start mx-4" for="password"
              :class="{ 'p-invalid': v$.password.$invalid && submitted }">Password</label>
            <div class="flex">
              <InputText type="password" class="flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1" id="password"
                name="password" v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }" />
            </div>
            <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
              class="flex ml-4 p-error">{{
                v$.password.required.$message.replace('Value', 'Password') }}</small>
          </div>

          <div class="flex flex-column mt-2">
            <label class="flex text-black-alpha-90 justify-content-start mx-4" for="confirmPassword"
              :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }">Confirm
              Password</label>
            <div class="flex">
              <InputText type="password" class="flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1" id="confirmPassword"
                name="confirmPassword" v-model="v$.confirmPassword.$model"
                :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }" />
            </div>
            <small v-if="(v$.confirmPassword.$invalid && submitted) || v$.confirmPassword.$pending.$response"
              class="flex ml-4 p-error">{{
                v$.confirmPassword.required.$message.replace('Value', 'Confirm password') }}</small>
          </div>

          <Button type="submit"
            class="flex justify-content-center text-center bg-primary-800 hover:bg-primary-900 hover:text-200 text-white p-button-text mt-4 mx-4 shadow-3">Sign
            up</Button>
        </form>

      </div>
    </div>
  </div>

  <div
    class="flex footerbg absolute bottom-0 w-full h-3rem text-white text-sm align-items-center justify-content-center text-center">
    <img src="../assets/img/cc.png" class="bg-transparent mx-2" style="width: 0.9%;" alt=""> All Right Reserved |
    Space Creator
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap');

* {
  font-family: 'Noto Sans Thai', sans-serif;
  margin: 0;
}

body {
  background-color: rgba(35, 87, 165, 0.1);
}

.bar {
  height: 2%;
  width: 100%;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.thai {
  font-family: 'Noto Sans Thai', sans-serif;
}

.footerbg {
  background-image: linear-gradient(to right, rgb(3, 8, 16), rgb(35, 87, 165), rgb(3, 8, 16));
}

.bglinear {
  background-image: linear-gradient(to right, rgb(3, 8, 16), rgb(35, 87, 165))
}

a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}
</style>
