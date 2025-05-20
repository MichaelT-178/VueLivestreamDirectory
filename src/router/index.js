import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

import FavoriteCovers from '../views/FavoriteCovers.vue';
import ContactDeveloper from '../views/ContactDeveloper.vue';
import Instruments from '../views/Instruments.vue';

import ArtistPage from '../views/ArtistPage.vue';
import SongPage from '../views/SongPage.vue';


// Card Views
import PatreonSignInView from '../views/CardViews/PatreonSignIn.vue';
import LessonView from '../views/CardViews/Lessons.vue';
import CoreyPicturesView from '../views/CardViews/CoreyPictures.vue';


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
		path: '/contact',
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
	},

	// Card Views 
	{
		path: '/patreon-sign-in',
		component: PatreonSignInView
	},
	{
		path: '/lessons',
		component: LessonView
	},
	{
		path: '/photos',
		component: CoreyPicturesView
	},
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;