<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    <ul v-for="(data, key) in json_data" :key="key">
      <li>{{data.name}} ({{data.age}}) [{{key}}}]</li>
    </ul>
    <input v-model="find">
    <button @click="getData">Click it</button>
    <hr>
    <ul>
      <li>{{ j_data }}</li>
    </ul>
  </section>
</template>

<script>
const axios = require('axios');

let url = "https://niwa-dev-vue.firebaseio.com/person.json";

export default {
  data: function(){
    return {
      title:'Axios',
      message: 'axios samples.',
      find:"",
      j_data:{}
    }
  },
  asyncData: async function(){
    let result = await axios.get(url);
    return { json_data: result.data}
  },
  methods:{
    getData: function(){
      let id_url = url + '?orderBy=%22$key%22&equalTo=%22'
      axios.get(id_url + this.find + '%22').then((res)=>{
        this.message = 'get ID=' + this.find;
        this.j_data= res.data;
      }).catch((error)=>{
        this.message = 'ERROR!';
        this.j_data ={}
      })
    }
  }
}
</script>

<style >
ul{
  margin: 0px 10px;
  background-color: aliceblue;
}
li{
  padding:10px;
  font-size: 16pt
}
</style>