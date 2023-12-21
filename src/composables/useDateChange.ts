import { ref, watch } from 'vue';
import type { Ref } from 'vue';

interface DateItem {
	$d: Date;
}
export function useDateChange() {
	const date: Ref<DateItem[] | null> = ref(null);
	const dateStart = ref<Date | null | string>();
	const dateEnd = ref<Date | null | string>();
	const days = ref<number>();

	// @ts-ignore
	watch(date, (value: DateItem[]) => {
		if (value) {
			dateStart.value = value[0].$d;
			dateEnd.value = value[1].$d;
		}

		let differenceInMilliseconds;
		if (dateStart.value && dateEnd.value) {
			differenceInMilliseconds = Math.abs(
				(dateStart.value as Date).getTime() - (dateEnd.value as Date).getTime()
			);
		}

		// Разница в днях
		const differenceInDays = Math.ceil(
			differenceInMilliseconds
				? differenceInMilliseconds / (1000 * 60 * 60 * 24)
				: 0
		);

		days.value = differenceInDays;
	});

	return {
		date,
		dateStart,
		dateEnd,
		days,
	};
}
