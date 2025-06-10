import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';


import ArtistPage from '../views/ArtistPage.vue';
import SongPage from '../views/SongPage.vue';
import InstrumentPage from '../views/InstrumentPage.vue';
import AlbumPage from '../views/AlbumPage.vue';

// Card Views
import ContactDeveloper from '../views/CardViews/ContactDeveloper.vue';
import CoreyPicturesView from '../views/CardViews/CoreyPictures.vue';
import FavoriteCovers from '../views/CardViews/FavoriteCovers.vue';
import Instruments from '../views/CardViews/Instruments.vue';
import LessonView from '../views/CardViews/Lessons.vue';
import PatreonSignInView from '../views/CardViews/PatreonSignIn.vue';
import RepertoireView from '../views/CardViews/Repertoire.vue';
import SavedSongsView from '../views/CardViews/SavedSongs.vue';

// 404 page
import NotFound from '../views/NotFound.vue';


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
		path: '/artist/:artist',
		name: 'ArtistPage',
		component: ArtistPage,
		props: true
	},
	{
		path: '/artist/:artist/album/:name',
  	name: 'AlbumPageFromArtist',
  	component: AlbumPage,
  	props: true
	},
	{
		path: '/artist/:artist/song/:title',
  	name: 'SongPageFromArtist',
  	component: SongPage,
  	props: true
	},
	{
		path: '/song/:title',
		name: 'SongPage',
		component: SongPage,
		props: true
	},
	{
		path: '/song/:title/artist/:artist',
		name: 'ArtistPageFromSong',
		component: ArtistPage,
		props: true
	},
	{
		path: '/song/:title/album/:name',
  	name: 'AlbumPageFromSong',
  	component: AlbumPage,
  	props: true
	},
	{
		path: '/instrument/:name',
		name: 'InstrumentPage',
		component: InstrumentPage,
		props: true
	},
	{
		path: '/album/:name',
		name: 'AlbumPage',
		component: AlbumPage,
		props: true
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
	{
		path: '/saved-songs',
		component: SavedSongsView
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound404',
		component: NotFound
	},
]

const router = createRouter({
	history: createWebHistory('/'),
	routes
});

export default router;