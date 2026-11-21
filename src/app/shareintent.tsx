import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useShareIntentContext } from 'expo-share-intent';
import { getArticleDetails } from '@/utils/getArticleDetails';
import { useArticleStore } from '@/store/useArticleStore';

export default function ShareIntentScreen() {
    const router = useRouter();
    const { shareIntent, resetShareIntent } = useShareIntentContext();
    const addArticle = useArticleStore((s) => s.addArticle);
    const hasUrl = useArticleStore((s) => s.hasUrl);

    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!shareIntent.webUrl) return;
        const sharedUrl = shareIntent.webUrl;
        async function fetchDetails() {
            const fetchedTitle = await getArticleDetails(sharedUrl);
            setTitle(fetchedTitle.title || fetchedTitle.url);
            setUrl(fetchedTitle.url);
            setImageUrl(fetchedTitle.imageUrl);
            setLoading(false);
        }
        fetchDetails();
    }, [shareIntent.webUrl]);

    function goHome() {
        resetShareIntent();
        router.replace('/');
    }

    function handleAdd() {
        if (!title || !url) return;
        console.log("IMAGE:", imageUrl);
        addArticle({ title, url, imageUrl });
        goHome();
    }

    if (loading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
            <Text>Fetching article details...</Text>
        </View>
        );
    }

    if (url && hasUrl(url)) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text>This article is already in your collection. </Text>
                <Pressable onPress={goHome}><Text>Go Home</Text></Pressable>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text>{title}</Text>
            <Text>{url}</Text>
            <Pressable onPress={handleAdd}><Text>Add to Collection</Text></Pressable>
            <Pressable onPress={goHome}><Text>Cancel</Text></Pressable>
        </View>
    );
}