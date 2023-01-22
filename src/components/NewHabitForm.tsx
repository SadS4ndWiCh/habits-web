import { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import { Check } from "phosphor-react";

import { createNewHabit } from "../libs/api";
import { toggleArrayInsertion } from "../utils/toggle-array-insertion";

import * as Checkbox from "./Checkbox";

const availableWeekDays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
];

export const NewHabitForm = () => {
	const [title, setTitle] = useState('');
	const [weekDays, setWeekDays] = useState<number[]>([]);

	const { mutateAsync: handleCreateNewHabit } = useMutation(_ => createNewHabit(title, weekDays), {
		async onMutate() {
			setTitle('');
			setWeekDays([]);
		}
	})

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		handleCreateNewHabit()
	}

	const handleToggleWeekDay = (weekDay: number) => {
		setWeekDays(toggleArrayInsertion(weekDay, weekDays));
	}

	return (
		<form
			onSubmit={onSubmit}
			className="w-full flex flex-col mt-6"
		>
			<label
				htmlFor="title"
				className="font-semibold leading-tight">
				Qual seu comprometimento?
			</label>

			<input
				type="text"
				id="title"
				placeholder="ex. Exercício, dormir bem, etc..."
				autoFocus
				required
				value={title}
				onChange={event => setTitle(event.target.value)}
				className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
			/>

			<label className="font-semibold leading-tight mt-4">
				Qual a recorrência?
			</label>

			<div className="flex flex-col gap-2 mt-3">
				{ availableWeekDays.map((weekDay, i) => (
					<Checkbox.Root
						key={weekDay}
						checked={weekDays.includes(i)}
						onCheckedChange={() => handleToggleWeekDay(i)}
					>
						<Checkbox.Label>
							{ weekDay }
						</Checkbox.Label>
					</Checkbox.Root>
				)) }
			</div>

			<button
				type="submit"
				className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
			>
				<Check size={20} weight="bold"/>
				Confirmar
			</button>
		</form>
	)
}