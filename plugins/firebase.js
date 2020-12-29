import firebase from 'firebase'

if (!firebase.apps.length){
  firebase.initializeApp({
    apiKey: "AIzaSyDnkh_DJCJT0MgfPctRXuS2OemMF6yVN8I",
    authDomain: "niwa-dev-vue.firebaseapp.com",
    databaseURL: "https://niwa-dev-vue.firebaseio.com",
    projectId: "niwa-dev-vue",
    storageBucket: "niwa-dev-vue.appspot.com",
    messagingSenderId: "125727547239",
    appId: "1:125727547239:web:9c79479a90759da72cd9c2",
    measurementId: "G-GE37LYBQ70"
  })
}

export default firebase