<script>
import Navbar from '../components/Navbar.vue'
import CardItem from '../components/CardItem.vue'
import { ref as storageRef, getDownloadURL, listAll, deleteObject, uploadBytes } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
import axios from 'axios';
const storage = useFirebaseStorage();

export default {
    data() {
        return {
            userId: "",
            image: "",
            chooseImage: "",
            roomData: {
                name: "",
                floor: "",
                detail: "",
                description: "",
                totalSeat: ""
            }
        };
    },
    components: {
        Navbar,
        CardItem
    },
    mounted() {
        this.checkrole()
        this.userId = localStorage.getItem('token')
    },
    methods: {
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
        async createRoom() {
            try {
                if(roomData.floor < 1){
                    
                    return false
                }
                console.log(this.roomData)
                const res = await axios.post("http://localhost:3000/api/room", this.roomData, {
                    headers: {
                        Authorization: "Bearer " + this.userId
                    }
                })
                if (this.image && res.data.id) {
                    await this.uploadFile(res.data.id)
                }
                this.$swal({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Room added!',
                    showConfirmButton: false,
                    timer: 2000
                })
                this.$router.push("/manageroom")

            } catch (error) {
                this.$swal({
                    position: 'bottom-end',
                    icon: 'error',
                    title: 'Room informations are required!',
                    showConfirmButton: false,
                    timer: 2000
                })
                console.log(error)
            }
        },
        async uploadFile(roomId) {
            try {
                const starsRef = storageRef(storage, `rooms/${roomId}/${this.image.name}`);
                await uploadBytes(starsRef, this.image);
            } catch (error) {
                console.log(error);
            }
        },
        async checkrole() {
            const role = JSON.parse(localStorage.getItem("user")).role
            if (role != "admin") {
                this.$router.push("/");
            }
        },
    }
};
</script>

<template>
    <Navbar></Navbar>

    <div class="relative text-left justify-text-center font-bold text-2xl my-6 fadeindown animation-duration-200">
        <router-link to="/manageroom">
            <Button
                class="flex justify-content-start mx-8 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
                <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
        </router-link>
        <div class="card mx-8 my-3 py-6 shadow-5 border-round-sm bg-white">
            <div class="flex justify-content-center">
                <div class="flex align-items-center justify-content-center">
                    <div class="flex flex-column card-container mx-8 my-6 justify-content-center align-items-center">
                        <div class="w-full flex flex-column align-items-center justify-content-center"
                            v-if="this.chooseImage">
                            <img class="w-6" :src="this.chooseImage" alt="">
                            <Button class="flex bg-primary-800 hover:bg-primary-900 justify-content-center w-4 mt-4" v-if="image"
                                @click="removeImage(roomId)">Delete image</Button>
                        </div>
                        <input v-else type="file" @change="(event) => { addImage(event); }">
                    </div>

                    <div class="flex flex-column card-container my-6 justify-content-center align-self-start">
                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="room">ชื่อห้อง</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="name" placeholder="Room name..."
                                    v-model="roomData.name" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="floor">ชั้น</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="floor" placeholder="Floor..."
                                    v-model="roomData.floor" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="detail">รายละเอียด</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="detail" placeholder="Room detail..."
                                    v-model="roomData.detail" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="description">รายละเอียดเพิ่มเติม</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="description" placeholder="Room description..."
                                    v-model="roomData.description" />
                            </div>
                        </div>

                        <div class="my-2">
                            <label class="thai flex text-sm text-black-alpha-90 justify-content-start mx-8"
                                for="totalSeat">จำนวนที่นั่ง</label>
                            <div class="flex">
                                <InputText type="text" class="flex p-inputtext-sm w-30rem shadow-1 mx-8 mt-1" id="totalSeat" placeholder="Room total seats..."
                                    v-model="roomData.totalSeat" />
                            </div>
                        </div>

                        <a @click.prevent="createRoom()">
                            <Button
                                class="thai bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-xl w-30rem h-4rem justify-content-center shadow-5 mt-6 mx-8">ยืนยัน</Button>
                        </a>
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
