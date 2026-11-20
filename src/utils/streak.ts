import { format, subDays, startOfWeek } from "date-fns";
import { Article } from "@/types/article";

const dayKey = (d: Date) => format(d, 'yyyy-MM-dd');
const weekKey = (d: Date) => dayKey(startOfWeek(d, { weekStartsOn: 1 }));

export function getStreak(articles: Article[]): number {
    const readDays = new Set(
        articles
            .filter((a): a is Article & { dateRead: string } => a.dateRead !== null)
            .map((a) => dayKey(new Date(a.dateRead)))
    );
    const usedFreezeWeeks =  new Set<string>();
    let streak = 0;
    let day = new Date();
    if (!readDays.has(dayKey(day))) day = subDays(day, 1);
    while (true) {
        const currentDay = dayKey(day);
        if (readDays.has(currentDay)) {
            streak += 1;
        } else {
            const currentWeek = weekKey(day);
            if (!usedFreezeWeeks.has(currentWeek)) {
                usedFreezeWeeks.add(currentWeek);
            } else {
                break;
            }
        }
        day = subDays(day, 1);
    }
    return streak;
}