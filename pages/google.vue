<template>
  <section class="container">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  data: function(){
    return{
      title:'Auth',
      message: 'This is a messege.'
    }
  },
  created:function(){
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDnkh_DJCJT0MgfPctRXuS2OemMF6yVN8I",
      authDomain: "niwa-dev-vue.firebaseapp.com",
      databaseURL: "https://niwa-dev-vue.firebaseio.com",
      projectId: "niwa-dev-vue",
      storageBucket: "niwa-dev-vue.appspot.com",
      messagingSenderId: "125727547239",
      appId: "1:125727547239:web:9c79479a90759da72cd9c2",
      measurementId: "G-GE37LYBQ70"
    };
    firebase.initializeApp(firebaseConfig)

    // var provider = new firebase.auth.GoogleAuthProvider()
    // var self = this;
    // firebase.auth().signInWithPopup(provider)
    //   .then(function(result){
    //     self.message = result.user.displayName + ', ' + result.user.email;
    //   })
  }
}
</script>