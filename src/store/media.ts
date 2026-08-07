import { create } from 'zustand';

interface SearchHookProps {
  genre: string | null;
  setGenre: (value: string | null) => void;
  sort: string;
  setSort: (value: string) => void;
}

export const useSearch = create<SearchHookProps>((set) => ({
  genre: null,
  sort: 'POPULARITY',
  setGenre: (genre) => set({ genre }),
  setSort: (sort) => set({ sort }),
}));