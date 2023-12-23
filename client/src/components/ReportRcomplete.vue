<template>
    <div class="card">
        <div class="flex justify-content-center flex-wrap card-container">
            <div v-for="(value, index) in allReports" :key="index"
                class="bg-white text-primary-800 text-xl font-bold flex align-items-center justify-content-between w-full h-6rem border-round-2xl m-2 shadow-5">
                <div
                    class="flex thai bg-green-700 font-normal text-lg justify-content-center text-white text-center align-items-center h-2rem w-7rem border-round-right-lg">
                    เสร็จสิ้น</div>
                <label class="thai text-base ml-6" for="">รหัสรายงาน : #{{ value.id }}</label>
                <label class="thai text-base ml-6" for="">ห้อง : {{ value.Room.name }}</label>
                <label class="thai text-base ml-6" for="">วันที่รายงาน : {{ value.createdAt.slice(0, 19).replace("T", " เวลา ") }}</label>
                <label class="flex align-items-center thai text-base ml-4 mr-6" for="">รายละเอียด : <a
                        @click="swal(value.detail)"><i
                            class="flex text-xl align-items-center pi pi-info-circle mx-2 cursor-pointer hover:text-primary-600"></i></a></label>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            allReports: [],
            userId: "",
        };
    },
    created: async function () {
        this.userId = JSON.parse(localStorage.getItem("user")).id;
        await this.getAllReports();
    },
    methods: {
        swal(detail) {
            this.$swal({
                position: 'center',
                icon: 'info',
                title: detail,
                showConfirmButton: true,
                confirmButtonColor: '#41b882',
                timer: false
            })
        },
        async getAllReports() {
            try {
                const res = await axios.get("http://localhost:3000/api/report/done");
                console.log(res.data);
                if (res.data != null) {
                    this.allReports = res.data;
                } else {
                    this.allReports = [];
                }
                this.$emit('complete-count-updated', this.allReports.length);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>