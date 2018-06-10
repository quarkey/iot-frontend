<template>
  <v-content>
    <v-layout row wrap>
      <h1>Dataset details</h1>
      <v-flex sm12>
        <br>
        <v-card hover>
          <v-card-title primary-title>
            <div>
              <div class="headline text-sm-left">{{result.id}}. {{result.title}} </div>
              <br>
              <div class="text-sm-left">
                <strong>Description:</strong>{{result.description}}</div>
              <div class="text-sm-left">
                <strong>Reference:</strong> {{result.reference}}</div>
              <div class="text-sm-left">
                <strong>Sensor:</strong> {{result.sensor_title}}</div>
              <div class="text-sm-left">
                <strong>Created date:</strong> {{result.created_at}}</div>
              <div class="text-sm-left">
                <strong>Sensor Interval:</strong> {{result.intervalsec}} seconds</div>
              <div class="text-sm-left">
                <strong>Fiels:</strong> {{result.fields}}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="blue" ripple :to="{name: 'Datasets'}">back</v-btn>
            <v-btn flat color="red" ripple>Remove</v-btn>
          </v-card-actions>
        </v-card>
        <br>
        <v-card>
          <v-card-title primary-title>
            <div class="headline text-sm-left">Data:</div>
          </v-card-title>

          <v-layout>
            <v-flex sm12>
            <span v-for="sensor in sensordata" :key="sensor.id">
              <div class="text-sm-left"> {{sensor.id}} {{sensor.data}} {{sensor.time}}</div>
            </span>
            </v-flex>
          </v-layout>
          <!-- work on this later. it dosnt work...
          <datatable v-bind:data="{data: sensordata, fields: result.fields}">
          </datatable> -->
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
  import datatable from '@/components/shared/datatable'

  const API_URL = "http://localhost:6001/api"
  export default {
    components: {
      datatable
    },
    data() {
      return {
        result: {},
        sensordata: {}
      };
    },
    mounted() {
      const id = this.$route.params.reference;
      this.getDataset(id);
      this.getSensorData(id)
    },
    methods: {
      getDataset: function (id) {
        axios
          .get(`${API_URL}/datasets/${id}`)
          .then(response => {
            return (this.result = response.data);
          })
          .catch(error => {
            return (this.error = true);
          });
      },
      getSensorData: function (id) {
        axios
          .get(`${API_URL}/sensordata/${id}`)
          .then(response => {
            return (this.sensordata = response.data);
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
