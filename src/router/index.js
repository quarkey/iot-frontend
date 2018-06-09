import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Datasets from '@/components/Datasets'
import Dataset from '@/components/Dataset'
import Sensors from '@/components/Sensors'
import Sensor from '@/components/Sensor'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/datasets',
            name: "Datasets",
            component: Datasets
        },
        {
            path: '/datasets/:reference',
            name: "Dataset",
            component: Dataset
        },
        {
            path: '/sensors',
            name: "Sensors",
            component: Sensors
        },
        {
            path: '/sensors/:reference',
            name: "Sensor",
            component: Sensor
        },
    ]
})