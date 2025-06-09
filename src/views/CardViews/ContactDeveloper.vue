<template>
  <div class="contact-container">

    <div class="form-wrapper">
      <h1>Contact The Developer</h1>
      <p class="intro-text">Feel free to message me and I'll try to respond as soon as possible!</p>

      <div class="form-group">
        <label for="name" class="form-label">
          Your Name <span class="required">*</span>
        </label>
        <input
          autocomplete="off"
          type="text"
          id="name"
          v-model="userName"
          placeholder="Enter your name"
        />
      </div>

      <div class="form-group">
        <label for="email" class="form-label">
          Your Email <span class="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          v-model="userEmail"
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="message" class="form-label">
          Message <span class="required">*</span>
        </label>
        <textarea
          id="message"
          v-model="userMessage"
          placeholder="Enter your message"
        ></textarea>
      </div>

      <button
        type="submit"
        class="send-email-btn"
        @click="submitForm"
        :disabled="!isFormValid"
        :class="{
          valid: isFormValid && !isButtonClicked,
          clicked: isButtonClicked,
          default: !isFormValid && !isButtonClicked
        }"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';

const userName = ref('');
const userEmail = ref('');
const userMessage = ref('');
const isButtonClicked = ref(false);
const buttonText = ref('Submit');

emailjs.init('bCe2UFI1L7SfXITtA');

const isFormValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return userName.value.trim() !== '' &&
         userEmail.value.match(emailRegex) &&
         userMessage.value.trim() !== '';
});

const submitForm = () => {
  if (!isFormValid.value) return;

  isButtonClicked.value = true;
  buttonText.value = 'Sending...';

  const templateParams = {
    subject: "New message from Livestream Directory",
    website: "Livestream Directory",
    from_name: userName.value,
    from_email: `Email: ${userEmail.value}`,
    message: userMessage.value
  };

  emailjs.send('service_feq974e', 'template_cowiwh7', templateParams)
    .then(() => {
      Swal.fire('Sent!', 'Your message has been sent successfully!', 'success');
      userName.value = '';
      userEmail.value = '';
      userMessage.value = '';
    })
    .catch((err) => {
      Swal.fire('Error!', 'Something went wrong when sending your message! See console.', 'error');
      console.error('Failed to send email:', err);
    })
    .finally(() => {
      isButtonClicked.value = false;
      buttonText.value = 'Submit';
    });
};

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.contact-container {
  /* background-color: #0F172A; */
  background-color: transparent;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-wrapper {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
  align-self: flex-start;
}

.form-wrapper {
  background: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
  color: white;
}

h1 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.intro-text {
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
  color: #cbd5e1;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.required {
  color: #ef4444;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1.5px solid #94a3b8;
  background-color: #0f172a;
  color: white;
  font-size: 0.95rem;
  box-sizing: border-box;
}

input::placeholder,
textarea::placeholder {
  color: #94a3b8;
}

textarea {
  min-height: 160px;
  resize: vertical;
}

.send-email-btn {
  width: 100%;
  font-size: 1rem;
  padding: 0.85rem;
  border-radius: 8px;
  border: none;
  transition: background-color 0.25s ease;
  color: white;
  font-weight: bold;
}

/* States */
.send-email-btn.default {
  background-color: gray;
  cursor: not-allowed;
}

.send-email-btn.valid {
  background-color: #3b82f6;
  cursor: pointer;
}

.send-email-btn.valid:hover {
  background-color: #2563eb;
}

.send-email-btn.clicked {
  background-color: #10b981;
  cursor: wait;
}

@media (max-width: 400px) {
  .contact-container {
    padding: 2rem 0.5rem;
  }

  .form-wrapper {
    padding: 0.75rem;
  }
}

</style>
