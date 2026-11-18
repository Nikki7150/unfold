import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useArticleStore } from '@/store/useArticleStore';

import { MaxContentWidth, Spacing } from '@/constants/theme';

export default function LibraryScreen() {
  const articles = useArticleStore((s) => s.articles);

  // TODO 1: make a list sorted newest first (by dateAdded)

  return (
    <View style={{ flex: 1, paddingTop: 60 }}>
      <FlatList
        data={/* your sorted list */ articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            {/* TODO 2: show the title, and under it something like "Added 2 days ago" */}
          </View>
        )}
        ListEmptyComponent={
          <Text>Nothing Saved Yet. Share some Substack articles!</Text>
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
