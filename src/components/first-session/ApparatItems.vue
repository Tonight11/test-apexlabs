<template>
	<div class="form-control">
		<label>Программа аппарата</label>
		<a-radio-group v-model:value="newSession.selectedProgram" size="large">
			<a-radio-button value="HD">HD</a-radio-button>
			<a-radio-button value="HDF">HDF</a-radio-button>
			<a-radio-button value="UF">UF</a-radio-button>
		</a-radio-group>
	</div>

	<div v-if="newSession.selectedProgram">
		<label>Диализатор</label>
		<div class="input-control">
			<a-input
				v-model:value="selectedProgramData.dialyzer"
				placeholder="Диализатор"
			>
			</a-input>
			<div class="input-control__icon">
				<MenuFoldOutlined />
			</div>
		</div>

		<div class="input-group">
			<div>
				<label>Концентратор</label>
				<div class="input-control">
					<a-input
						v-model:value="selectedProgramData.concentrator"
						placeholder="Концентратор"
					>
					</a-input>
					<div class="input-control__icon">
						<MenuFoldOutlined />
					</div>
				</div>
			</div>
			<div>
				<label>Концентратор</label>
				<div class="input-control">
					<a-input
						v-model:value="selectedProgramData.volume"
						placeholder="Концентратор"
					>
					</a-input>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { MenuFoldOutlined } from '@ant-design/icons-vue';

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

<style lang="scss" scoped></style>
