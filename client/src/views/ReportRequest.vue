<script>
import Navbar from '../components/Navbar.vue';
import ReportRpending from '../components/ReportRpending.vue';
import ReportRcomplete from '../components/ReportRcomplete.vue';
export default {
    components: {
        Navbar,
        ReportRpending,
        ReportRcomplete

    },
    data() {
        return {
            pendingReportsCount: 0,
            completeReportsCount: 0,
        }
    },
     computed: {
        reportData() {
            return JSON.parse(localStorage.getItem('report')) || {};
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
};
</script>
 
<template>
    <Navbar></Navbar>
    <div class="card">
        <div class="flex justify-content-center flex-wrap card-container mt-4">
            <div
                class="flex align-items-center justify-content-center thai bg-white text-primary-800 shadow-5 w-22rem h-6rem text-4xl border-round-2xl">
                คำร้องการรายงานห้อง</div>
        </div>
    </div>

    <router-link to="/manageroom">
        <Button
            class="flex justify-content-start mx-6 bg-primary-800 hover:bg-primary-900 hover:text-200 border-round-xl text-lg w-6rem justify-content-center shadow-5 pl-2">
            <i class="pi pi-chevron-circle-left mx-2"></i> Back</Button>
    </router-link>
    <div class="card mx-6 my-3 py-8 shadow-5 border-round-sm bg-white">
        <div>
            <div class="mx-8">
                <div class="thai text-lg font-normal text-gray-600 mx-4">รอดำเนินการ ({{ pendingReportsCount }})
                </div>
                <ReportRpending @pending-count-updated="pendingReportsCount = $event"></ReportRpending>
            </div>

            <div class="mx-8">
                <div class="thai text-lg font-normal text-gray-600 mx-4 mt-6">เสร็จสิ้น ({{ completeReportsCount }})
                </div>
                <ReportRcomplete @complete-count-updated="completeReportsCount = $event"></ReportRcomplete>
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
 