<script>
import Navbar from '../components/Navbar.vue';
import ReserveRpending from '../components/ReserveRpending.vue';
import ReserveRcomplete from '../components/ReserveRcomplete.vue';
import ReserveRreject from '../components/ReserveRreject.vue';

export default {
    components: {
        Navbar,
        ReserveRpending,
        ReserveRcomplete,
        ReserveRreject
    },
    data() {
        return {
            startdate: '',
            enddate: '',
            starttime: '',
            endtime: '',
            roomId: '',
            pendingReservationsCount: 0,
            approvedReservationsCount: 0,
            rejectedReservationsCount: 0,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        this.student = JSON.parse(localStorage.getItem("user")).studentId

        if (token) {
            this.username = user.firstName;
            this.isLoggedIn = true;

        }
    },
    methods: {
        tohistory() {
            this.isLoggedIn = true;
            this.$router.push(`/history/${this.student}`)
        },
        toreporthistory() {
            this.isLoggedIn = true;
            this.$router.push(`/reporthistory/${this.student}`)
        }
    }

}
</script>
 
<template>
    <Navbar></Navbar>
    <div class="card">
        <div class="flex justify-content-center flex-wrap card-container mt-4">
            <div
                class="flex align-items-center justify-content-center thai bg-white text-primary-800 shadow-5 w-22rem h-6rem text-4xl border-round-2xl">
                คำขอการจองห้อง</div>
        </div>
    </div>

    <div class="relative text-left justify-text-center font-bold text-2xl mt-4 mb-6">
        <router-link to="/manageroom">
            <Button
                class="flex justify-content-start mx-6 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
                <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
        </router-link>
        <div class="card mx-6 my-3 py-8 shadow-5 border-round-sm bg-white">
            <div>
                <div class="mx-8">
                    <div class="thai text-lg font-normal text-gray-600 mx-4">รอดำเนินการ ({{ pendingReservationsCount }})
                    </div>
                    <ReserveRpending @pending-count-updated="pendingReservationsCount = $event"></ReserveRpending>
                </div>

                <div class="mx-8">
                    <div class="thai text-lg font-normal text-gray-600 mx-4 mt-6">เสร็จสิ้น ({{ approvedReservationsCount +
                        rejectedReservationsCount }})</div>
                    <ReserveRcomplete @approved-count-updated="approvedReservationsCount = $event"></ReserveRcomplete>
                    <ReserveRreject @rejected-count-updated="rejectedReservationsCount = $event"></ReserveRreject>
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
 