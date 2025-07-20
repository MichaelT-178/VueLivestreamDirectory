import { ref } from 'vue'
import axiosInstance from '../lib/axios'

const user = ref(null)

export const useUser = () => {
  async function fetchUserData() {
    try {
      const { data } = await axiosInstance.get('/lessons/me', {
        withCredentials: true,
        headers: {
          "X-API-SECRET": "jkafhauiyFhjvbIU(8noiasfBU(Z))" //This isn't sensitive. This is the only use.
        }
      });

      user.value = data;
    } catch (err) {
      console.warn('Failed to fetch user', err);
      user.value = null;
    }
  }

  return { user, fetchUserData };
}
