<template>
	<div v-if="newSession.selectedNeedle">
		<div v-if="newSession.selectedNeedle === 'Игла'" class="input-group">
			<div class="input-control">
				<a-input
					disabled
					v-model:value="newSession.needle"
					placeholder="Спр. иглы"
				/>
				<div @click="needleVisible = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<MedicalModalUi
						@succes="selectNeedle"
						@close="needleVisible = false"
						v-if="needleVisible"
						type="needleItem"
						title="Лекарственные препараты"
						:open="needleVisible"
					/>
				</Teleport>
			</div>
			<div class="input-control">
				<a-input
					disabled
					v-model:value="newSession.needleType"
					placeholder="Спр. Типы иглы"
				/>
				<div @click="needleTypeVisible = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<MedicalModalUi
						@succes="selectNeedleType"
						@close="needleTypeVisible = false"
						v-if="needleTypeVisible"
						type="needleTypeItem"
						title="Иглы"
						:open="needleTypeVisible"
					/>
				</Teleport>
			</div>
		</div>
		<div v-if="newSession.selectedNeedle === 'Катетер'" class="input-group">
			<div class="input-control">
				<a-input
					disabled
					v-model:value="newSession.catheter"
					placeholder="Спр. катетер"
				/>
				<div @click="catheterVisible = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<MedicalModalUi
						@succes="selectCatheter"
						@close="catheterVisible = false"
						v-if="catheterVisible"
						type="catheterItem"
						title="Лекарственные препараты"
						:open="catheterVisible"
					/>
				</Teleport>
			</div>
			<div class="input-control">
				<a-input
					disabled
					v-model:value="newSession.catheterType"
					placeholder="Спр. Типы катетер"
				/>
				<div @click="catheterTypeVisible = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<MedicalModalUi
						@succes="selectCatheterType"
						@close="catheterTypeVisible = false"
						v-if="catheterTypeVisible"
						type="catheterTypeItem"
						title="Катетер"
						:open="catheterTypeVisible"
					/>
				</Teleport>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { MenuFoldOutlined } from '@ant-design/icons-vue';
	import MedicalModalUi from '@/components/ui/modals/MedicalModalUi.vue';

	const needleVisible = ref(false);
	const needleTypeVisible = ref(false);
	const catheterVisible = ref(false);
	const catheterTypeVisible = ref(false);

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);

	const selectNeedle = (value: string) => {
		newSession.value.needle = value;
		needleVisible.value = false;
	};
	const selectNeedleType = (value: string) => {
		newSession.value.needleType = value;
		needleTypeVisible.value = false;
	};
	const selectCatheter = (value: string) => {
		newSession.value.catheter = value;
		catheterVisible.value = false;
	};
	const selectCatheterType = (value: string) => {
		newSession.value.catheterType = value;
		catheterTypeVisible.value = false;
	};
</script>

<style lang="scss" scoped></style>
