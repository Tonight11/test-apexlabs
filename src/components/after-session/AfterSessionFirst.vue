<template>
	<div>
		<label>Лекарственные аппараты</label>
		<div class="input-control">
			<a-input
				v-model:value="localMedicine"
				placeholder="Лекарственные аппараты"
				disabled
			>
			</a-input>
			<div @click="medicineVisible = true" class="input-control__icon">
				<MenuFoldOutlined />
			</div>
			<Teleport to="body">
				<MedicalModalUi
					@close="medicineVisible = false"
					@succes="selectMedicine"
					v-if="medicineVisible"
					type="medicineItem"
					title="Медицина"
					:open="medicineVisible"
				/>
			</Teleport>
		</div>
	</div>
</template>

<script setup lang="ts">
	import MedicalModalUi from '@/components/ui/modals/MedicalModalUi.vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { MenuFoldOutlined } from '@ant-design/icons-vue';
	import { ref } from 'vue';
	import type { Ref } from 'vue';

	interface Session {
		medicine: string;
		homeMedicine: string;
	}

	const props = defineProps<{
		medicine: string;
	}>();

	const store = useSessionStore();
	const { newSession } = storeToRefs(store) as { newSession: Ref<Session> };

	const medicineVisible = ref(false);
	const localMedicine = ref('');

	const selectMedicine = (value: string) => {
		const key = props.medicine as keyof typeof newSession.value;
		newSession.value[key] = value;
		localMedicine.value = value;
		medicineVisible.value = false;
	};
</script>

<style lang="scss" scoped></style>
