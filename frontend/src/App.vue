<template>
  <div id="app" class="">
    <h1>Ethereum Truffle Vue </h1>
    <b-alert variant="info" v-bind:show="!isMetaMask">Connected to local development node</b-alert>
    <b-alert variant="success" v-bind:show="isMetaMask">Connected to meta mask node</b-alert>
    <b-alert variant="danger" v-bind:show="!clientAccount">No client account found</b-alert>
    <hr>
    <router-view v-if="clientAccount"></router-view>
  </div>
</template>

<script>
  import Alert from 'bootstrap-vue/src/components/alert/alert'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    components: {Alert},
    name: 'app',
    computed: {
      ...mapGetters('eth',
        {
          isMetaMask: 'isMetaMask',
          clientAccount: 'clientAccount'
        }
      )
    },
    methods: {
      ...mapActions('eth', {
        start: 'start'
      })
    },
    created: function () {
      this.start()
      // Set an interval to check if ETH account is set, and if not try to find it.
      setInterval(() => {
        if (!this.clientAccount) {
          this.start()
        }
      }, 3000)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
