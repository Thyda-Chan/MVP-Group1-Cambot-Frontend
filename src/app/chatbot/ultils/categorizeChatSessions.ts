// utils/categorizeChatSessions.ts
import { ChatSession } from "../ultils/types";// Define your ChatSession type if not already defined

export const categorizeChatSessions = (sessions: ChatSession[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todaySessions = sessions.filter((session) => {
    const sessionDate = new Date(session.datetime);
    return sessionDate.toDateString() === today.toDateString();
  });

  const yesterdaySessions = sessions.filter((session) => {
    const sessionDate = new Date(session.datetime);
    return sessionDate.toDateString() === yesterday.toDateString();
  });

  const previous7DaysSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.datetime);
    const diffInDays = Math.floor(
      (today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffInDays > 1 && diffInDays <= 7;
  });

  return {
    today: todaySessions,
    yesterday: yesterdaySessions,
    previous7Days: previous7DaysSessions,
  };
};