<template>
  <!-- Show closed rooms -->
  <div class="card">
    <div class="flex justify-content-center flex-wrap card-container">
      <div
        class="bg-white text-primary-800 text-xl font-bold flex align-items-center justify-content-between w-28rem h-6rem border-round-2xl mx-2 shadow-3 hover:shadow-5">
        <Button @mouseenter="hover = true" @mouseleave="hover = false" @click="changeStatus(room.id)" :class="[
          'thai',
          'text-sm',
          'h-2rem',
          'w-7rem',
          'justify-content-center',
          'ml-2',
          hover ? 'bg-green-700 hover:bg-green-800' : 'bg-red-700 hover:bg-red-800',
        ]">
          {{ hover ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
        </Button>
        <label class="thai text-sm ml-2" for="">{{ room.name }}</label>
        <label class="thai text-sm ml-2" for="">ชั้น : {{ room.floor }}</label>
        <a @click.prevent="toedit(room.id)" class="cursor-pointer">
          <i class="pi pi-cog text-xl text-900"></i>
        </a>
        <Button @click="deleteRoom(room.id)"
          class="flex justify-content-center thai text-sm bg-red-700 h-2rem w-6rem hover:bg-red-800 hover:text-200 mx-2">
          ลบห้อง
        </Button>

      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  props: {
    room: Object
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    async deleteRoom(id) {
      console.log(id);
      try {
        if (id != null) {
          const res = await axios.delete(`http://localhost:3000/api/room/${id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          });
          console.log(res.data);
          window.location.reload();
        }
      } catch (error) {
        this.$swal({
          position: 'top-end',
          icon: 'error',
          title: 'มีการจองห้องนี้อยู่!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    async changeStatus(id) {
      console.log(id);
      try {
        if (this.room.status === false) { // Check if the room status is closed
          const res = await axios.put(
            `http://localhost:3000/api/room/update/${id}`,
            { status: true }, // Set the status to open
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            }
          );
          console.log(res.data);
          window.location.reload();
        }
      } catch (error) {
        this.$swal({
          position: 'top-end',
          icon: 'error',
          title: 'มีการจองห้องนี้อยู่!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },
    async toedit(id) {
      this.$router.push(`/editroom/${id}`)
    }
  }
};
</script>
  