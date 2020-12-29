import { reject, resolve } from 'core-js/fn/promise'
import firebase from '~/plugins/firebase'

export const state = () => ({
  userUid:'',
  userName:'',
  userEmail:'',
  token: '',
})

export const mutations = {
  setUser(state, user){
    state.userUid = user.uid
    state.userName = user.displayName
    state.userEmail = user.email
  },
  setToken(state, token){
    localStorage.setItem('firebase-token', token)
    state.token = token
  }

}

export const getters = {
  getUserUid(state){
    return state.userUid
  },
  getUserName(state){
    return state.userName
  },
  getUserEmail(state){
    return state.userEmail
  }
}

export const actions = {

  googleLogin(context){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
      const user = result.user
      const token = user.getIdToken(false)
      context.commit('setUser', user)
    }).catch(function(error){
      var errorCode = error.code
      console.log('error : ' + errorCode)
    })
  },
  mailLogin(context, credential){
    return new Promise((resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(credential.email, credential.password)
      .then(function(){
        firebase.auth().onAuthStateChanged(function(user){
          user.getIdToken(false).then(response => {
            // localStorage.setItem('firebase-token',response)
            context.commit('setToken', response)
          })
          resolve(user)
        })
      })
      .catch((error)=>{
        reject(error)
      })
    })
  },
  firebaseRegister(context, credential){
    return new Promise((resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword(credential.email, credential.password)
      .then((res) => {
        console.log(res,'メールを送ります')
        let actionCodeSetting = {
          url:'http://localhost:3000/?email='+firebase.auth().currentUser.email
        }
        res.user.sendEmailVerification(actionCodeSetting)
        resolve()
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  refreshToken(context){
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        user.getIdToken(true).then(response =>{
          localStorage.setItem('firebase-token',response)
        })
        context.commit('setUser',user)
        console.log('ユーザー情報です',user)
        
      }else{
        context.commit('setUser',{uid:'0', displayName:'ログインされていません。'})
      }
    })
  },
  changePassword(context, pw){
    if(pw !== ''){
      let actionCodeSetting = {
        url:'http://localhost:3000/?email='+firebase.auth().currentUser.email
      }
      firebase.auth().sendPasswordResetEmail(context.getters.getUserEmail,actionCodeSetting).then(function(){
        console.log('メールを送信しました。')
      }).catch((error)=>{
        console.log(error)
      })
    }
  },
}
