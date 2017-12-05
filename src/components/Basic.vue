<template>
  <div id="demo">
    <demo-greed
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery"
      :data-items="visibleData">
    </demo-greed>
    <table-pager v-bind:page-size="2" :data-items="gridData" v-on:invalidate="invalidate"></table-pager>
  </div>
</template>

<script>
  import axios from 'axios'
  import DemoGreed from '../components/DemoGreed.vue'
  import TablePager from './TablePager.vue'

  export default {
    name: 'Basic',
    components: {
      DemoGreed,
      TablePager
    },
    data () {
      return {
        searchQuery: '',
        gridColumns: ['picture', 'name', 'location', 'email', 'phone', 'gender'],
        gridData: [],
        locat: null,
        visibleData: [],
        error: null,
        selectedGender: 'All'
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
          },
          response => {
            this.error = response
          }
        )
      },
      invalidate: function (data) {
        this.visibleData = data.data
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
