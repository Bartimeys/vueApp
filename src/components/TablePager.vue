<template id="table-pager-template">
  <div>
    <ul class="pager">
      <li :class="{'pager-link-hidden' : firstHidden}"><a class="first" href="#" v-on:click="first">&lt;&lt;</a></li>
      <li :class="{'pager-link-hidden' : prevHidden}"><a class="prev" href="#" v-on:click="prev">&lt;</a></li>
      <li>{{pageNumber}}</li>
      <li :class="{'pager-link-hidden' : nextHidden}"><a class="next" href="#" v-on:click="next">&gt;</a></li>
      <li :class="{'pager-link-hidden' :  lastHidden}"><a class="last" href="#" v-on:click="last">&gt;&gt;</a></li>
    </ul>
  </div>
</template>

<script>
  import DemoGreed from '../components/DemoGreed.vue'

  export default {
    name: 'TablePager',
    components: {
      DemoGreed
    },
    props: ['pageSize', 'gridData'],
    data: function () {
      return {
        firstHidden: false,
        prevHidden: false,
        nextHidden: false,
        lastHidden: false,

        pageNumber: 1
      }
    },
    methods: {
      first: function () {
        this.pageNumber = 1
        this.fetchData()
      },
      prev: function () {
        this.pageNumber--
        this.fetchData()
      },
      next: function () {
        this.pageNumber++
        this.fetchData()
      },
      last: function () {
        let maxPage = Math.ceil(this.gridData.length / this.pageSize)
        this.pageNumber = maxPage
        this.fetchData()
      },
      fetchData: function () {
        let maxPage = Math.ceil(this.gridData.length / this.pageSize)

        this.firstHidden = this.pageNumber === 1
        this.prevHidden = this.pageNumber === 1
        this.nextHidden = this.pageNumber === maxPage
        this.lastHidden = this.pageNumber === maxPage

        let startIndex = (this.pageNumber - 1) * this.pageSize
        let endIndex = startIndex + this.pageSize >= this.gridData.length
          ? startIndex + this.gridData.length - this.pageSize : startIndex + this.pageSize
        this.$emit('invalidate', {
          data: this.gridData.slice(startIndex, endIndex)
        })
      }
    },
    created: function () {
      this.fetchData()
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
