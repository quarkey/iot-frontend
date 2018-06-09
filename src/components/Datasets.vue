<template>
    <v-content>
            <v-layout
            justify-right
            align-center>
            <h1>Datasets</h1>
            </v-layout>
            <v-layout row wrap>
                <v-flex sm4 v-for="result in results" :key="result.id">
                  <br>
                  <v-card hover>
                    <v-card-title>
                      <div>
                        <div class="headline text-sm-left">{{result.id}}. {{result.title}}</div>
                        <br>
                        <div class="text-sm-left">
                          <strong>Description:</strong> {{result.description}}<br>
                          <strong>Sensor:</strong> {{result.sensor_title}}<br>
                          <!-- <strong>Reference</strong> {{result.reference}}<br> -->
                         <strong>Data fields:</strong> {{result.fields}}<br>
                         <strong>Created at:</strong> {{result.created_at}}
                          <!-- {{result}} -->
                        </div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="blue" ripple :to="{name: 'Dataset', params: {reference: result.reference}}">view</v-btn>
                        <v-btn flat color="red" ripple>Remove</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
            </v-layout>
    </v-content>
</template>

<script>
export default {
  data () {
    return {
      results: [],
      error: null
    }
  },
  mounted() {
    this.getDatasets();

  },
  methods: {
    getDatasets: function() {
      console.log("fetching datasets from api")
      axios.get('http://192.168.10.119:6001/api/datasets')
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
