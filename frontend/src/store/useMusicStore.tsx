import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { Album, Song } from '@/types';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null,
    featuredSongs: Song[],
    madeForYouSongs: Song[],
    trendingSongs: Song[],

    fetchAlbums: () => Promise<void>,
    fetchAlbumById: (id: string) => Promise<void>
    fetchFeaturedSongs: () => Promise<void>,
    fetchMadeForYou: () => Promise<void>,
    fetchTrendingSongs: () => Promise<void>,
}



export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],


    fetchAlbums: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data.albums });
            // console.log(response);


        } catch (error: any) {
            set({ error: error.response.data.message })
        } finally {
            set({
                isLoading: false,

            })
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data.album });
            // console.log(response);

        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/featured');
            set({ featuredSongs: response.data.songs });
            // console.log(response);
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false })
        }

    },
    fetchMadeForYou: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/made-for-you');
            set({ madeForYouSongs: response.data.songs });
            // console.log(response);
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false })
        }

    },
    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/songs/trending');
            set({ trendingSongs: response.data.songs });
            // console.log(response);
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false })
        }
    },

}))

