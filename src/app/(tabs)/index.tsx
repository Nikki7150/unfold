import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { isSameDay } from 'date-fns';
import { useArticleStore } from '@/store/useArticleStore';
import { getTodaysPick, pickArticle } from '@/utils/pickArticle';
import { useOpenArticle } from '@/hooks/useOpenArticle';

export default function HomeScreen() {
  const setPicked = useArticleStore((s) => s.setPicked);
  const articles = useArticleStore((s) => s.articles);
  const openArticle = useOpenArticle();
  const todaysPick = getTodaysPick(articles);
  const hasUnread = articles.some((a) => !a.dateRead);
  const readToday = articles.some(
    (a) => a.dateRead && isSameDay(new Date(a.dateRead), new Date())
  );

  function handlePick() {
    const chosen = pickArticle(articles);
    if (chosen) setPicked(chosen.id);
  }

  let content;
  if (todaysPick) {
    content = (
      <>
        <Text>Today's read</Text>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>{todaysPick.title}</Text>
        <Pressable onPress={() => openArticle(todaysPick)}>
          <Text>Read it</Text>
        </Pressable>
      </>
    );
  } // else if (readToday) {
  //   content = <Text>You've read today's article. See you tomorrow!</Text>;
  // } 
    else if (!hasUnread) {
    if (articles.length !== 0) {
      content = <Text>Nothing saved yet</Text>;
    } else {
      content = <Text>You've read everything</Text>;
    }
  } else {
    content = (
      <Pressable onPress={handlePick}>
        <Text>Pick today's read</Text>
      </Pressable>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
