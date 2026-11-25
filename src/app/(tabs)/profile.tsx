import { View, Text } from 'react-native';
import { useArticleStore } from '@/store/useArticleStore';
import { getStreak } from '@/utils/streak';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function ProfileScreen() {
    const articles = useArticleStore((s) => s.articles);

    const streak = getStreak(articles);
    const totalRead = articles.filter((article) => article.dateRead).length;
    const savedUnread = articles.filter((article) => !article.dateRead).length;

    const reminderHour = useSettingsStore((s) => s.reminderHour);
    const reminderMinute = useSettingsStore((s) => s.reminderMinute);
    const setReminderTime = useSettingsStore((s) => s.setReminderTime);
    const pickerValue = new Date();
    pickerValue.setHours(reminderHour, reminderMinute, 0, 0);

    return (
        <View style={{ flex: 1, paddingTop: 80, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: '700' }}>Profile</Text>
        <Text>Current streak: {streak}</Text>
        <Text>Articles read: {totalRead}</Text>
        <Text>Saved but unread: {savedUnread}</Text>
        <Text>Daily Reminder</Text>
        <DateTimePicker
            value={pickerValue}
            mode='time'
            display='compact'
            onValueChange={(event, date) => {
                if (date) {
                    setReminderTime(date.getHours(), date.getMinutes());
                }
            }}
        />
        </View>
    );
}
