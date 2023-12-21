<template>
	<a-table
		v-if="newSession.tableData"
		:columns="columns"
		:data-source="newSession.tableData"
	></a-table>
</template>

<script setup lang="ts">
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);
	const columns = [
		{
			title: 'Лекарственные препараты',
			dataIndex: 'medicine',
			key: 'medicine',
		},
		{
			title: 'Путь приема',
			dataIndex: 'path',
			key: 'path',
		},
		{
			title: 'дозировка',
			dataIndex: 'dozirovka',
			key: 'dozirovka',
		},
		{
			title: 'Начало приема',
			dataIndex: 'dateStart',
			key: 'dateStart',
		},
		{
			title: 'Конец приема',
			dataIndex: 'dateEnd',
			key: 'dateEnd',
		},
		{
			title: 'номера сеанса',
			dataIndex: 'sitNumbers',
			key: 'sitNumbers',
		},
		{
			title: 'дней',
			dataIndex: 'days',
			key: 'days',
		},
	];
</script>

<style lang="scss">
	.ant-table-wrapper {
		overflow: auto;
	}
</style>
