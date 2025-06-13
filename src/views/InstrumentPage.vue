<template>
  <div class="page-container" v-if="instrument">
    <HeaderWithIcon
      :title="instrument.instrument"
      icon="musicnote"
      iconColor="#e879f9"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <img :src="getImagePath(instrument.pic)" :alt="instrument.instrument" class="instrument-image" />
    <p><strong>Number of Appearances:</strong> {{ instrument.numOfAppearances }}</p>

    <div class="appearance" v-for="appearance in instrument.appearances" :key="appearance.id">
      <div class="appearance-content">
        <div class="appearance-info">
          <p><strong>Song Title:</strong> {{ appearance.songTitle }}</p>
          <p><strong>Artist:</strong> {{ appearance.artist }}</p>
          <p><strong>Livestream:</strong> {{ appearance.livestream }}</p>
          <p>
            <strong>Link:</strong>
            <a :href="appearance.link" target="_blank" rel="noopener noreferrer">
              {{ appearance.link }}
            </a>
          </p>
        </div>
        <div class="appearance-image-wrapper">
          <img
            :src="getSongImagePath(appearance)"
            :alt="appearance.songTitle"
            class="appearance-image"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Instrument not found.</p>
  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import InstrumentData from '../assets/Data/InstrumentData.json';
import HeaderWithIcon from '../components/HeaderWithIcon.vue';

const props = defineProps({
  instrument: String,
  song: {
    type: String,
    required: false
  }
});

const instrument = computed(() => InstrumentData[props.instrument]);

const headerConfig = computed(() => {
  if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: '#FB923C',
      leadingIconRoute: `/song/${props.song}`
    }
  }

  return {
    leadingIcon: 'guitar',
    leadingIconColor: '#2DD4BF',
    leadingIconRoute: '/instruments'
  }
})

const getImagePath = (fileName) => {
  return new URL(`../assets/instrument-pics/${fileName}`, import.meta.url).href;
}

const getSongImagePath = (appearance) => {
  if (appearance.cleanedAlbum) {
    return new URL(`../assets/AlbumPics/${appearance.cleanedAlbum}.jpg`, import.meta.url).href;
  }

  return new URL(`../assets/ArtistPics/${appearance.cleanedArtist}.jpg`, import.meta.url).href;
}

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.page-container {
  padding: 2rem;
  font-size: 1.1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.instrument-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.appearance {
  margin-top: 1.5rem;
  padding: 1rem;
  border-left: 4px solid #ccc;
  background-color: #f9f9f9;
}

.appearance-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.appearance-info {
  flex: 1 1 60%;
}

.appearance-image-wrapper {
  flex: 1 1 35%;
  max-width: 250px;
}

.appearance-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ccc;
}

</style>
