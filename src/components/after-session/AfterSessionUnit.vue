<template>
	<div class="input-group">
		<div>
			<label>Путь приема</label>
			<div class="input-control">
				<a-input
					v-model:value="newSession.path"
					placeholder="Спр. путь приема"
				/>
				<div @click="pathVisible = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<BicarbonateModalUi
						@close="changePath"
						v-if="pathVisible"
						:open="pathVisible"
						:items="['перорально', 'подкожно', 'артериально']"
					/>
				</Teleport>
			</div>
		</div>
		<div>
			<label>Дозировка</label>
			<div class="input-control">
				<a-input
					v-model:value="newSession.dozirovka"
					placeholder="Спр. Путь приема"
				/>
				<div @click="dozirovkaVisible = true" class="input-control__icon">
					<MenuFoldOutlined />
				</div>
				<Teleport to="body">
					<BicarbonateModalUi
						@close="changeDoz"
						v-if="dozirovkaVisible"
						:open="dozirovkaVisible"
						:items="['мкг', 'мл', 'мг/кг']"
					/>
				</Teleport>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import BicarbonateModalUi from '@/components/ui/modals/BicarbonateModalUi.vue';
	import { MenuFoldOutlined } from '@ant-design/icons-vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);

	const pathVisible = ref(false);
	const dozirovkaVisible = ref(false);

	const changePath = (value: string) => {
		pathVisible.value = false;

		newSession.value.path = `  ${value}`;
	};
	const changeDoz = (value: string) => {
		dozirovkaVisible.value = false;

		newSession.value.dozirovka = `  ${value}`;
	};
</script>

<style lang="scss" scoped></style>
