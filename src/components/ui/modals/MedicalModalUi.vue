<template>
	<a-modal v-model:open="modalVisible" :title="title" :mask-closable="false">
		<template #footer></template>
		<div>
			<a-button @click="handleCancel">Закрыть</a-button>
		</div>
		<div class="input-control">
			<a-input v-model:value="search" placeholder="Поиск позиции" />
			<div @click="" class="input-control__icon">
				<SearchOutlined />
			</div>
		</div>
		<div class="input-control">
			<a-input v-model:value="newRecord" placeholder="Добавить новую позицию" />
			<div @click="addNewList" class="input-control__icon">
				<PlusOutlined />
			</div>
		</div>
		<a-list
			class="demo-loadmore-list"
			item-layout="horizontal"
			:data-source="dataType"
		>
			<template #renderItem="{ item }">
				<a-list-item>
					<template #actions>
						<DeleteOutlined @click="deleteList(item)" class="icon-delete" />
						<RightOutlined @click="selectItem(item)" class="icon-delete" />
					</template>
					{{ item }}
				</a-list-item>
			</template>
		</a-list>
	</a-modal>
</template>

<script setup lang="ts">
	import {
		DeleteOutlined,
		PlusOutlined,
		SearchOutlined,
		RightOutlined,
	} from '@ant-design/icons-vue';
	import { ref, computed } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';

	const props = defineProps<{
		open: boolean;
		title: string;
		type: string;
	}>();
	const emit = defineEmits<{
		(e: 'close', open: boolean): void;
		(e: 'succes', value: string): void;
	}>();

	// vars
	const store = useSessionStore();
	const { newSession } = storeToRefs(store);

	const modalVisible = ref(props.open);
	const search = ref('');
	const newRecord = ref('');

	const dataType = computed(() => {
		const key = props.type as keyof typeof newSession.value;
		return newSession.value[key];
	});

	// handlers

	const exactInjection = (): string[] => {
		const key = props.type as keyof typeof newSession.value;
		const items = newSession.value[key] as Array<string>;
		return items;
	};

	const handleCancel = () => {
		emit('close', false);
		modalVisible.value = false;
	};

	const addNewList = () => {
		if (newRecord.value.length === 0) {
			return;
		}

		const items = exactInjection();

		items.push(newRecord.value);
		newRecord.value = '';
	};

	const selectItem = (value: string) => {
		emit('succes', value);
		modalVisible.value = false;
	};

	const deleteList = (itemToDelete: string): void => {
		const key = props.type as keyof typeof newSession.value;
		const items = newSession.value[key] as string[];

		const index = items.indexOf(itemToDelete);

		if (index !== -1) {
			items.splice(index, 1);
		}
	};
</script>

<style lang="scss">
	.ant-modal-body {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.icon-delete {
		cursor: pointer;
	}
</style>
