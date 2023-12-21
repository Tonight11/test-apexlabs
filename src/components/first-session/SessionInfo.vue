<template>
	<div class="session-info">
		<h3 class="session-info__title">Назначение сеанса гемодиализа</h3>
		<div class="session-info__inner">
			<div>
				<LaptopOutlined />
				<p>Программа аппарата: {{ newSession.selectedProgram }}</p>
			</div>
			<div>
				<MedicineBoxOutlined />
				<p>Диализатор: {{ selectedProgramData.dialyzer }}</p>
			</div>
			<div>
				<HourglassOutlined />
				<p>
					Концентратор: {{ selectedProgramData.concentrator }}
					{{ selectedProgramData.volume }}
				</p>
			</div>
			<div>
				<ExclamationOutlined />
				<p>Игла/Катетер: {{ newSession.selectedNeedle }}</p>
			</div>
			<p v-if="newSession.selectedNeedle === 'Игла'">
				Спр. Типы иглы: {{ newSession.needleType }}
			</p>
			<p v-if="newSession.selectedNeedle === 'Катетер'">
				Спр. Типы катетер: {{ newSession.catheterType }}
			</p>
			<div>
				<ExperimentOutlined />
				<p>Бикарбонат: {{ newSession.bicarbonate }}</p>
			</div>
			<div>
				<ExperimentOutlined />
				<p>Сухой вес пациента: {{ newSession.dryWeight }}</p>
			</div>
			<div>
				<ExperimentOutlined />
				<p>Антикоагуляция: {{ newSession.anticoagulation }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ExperimentOutlined,
		ExclamationOutlined,
		MedicineBoxOutlined,
		HourglassOutlined,
		LaptopOutlined,
	} from '@ant-design/icons-vue';
	import { computed } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);

	const selectedProgramData = computed(() => {
		const programs = {
			HD: 'HD',
			HDF: 'HDF',
			UF: 'UF',
		};

		const selectedProgram = newSession.value.selectedProgram;
		const defaultData = { dialyzer: '', concentrator: '', volume: '' };

		const programsKey = selectedProgram as keyof typeof programs;
		const sessionKey = selectedProgram as keyof typeof newSession.value;

		return programs[programsKey]
			? (newSession.value[sessionKey] as typeof defaultData)
			: defaultData;
	});
</script>

<style lang="scss" scoped>
	.session-info {
		border: 1px solid #ccc;
		padding: 15px;

		&__title {
			margin-bottom: 15px;
		}

		&__inner {
			display: flex;
			flex-wrap: wrap;
			column-gap: 20px;
			row-gap: 10px;

			& div {
				display: flex;
				align-items: center;
				gap: 5px;
			}
		}
	}
</style>
