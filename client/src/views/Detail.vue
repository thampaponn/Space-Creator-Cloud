<script>
import Navbar from '../components/Navbar.vue'
import CardItem from '../components/CardItem.vue'
import { ref as storageRef, getDownloadURL, listAll, deleteObject, uploadBytes } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
const storage = useFirebaseStorage();
import axios from 'axios'

export default {
    components: {
        Navbar,
        CardItem
    },
    data() {
        return {
            rooms: {},
            roomId: '',
        }
    },
    computed: {
        reservationCount() {
            if (this.rooms.Reservation) {
                let today = new Date();
                today.setHours(0, 0, 0, 0); // Normalize to start of day in local timezone

                return this.rooms.Reservation.filter(reservation => {
                    let reservationDate = new Date(reservation.dateTimeStart);
                    reservationDate.setHours(0, 0, 0, 0); // Normalize to start of day

                    // Compare both dates in local timezone
                    return reservation.status === 'approved' && reservationDate.getTime() === today.getTime();
                }).length;
            } else {
                return 0;
            }
        }
    },

    mounted() {
        this.roomId = this.$route.params.id
        this.thisroom(this.roomId) // You can pass the room ID as a parameter here
    },
    methods: {
        async thisroom(id) {
            const res = await axios.get(`http://localhost:3000/api/room/${id}`)
            console.log("rooms data: ", res.data);
            this.rooms = res.data;
            const starsRef = storageRef(storage, "rooms/" + this.rooms.id);
            const search = await listAll(starsRef);
            const download = (await getDownloadURL(search.items[0])).toString();
            this.rooms.image = download;
            console.log(this.rooms.image);
        },

        async toreserve(id) {
            this.$router.push(`/reserve/${id}`)
        }
    }
};
</script>


<template>
    <Navbar></Navbar>
    <div class="relative text-left justify-text-center font-bold text-2xl mt-6">
        <div class="card mx-8 my-3 py-6 shadow-5 border-round-sm cardbg">
            <router-link to="/">
                <Button
                    class="flex justify-content-start mx-8 mb-4 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
                    <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
            </router-link>
            <div class="flex justify-content-center flex-wrap card-container">
                <div class="flex align-items-center justify-content-center">
                    <img :src="this.rooms.image" class="w-5 h-30rem border-round-2xl my-4 mx-8 shadow-5" alt="">
                    <div class="flex flex-column card-container mx-8 my-6 justify-content-start align-self-start">
                        <label
                            class="flex flex-column w-30rem bg-transparent font-bold text-6xl text-gray-900 border-round">
                            {{ this.rooms.name }}</label>
                        <label
                            class="thai flex flex-column w-30rem bg-transparent font-semi-bold text-3xl text-gray-900 border-round mt-6">
                            รายละเอียด</label>
                        <label class="thai flex flex-column text-gray-500">ชั้น : {{ this.rooms.floor }}</label>
                        <label class="thai flex flex-column text-gray-500">รายละเอียด : {{ this.rooms.detail }}</label>
                        <label class="thai flex flex-column text-gray-500">จำนวนที่นั่ง : {{ this.rooms.totalSeat }}</label>
                        <label class="thai flex flex-column text-gray-500">มีคิวจองทั้งหมด : {{ reservationCount }} คิว
                            ในวันนี้</label>
                        <Button @click.prevent="toreserve(roomId)"
                            class="thai bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-xl w-16rem h-4rem justify-content-center shadow-5 mt-6">จองห้อง
                        </Button>
                    </div>
                </div>
            </div>
        </div>
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

.thai {
    font-family: 'Noto Sans Thai', sans-serif;
}

.navbg {
    background-image: linear-gradient(to right, rgb(35, 87, 165), rgb(3, 8, 16), rgb(35, 87, 165));
}

.first {
    margin-left: 10%;
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
