<template>
  <div>
    <div class="z-1 mr-2 flex flex-wrap gap-5">
      <div v-for="(value, index) in filteredRooms" :key="index" class="card border-round-2xl shadow-3 cursor-pointer"
        @click="getdetail(value)">
        <div class="flex flex-column border-round-2xl hover:shadow-5">
          <div class="flex justify-content-start flex-wrap">
            <img class="flex w-17rem h-10rem border-round-top-2xl" :src="value.image" alt="">
          </div>
          <div class="flex bg-white w-17rem h-4rem border-round-bottom-2xl">
            <div class="flex justify-content-between p-4 w-full">
              <p class="thai text-sm text-gray-900 w-full">{{ value.name }}</p>
              <p class="thai text-sm text-gray-900 w-5">Floor : {{ value.floor }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref as storageRef, getDownloadURL, listAll, deleteObject, uploadBytes } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
const storage = useFirebaseStorage();
export default {
  data() {
    return {
      rooms: [],
    };
  },
  props: {
    floor: String,
    searchRoom: String,
  },
  created() {
    this.allRooms(this.floor, this.searchRoom);
  },
  watch: {
    floor: function () {
      this.allRooms(this.floor, this.searchRoom);
    },
    searchRoom: function () {
      this.allRooms(this.floor, this.searchRoom);
    },
  },
  computed: {
    filteredRooms() {
      let filteredRooms = this.rooms.filter(room => room.status === true);
      if(this.searchRoom) {
        filteredRooms = filteredRooms.filter(room => room.name.toLowerCase().includes(this.searchRoom.toLowerCase()));
      }
      return filteredRooms;
    },
  },
  methods: {
    async allRooms(floor) {
      const res = await axios.get('http://localhost:3000/api/room/');
      if (floor == 0) {
        this.rooms = res.data;
      } else {
        this.rooms = res.data.filter(room => room.floor == floor);
      }
      this.rooms.map(async (room) => {
        const starsRef = storageRef(storage, "rooms/" + room.id);
        const search = await listAll(starsRef);
        const download = (await getDownloadURL(search.items[0])).toString();
        room.image = download;
      })
    },
    async getdetail(value) {
      const room = await axios.get(`http://localhost:3000/api/room/${value.id}`);
      this.$router.push(`/detail/${value.id}`);
    },
  },
};
</script>
