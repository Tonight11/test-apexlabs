<template>
	<div class="input-group">
		<div>
			<label>Бикарбонат</label>
			<div class="input-control">
				<a-input
					v-model:value="newSession.bicarbonate"
					placeholder="XXX гр/л"
				/>
				<div @click="openModal = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<BicarbonateModalUi
						@close="changeBico"
						v-if="openModal"
						:open="openModal"
						:items="['грамм', 'литры']"
					/>
				</Teleport>
			</div>
		</div>

		<div>
			<label>Сухой вес пациента</label>
			<a-input v-model:value="newSession.dryWeight" placeholder="XXX кг" />
		</div>

		<div>
			<label>Антикоагуляция</label>
			<a-input
				v-model:value="newSession.anticoagulation"
				placeholder="Наименование"
			/>
		</div>

		<div>
			<label>Объем</label>
			<a-input v-model:value="newSession.volume" placeholder="XXX ед" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';
	import BicarbonateModalUi from '../ui/modals/BicarbonateModalUi.vue';
	import { MenuFoldOutlined } from '@ant-design/icons-vue';

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);
	const openModal = ref(false);

	const changeBico = (value: string) => {
		openModal.value = false;

		newSession.value.bicarbonate = `  ${value}`;
	};
</script>

<style lang="scss" scoped></style>
