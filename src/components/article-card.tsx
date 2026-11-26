import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Article } from '@/types/article';

type ArticleCardProps = {
    article: Article;
    index: number;
    onPress: () => void;
    onLongPress: () => void;
};

export function ArticleCard({ article, index, onPress, onLongPress }: ArticleCardProps) {
    const unread = !article.dateRead;

    return (
        <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.wrapper}>
            {unread &&
                <View style={styles.paper} />
            }
            <View style={styles.tab}/>
            <View style={styles.body}>
                <Text style={{ color: 'white', }}>{article.title}</Text>
                <Text style={{ color: 'white', }}>{article.dateRead}</Text>
            </View>
        </Pressable>
    );
}

const TAB_HEIGHT = 22;

const styles = StyleSheet.create({
    wrapper: {
        marginTop: -44,
        paddingTop: TAB_HEIGHT,
    },
    paper: {
        position: 'absolute',
        top: 12,
        left: 96,
        right: 20,
        height: 30,
        backgroundColor: '#BDBDBD',
    },
    tab: {
        position: 'absolute',
        top: 0,
        left: 16,
        width: 80,
        backgroundColor: 'blue',
        height: TAB_HEIGHT + 6,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    body: {
        minHeight: 110,
        borderRadius: 14,
        backgroundColor: 'navy',
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: -2 },
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
    },
});