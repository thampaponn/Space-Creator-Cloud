<template>
    <Navbar></Navbar>

    <div class="relative text-left justify-text-center font-bold text-2xl my-6 fadeinleft animation-duration-200">
        <router-link to="/manageroom">
            <Button
                class="flex justify-content-start mx-8 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
                <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
        </router-link>
        <div class="card mx-8 my-3 py-6 shadow-5 border-round-sm bg-white">
            <div class="flex justify-content-center">
                <div class="flex align-items-center justify-content-center">
                    <div class="flex flex-column card-container mx-8 my-6 justify-content-center align-items-center">
                        <div class="w-full flex flex-column align-items-center justify-content-center" v-if="image">
                            <img class="w-6" :src="image" alt="">
                            <Button class="flex bg-primary-800 hover:bg-primary-900 justify-content-center w-4 mt-4" v-if="image"
                                @click="removeFile(roomId)">Delete image</Button>
                        </div>
                        <input v-else type="file" @change="(event) => { uploadFile(event); }">
                    </div>

                    <div class="flex flex-column card-container my-6 justify-content-center align-self-start">
                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="room">ชื่อห้อง : {{ rooms.name }}</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="room"
                                    placeholder="New room name..." v-model="name" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8" for="room">ชั้น
                                : {{ rooms.floor }}</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="room"
                                    placeholder="New floor..." v-model="floor" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="room">รายละเอียด : {{ rooms.detail }}</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="room"
                                    placeholder="New detail..." v-model="detail" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="room">รายละเอียดเพิ่มเติม : {{ rooms.description }}</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="room"
                                    placeholder="New description..." v-model="description" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="room">จำนวนที่นั่ง : {{ rooms.totalSeat }}</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="room"
                                    placeholder="New Total seat..." v-model="totalSeat" />
                            </div>
                        </div>

                        <a @click.prevent="editRoom(roomId)">
                            <Button
                                class="thai bg-primary-800 hover:bg-primary-900 border-round-xl text-xl w-30rem h-4rem justify-content-center shadow-5 mt-6 mx-8">ยืนยัน</Button>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';
import { ref as storageRef, getDownloadURL, listAll, deleteObject, uploadBytes } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
const storage = useFirebaseStorage();

export default {
    components: {
        Navbar
    },
    data() {
        return {
            name: '',
            floor: '',
            detail: '',
            description: '',
            totalSeat: '',
            userId: '',
            image: '',
            chooseImage: '',
            rooms: [],
            roomId: '',
        };
    },
    created() {
        this.roomId = this.$route.params.id
        this.getFile(this.roomId)
        this.getRoom(this.roomId);
    },
    methods: {
        async checkRole() {
            const role = JSON.parse(localStorage.getItem('user')).role;
            if (role !== 'admin') {
                this.$router.push('/');
            }
        },
        addImage(event) {
            const file = event.target.files[0];
            this.image = file
            this.chooseImage = URL.createObjectURL(file);
            console.log(this.chooseImage);
        },
        removeImage() {
            this.image = ""
            this.chooseImage = ""
        },
        async editRoom(roomId) {
            try {
                const res = await axios.patch(`http://localhost:3000/api/room/${roomId}`, {
                    name: this.name,
                    floor: this.floor,
                    detail: this.detail,
                    description: this.description,
                    totalSeat: this.totalSeat
                }, {
                    headers: {
                        Authorization: 'Bearer ' + this.userId
                    }
                });
                this.$swal({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Room edited!',
                    showConfirmButton: false,
                    timer: 2000
                })
                this.$router.push('/manageroom');
            } catch (err) {
                this.$swal({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Edit room failed!',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        },
        async uploadFile(event) {
            try {
                const file = event.target.files[0];
                const starsRef = storageRef(storage, `rooms/${this.roomId}/${file.name}`);
                await uploadBytes(starsRef, file);
                this.getFile(this.roomId);
            } catch (error) {
                console.log(error);
            }
        },
        async removeFile(roomId) {
            try {
                const starsRef = storageRef(storage, "rooms/" + roomId);
                const search = await listAll(starsRef);
                const remove = await deleteObject(search.items[0]);
                console.log(remove);
                this.image = "";
            } catch (error) {
                console.log(error);
            }
        },
        async getFile(roomId) {
            try {
                const starsRef = storageRef(storage, "rooms/" + roomId);
                const search = await listAll(starsRef);
                const download = (await getDownloadURL(search.items[0])).toString();
                this.image = download;
            } catch (error) {
                console.log(error);
            }
        },
        async getRoom(id) {
            try {
                const res = await axios.get(`http://localhost:3000/api/room/${id}`, {
                    headers: {
                        Authorization: "Bearer " + this.userId
                    }
                })
                console.log(res.data)
                this.rooms = res.data
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.checkRole();
        this.userId = localStorage.getItem('token')
    }
};
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap');

* {
    font-family: 'Noto Sans Thai', sans-serif;
    margin: 0;
}

body {
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
  