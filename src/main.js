import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faGuitar, 
  faSearch, 
  faBars,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(faGuitar);
library.add(faSearch);
library.add(faBars);
library.add(faXmark);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
