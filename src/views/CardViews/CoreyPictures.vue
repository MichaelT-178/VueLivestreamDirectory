<template>
  <div class="gallery-container">
    <HeaderWithIcon
      title="Corey Pictures"
      icon="camera"
      iconColor="orange"
    />

    <h2 v-if="isSmallScreen" class="mobile-title">Corey Pictures</h2>

    <div class="gallery">
      <img
        v-for="(img, index) in galleryImages"
        :key="index"
        :src="getImageUrl(img)"
        :alt="galleryCaptions[index]"
        class="gallery-img"
        @click="openImageView(index)"
        loading="lazy"
      />
    </div>

    <transition name="fade">
      <ImageView
        v-if="isImageViewOpen"
        :images="galleryImages.map(getImageUrl)"
        :captions="galleryCaptions"
        :initialImage="currentImage"
        :isOpen="isImageViewOpen"
        @close="isImageViewOpen = false"
      />
    </transition>
  </div>

  <button
    v-if="isSmallScreen"
    class="go-to-top-btn"
    @click="scrollToTop"
  >
    Go back to top
  </button>

</template>


<script setup>
import { ref, onMounted } from 'vue';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import ImageView from '../../components/ImageView.vue';
import { useScreenHelpers } from '../../composables/useScreenHelpers.js';

const isImageViewOpen = ref(false);
const currentImage = ref(0);

const { isSmallScreen, scrollToTop } = useScreenHelpers();

const galleryImages = [
  "Pic1", "Pic2", "Pic3", "Pic4",
  "Pic5", "Pic6", "Pic7", "Pic8",
  "Pic9", "Pic10", "Pic11", "Pic12",
  "Pic13", "Pic14", "Pic15", "Pic16"
];

const galleryCaptions = [
  "", "", "", "",
  "", "", "", "",
  "", "", "", "",
  "", "", "", ""
];

const getImageUrl = (coreyPic) => {
  return new URL(`../../assets/CoreyPics/${coreyPic}.jpg`, import.meta.url).href;
};

const openImageView = (index) => {
  currentImage.value = index;
  isImageViewOpen.value = true;
};

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.gallery-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  justify-content: center;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 31.1% 64.8%;
  border-radius: 8px;
  display: block;
  cursor: pointer;
}

.header-with-icon {
  margin-bottom: 1rem;
}

/* Grid placements */
.gallery-img:nth-child(1)  { grid-column: 1 / 4; }
.gallery-img:nth-child(2)  { grid-column: 4 / 7; }
.gallery-img:nth-child(3)  { grid-column: 1 / 3; }
.gallery-img:nth-child(4)  { grid-column: 3 / 5; }
.gallery-img:nth-child(5)  { grid-column: 5 / 7; }
.gallery-img:nth-child(6)  { grid-column: 1 / 4; }
.gallery-img:nth-child(7)  { grid-column: 1 / 4; }
.gallery-img:nth-child(8)  { grid-column: 4 / 7; grid-row: 3 / 5; }
.gallery-img:nth-child(9)  { grid-column: 1 / 3; grid-row: 5 / 8; }
.gallery-img:nth-child(10) { grid-column: 3 / 7; }
.gallery-img:nth-child(11) { grid-column: 3 / 7; }
.gallery-img:nth-child(12) { grid-column: 3 / 7; }
.gallery-img:nth-child(13) { grid-column: 1 / 4; grid-row: 8 / 11; }
.gallery-img:nth-child(14) { grid-column: 4 / 7; grid-row: 8 / 11; }
.gallery-img:nth-child(15) { grid-column: 1 / 4; }
.gallery-img:nth-child(16) { grid-column: 4 / 7; }

@media (max-width: 767px) {
  .gallery {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .gallery > * {
    grid-column: auto !important;
    grid-row: auto !important;
  }

  .gallery-img {
    width: 95%;
    margin: 0 auto;
    height: 115%;
  }
}

@media (max-width: 400px) {
  .gallery {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .mobile-title {
    color: white;
    font-size: 26px;
    font-weight: 600;
    margin-left: 9px;
  }

  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #ff7f50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #e86d3a;
  }

}

</style>
