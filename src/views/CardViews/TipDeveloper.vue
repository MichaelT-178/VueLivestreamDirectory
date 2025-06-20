<template>
  <div class="tip-container">
    <HeaderWithIcon
      title="Tip the Developer"
      icon="cash"
      iconColor="green"
    />

    <div class="payment-card" 
         v-for="payment in payments" 
         :key="payment.name"
         @click="goToPayment(payment)"
         style="cursor: pointer;"
    >
      <img
        :src="getPaymentImagePath(payment.name)"
        :alt="payment.name"
        class="payment-image"
      />
      <div class="payment-info">
        <p><strong>{{ payment.name }}</strong></p>
        <p class="description">{{ payment.description }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import PaymentData from '../../assets/payments/PaymentData.json';
import { ref } from 'vue';

const payments = ref(PaymentData.payments);

const getPaymentImagePath = (name) => {
  return new URL(`../../assets/payments/${name.toLowerCase()}.jpg`, import.meta.url).href;
};

const goToPayment = (payment) => {
  if (payment.link) {
    window.open(payment.link, '_blank');
  }
};

</script>


<style scoped>
.tip-container {
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.payment-card {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #1f2937;
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
  transition: background-color 0.3s ease;
}

.payment-card:hover {
  background-color: #374151;
}

.payment-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}

.payment-info p {
  margin: 0.25rem 0;
}

.description {
  font-size: 0.9rem;
  color: #ccc;
  margin: 0;
}

</style>
