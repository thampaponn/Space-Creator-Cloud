<script>
import Navbar from '../components/Navbar.vue';
import RepHispending from '../components/RepHispending.vue';
import RepHiscomplete from '../components/RepHiscomplete.vue';
export default {
    components: {
        Navbar,
        RepHispending,
        RepHiscomplete

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

    <div class="relative text-left justify-text-center font-bold text-2xl my-6">
        <a @click.prevent="tohistory"
            class="thai first text-gray-900 hover:text-primary-600 cursor-pointer">ประวัติการจอง</a>
        <a @click.prevent="toreporthistory"
            class="thai ml-8 text-primary-600 hover:text-primary-600 cursor-pointer">ประวัติการรายงาน</a>

        <div class="card mx-6 my-3 py-8 shadow-5 border-round-sm cardbg">
            <div>
                <div class="mx-8">
                    <div class="thai text-lg font-normal text-gray-600 mx-4">รอดำเนินการ ({{ pendingReportsCount }})
                    </div>
                    <RepHispending @pending-count-updated="pendingReportsCount = $event"></RepHispending>
                </div>

                <div class="mx-8">
                    <div class="thai text-lg font-normal text-gray-600 mx-4 mt-6">เสร็จสิ้น ({{ completeReportsCount }})
                    </div>
                    <RepHiscomplete @complete-count-updated="completeReportsCount = $event"></RepHiscomplete>
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
