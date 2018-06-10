<template>
  <v-content>
    <v-layout justify-right align-center>
      <h1>Datasets</h1>
    </v-layout>
    <!-- input fields -->
    <div class="text-sm-left">
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" flat color="primary" dark>New dataset</v-btn>
        <v-form v-model="valid">
          <v-card>

            <v-card-title>
              <span class="headline">Register New Dataset</span>
            </v-card-title>

            <v-card-text>
              <v-text-field label="Title" required></v-text-field>
              <v-text-field name="input-7-1" label="Description" multi-line required></v-text-field>
              <v-select :items="items" label="Sensor" required>
              </v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" :disabled="!valid" flat @click.native="submitNewSensor">Save</v-btn>
            </v-card-actions>

          </v-card>
        </v-form>
      </v-dialog>
    </div>
    <v-layout row wrap>
      <v-flex sm4 v-for="result in results" :key="result.id">
        <br>
        <v-card hover>
          <v-card-title>
            <div>
              <div class="headline text-sm-left">{{result.id}}. {{result.title}}</div>
              <br>
              <div class="text-sm-left">
                <strong>Description:</strong> {{result.description}}
                <br>
                <strong>Sensor:</strong> {{result.sensor_title}}
                <br>
                <!-- <strong>Reference</strong> {{result.reference}}<br> -->
                <strong>Data fields:</strong> {{result.fields}}
                <br>
                <strong>Created at:</strong> {{result.created_at}}
                <!-- {{result}} -->
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="blue" ripple :to="{name: 'Dataset', params: {reference: result.reference}}">view</v-btn>
            <v-btn flat color="red" ripple>Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  const API_URL = "http://localhost:6001/api";

  export default {
    data() {
      return {
        results: [],
        error: null,
        valid: null,
        alert: false,
        dialog: false,
        sensors: [],
        select: null,
        items: []
      };
    },
    mounted() {
      this.getDatasets();
      this.getSensors();
    },
    methods: {
      getDatasets: function () {
        console.log("fetching datasets from api");
        axios
          .get(`${API_URL}/datasets`)
          .then(response => {
            return (this.results = response.data);
          })
          .catch(error => {
            return (this.error = true);
          });
      },
      getSensors: function () {
        axios
          .get(`${API_URL}/sensors`)
          .then(response => {
            this.sensors = response.data;
            this.sensors.forEach(elm => {
              this.items.push(elm.title);
            });
            return;
          })
          .catch(error => {
            return (this.error = true);
          });
      }
    }
  };

</script>

<style>


</style>
