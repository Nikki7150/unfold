import { isSameDay, differenceInCalendarDays } from "date-fns";
import { Article } from "@/types/article";

export function getTodaysPick(articles: Article[]): Article | null {
    const now = new Date();
    const todaysPick = articles.find(
        (article) => 
            !article.dateRead && 
        article.datePicked &&
        isSameDay(new Date(article.datePicked), now)
    );
    if (todaysPick) {
        return todaysPick;
    } else { return null; }
}

export function pickArticle (articles: Article[]): Article | null {
    const now = new Date();
    const unreadCandidates = articles.filter((article) => !article.dateRead);
    if (unreadCandidates.length === 0) {
        return null;
    }
    const eligible: Article[] = [];
    const coolingDown: Article[] = [];
    for (const article of unreadCandidates) {
        if (!article.datePicked) {
            eligible.push(article);
        } else {
            const daysSincePicked = differenceInCalendarDays(now, new Date(article.datePicked));
            if (daysSincePicked >= 3) {
                eligible.push(article);
            } else {
                coolingDown.push(article);
            }
        }
    }
    if (eligible.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligible.length);
        return eligible[randomIndex];
    }
    const sortedByOldest = [...coolingDown].sort((a, b) => {
        const timeA = new Date(a.datePicked!).getTime();
        const timeB = new Date(b.datePicked!).getTime();
        return timeA - timeB;
    });
    return sortedByOldest[0];
}