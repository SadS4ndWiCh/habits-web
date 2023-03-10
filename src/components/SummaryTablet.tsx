import { useQuery } from "react-query";
import dayjs from "dayjs";

import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { getSummary } from "../libs/api";

import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minSummaryDatesSize - summaryDates.length;

type Summary = {
	id: string;
	date: string;
	amount: number;
	completed: number;
}[]

export const SummaryTable = () => {
	const { data: summary = [] } = useQuery<Summary>('summary', getSummary);

	return (
		<div className="w-full flex">
			<div className="grid grid-rows-7 grid-flow-row gap-3">
				{ weekDays.map((weekDay, i)=> (
					<div
						key={`${weekDay}-${i}`}
						className="text-zinc-400 font-bold text-xl w-10 h-10 flex items-center justify-center"
					>
						{ weekDay }
					</div>
				)) }
			</div>

			<div className="grid grid-rows-7 grid-flow-col gap-3">
				{ summary.length > 0 && summaryDates.map(date => {
					const dayInSummary = summary
						.find(day => dayjs(date).isSame(day.date, 'day'));

					return (
						<HabitDay
							key={date.toString()}
							date={date}
							amount={dayInSummary?.amount}
							defaultCompleted={dayInSummary?.completed}
						/>
					)
				}) }

				{ amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
					<div
						key={i}
						className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
					/>
				)) }
			</div>
		</div>
	)
}