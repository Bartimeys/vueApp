<template>
  <div>
    <table  v-if="filteredData != null" class="table table-responsive">
      <thead>
      <tr>
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
        <td>
          <button id="show-modal" @click="showModal = true"><img :src="entry.picture.thumbnail" alt="Avatar Thumbnail"/></button>
          <!-- use the modal component, pass in the prop -->
          <modal-window v-if="showModal" @close="showModal = false">
            <div slot="body">
              <ul >
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
        <td>{{entry.name.title+" "+ entry.name.first+" "+entry.name.last}}</td>
        <td>{{entry.location.city}}</td>
        <td>{{entry.email}}</td>
        <td>{{entry.phone}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import ModalWindow from '../components/ModalWindow.vue'

  export default {
    components: {
      ModalWindow
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
</style>
