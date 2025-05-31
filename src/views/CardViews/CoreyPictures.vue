<template>
  <div class="gallery-container">
    <HeaderWithIcon
      title="Corey Pictures"
      icon="camera"
      iconColor="#FB923C"
    />

    <div class="gallery">
      <img
        v-for="(img, index) in galleryImages"
        :key="index"
        :src="img"
        :alt="galleryCaptions[index]"
        class="gallery-img"
        @click="openImageView(index)"
        loading="lazy"
      />
    </div>

    <transition name="fade">
      <ImageView
        v-if="isImageViewOpen"
        :images="galleryImages"
        :captions="galleryCaptions"
        :initialImage="currentImage"
        :isOpen="isImageViewOpen"
        @close="isImageViewOpen = false"
      />
    </transition>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import ImageView from '../../components/ImageView.vue';

import HeaderWithIcon from '../../components/HeaderWithIcon.vue';

import HeuvelPic1 from "../../assets/CoreyPics/Pic1.jpg";
import HeuvelPic2 from "../../assets/CoreyPics/Pic2.jpg";
import HeuvelPic3 from "../../assets/CoreyPics/Pic3.jpg";
import HeuvelPic4 from "../../assets/CoreyPics/Pic4.jpg";
import HeuvelPic5 from "../../assets/CoreyPics/Pic5.jpg";
import HeuvelPic6 from "../../assets/CoreyPics/Pic6.jpg";
import HeuvelPic7 from "../../assets/CoreyPics/Pic7.jpg";
import HeuvelPic8 from "../../assets/CoreyPics/Pic8.jpg";
import HeuvelPic9 from "../../assets/CoreyPics/Pic9.jpg";
import HeuvelPic10 from "../../assets/CoreyPics/Pic10.jpg";
import HeuvelPic11 from "../../assets/CoreyPics/Pic11.jpg";
import HeuvelPic12 from "../../assets/CoreyPics/Pic12.jpg";
import HeuvelPic13 from "../../assets/CoreyPics/Pic13.jpg";
import HeuvelPic14 from "../../assets/CoreyPics/Pic14.jpg";
import HeuvelPic15 from "../../assets/CoreyPics/Pic15.jpg";
import HeuvelPic16 from "../../assets/CoreyPics/Pic16.jpg";

const isImageViewOpen = ref(false);
const currentImage = ref(0);

const galleryImages = [
  HeuvelPic1, HeuvelPic2, HeuvelPic3, HeuvelPic4,
  HeuvelPic5, HeuvelPic6, HeuvelPic7, HeuvelPic8,
  HeuvelPic9, HeuvelPic10, HeuvelPic11, HeuvelPic12,
  HeuvelPic13, HeuvelPic14, HeuvelPic15, HeuvelPic16
];

// const galleryCaptions = [
//   "Pic One", "Pic Two", "Pic Three", "Pic Four",
//   "Pic Five", "Pic Six", "Pic Seven", "Pic Eight",
//   "Pic Nine", "Pic Ten", "Pic Eleven", "Pic Twelve",
//   "Pic Thirteen", "Pic Fourteen", "Pic Fifteen", "Pic Sixteen"
// ];

const galleryCaptions = [
  "", "", "", "",
  "", "", "", "",
  "", "", "", "",
  "", "", "", ""
];

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
    margin-top: 20px
  }
}

</style>
