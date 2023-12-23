<script>
import Navbar from "../components/Navbar.vue";
import axios from 'axios';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      roomId: "",
      userId: "",
      detail: "",
    };
  },
  mounted() {
    this.roomId = this.$route.params.roomId
    this.userId = JSON.parse(localStorage.getItem("user")).id
    this.student = JSON.parse(localStorage.getItem("user")).studentId
    console.log(this.roomId)
  },
  methods: {
    async report() {
      try {
        console.log({
          roomId: parseInt(this.roomId),
          userId: parseInt(this.userId),
          detail: this.detail
        })
        const res = await axios.post(`http://localhost:3000/api/report`, {
          roomId: parseInt(this.roomId),
          userId: parseInt(this.userId),
          detail: this.detail
        })
        console.log(res.data);
        this.$swal({
          position: 'bottom-end',
          icon: 'success',
          title: 'Reported!',
          showConfirmButton: false,
          timer: 2000
        })
        this.$router.push(`/reporthistory/${this.student}`)
      }
      catch (err) {
        console.log(err);
      }
    },
    async tohistory() {
      this.$router.push(`/history/${this.student}`)
    }
  },
};
</script>

<template>
  <Navbar></Navbar>
  <div class="card">
    <div class="flex justify-content-center flex-wrap card-container mt-4">
      <div
        class="thai flex align-items-center justify-content-center badge bg-white text-primary-800 shadow-5 w-16rem h-6rem text-4xl border-round-2xl">
        รายงาน</div>
    </div>
  </div>
  <div class="text-center justify-content-between mt-6">

    <div class="flex flex-column justify-content-center mt-4">
      <a @click.prevent="tohistory">
        <Button
          class="flex justify-content-start mx-8 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
          <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
      </a>
      <Textarea v-model="detail" class="flex flex-column shadow-5 justify-content-center my-4 mx-8 h-30rem cardbg"
        cols="100" placeholder="เนื้อหาที่จะรายงาน..." />
    </div>
  </div>
  <div class="flex text-center justify-content-center mt-4">
    <Button @click.prevent="report()"
      class="thai bg-primary-800 hover:bg-primary-900 hover:text-200 justify-content-center border-round-xl text-xl w-12rem h-3rem py-5 justify-content-center shadow-5">
      ยืนยันการรายงาน
    </Button>
  </div>
</template>
  
  
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap');

* {
  font-family: 'Noto Sans Thai', sans-serif;
  margin: 0;
}

body {
  background-color: white;
}

.cardbg {
  background-color: rgba(35, 87, 165, 0.1);
}

.navbg {
  background-image: linear-gradient(to right, rgb(35, 87, 165), rgb(3, 8, 16), rgb(35, 87, 165));
}

.thai {
  font-family: 'Noto Sans Thai', sans-serif;
}

.bar {
  height: 0.2vh;
  width: 58vw;
  /* Position the rectangle in the center */
  position: absolute;
  top: 33%;
  left: 53%;
  background-color: #9E9999;
  transform: translate(-50%, -50%);
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
