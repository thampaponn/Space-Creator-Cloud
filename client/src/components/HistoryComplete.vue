<template>
  <div class="card">
    <div class="flex justify-content-center flex-wrap card-container">
      <div v-for="(value, index) in approvedReservations" :key="index"
        class="bg-white text-primary-800 text-xl font-bold flex align-items-center justify-content-between w-full h-6rem border-round-2xl m-2 shadow-5">
        <div
          class="flex thai bg-green-700 font-normal text-lg text-white text-center justify-content-center align-items-center h-2rem w-7rem border-round-right-lg">
          อนุมัติ</div>
        <label class="thai text-base" for="">รหัสจอง : #{{ value.id }}</label>
        <label class="thai text-base ml-4" for="">ห้อง : {{ value.Room.name }}</label>
        <label class="thai text-base ml-4" for="">วันที่จอง : {{ value.dateTimeStart.slice(0, 19).replace("T", " เวลา ") +
          value.dateTimeEnd.slice(10, 19).replace("T", " - ") }}</label>
        <label class="flex align-items-center thai text-base ml-4" for="">รายละเอียด : <a @click="swal(value.detail)"><i class="flex text-xl align-items-center pi pi-info-circle mx-2 cursor-pointer hover:text-primary-600"></i></a></label>
        <a @click.prevent="toreport(value.Room.id)">
          <i class="pi pi-user-edit mr-6 text-2xl cursor-pointer hover:text-primary-600"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      reservation: [],
      userId: ""
    };
  },
  computed: {
    approvedReservations() {
      return this.reservation.filter(reservation => reservation.status === "approved");
    }
  },
  created: async function () {
    this.userId = await JSON.parse(localStorage.getItem("user")).id
    this.allreserve()
  },
  methods: {
    swal(detail) {
      this.$swal({
        position: 'center',
        icon: 'info',
        title: detail,
        showConfirmButton: true,
        confirmButtonColor: '#41b882',
        timer: false
      })
    },
    async allreserve() {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/history/${this.userId}`)
        console.log(res.data);

        if (res.data != null) {
          this.reservation = res.data[0].Reservation
        } else {
          this.reservation = []
        }
        this.$emit('approved-count-updated', this.approvedReservations.length);
      } catch (error) {
        console.log(error);
      }

    },
    toreport(roomId) {
      this.$router.push(`/report/${roomId}`)
    },
  }
}
</script>
