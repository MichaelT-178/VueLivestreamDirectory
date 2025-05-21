import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';


import ArtistPage from '../views/ArtistPage.vue';
import SongPage from '../views/SongPage.vue';


// Card Views
import ContactDeveloper from '../views/CardViews/ContactDeveloper.vue';
import CoreyPicturesView from '../views/CardViews/CoreyPictures.vue';
import FavoriteCovers from '../views/CardViews/FavoriteCovers.vue';
import Instruments from '../views/CardViews/Instruments.vue';
import LessonView from '../views/CardViews/Lessons.vue';
import PatreonSignInView from '../views/CardViews/PatreonSignIn.vue';
import RepertoireView from '../views/CardViews/Repertoire.vue';


const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/favorites',
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
	{
		path: '/repertoire',
		component: RepertoireView
	},
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;