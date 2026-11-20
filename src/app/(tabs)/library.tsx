import { FlatList, Text, View, StyleSheet, Alert, Pressable } from 'react-native';
import { useArticleStore } from '@/store/useArticleStore';
import { formatDistanceToNow} from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import { Article } from '@/types/article';

import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useOpenArticle } from '@/hooks/useOpenArticle';

export default function LibraryScreen() {
  const articles = useArticleStore((s) => s.articles);
  const markAsRead = useArticleStore((s) => s.markAsRead);
  const openArticle = useOpenArticle();

  const sortedArticles = [...articles].sort((a, b) => 
    b.dateAdded.localeCompare(a.dateAdded)
  );

  return (
    <View style={{ flex: 1, paddingTop: 60 }}>
      <FlatList
        data={sortedArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => openArticle(item)}>
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
              <Text style={{ color: '#666', marginTop: 4 }}>
                Added {formatDistanceToNow(new Date(item.dateAdded), { addSuffix: true })}
              </Text>
              {item.dateRead && (
                <Text>Read</Text>
              )}
              {item.note && (
                <Text>{item.note}</Text>
              )}
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text>Nothing saved yet. Share some Substack articles!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
