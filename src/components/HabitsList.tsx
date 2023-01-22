import { useMutation, useQuery, useQueryClient } from 'react-query';
import dayjs from 'dayjs';

import { getDayHabitsList, toggleHabitCompleted } from '../libs/api';

import * as Checkbox from './Checkbox';

interface Props {
	date: Date;
	onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
	possibleHabits: {
		id: string;
		title: string;
		created_at: string;
	}[];

	completedHabits: string[];
}

export const HabitsList = ({ date, onCompletedChange }: Props) => {
	const queryClient = useQueryClient();
	const queryKey = ['habitsList', date.toISOString()];
	
	const { data: habitsInfo } = useQuery<HabitsInfo>(
		queryKey,
		() => getDayHabitsList(date)
	);

	const { mutateAsync: toggleCompleted } = useMutation(toggleHabitCompleted, {
		onSuccess() { queryClient.invalidateQueries(queryKey); }
	})

	const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

	const handleToggleHabit = async (habitId: string) => {
		toggleCompleted(habitId);

		const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

		let completedHabits: string[] = [];
		if (isHabitAlreadyCompleted) {
			completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
		} else {
			completedHabits = [...habitsInfo!.completedHabits, habitId];
		}

		onCompletedChange(completedHabits.length);
	}

	return (
		<>
			<div className='mt-6 flex flex-col gap-3'>
				{ habitsInfo?.possibleHabits.map(habit => (
					<Checkbox.Root
						key={habit.id}
						onCheckedChange={() => handleToggleHabit(habit.id)}
						checked={habitsInfo.completedHabits.includes(habit.id)}
						disabled={isDateInPast}
					>
						<Checkbox.Label lineThrough>
							{ habit.title }
						</Checkbox.Label>
					</Checkbox.Root>
				)) }
			</div>
		</>
	)
}