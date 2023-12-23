<template>
  <div class="card fadeinright animation-duration-200">
    <div class="flex justify-content-center flex-wrap card-container">
      <div v-for="(value, index) in pendingReservations" :key="index"
        class="bg-white text-primary-800 text-xl font-bold flex align-items-center justify-content-between w-full h-6rem border-round-2xl m-2 shadow-5">
        <div
          class="flex thai bg-primary-700 text-white text-lg font-normal text-center justify-content-center align-items-center h-2rem w-7rem border-round-right-lg">
          รอดำเนินการ</div>
        <label class="thai text-base" for="">รหัสจอง : #{{ value.id }}</label>
        <label class="thai text-base ml-4" for="">ห้อง : {{ value.Room.name }}</label>
        <label class="thai text-base ml-4" for="">วันที่ลงชื่อจอง : {{ value.createdAt.slice(0, 19).replace("T", " เวลา ") }}</label>
        <label class="thai text-base ml-4" for="">วันที่จอง : {{ value.dateTimeStart.slice(0, 19).replace("T", " เวลา ") +
          value.dateTimeEnd.slice(10, 19).replace("T", " - ") }}</label>
        <label class="flex align-items-center thai text-base ml-4 mr-6" for="">รายละเอียด : <a
            @click="swal(value.detail)"><i
              class="flex text-xl align-items-center pi pi-info-circle mx-2 cursor-pointer hover:text-primary-600"></i></a></label>
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
    pendingReservations() {
      return this.reservation.filter(reservation => reservation.status === "pending");
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
        this.$emit('pending-count-updated', this.pendingReservations.length);
      } catch (error) {
        console.log(error);
      }

    },
    toreport() {
      this.isLoggedIn = true;
      this.$router.push(`/report/${this.roomId}`)
    },
  }
}
</script>
