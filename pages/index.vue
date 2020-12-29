<template>
  <section class="container">
    <h1>{{ title }}</h1>
    <p>{{ $store.state.message }}</p>
    <hr>
    <div class="link" v-on:click="doAction">
      <a>
        clicked: {{ $store.state.counter }}
      </a>
    </div>
    <!-- <router-link to="/other">Go to Other</router-link> -->
  </section>
</template>

<script>
export default {
  data: function(){
    return{
      title:'Hello',
      message: 'This is a message',
    }
  },
  methods: {
    doAction: function(){
      this.$store.state.counter++;
    }
  }
}
</script>

<style>
  .container {
    padding:5px 10px;
  }
  h1{
    font-size: 60pt;
    color: #345980;
  }
  p{
    padding-top: 5px;
    font-size: 20pt;
  }
  pre{
    padding:10px;
    font-size: 18pt;
    background-color: #efefef;
  }
  hr{
    margin: 10px 0;
  }
  a{
    font-size: 16pt;
  }
  .link{
    background-color: #def;
    padding:10px;
  }
</style>
