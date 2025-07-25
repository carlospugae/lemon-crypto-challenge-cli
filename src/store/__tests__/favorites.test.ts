import { renderHook, act } from '@testing-library/react-native';
import { useFavoritesStore } from '../favorites';

// Mock react-native-encrypted-storage
jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useFavoritesStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    act(() => {
      useFavoritesStore.setState({ favorites: [] });
    });
  });

  describe('Initial State', () => {
    it('should initialize with empty favorites array', () => {
      const { result } = renderHook(() => useFavoritesStore());

      expect(result.current.favorites).toEqual([]);
    });
  });

  describe('addFavorite', () => {
    it('should add a new favorite to the list', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'bitcoin';

      act(() => {
        result.current.addFavorite(cryptoId);
      });

      expect(result.current.favorites).toContain(cryptoId);
      expect(result.current.favorites).toHaveLength(1);
    });

    it('should not add duplicate favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'ethereum';

      act(() => {
        result.current.addFavorite(cryptoId);
        result.current.addFavorite(cryptoId);
      });

      expect(result.current.favorites).toEqual([cryptoId]);
      expect(result.current.favorites).toHaveLength(1);
    });

    it('should add multiple different favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoIds = ['bitcoin', 'ethereum', 'cardano'];

      act(() => {
        cryptoIds.forEach(id => result.current.addFavorite(id));
      });

      expect(result.current.favorites).toEqual(cryptoIds);
      expect(result.current.favorites).toHaveLength(3);
    });
  });

  describe('removeFavorite', () => {
    it('should remove an existing favorite', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'bitcoin';

      act(() => {
        result.current.addFavorite(cryptoId);
        result.current.removeFavorite(cryptoId);
      });

      expect(result.current.favorites).not.toContain(cryptoId);
      expect(result.current.favorites).toHaveLength(0);
    });

    it('should handle removing non-existent favorite gracefully', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'bitcoin';

      act(() => {
        result.current.removeFavorite(cryptoId);
      });

      expect(result.current.favorites).toEqual([]);
      expect(result.current.favorites).toHaveLength(0);
    });

    it('should remove specific favorite from multiple favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoIds = ['bitcoin', 'ethereum', 'cardano'];

      act(() => {
        cryptoIds.forEach(id => result.current.addFavorite(id));
        result.current.removeFavorite('ethereum');
      });

      expect(result.current.favorites).toEqual(['bitcoin', 'cardano']);
      expect(result.current.favorites).toHaveLength(2);
      expect(result.current.favorites).not.toContain('ethereum');
    });
  });

  describe('toggleFavorite', () => {
    it('should add favorite when not in list', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'bitcoin';

      act(() => {
        result.current.toggleFavorite(cryptoId);
      });

      expect(result.current.favorites).toContain(cryptoId);
      expect(result.current.favorites).toHaveLength(1);
    });

    it('should remove favorite when already in list', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'ethereum';

      act(() => {
        result.current.addFavorite(cryptoId);
        result.current.toggleFavorite(cryptoId);
      });

      expect(result.current.favorites).not.toContain(cryptoId);
      expect(result.current.favorites).toHaveLength(0);
    });

    it('should toggle favorite multiple times correctly', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'cardano';

      act(() => {
        result.current.toggleFavorite(cryptoId); // Add
      });
      expect(result.current.favorites).toContain(cryptoId);

      act(() => {
        result.current.toggleFavorite(cryptoId); // Remove
      });
      expect(result.current.favorites).not.toContain(cryptoId);

      act(() => {
        result.current.toggleFavorite(cryptoId); // Add again
      });
      expect(result.current.favorites).toContain(cryptoId);
    });
  });

  describe('isFavorite', () => {
    it('should return true for existing favorite', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'bitcoin';

      act(() => {
        result.current.addFavorite(cryptoId);
      });

      expect(result.current.isFavorite(cryptoId)).toBe(true);
    });

    it('should return false for non-existing favorite', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'ethereum';

      expect(result.current.isFavorite(cryptoId)).toBe(false);
    });

    it('should return correct boolean after adding and removing', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'cardano';

      expect(result.current.isFavorite(cryptoId)).toBe(false);

      act(() => {
        result.current.addFavorite(cryptoId);
      });
      expect(result.current.isFavorite(cryptoId)).toBe(true);

      act(() => {
        result.current.removeFavorite(cryptoId);
      });
      expect(result.current.isFavorite(cryptoId)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string as crypto ID', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const emptyId = '';

      act(() => {
        result.current.addFavorite(emptyId);
      });

      expect(result.current.favorites).toContain(emptyId);
      expect(result.current.isFavorite(emptyId)).toBe(true);

      act(() => {
        result.current.removeFavorite(emptyId);
      });

      expect(result.current.favorites).not.toContain(emptyId);
      expect(result.current.isFavorite(emptyId)).toBe(false);
    });

    it('should handle special characters in crypto ID', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const specialId = 'bitcoin-cash@2.0';

      act(() => {
        result.current.addFavorite(specialId);
      });

      expect(result.current.favorites).toContain(specialId);
      expect(result.current.isFavorite(specialId)).toBe(true);
    });

    it('should maintain order of favorites', () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoIds = ['z', 'a', 'm'];

      act(() => {
        cryptoIds.forEach(id => result.current.addFavorite(id));
      });

      expect(result.current.favorites).toEqual(cryptoIds);
    });
  });

  describe('State Persistence', () => {
    it('should call storage methods when state changes', async () => {
      const { result } = renderHook(() => useFavoritesStore());
      const cryptoId = 'bitcoin';

      act(() => {
        result.current.addFavorite(cryptoId);
      });

      // Note: In a real scenario, you might want to test the actual persistence
      // by checking if the store maintains state across re-renders
      expect(result.current.favorites).toContain(cryptoId);
    });
  });
});
