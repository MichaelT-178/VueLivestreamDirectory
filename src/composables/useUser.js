import { ref, onMounted } from 'vue'

const user = ref(null)

export const useUser = () => {

  async function fetchUserData() {
    try {
      const API_LINK = import.meta.env.VITE_API_LINK;

      const response = await fetch(`${API_LINK}/me`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Not logged in');
      }

      user.value = await response.json();
    } catch (err) {
      console.warn('Failed to fetch user', err);
    }
  }

  onMounted(fetchUserData);

  return { user }

}
