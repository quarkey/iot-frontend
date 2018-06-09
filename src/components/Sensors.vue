<template>
  <v-content>
    <v-layout justify-right align-center>
      <h1>Sensors</h1>
    </v-layout>
    <div class="text-sm-left">
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" flat color="primary" dark>Add new sensor</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">New ensor</span>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Title" required v-model="title"></v-text-field>
            <v-text-field name="input-7-1" label="Description" multi-line required v-model="description">
            </v-text-field>
            <v-text-field label="Arduino key" required v-model="arduino_key"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="submit">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-alert v-show="error" :value="true" type="error" loading>
      Unable fetch data from API
    </v-alert>
    <!-- v-for="score in scoreboardsortbyid" :key="score.id -->
    <v-layout row wrap>
      <v-flex sm4 v-for="result in results" :key="result.id">
        <br>
        <v-card hover>
          <v-card-title primary-title>
            <div>
              <div class="headline text-sm-left">{{result.id}}. {{result.title}}</div>
              <br>
              <div class="text-sm-left">
                <strong>Description:</strong> {{result.description}}</div>
              <div class="text-sm-left">
                <strong>Reference:</strong> {{result.arduino_key}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="blue" ripple :to="{
                    name: 'Sensor',
                    params: {reference: result.arduino_key} 
                  }">Details</v-btn>
            <v-btn flat color="red" ripple>Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  export default {
    data() {
      return {
        sensor: "xxxxxx",
        results: [],
        error: null,
        dialog: false,
        title: "",
        description: "",
        arduino_key: ""
      };
    },
    mounted() {
      this.getSensors();
    },
    methods: {
      submit: function () {
        console.log("submit")
        this.dialog = false
      },
      getSensors: function () {
        console.log("fetching sensors from api")
        axios.get('http://192.168.10.119:6001/api/sensors')
          .then(response => {
            return (this.results = response.data)
          })
          .catch(error => {
            return (this.error = true)
          })
      }
    }
  }

</script>

<style>


</style>
