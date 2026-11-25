import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
    reminderHour: number,
    reminderMinute: number,
    setReminderTime: (hour: number, minute: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            reminderHour: 9,
            reminderMinute: 0,
            setReminderTime: (hour, minute) => 
                set({ reminderHour: hour, reminderMinute: minute }),
        }),
        {
            name: 'unfold-settings',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);