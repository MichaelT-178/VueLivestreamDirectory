import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useScreenHelpers(threshold = 400) {
  const isSmallScreen = ref(false);

  const updateScreenSize = () => {
    isSmallScreen.value = window.innerWidth <= threshold;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  onMounted(() => {
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    window.scrollTo(0, 0);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize);
  });

  return {
    isSmallScreen,
    scrollToTop,
  };
}
