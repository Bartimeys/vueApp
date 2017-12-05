<template>
  <div>
    <div class="tab">
      <form id="search">
        Search by name <input name="query" v-model="searchQuery">
        <select v-model="selectedGender" >
          <option  value="All" >All</option>
          <option  value="female" >female </option>
          <option  value="male" >male</option>
        </select>
      </form>
      <table v-if="filteredData != null" cellspacing="0" cellpadding="0" border="0">
        <thead>
        <tr class="days">
          <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }" class="table-success ">
            {{ key | capitalize }}
            <i class="fa fa-chevron-up" aria-hidden="true" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></i>
            <!--<span class="arrow-up" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">-->
          <!--</span>-->

          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData">
          <td class="cs335">
            <div class="tooltip">
              <img :src="entry.picture.thumbnail" alt="Avatar Thumbnail"/>
              <div class="tooltiptext">
                <ul>
                  <li><img :src="entry.picture.large" alt="Avatar Thumbnail"/></li>
                  <li>Details :</li>
                  <li>{{entry.location.city}}</li>
                  <li>{{entry.location.state}}</li>
                  <li>{{entry.location.postcode}}</li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </td>
          <td class="cs335">{{entry.name.title + " " + entry.name.first + " " + entry.name.last}}</td>
          <td class="cs335">{{entry.location.city}}</td>
          <td class="cs335">{{entry.email}}</td>
          <td class="cs335">{{entry.phone}}</td>
          <td class="cs335">{{entry.gender}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import TablePager from '../components/TablePager.vue'

  export default {
    components: {
      TablePager
    },
    props: {
      data: Array,
      people: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      let sortOrders = {}
      this.columns.forEach(function (key) {
        let x = sortOrders[key] = 1
        return x
      })
      return {
        showModal: false,
        searchQuery: '',
        sortKey: '',
        gender: 'all',
        sortOrders: sortOrders,
        selectedGender: 'All'
      }
    },
    computed: {
      filteredData: function () {
        let sortKey = this.sortKey
        let filterKey = this.filterKey && this.filterKey.toLowerCase()
        let order = this.sortOrders[sortKey] || 1
        let data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      },
      filteredPeople: function () {
        let people = this.data
        let gender = this.selectedGender
        if (gender === 'All') {
          return people
        }
        if (gender !== 'All') {
          return people.filter(function (person) {
            return (gender === 'All' || person.gender === gender)
          })
        }
        return people
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 10em;
    background-color: #424242;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  ul {
    list-style-type: none;
  }

  .cs335 {
    font-weight: 300;
    cursor: pointer;
  }

  body {
    background: #e74c3c;
    padding: 20px;
  }

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  table {
    font-family: 'Open Sans', Helvetica;
    color: #2c3e50;
    margin: auto;
    width: 100vw;
    text-transform: capitalize;
  }

  thead {
    color: #f2f2f2;
  }

  table tr:nth-child(2n) {
    background: #eff0f1;
  }

  table tr:nth-child(2n+3) {
    background: #fff;
  }

  table th, table td {
    padding: 1em;
    width: 10em;
  }

  .days, .time {
    background: #34495e;
    text-transform: uppercase;
    font-size: 0.6em;
    text-align: center;
  }
  input,select{
    margin: 0 auto 15px;
    width: 220px;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    padding: 10px 15px;
    border: 1px solid gray;
  }
  form{
    padding: 5px;
  }


</style>
