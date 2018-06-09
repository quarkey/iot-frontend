<template>
    <v-content>
        <v-layout row wrap>
            <h1>Sensor details</h1>
            <v-flex sm12>
                <br>
                <v-card hover>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline text-sm-left">{{result.id}}. {{result.title}} </div>
                            <div class="text-sm-left">{{result.description}}</div>
                            <div class="text-sm-left">Reference: {{result.arduino_key}}</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="blue" ripple :to="{name: 'Sensors'}">back</v-btn>
                        <v-btn flat color="red" ripple>Remove</v-btn>
                    </v-card-actions>

                </v-card>
                <br>
            </v-flex>
        </v-layout>
    </v-content>

</template>

<script>

const API_URL = "http://localhost:6001/api"
export default {
  data() {
    return {
      result: {}
    };
  },
  mounted() {
    const id = this.$route.params.reference;
    this.getSensor(id);
  },
  methods: {
    getSensor: function(id) {
      axios
        .get(`${API_URL}/sensors/${id}`)
        .then(response => {
          console.log(response.data);
          return (this.result = response.data);
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
