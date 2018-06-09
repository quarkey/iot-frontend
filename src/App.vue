<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" fixed app>
        <v-list>
          <v-list-tile :to="{path: '/'}">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{path: '/sensors'}">
            <v-list-tile-action>
              <v-icon>settings_remote</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sensors</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="{path: '/datasets'}">
            <v-list-tile-action>
              <v-icon>computer</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Datasets</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>IOT</v-toolbar-title>
      </v-toolbar>
      <v-container fluid justify-space-around>
        <router-view>
        </router-view>
      </v-container>
      <!-- <v-footer color="indigo" app>
      <span class="white--text">&copy; ogla</span>
    </v-footer> -->
    </v-app>
  </div>
</template>

<script>
  import datatable from "@/components/shared/datatable";

  export default {
    components: {
      datatable
    },
    data: () => ({
      drawer: true
    }),
    props: {
      // source: String
    },
    components: {
      datatable
    }
  };

</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
