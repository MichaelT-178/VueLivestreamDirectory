<template>
  <div class="gallery-container">
    <div class="gallery">
      <img :src="HeuvelPic1" alt="Heuvel1" class="heuvel1 gallery-img" loading="lazy" />
      <img :src="HeuvelPic2" alt="Heuvel2" class="heuvel2 gallery-img" loading="lazy" />
      <img :src="HeuvelPic3" alt="Heuvel3" class="heuvel3 gallery-img" loading="lazy" />
      <img :src="HeuvelPic4" alt="Heuvel4" class="heuvel4 gallery-img" loading="lazy" />
      <img :src="HeuvelPic5" alt="Heuvel5" class="heuvel5 gallery-img" loading="lazy" />
      <img :src="HeuvelPic6" alt="Heuvel6" class="heuvel6 gallery-img" loading="lazy" />
      <img :src="HeuvelPic7" alt="Heuvel7" class="heuvel7 gallery-img" loading="lazy" />
      <img :src="HeuvelPic8" alt="Heuvel8" class="heuvel8 gallery-img" loading="lazy" />
      <img :src="HeuvelPic9" alt="Heuvel9" class="heuvel9 gallery-img" loading="lazy" />
      <img :src="HeuvelPic10" alt="Heuvel10" class="heuvel10 gallery-img" loading="lazy" />
      <img :src="HeuvelPic11" alt="Heuvel11" class="heuvel11 gallery-img" loading="lazy" />
      <img :src="HeuvelPic12" alt="Heuvel12" class="heuvel12 gallery-img" loading="lazy" />
      <img :src="HeuvelPic13" alt="Heuvel13" class="heuvel13 gallery-img" loading="lazy" />
      <img :src="HeuvelPic14" alt="Heuvel14" class="heuvel14 gallery-img" loading="lazy" />
      <img :src="HeuvelPic15" alt="Heuvel15" class="heuvel15 gallery-img" loading="lazy" />
      <img :src="HeuvelPic16" alt="Heuvel16" class="heuvel16 gallery-img" loading="lazy" />
    </div>
  </div>
</template>

<script setup>
import HeuvelPic1 from "../../assets/CoreyPics/Heuvel1.jpg";
import HeuvelPic2 from "../../assets/CoreyPics/Heuvel2.jpg";
import HeuvelPic3 from "../../assets/CoreyPics/Heuvel3.jpg";
import HeuvelPic4 from "../../assets/CoreyPics/Heuvel4.jpg";
import HeuvelPic5 from "../../assets/CoreyPics/Heuvel5.jpg";
import HeuvelPic6 from "../../assets/CoreyPics/Heuvel6.jpg";
import HeuvelPic7 from "../../assets/CoreyPics/Heuvel7.jpg";
import HeuvelPic8 from "../../assets/CoreyPics/Heuvel8.jpg";
import HeuvelPic9 from "../../assets/CoreyPics/Heuvel9.jpg";
import HeuvelPic10 from "../../assets/CoreyPics/Heuvel10.jpg";
import HeuvelPic11 from "../../assets/CoreyPics/Heuvel11.jpg";
import HeuvelPic12 from "../../assets/CoreyPics/Heuvel12.jpg";
import HeuvelPic13 from "../../assets/CoreyPics/Heuvel13.jpg";
import HeuvelPic14 from "../../assets/CoreyPics/Heuvel14.jpg";
import HeuvelPic15 from "../../assets/CoreyPics/Heuvel15.jpg";
import HeuvelPic16 from "../../assets/CoreyPics/Heuvel16.jpg";
</script>

<style scoped>
.gallery-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  justify-content: center;
}

/* Shared image styles */
.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 31.1% 64.8%;
  border-radius: 8px;
  display: block;
}

/* Grid placements */
.heuvel1  { grid-column: 1 / 4; }
.heuvel2  { grid-column: 4 / 7; }
.heuvel3  { grid-column: 1 / 3; }
.heuvel4  { grid-column: 3 / 5; }
.heuvel5  { grid-column: 5 / 7; }
.heuvel6  { grid-column: 1 / 4; }
.heuvel7  { grid-column: 1 / 4; }
.heuvel8  { grid-column: 4 / 7; grid-row: 3 / 5; }
.heuvel9  { grid-column: 1 / 3; grid-row: 5 / 8; }
.heuvel10 { grid-column: 3 / 7; }
.heuvel11 { grid-column: 3 / 7; }
.heuvel12 { grid-column: 3 / 7; }
.heuvel13 { grid-column: 1 / 4; grid-row: 8 / 11; }
.heuvel14 { grid-column: 4 / 7; grid-row: 8 / 11; }
.heuvel15 { grid-column: 1 / 4; }
.heuvel16 { grid-column: 4 / 7; }

/* Responsive single-column layout */
@media (max-width: 767px) {
  .gallery {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .gallery > * {
    grid-column: auto !important;
    grid-row: auto !important;
  }

  .gallery-img {
    width: 95%;
    margin: 0 auto;
  }
}

</style>


<!-- 
Heuvel1.jpg: 1500x844
Heuvel2.jpg: 1200x800
Heuvel3.jpg: 1200x800
Heuvel4.jpg: 1280x720
Heuvel5.jpg: 1500x844
Heuvel6.jpg: 1500x1000
Heuvel7.jpg: 1500x1000
Heuvel8.jpg: 1067x1600
Heuvel9.jpg: 1080x1920
Heuvel10.jpg: 1280x720
Heuvel11.jpg: 1500x1000
Heuvel12.jpg: 1500x844
Heuvel13.jpg: 1500x2247
Heuvel14.jpg: 1500x2247
Heuvel15.jpg: 1200x800
Heuvel16.jpg: 960x767
-->