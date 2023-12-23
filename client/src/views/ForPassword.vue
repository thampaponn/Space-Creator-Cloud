<template>
    <!-- navbar -->
    <Navbar></Navbar>

    <!-- top bar-->
    <div class="flex justify-content-center align-items-center h-screen">
        <div class="flex justify-content-center">
            <div
                class="flex flex-column align-items-center justify-content-center w-30rem h-30rem p-8 bglinear border-round-left-xl shadow-5">
                <img class="flex flex-column w-5 my-4" src="../assets/img/logo.png" alt="">
                <label class="flex flex-column bg-transparent text-4xl font-bold text-white my-2" for="">SPACE
                    CREATOR</label>
                <div class="flex flex-column bar bg-white my-2"></div>
                <label class="flex flex-column bg-transparent text-lg font-bold text-yellow-400 my-2" for="">your space,
                    your
                    choice</label>
            </div>
            <div
                class="flex flex-column align-items-center justify-content-center w-30rem h-30rem bg-white font-normal text-white border-round-right-xl shadow-5">
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="flex flex-column w-full justify-content-center"
                    action="">

                    <div class="my-2">
                        <label class="flex text-black-alpha-90 justify-content-start mx-4" for="email"
                            :class="{ 'p-error': v$.email.$invalid && submitted }">Email</label>
                        <div class="flex">
                            <InputText class="flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1" id="email" name="email"
                                v-model="v$.email.$model" :class="{ 'p-invalid': v$.email.$invalid && submitted }" />
                        </div>
                        <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                            class="ml-4 p-error">{{
                                v$.email.required.$message.replace('Value', 'Email') }}</small>
                    </div>

                    <div class="my-2">
                        <label class="flex text-black-alpha-90 justify-content-start mx-4" for="newPassword"
                            :class="{ 'p-error': v$.newPassword.$invalid && submitted }">New
                            Password</label>
                        <div class="flex">
                            <InputText type="password" class="flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1"
                                id="newpassword" name="newpassword" v-model="v$.newPassword.$model"
                                :class="{ 'p-invalid': v$.newPassword.$invalid && submitted }" />
                        </div>
                        <small v-if="(v$.newPassword.$invalid && submitted) || v$.newPassword.$pending.$response"
                            class="ml-4 p-error">{{
                                v$.newPassword.required.$message.replace('Value', 'New password') }}</small>
                    </div>

                    <div class="my-2">
                        <label class="flex text-black-alpha-90 justify-content-start mx-4" for="confirmpassword"
                            :class="{ 'p-error': v$.confirmPassword.$invalid && submitted }">Confirm
                            Password</label>
                        <div class="flex">
                            <InputText type="password" class="flex p-inputtext-sm h-2rem w-full shadow-1 mx-4 mt-1"
                                id="confirmpassword" name="confirmpassword" v-model="v$.confirmPassword.$model"
                                :class="{ 'p-invalid': v$.confirmPassword.$invalid && submitted }" />
                        </div>
                        <small v-if="v$.confirmPassword.$invalid && submitted && !v$.confirmPassword.required.$model"
                            class="ml-4 p-error">Password does not match</small>
                    </div>
                    <Button type="submit"
                        class="flex bg-primary-800 text-white hover:bg-primary-900 hover:text-200 justify-content-center text-bold shadow-3 mt-4 mb-2 mx-4">Change
                        Password</Button>
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

<script>
import axios from "axios";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
    setup: () => ({ v$: useVuelidate() }),

    data() {
        return {
            email: "",
            newPassword: "",
            confirmPassword: "",
            submitted: false,
        };
    },
    validations() {
        return {
            email: { required, email },
            newPassword: { required, minLength: minLength(8) },
            confirmPassword: { required, sameAsPassword: sameAs(this.newPassword) }
        }
    },
    methods: {
        handleSubmit(isFormValid) {
            this.submitted = true;
            if (!isFormValid) {
                return;
            }
            this.resetPassword();
        },
        async resetPassword() {
            try {
                if (this.newPassword !== this.confirmPassword) {
                    alert("Password not match")
                    return
                }
                const res = await axios.patch("http://localhost:3000/api/auth/forgetpassword", {
                    email: this.email,
                    newPassword: this.newPassword,
                });
                this.$swal({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Password changed!',
                    showConfirmButton: false,
                    timer: 2000
                })
                this.$router.push("/signin");
                console.log(res);
            } catch (error) {
                this.$swal(error?.response?.data?.error || error?.message || error?.data?.error || error)
                console.log(error.response.data.error);
            }
        }
    },
};
</script>
