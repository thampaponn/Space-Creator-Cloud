<script>
import SignupButton from '../components/SignupButton.vue';
import LoginButton from '../components/LoginButton.vue';

export default {
  name: 'Navbar',
  components: {
    SignupButton,
    LoginButton
  },
  data() {
    return {
      isLoggedIn: false,
      username: null,
      studentId: null,
      role: null
    };
  },
  props: {
    display: true,
  },
  mounted() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.studentId = user.studentId;
      this.role = user.role;
      if (token) {
        this.username = user.firstName;
        this.isLoggedIn = true;
      }
    }
  },
  methods: {
    signout() {
      this.isLoggedIn = false;
      this.username = null;
      this.studentId = null;
      this.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      if (this.role === 'admin') {
        this.$router.push('/signin');
        this.$swal({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Logout success!',
                    showConfirmButton: false,
                    timer: 2000
                })
      } else {
        this.$router.push('/');
        this.$swal({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Logout success!',
                    showConfirmButton: false,
                    timer: 2000
                })
      }
    },
    tohistory() {
      this.isLoggedIn = true;
      this.$router.push(`/history/${this.studentId}`)
    },

  }
};
</script>


<template>
  <div>
    <header>
      <div class="card">
        <div class="flex justify-content-between card-container">
          <div class="flex absolute w-full">
            <div class="flex top-0 w-full h-6rem navbg"></div>
          </div>
          <div class="z-1">
            <a class="text-white font-bold flex align-items-center justify-content-left ml-4"
              style="min-width: 200px; min-height: 100px" href="/">
              <img src="../assets/img/logonavbar.png" class="h-4rem" alt="" />
            </a>
          </div>

          <template v-if="isLoggedIn && this.role === 'user'">
            <div class="flex mx-4">
              <router-link to="/reservetable"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-list mr-2"></i>
                Queue
              </router-link>
              <a @click.prevent="tohistory"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-history mr-2"></i>
                History
              </a>
              <a class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-user mr-2"></i>
                {{ username }}
              </a>
              <a @click.prevent="signout"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-power-off mr-2"></i>
                Log out
              </a>
            </div>
          </template>

          <template v-if="isLoggedIn && this.role === 'admin'">
            <div class="flex mx-4">
              <router-link to="/reservetable"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-list mr-2"></i>
                Queue
              </router-link>
              <a @click.prevent="tohistory"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-history mr-2"></i>
                History
              </a>
              <a href="/manageroom"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px">
                <i class="pi pi-user mr-2"></i>
                {{ username }}
              </a>
              <a @click.prevent="signout"
                class="z-1 bg-transparent text-white border-round-3xl ml-6 my-4 text-2xl font-bold flex align-items-center justify-content-center cursor-pointer hover:text-400"
                style="min-width: 125px; min-height: 25px" href="/signin">
                <i class="pi pi-power-off mr-2"></i>
                Log out
              </a>
            </div>
          </template>

          <template v-if="!isLoggedIn">
            <div class="flex mx-4">
              <router-link to="/signin">
                <LoginButton></LoginButton>
              </router-link>

              <router-link to="/signup">
                <SignupButton></SignupButton>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </header>
  </div>
</template>