import { ref, onMounted } from 'vue';
import axiosInstance from '../lib/axios';

const user = ref(null);

export const useUser = () => {
  async function fetchUserData() {
    try {
      const { data } = await axiosInstance.get('/lessons/me', {
        withCredentials: true,
      });

      user.value = data;
    } catch (err) {
      console.warn('Failed to fetch user', err);
    }
  }

  onMounted(fetchUserData);

  return { user };
};
