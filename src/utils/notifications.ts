import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function requestNotificationPermission(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') {
        return true;
    }
    const { status } = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
        },
    });
    return status === 'granted';
}

export async function scheduleDailyReminder(
    hour: number,
    minute: number,
    title = 'Daily Reminder',
    body = "Don't forget to get your daily substack read in.",
): Promise<string> {
    return await Notifications.scheduleNotificationAsync({
        identifier: 'daily-reminder',
        content: {
            title, 
            body, 
            sound: true,
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour, 
            minute,
        },
    });
}