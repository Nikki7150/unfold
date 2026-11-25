import { View, Text } from 'react-native';
import { useArticleStore } from '@/store/useArticleStore';
import { getStreak } from '@/utils/streak';

export default function ProfileScreen() {
    const articles = useArticleStore((s) => s.articles);

    const streak = getStreak(articles);
    // TODO 1: how many articles have you read in total?
    // TODO 2: how many are saved but still unread?

    return (
        <View style={{ flex: 1, paddingTop: 80, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '700' }}>You</Text>

        <Text>Current streak: {streak}</Text>
        {/* TODO: show your two new numbers here */}

        {/* Later: reminder time setting goes here */}
        </View>
    );
}