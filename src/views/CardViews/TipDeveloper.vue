<template>
  <div>
    <p>Tip the DEVELOPER</p>
    <img :src="PayPalPicture" alt="PayPal" />
    <img :src="VenmoPicture" alt="Venmo" />
    <img :src="StripePicture" alt="Stripe" />
  </div>
</template>

<script setup>
import PayPalPicture from '../../assets/payments/paypal.jpg';
import VenmoPicture from '../../assets/payments/venmo.jpg';
import StripePicture from '../../assets/payments/stripe.jpg';
</script>

<style scoped>
img {
  width: 200px;
  margin: 10px;
}
</style>
