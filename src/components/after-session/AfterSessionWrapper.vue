<template>
	<div class="session-wrapper">
		<AfterSessionFirst medicine="medicine" />
		<AfterSessionUnit />
		<div>
			<div>Номера сеансов</div>
			<a-checkbox-group
				:options="numbersSit"
				v-model:value="newSession.sitNumbers"
			/>
		</div>
		<div>
			<div>Начало приема - Конец приема</div>
			<div class="date-range">
				<a-range-picker v-model:value="date" />
				<span v-if="newSession.sitNumbers.length"
					>количесвто сеансов {{ newSession.sitNumbers.length }}</span
				>
			</div>
		</div>
		<div>
		<a-button @click="generate">Оформить</a-button>
	</div>
		<AfterSessionTable />
	</div>
</template>

<script setup lang="ts">
	import AfterSessionFirst from '@/components/after-session/AfterSessionFirst.vue';
	import AfterSessionUnit from '@/components/after-session/AfterSessionUnit.vue';
	import AfterSessionTable from '@/components/after-session/AfterSessionTable.vue';
	import { watch } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { notification } from 'ant-design-vue';
	import { useDateChange } from '@/composables/useDateChange';

	const store = useSessionStore();
	const { newSession, steps } = storeToRefs(store);
	const numbersSit = [1, 2, 3, 4, 5, 6, 7, 8];

	const { date, dateStart, dateEnd, days } = useDateChange();

	// handlers

	const generate = () => {
		const resp = store.generateAfterSession();
		const data = {
			medicine: newSession.value.medicine,
			path: newSession.value.path,
			dozirovka: newSession.value.dozirovka,
			dateStart: (newSession.value.dateStart as Date)
				?.toISOString()
				.split('T')[0],
			dateEnd: (newSession.value.dateEnd as Date)?.toISOString().split('T')[0],
			sitNumbers: newSession.value.sitNumbers.join(', '),
			days: newSession.value.days,
		};

		if (resp === true) {
			newSession.value.tableData.push(data);
			newSession.value.medicine = '';
			newSession.value.path = '';
			newSession.value.dozirovka = '';
			newSession.value.sitNumbers = [];
			newSession.value.dateStart = null;
			newSession.value.dateEnd = null;
			newSession.value.days = 0;
			steps.value = 3;
		} else {
			notification['error']({
				message: 'Запомните все поля',
			});
		}
	};

	watch(
		// @ts-ignore
		[dateStart, dateEnd, days],
		([dateStart, dateEnd, days]: [Date, Date, number]) => {
			newSession.value.dateStart = dateStart;
			newSession.value.dateEnd = dateEnd;
			newSession.value.days = days;
		}
	);
</script>

<style lang="scss">
	:where(.css-dev-only-do-not-override-1gohep9)[class^='ant-checkbox']
		[class^='ant-checkbox'],
	:where(.css-dev-only-do-not-override-1gohep9)[class^='ant-checkbox']
		[class*=' ant-checkbox'] {
		padding: 10px;
		border: 1px solid #00b96b;
		color: black;
		font-weight: 700;

		&.ant-checkbox-wrapper-checked {
			background-color: #00b96b;
		}
	}

	.ant-checkbox {
		display: none;
	}
	.ant-checkbox-group {
		gap: 8px !important;
	}
	:where(.css-dev-only-do-not-override-1gohep9).ant-table-wrapper
		.ant-table-pagination.ant-pagination {
		display: none;
	}

	.date-range {
		display: flex;
		align-items: center;
		gap: 15px;
	}
</style>
