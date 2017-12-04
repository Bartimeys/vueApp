<template>
  <div id="demo">
    <form id="search">
      Search by name <input name="query" v-model="searchQuery">
    </form>
    <demo-greed
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </demo-greed>
  </div>
</template>

<script>
  import axios from 'axios'
  import DemoGreed from '../components/DemoGreed.vue'
  import SearchList from '../components/SearchList.vue'

  export default {
    name: 'Basic',
    components: {
      DemoGreed,
      SearchList
    },
    data () {
      return {
        searchQuery: '',
        gridColumns: ['picture', 'name', 'location', 'email', 'phone'],
        gridData: [],
        locat: null,
        error: null
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      init: function () {
        this.loadData()
      },
      created () {
        this.loadData()
      },
      loadData: function () {
        let page = 1
        let url =
          'https://randomuser.me/api/' + '?page=' + page + '&results=20'

        axios.get(url).then(
          response => {
            this.gridData = response.data.results
            console.log(this.gridData)
          },
          response => {
            this.error = response
          }
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
