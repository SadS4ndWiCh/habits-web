import { api } from "./axios";

export const getSummary = async () => {
	const { data } = await api.get('/summary');

	return data;
}

export const getDayHabitsList = async (date: Date) => {
	const { data } = await api.get('/day', { params: { date: date.toISOString() } });

	return data;
}

export const toggleHabitCompleted = async (habitId: string) => {
	await api.patch(`/habits/${habitId}/toggle`);
}

export const createNewHabit = async (title: string, weekDays: number[]) => {
	if (!title || weekDays.length === 0) return;

	return await api.post('/habits', { title, weekDays });
}