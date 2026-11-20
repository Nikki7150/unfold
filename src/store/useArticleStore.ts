import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import { Article } from '@/types/article';

type ArticleState = {
    articles: Article[];
    addArticle: (input: { title: string; url: string }) => Article | null;
    hasUrl: (url: string) => boolean;
    markAsRead: (id: string, note?: string) => void;
    setPicked: (id: string) => void;
};

export const useArticleStore = create<ArticleState>()(
    persist(
        (set, get) => ({
            articles: [],
            hasUrl: (url: string) => {
                const normalized = url.trim().toLowerCase();
                return get().articles.some(
                    (article) => article.url.trim().toLowerCase() === normalized
                );
            },
            addArticle: ({ title, url }: { title: string; url: string }) => {
                if (get().hasUrl(url)) {
                    return null;
                }
                const newArticle: Article = {
                    id: randomUUID(),
                    url,
                    title,
                    dateAdded: new Date().toISOString(),
                    dateRead: null,
                    datePicked: null,
                    note: null,
                };
                set((state) => ({
                    articles: [...state.articles, newArticle],
                }));
                return newArticle;
            },
            markAsRead: (id: string, note?: string) => {
                const cleanNote = note?.trim() ? note.trim() : null;
                set((state) => ({
                    articles: state.articles.map((article) =>
                        article.id === id
                            ? { ...article, dateRead: new Date().toISOString(), note: cleanNote }
                            : article
                    ),
                }));
            },
            setPicked: (id: string) => 
                set((state) => ({
                    articles: state.articles.map((article) => 
                        article.id === id
                        ? { ...article, datePicked: new Date().toISOString() }
                        : article
                    ),
                })),
        }),
        {
            name: 'unfold-articles',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);