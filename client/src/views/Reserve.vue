<script>
import Navbar from '../components/Navbar.vue'
import CardItem from '../components/CardItem.vue'
import { ref as storageRef, getDownloadURL, listAll, deleteObject, uploadBytes } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
const storage = useFirebaseStorage();
import axios from 'axios';

export default {
    components: {
        Navbar,
        CardItem
    },
    data() {
        return {
            rooms: {},
            startdate: '',
            enddate: '',
            starttime: '',
            endtime: '',
            roomId: '',
            loading: false,
            detail: ''
        }
    },
    mounted() {
        this.roomId = this.$route.params.id
        this.userId = JSON.parse(localStorage.getItem("user")).id
        this.student = JSON.parse(localStorage.getItem("user")).studentId
        this.thisroom(this.roomId)
        console.log(this.roomId);
    },
    methods: {
        async thisroom(id) {
            this.loading = true;
            const res = await axios.get(`http://localhost:3000/api/room/${id}`)
            console.log(res.data);
            this.rooms = res.data;
            const starsRef = storageRef(storage, "rooms/" + this.rooms.id);
            const search = await listAll(starsRef);
            const download = (await getDownloadURL(search.items[0])).toString();
            this.rooms.image = download;
            this.loading = false;
            console.log(this.rooms.image);
        },
        async reserve() {
            try {
                const dateTimeStart = new Date(new Date(this.startdate + ' ' + this.starttime).getTime() + (7 * 60 * 60 * 1000)).toISOString();
                const dateTimeEnd = new Date(new Date(this.enddate + ' ' + this.endtime).getTime() + (7 * 60 * 60 * 1000)).toISOString();
                const res = await axios.post(`http://localhost:3000/api/reservation`, {
                    dateTimeStart: dateTimeStart,
                    dateTimeEnd: dateTimeEnd,
                    roomId: parseInt(this.roomId),
                    userId: this.userId,
                    detail: this.detail
                });

                console.log(res.data);
                this.$swal({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Reserved!',
                    showConfirmButton: false,
                    timer: 2000
                })
                this.$router.push(`/history/${this.student}`)
            } catch (err) {
                console.log(err);
                this.$swal({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Date, Start time and End time are required!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        },
        async todetail() {
            this.$router.push(`/detail/${this.roomId}`)
        }
    }
};
</script>

<template>
    <Navbar></Navbar>
    <div class="relative text-left justify-text-center font-bold text-2xl mt-6">

        <div class="card mx-8 my-3 py-6 shadow-5 border-round-sm cardbg">
            <a @click.prevent="todetail">
                <Button
                    class="flex justify-content-start mx-8 mb-4 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
                    <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
            </a>
            <div class="flex justify-content-center flex-wrap card-container">
                <div class="flex align-items-center justify-content-center">
                    <img :src="this.rooms.image" class="w-5 h-30rem border-round-2xl my-4 shadow-5" alt="">
                    <div class="flex flex-column card-container mt-3 mx-8 justify-content-start">
                        <div class="flex">

                            <div class="mt-2 mx-4 flex flex-column">
                                <label for="startdate" class="thai text-xl">วันที่เริ่มจอง</label>
                                <InputText id="startdate" v-model="startdate" name="startdate" type="date"
                                    class="p-inputtext-lg shadow-2 w-12rem mt-1" />
                            </div>

                            <div class="mt-2 mx-4 flex flex-column">
                                <label for="enddate" class="thai text-xl">สิ้นสุดการจอง</label>
                                <InputText id="enddate" v-model="enddate" name="enddate" type="date"
                                    class="p-inputtext-lg shadow-2 w-12rem mt-1" />
                            </div>
                        </div>
                        <div class="flex mt-4">
                            <div class="mt-2 mx-4 flex flex-column">
                                <label for="starttime" class="thai text-xl">ตั้งแต่เวลา</label>
                                <InputText id="starttime" v-model="starttime" name="starttime" type="time"
                                    class="p-inputtext-lg shadow-2 w-12rem mt-1" />
                            </div>

                            <div class="mt-2 mx-4 flex flex-column">
                                <label for="endtime" class="thai text-xl">จนถึงเวลา</label>
                                <InputText id="endtime" v-model="endtime" name="endtime" type="time"
                                    class="p-inputtext-lg shadow-2 w-12rem mt-1" />
                            </div>
                        </div>
                        <div class="mt-4 mx-4 flex flex-column">
                            <label for="detail" class="thai text-xl">หมายเหตุ</label>
                            <InputText id="detail" v-model="detail" name="detail" type="text"
                                class="p-inputtext-lg shadow-2 w-27rem" />
                        </div>
                        <div class="justify-content-center flex">
                            <Button @click.prevent="reserve()"
                                class="thai bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-xl w-16rem h-4rem justify-content-center shadow-5 mt-6">ยืนยันการจอง</Button>
                        </div>

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


.navbg {
    background-image: linear-gradient(to right, rgb(35, 87, 165), rgb(3, 8, 16), rgb(35, 87, 165));
}

.thai {
    font-family: 'Noto Sans Thai', sans-serif;
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
