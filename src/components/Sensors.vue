<template>
  <v-content>
    <v-layout justify-right align-center>
      <h1>Sensors</h1>
    </v-layout>

    <!-- input fields -->
    <div class="text-sm-left">
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" flat color="primary" dark>New sensor</v-btn>
        <v-form v-model="valid">
          <v-card>
          <v-card-title>
            <span class="headline">Register New Sensor</span>
          </v-card-title>
            <v-card-text>
              <v-text-field label="Title" :rules="titleRules" required v-model="title"></v-text-field>
              <v-text-field name="input-7-1" :rules="descRules" label="Description" multi-line required v-model="description">
              </v-text-field>
              <v-text-field label="Arduino key / Reference" :rules="keyRules" required v-model="arduino_key"></v-text-field>
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
    <!-- result: {{result}}<br><br>
    results: {{results}} -->

    <v-alert dismissible type="error" loading transition="scale-transition" v-model="error">
      {{errormsg}}
    </v-alert>

    <v-alert v-model="alert" dismissible type="success" icon="done" transition="scale-transition">
      {{alertmsg}}
    </v-alert>
    <!-- v-for="score in scoreboardsortbyid" :key="score.id -->
    <v-layout row wrap>
      <v-flex sm4 v-for="(result, index) in results" :key="result.id">
        <br>
        <v-card hover>
          <v-card-title primary-title>
            <div>
              <div class="headline text-sm-left">{{result.id}}. {{result.title}}</div>
              <br>
              <div class="text-sm-left">
                <strong>ID:</strong> {{result.id}}
                <br>
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
            <v-btn flat color="red" ripple v-on:click="deleteSensor(result, index)">Delete</v-btn>
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
        result: null,
        error: null,
        errormsg: null,
        dialog: false,
        title: "",
        description: "",
        arduino_key: "",
        newSensor: null,
        alert: false,
        alertmsg: "",

        // form validation
        valid: false,
        titleRules: [
          v => !!v || 'Title is required!',
        ],
        descRules: [
          v => !!v || 'Description is required!',
        ],
        keyRules: [
          v => !!v || 'Arduino key is required!',
        ]
      };
    },
    mounted() {
      this.getSensors();
    },
    methods: {

      submitNewSensor: function () {
        if (!this.valid) { return }
        this.newSensor = {
          title: this.title,
          description: this.description,
          arduino_key: this.arduino_key
        };
        axios
          .post(`${API_URL}/sensors`, this.newSensor)
          .then(response => {
            this.results.push(this.newSensor);
            this.alertmsg = "A new sensor registered"
            this.alert = true
            return (this.result = response);
          })
          .catch(error => {
            this.alertmsg = "Unable to save!"
            return (this.error = true);
          });
      },

      deleteSensor: function (key, index) {
        axios
          .delete(`${API_URL}/sensors/` + key.arduino_key)
          .then(response => {
            this.results.splice(index, 1);
            this.alertmsg = "Sensor deleted!"
            this.alert = true
            return (this.error = false)
          })
          .catch(error => {
            this.errormsg = error.response.data
            return (this.error = true);
          });
      },

      getSensors: function () {
        axios
          .get(`${API_URL}/sensors`)
          .then(response => {
            return (this.results = response.data);
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
