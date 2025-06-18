import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';


import ArtistPage from '../views/ArtistPage.vue';
import SongPage from '../views/SongPage.vue';
import InstrumentPage from '../views/InstrumentPage.vue';
import AlbumPage from '../views/AlbumPage.vue';
import CountryPage from '../views/CountryPage.vue';

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
		path: '/artist/:artist/album/:album',
  	name: 'AlbumPageFromArtist',
  	component: AlbumPage,
  	props: true
	},
	{
		path: '/artist/:artist/song/:song',
  	name: 'SongPageFromArtist',
  	component: SongPage,
  	props: true
	},
	{
		path: '/song/:song',
		name: 'SongPage',
		component: SongPage,
		props: true
	},
	{
		path: '/song/:song/artist/:artist',
		name: 'ArtistPageFromSong',
		component: ArtistPage,
		props: true
	},
	{
		path: '/song/:song/album/:album',
  	name: 'AlbumPageFromSong',
  	component: AlbumPage,
  	props: true
	},
	{
		path: '/song/:song/instrument/:instrument',
		name: 'InstrumentPageFromSong',
		component: InstrumentPage,
		props: true
	},
	{
		path: '/instrument/:instrument',
		name: 'InstrumentPage',
		component: InstrumentPage,
		props: true
	},
	{
		path: '/album/:album/song/:song',
		name: 'SongPageFromAlbum',
		component: SongPage,
		props: true
	},
	{
		path: '/album/:album/artist/:artist',
		name: 'ArtistPageFromAlbum',
		component: ArtistPage,
		props: true
	},
	{
		path: '/album/:album',
		name: 'AlbumPage',
		component: AlbumPage,
		props: true
	},
	{
		path: '/country/:country/artist/:artist',
		name: 'ArtistPageFromCountry',
		component: ArtistPage,
		props: true
	},
	{
		path: '/artist/:artist/country/:country',
		name: 'CountryPageFromArtist',
		component: CountryPage,
		props: true
	},
	{
		path: '/country/:country',
		name: 'CountryPage',
		component: CountryPage,
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
		path: '/repertoire/song/:song',
  	name: 'SongPageFromRepertoire',
  	component: SongPage,
  	props: true
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