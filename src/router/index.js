import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

import FavoriteCovers from '../views/FavoriteCovers.vue';
import ContactDeveloper from '../views/ContactDeveloper.vue';
import Instruments from '../views/Instruments.vue';

import ArtistPage from '../views/ArtistPage.vue';
import SongPage from '../views/SongPage.vue';


const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/favorite-covers',
		component: FavoriteCovers
	},
	{
		path: '/contact-developer',
		component: ContactDeveloper
	},
	{
		path: '/instruments',
		component: Instruments
	},
	{
		path: '/artist',
		component: ArtistPage
	},
	{
		path: '/song',
		component: SongPage
	}
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;