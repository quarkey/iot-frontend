<template>
    <div>
        {{data.data}} 
        <v-btn @click="gen()">generate
        </v-btn>
        <br>
        headers: {{hdr}}<br>
        tmp: {{tmp}}<br>
        datasensor: {{sensordata}}
<v-data-table
    :headers="hdr"
    :items="sensordata"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.value }}</td>
    </template>
  </v-data-table>
    </div>
</template>

<script>
export default {
  props: ["data"],
  methods: {
    gen: function() {
      this.hdr = [];
      this.sensordata = [];
      var a;
      var b = {};
      this.data.fields.forEach(field => {
        a = { text: field, value: field };
        this.hdr.push(a);
      });
      this.data.data.forEach(val => {
        console.log(val.id + val.time);
        const ob = {};
        val.data.forEach((last, i) => {
          console.log(val.id + " " + val.time + " " + last);
          var tmp = this.hdr[i]
          var field = tmp.text 
        });
      });
    }
  },
  data() {
    return {
      hdr: [],
      sensordata: [],
      tmp: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false
          // value: 'name'
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" }
      ],
      desserts: [
        {
          cc: false,
          aa: "Frozen Yogurt",
          xx: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          value: false,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          value: false,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        }
      ]
    };
  }
};
</script>

<style>
</style>
