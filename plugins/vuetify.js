//libraries
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' //materialdesignicons.

Vue.use(Vuetify)

//options of configuration for the library components
const opts = {
    theme: {
        options: {
            customProperties: true,
        }
    }
}

export default new Vuetify(opts)