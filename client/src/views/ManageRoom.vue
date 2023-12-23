<script>
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import ManageRoomOpen from '../components/ManageRoomOpen.vue'
import ManageRoomClose from '../components/ManageRoomClose.vue'
export default {
    components: {
        Navbar,
        ManageRoomOpen,
        ManageRoomClose
    },
    data() {
        return {
            rooms: []
        }
    },

    methods: {
        async checkrole() {
            const role = JSON.parse(localStorage.getItem("user")).role
            if (role !== "admin") {
                this.$router.push("/");
            }
        },
        async allroom() {
            try {
                const res = await axios.get('http://localhost:3000/api/room')
                console.log(res.data)
                this.rooms = res.data
            } catch (error) {
                console.log(error)
            }
        },


    },
    mounted() {
        this.checkrole()
        this.allroom()
    },
}
</script>

<template>
    <!-- navbar -->
    <Navbar></Navbar>
    <div class="card fadeindown animation-duration-200">
        <div class="flex justify-content-center flex-wrap card-container my-4">
            <div
                class="flex align-items-center justify-content-center bg-white text-primary-800 shadow-5 w-16rem h-6rem text-4xl font-bold border-round-2xl">
                OFFICER</div>
        </div>
    </div>
    <div class="bg-white mx-4 mt-4 mb-6 py-6 shadow-5 border-round-sm fadeindown animation-duration-200">
        <div class="flex justify-content-end mx-6">
            <router-link to="/reserverequest">
                <Button class="thai border-round-xl bg-primary-800 hover:bg-primary-900 hover:text-200 mx-2"><i class="flex align-items-center pi pi-calendar mr-2"></i>รายการจอง</Button>
            </router-link>
            <router-link to="/reportrequest">
                <Button class="thai border-round-xl bg-primary-800 hover:bg-primary-900 hover:text-200 mx-2"><i class="flex align-items-center pi pi-copy mr-2"></i>รายงานห้อง</Button>
            </router-link>
            <router-link to="/addroom">
                <Button class="thai border-round-xl bg-primary-800 hover:bg-primary-900 hover:text-200 mx-2"><i class="flex align-items-center pi pi-plus-circle mr-2"></i>เพิ่มห้อง</Button>
            </router-link>
        </div>
        <!-- open and close card -->
        <div class="flex justify-content-center grid card mt-4">
            <div class="flex justify-content-start flex-wrap card-container my-4" v-for="room in rooms" :key="room.id">
                <ManageRoomOpen :room="room" v-if="room.status" />
                <ManageRoomClose :room="room" v-else />
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

Button {
    border-color: transparent;
}

.cardbg {
    background-color: rgba(35, 87, 165, 0.1);
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