import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import primeVue component
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Menubar from 'primevue/menubar';
import Sidebar from 'primevue/sidebar';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card'
import Textarea from 'primevue/textarea';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Password from 'primevue/password';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { firebaseApp } from "./firebase";
import { VueFire } from "vuefire";

// import './assets/main.css'
const error1 = {
  position: 'top-end',
  icon: 'error',
  toast: true,
  showConfirmButton: false,
  timer: 2000,
};

const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.use(ToastService);
app.use(VueSweetalert2, error1);
app.use(VueFire, {
    firebaseApp,
  });

app.component("Button", Button)
app.component("Toast", Toast)
app.component("Menubar", Menubar)
app.component("Sidebar", Sidebar)
app.component("InputText", InputText)
app.component("Card", Card)
app.component("Textarea", Textarea)
app.component("DataTable", DataTable)
app.component("Column", Column)
app.component("ColumnGroup", ColumnGroup)
app.component("Row", Row)
app.component("Password", Password)
app.component("Dropdown", Dropdown)
app.component("Paginator", Paginator)

app.mount('#app')
