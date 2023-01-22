import { HTMLProps } from 'react';
import { Check } from 'phosphor-react';
import clsx from 'clsx';

import * as RCheckbox from '@radix-ui/react-checkbox';

interface RootProps extends RCheckbox.CheckboxProps {}

export const Root = ({ children, ...rest }: RootProps) => {
	return (
		<RCheckbox.Root
			className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
			{ ...rest }
		>
			<div
				className='w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background'
			>
				<RCheckbox.Indicator>
					<Check
						size={20}
						weight='bold'
						className='text-white'
					/>
				</RCheckbox.Indicator>
			</div>

			{ children }
		</RCheckbox.Root>
	)
}

interface LabelProps extends HTMLProps<HTMLSpanElement> {
	lineThrough?: boolean;
}

export const Label = ({ children, lineThrough = false, ...rest }: LabelProps) => {
	return (
		<span
			className={clsx('font-semibold text-xl text-white leading-tight', {
				'group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400': lineThrough
			})}
			{ ...rest }
		>
			{ children }
		</span>
	)
}