import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useArticleStore } from '@/store/useArticleStore';
import { Article } from '@/types/article';

export function useOpenArticle() {
    const markAsRead = useArticleStore((s) => s.markAsRead);
    return async function openArticle(article: Article) {
        await WebBrowser.openBrowserAsync(article.url);
        if (article.dateRead) return;
        Alert.prompt(
            'Finished this one?',
            'Your notes (Optional): ',
            [
                {
                    text: 'Not yet',
                    style: 'cancel'
                },
                {
                    text: 'Mark As Read',
                    onPress: (note?: string) => markAsRead(article.id, note)
                },
            ]
        );
    };
}