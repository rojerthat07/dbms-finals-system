<template>
  <div class="admin">
    <!-- <div class="admin__heading">Admin page</div> -->
    <div class="admin__details">
      <div class="admin__heading">Administrator Page</div>
      <div class="admin__key">Name:</div>
      <div class="admin__value">
        &nbsp; {{ adminDetails.first_name }} {{ adminDetails.middle_name }}
        {{ adminDetails.last_name }}
      </div>
      <br />
      <div class="admin__key">Department:</div>
      <div class="admin__value">&nbsp; {{ adminDetails.department }}</div>
      <br />
      <div class="admin__key">Specialization:</div>
      <div class="admin__value">
        &nbsp;
        {{ adminDetails.specialization }}
      </div>
      <br />
    </div>
    <caption v-if="!isLogHistory" class="admin__caption">
      Registered Students
    </caption>
     <caption v-else class="admin__caption">
      Log History
    </caption>

<table v-if="!isLogHistory" class="table">
    <thead>
      <tr>
        <th>Student ID</th>
        <th>Occupation</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Middle Name</th>
        <th>Year level</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Date of birth</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of students" :key="item">
        <td>{{ item.student_ID }}</td>
        <td>{{ item.occupation_title }}</td>
        <td>{{ item.first_name }}</td>
        <td>{{ item.last_name }}</td>
        <td>{{ item.middle_name }}</td>
        <td>{{ item.year_level }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.date_of_birth }}</td>
      </tr>
    </tbody>
  </table>

<table v-else class="table">
    <thead>
      <tr>
        <th>Student ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Log in</th>
        <th>Log out</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of logs" :key="item">
        <td>{{ item.student_ID }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
         <td>{{ item.created_at }}</td>
        <td>{{ item.updated_at }}</td>
      </tr>
    </tbody>
  </table>


    <div class="college-form__button">
   <span @click="downloadAsExcel" class="college-form__button--button"
          >Download Data</span
        >
        <span @click="changeTable" class="college-form__button--button"
          >{{buttonText}}</span
        >

      <router-link to="/admission">
        <span @click="onLogout" class="college-form__button--button"
          >Logout</span
        >
      </router-link>
     
    </div>

    
  </div>
  
</template>

<script>
import axios from "axios";
import XLSX from 'xlsx';
// const arr = document.getElementById("test").children;

// // const lat = "";
// console.log(arr);
export default {
  name: "AdminPage",
  data() {
    return {
      students: [],
      logs:[],
      adminDetails: {},
      isLogHistory:false,
      buttonText:'Log History'
    };
  },
  methods: {
    onLogout() {
      axios
        .post("/api/admins/logout-admin")
        .then(() => {
          this.$router.push("admission");
        })
        .catch(() => this.$router.push("token-error"));
    },
    changeTable(){
      this.isLogHistory = !this.isLogHistory;
      if(this.isLogHistory === false){
        this.buttonText = 'Log History'
      }else{
        this.buttonText = 'Registered Students'
      }
    },
    downloadAsExcel(){
      const studentsTable = !this.isLogHistory ? JSON.parse(JSON.stringify(this.students)): JSON.parse(JSON.stringify(this.logs))
      let items = [];    
      for(let item of studentsTable){
        delete item.ID;
        delete item.occupation_ID
        delete item.student_accounts_id
        delete item.password
      items.push(item)
      }
      console.log(this.students)
   
  let binary_univers = items

  let binaryWS = XLSX.utils.json_to_sheet(binary_univers); 

  // Create a new Workbook
  var wb = XLSX.utils.book_new() 

  // Name your sheet
  XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values') 

  // export your excel
  XLSX.writeFile(wb, `${!this.isLogHistory ? 'DHVSU Registered Students.xlsx' : 'DHVSU Log History.xlsx'}`);
    }
  },
  created() {
    axios
      .get("/api/admins/get-reports")
      .then((response) => {
        response.data.result.map((e) => {
          this.students.push(e);
        });

      })
      .catch(() => this.$router.push("token-error"));
    
    axios
      .get("/api/admins/get-logs")
      .then((response) => {
        response.data.result.map((e) => {
          this.logs.push(e);
        });

      })
      .catch(() => this.$router.push("token-error"));
  },
  mounted() {
    this.adminDetails = JSON.parse(localStorage.getItem("details"));
  },
};
</script>

<style></style>
