<template>
  <div class="instrument-page-container" v-if="instrument">
    <HeaderWithIcon
      :title="instrument.instrument"
      icon="musicnote"
      iconColor="fuchsia"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <img
      :src="getImagePath(instrument.pic)"
      :alt="instrument.instrument"
      class="instrument-main-image"
    />
    <p class="appearance-count">
      <strong>Number of Appearances:</strong> {{ instrument.numOfAppearances }}
    </p>

    <div
      v-for="appearance in instrument.appearances"
      :key="appearance.id"
      class="appearance-card"
    >
      <a
        :href="appearance.link"
        target="_blank"
        rel="noopener noreferrer"
        class="appearance-link"
      >
        <img
          :src="getSongImagePath(appearance)"
          :alt="appearance.songTitle"
          class="appearance-image"
        />
        <div class="appearance-info">
          <p><strong>{{ appearance.songTitle }}</strong></p>
          <p>{{ appearance.artist }}</p>
          <p>{{ appearance.livestream }}</p>
        </div>
      </a>
    </div>
  </div>

  <div class="instrument-page-container" v-else>
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
    required: false,
  },
});

const instrument = computed(() => InstrumentData[props.instrument]);

const headerConfig = computed(() => {
  if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: 'orange',
      leadingIconRoute: `/song/${props.song}`,
    };
  }

  return {
    leadingIcon: 'guitar',
    leadingIconColor: 'teal',
    leadingIconRoute: '/instruments',
  };
});

const getImagePath = (fileName) => {
  return new URL(`../assets/instrument-pics/${fileName}`, import.meta.url).href;
};

const getSongImagePath = (appearance) => {
  if (appearance.cleanedAlbum) {
    return new URL(
      `../assets/AlbumPics/${appearance.cleanedAlbum}.jpg`,
      import.meta.url
    ).href;
  }
  return new URL(
    `../assets/ArtistPics/${appearance.cleanedArtist}.jpg`,
    import.meta.url
  ).href;
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.instrument-page-container {
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.instrument-main-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 12px;
}

.appearance-count {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.appearance-card {
  margin-bottom: 1.5rem;
  background-color: #1f2937;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.appearance-card:hover {
  transform: scale(1.01);
}

.appearance-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  gap: 1rem;
}

.appearance-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.appearance-info p {
  margin: 0.25rem 0;
}
</style>
