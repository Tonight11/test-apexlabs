<template>
	<a-modal
		v-model:open="bicarbonateModalVisible"
		title="Выберите единицы измерения"
		:mask-closable="false"
	>
		<template #footer></template>
		<a-radio-group v-model:value="selectedBicarbonateUnit">
			<a-radio v-for="item in items" :key="item" :value="item">{{
				item
			}}</a-radio>
		</a-radio-group>
		<a-button type="primary" @click="closeBicarbonateModal">Сохранить</a-button>
	</a-modal>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';

	const props = defineProps<{
		items: string[];
		open: boolean;
	}>();
	const emit = defineEmits<{
		(e: 'close', open: string): void;
	}>();

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);
	const bicarbonateModalVisible = ref(props.open);
	const selectedBicarbonateUnit = ref('');

	const openBicarbonateModal = () => {
		bicarbonateModalVisible.value = true;
	};

	const closeBicarbonateModal = () => {
		if (selectedBicarbonateUnit.value) {
			bicarbonateModalVisible.value = false;
			emit('close', selectedBicarbonateUnit.value);
		}
	};
</script>

<style lang="scss" scoped></style>
