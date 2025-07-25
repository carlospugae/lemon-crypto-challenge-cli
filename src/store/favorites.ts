import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';

export type FavoritesState = {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const encryptedStorage: PersistStorage<FavoritesState> = {
  getItem: async name => {
    const value = await EncryptedStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await EncryptedStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async name => {
    await EncryptedStorage.removeItem(name);
  },
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (id: string) =>
        set(state => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),
      removeFavorite: (id: string) =>
        set(state => ({
          favorites: state.favorites.filter(fav => fav !== id),
        })),
      toggleFavorite: (id: string) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        isFavorite(id) ? removeFavorite(id) : addFavorite(id);
      },
      isFavorite: (id: string) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-cryptos',
      storage: encryptedStorage,
    },
  ),
);
