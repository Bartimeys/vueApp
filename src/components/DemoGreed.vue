<template>
  <div>
    <div class="tab">
      <table v-if="filteredData != null" cellspacing="0" cellpadding="0" border="0">
        <thead>
        <tr class="days">
          <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }" class="table-success ">
            {{ key | capitalize }}
            <span class="arrow-up" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>

          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in filteredData">
          <td class="cs335">
            <button id="show-modal" @click="showModal = true">
              <img :src="entry.picture.thumbnail" alt="Avatar Thumbnail"/>
            </button>
            <!-- use the modal component, pass in the prop -->
            <modal-window v-if="showModal" @close="showModal = false">
              <div slot="body">
                <ul>
                  <li><img :src="entry.picture.large" alt="Avatar Thumbnail"/></li>
                  <li>{{entry.location.street}}</li>
                  <li>{{entry.location.city}}</li>
                  <li>{{entry.location.state}}</li>
                  <li>{{entry.location.postcode}}</li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </modal-window>
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
  import ModalWindow from '../components/ModalWindow.vue'
  import TablePager from '../components/TablePager.vue'

  export default {
    components: {
      ModalWindow,
      TablePager
    },
    props: {
      data: Array,
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
        sortKey: '',
        gender: 'all',
        sortOrders: sortOrders
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
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400);

  ul {
    list-style-type: none;
  }

  .blue {
    background: #3498db;
  }

  .purple {
    background: #9b59b6;
  }

  .navy {
    background: #34495e;
  }

  .green {
    background: #2ecc71;
  }

  .red {
    background: #e74c3c;
  }

  .orange {
    background: #f39c12;
  }

  .cs335, .cs426, .md303, .md352, .md313, .cs240 {
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

  .time {
    width: 3em !important;
  }

  /* Add this attribute to the element that needs a tooltip */
  [data-tooltip] {
    position: relative;
    z-index: 2;
    cursor: pointer;
  }

  /* Hide the tooltip content by default */
  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: hidden;
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    opacity: 0;
    pointer-events: none;
    -moz-transition: ease 0.5s all;
    -o-transition: ease 0.5s all;
    -webkit-transition: ease 0.5s all;
    transition: ease 0.5s all;
  }

  /* Position tooltip above the element */
  [data-tooltip]:before {
    position: absolute;
    bottom: 110%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -80px;
    padding: 7px;
    width: 160px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    background-color: black;
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }

  /* Triangle hack to make tooltip look like a speech bubble */
  [data-tooltip]:after {
    position: absolute;
    bottom: 110%;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid black;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  /* Show tooltip content on hover */
  [data-tooltip]:hover:before,
  [data-tooltip]:hover:after {
    visibility: visible;
    bottom: 90%;
    filter: progid:DXImageTransform.Microsoft.Alpha(enabled=false);
    opacity: 1;
  }

</style>
