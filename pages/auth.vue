<template>
  <div class="container">

    <button class="btn bt-primary mb-3" @click="logoutUser">ログアウト</button>

    <p class="title is-1 is-spaced"> user: {{ $store.getters.getUserName }}</p>

    <button class="button is-primary is-rounded" @click="googleLogin">
      Googleでログイン
    </button>
    
    <hr><br>
    
    <div>
      <h2>メールアドレスとパスワードを登録</h2>
      <div class="row">
        <div class="col-sm-8">
          <form @submit.prevent="registerUser">
            
            <div class="form-group">
              <label for="email">メールアドレス:</label>
              <input type="email" class="form-control" id="email" v-model="email">
            </div>

            <div class="form-group">
              <label for="password">パスワード:</label>
              <input type="password" name="" id="password" class="form-control" v-model="password">
            </div>

            <button type="submit" class="btn btn-info">登録</button>

          </form>
        </div>
      </div>
    </div>
    <hr><br>
    
    <div>
      <h2>メールアドレス認証で登録</h2>
      <div class="row">
        <div class="col-sm-8">
          <form @submit.prevent="registerWithEmail">
            
            <div class="form-group">
              <label for="auth-email">メールアドレス:</label>
              <input type="auth-email" class="form-control" id="auth-email" v-model="auth_email">
            </div>

            <div class="form-group">
              <label for="auth-password">パスワード:</label>
              <input type="auth-password" name="" id="auth-password" class="form-control" v-model="auth_password">
            </div>

            <button type="submit" class="btn btn-info">登録</button>

          </form>
        </div>
      </div>
    </div>

    <hr><br>

    <div class="col-sm-6">
      <h2>メールアドレスでログインする</h2>
      <form @submit.prevent="emailLogin">

      <div class="form-group">
        <label for="loginEmail">メールアドレス</label>
        <input type="loginEmail" class="form-control" id="loginEmail" v-model="loginEmail">
      </div>
      <div class="form-group">
        <label for="loginPassword">パスワード:</label>
        <input type="password" name="" id="loginPassword" v-model="loginPassword">
      </div>
      <button type="submit" class="btn btn-info">ログインする</button>
      </form>
    </div>

    <hr><br>

    <div class="col-sm-6">
      <h2>パスワードを変更する</h2>
      <form @submit.prevent="changePassword">
      <button type="submit" class="btn btn-info">PWを変更する</button>
      </form>
    </div>

    <hr><br>

    <div class="col-sm-6">
      <h2>メールアドレスを変更する</h2>
      <form @submit.prevent="changeEmail">

      <div class="form-group">
        <label for="change_email">メールアドレス</label>
        <input type="change_email" class="form-control" id="change_email" v-model="change_email">
      </div>
      <button type="submit" class="btn btn-info">変更する</button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'


export default {
  data:function(){
    return {
      state:'',
      email: '',
      password: '',
      auth_email: '',
      auth_password: '',
      loginEmail:'',
      loginPassword:'',
      user_data:'',
      change_password:'',
      change_email:''
    }
  },
  created(){
    this.$store.dispatch('refreshToken')
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log('状態を確認しました=',user)
        this.user_data = true;
      }else{
        console.log('状態を確認しました=ログインしてません',user)
        this.user_data = false;
      }
    })
  },
  methods:{
    registerUser(){
      console.log(firebase)
      if(this.email !== '' && this.password !== ''){
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error){
          let errorCode = error.code;
          let errorMessage = error.message;
        })
      }else{
        console.log('入力内容がありません')
      }
    },
    registerWithEmail(){
      this.$store.dispatch('firebaseRegister', {email:this.auth_email,password:this.auth_password})
    },
    googleLogin(){
      this.$store.dispatch('googleLogin')
    },
    emailLogin(){
      this.$store.dispatch('mailLogin',{email:this.loginEmail, password:this.loginPassword})
    },
    loginUser(){
      firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .catch(function(error){
        console.log(error.code)
        console.log(error.message)
      })
    },
    logoutUser(){
      firebase.auth().signOut()
    },
    changePassword(){
      this.$store.dispatch('changePassword')
    },
    changeEmail(){
      // this.$store.dispatch('changeEmail', this.change_email)
    }
  }
}
</script>

<style>
.container{
  margin:0 auto;
  min-height: 100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>