<template>
	<div class="session-wrapper">
		<div class="input-control">
			<a-input v-model:value="newSession.recomend" placeholder="Рекомендации" />
			<div @click="addRecomend" class="input-control__icon">
				<PlusOutlined />
			</div>
		</div>
		<div v-if="newSession.recomendItems.length">
			<div>Рекомендации лечащего врача пациенту</div>
			<div class="home-session__info">
				{{ newSession.recomendItems.join(', ') }}
			</div>
		</div>
		<div class="input-group">
			<div>
				<CalendarOutlined />
				<span>{{ days }}</span>
			</div>
			<div>
				<UserOutlined />
				<span>Нурбек уулу Баястан</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import {
		PlusOutlined,
		CalendarOutlined,
		UserOutlined,
	} from '@ant-design/icons-vue';

	const store = useSessionStore();
	const { newSession, steps } = storeToRefs(store);

	const addRecomend = () => {
		if (newSession.value.recomend) {
			newSession.value.recomendItems.push(newSession.value.recomend);
			newSession.value.recomend = '';
		}
	};

	const days = computed(() => {
		const today = new Date();

		const year = today.getFullYear();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate().toString().padStart(2, '0');

		const formattedDate = `${year}-${month}-${day}`;

		return formattedDate;
	});
</script>

<style lang="scss" scoped></style>
