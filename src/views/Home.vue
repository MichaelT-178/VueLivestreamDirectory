<template>
  <div class="page-container">
    <div v-if="showSuccessModal" class="modal-wrapper">
      <SuccessModal 
        v-if="showSuccessModal"
        :success="modalSuccess" 
        :success-title="successTitle"
        :success-description="successDescription"
        :error-title="errorTitle"
        :error-description="errorDescription"
        @close="handleModalClose"
      />
    </div>

    <div class="centered">
      <p class="title">
        <font-awesome-icon icon="guitar" />
        Corey Heuvel <span class="search-word">Search</span>
      </p>

      <div class="search-wrapper">
        <SearchBar @focus="handleFocus" />
      </div>

      <div class="cards-wrapper" v-if="!showMobileSearch">
        <HomeCard 
          v-for="(card, index) in CardData.CardData" 
          :key="index"
          :card="card"
          @card-click="handleCardClick"
        />
      </div>
    </div>

    <MobileSearchView 
      v-if="showMobileSearch" 
      class="mobile-overlay" 
      @close="handleMobileSearchClose" 
    />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SearchBar from '../components/SearchBar.vue';
import HomeCard from '../components/HomeCard.vue';
import MobileSearchView from './MobileSearchVIew.vue';
import SuccessModal from '../components/SuccessModal.vue';
import rawCardData from '../assets/Home/HomeCardData.jsonc?raw';
import { useScreenHelpers } from '../composables/useScreenHelpers.js';
import { parse } from 'jsonc-parser';

const route = useRoute();
const router = useRouter();

const CardData = parse(rawCardData);
const showMobileSearch = ref(false);
const showSuccessModal = ref(false);
const modalSuccess = ref(false);

const successTitle = ref('');
const successDescription = ref('');
const errorTitle = ref('');
const errorDescription = ref('');

const { isSmallScreen } = useScreenHelpers(400);

const handleFocus = () => {
  if (isSmallScreen.value) {
    showMobileSearch.value = true;
  }
};

const handleMobileSearchClose = () => {
  window.scrollTo(0, 0);
  showMobileSearch.value = false;
};

const handleModalClose = () => {
  showSuccessModal.value = false;
  router.replace({ path: route.path, query: {} });
};

const goToStripe = () => {
  if (import.meta.env.VITE_LOCAL_SERVER.toLowerCase() === "true") {
    // Using localhost
    PUBLISHABLE_KEY = "pk_test_51RjOnVDZIQV9zljKg256SEBxJNE0UfKEt1RTnpRQMkezM1ToyCjtsRwLlocMddSAslP3YdBdmuHz2jsumSdADecQ00t7vUot9H";
  } else {
    //using actual api
    PUBLISHABLE_KEY = "pk_live_51RjOnVDZIQV9zljKrZcab3BbagpvKcjCJRhPF1XPlcH2xpp4ylXeMgKUj60w4CvdH3B4EvcxKl1cqgWW7oCiQwwU00p3v300xs";
  }

  console.log("COOL");

  window.open('https://paypal.me/MichaelLTotaro?country.x=US&locale.x=en_US', '_blank');
};

const handleCardClick = (card) => {
  if (card.icon === 'cash') {
    goToStripe();
  }
};

onMounted(() => {
  window.scrollTo(0, 0);

  const status = route.query.status;

  if (status === 'success-payment') {
    modalSuccess.value = true;
    successTitle.value = 'Payment Successful!';
    successDescription.value = "Thanks for the tip! It's greatly appreciated!";
  } else if (status === 'cancel-payment') {
    modalSuccess.value = false;
    errorTitle.value = 'Payment Canceled';
    errorDescription.value = 'No charges were made. You canceled the payment process.';
  }

  if (status === 'success-payment' || status === 'cancel-payment') {
    showSuccessModal.value = true;
  }

  //http://localhost:5173/?status=success-payment
  //http://localhost:5173/?status=cancel-payment
});

</script>



<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.title {
  font-size: 2.5rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-word {
  color: #60A5FA;
}

.search-wrapper {
  width: 100%;
  display: flex;
  margin-top: -20px;
  justify-content: center;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
  margin-bottom: 100px;
  max-width: 1200px;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #0f172a;
}

.dark .title {
  color: #94A3B8;
}

.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(2px);
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
}

@media (max-width: 400px) {
  .title {
    margin-top: 18px;
    font-size: 1.75rem;
  }
}

</style>
