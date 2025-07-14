import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useSearchHistoryStore = defineStore('searchHistory', () => {
  const list = ref([]);

  const loadList = () => {
    const stored = JSON.parse(localStorage.getItem('searchHistory'));

    if (Array.isArray(stored)) {
      list.value = stored;
    }
  };

  loadList();

  function isValidItem(item) {
    return (
      item &&
      typeof item === 'object' &&
      typeof item.cleanedName === 'string' &&
      (item.type === 'Song' || item.type === 'Artist')
    );
  }

  function addItem(item) {
    if (!isValidItem(item)) return;

    const exists = list.value.some(
      entry => entry.cleanedName === item.cleanedName && entry.type === item.type
    );

    if (!exists) {
      list.value.push(item);
    }
  }

  function getList() {
    return list.value;
  }

  function clearList() {
    list.value = [];
    localStorage.removeItem('searchHistory');
  }

  function deleteItem(item) {
    list.value = list.value.filter(
      entry => entry.cleanedName !== item.cleanedName || entry.type !== item.type
    );
  }

  const allItems = computed(() => list.value);

  watch(
    list,
    (newList) => {
      localStorage.setItem('searchHistory', JSON.stringify(newList));
    },
    { deep: true }
  );

  return {
    list,
    addItem,
    getList,
    clearList,
    deleteItem,
    allItems
  };
});
