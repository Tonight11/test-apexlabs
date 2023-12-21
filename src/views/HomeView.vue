<template>
	<div class="session">
		<div class="session__top">
			<div class="session__title">Сеанс гемодолизма</div>
			<div class="session__number">№ месяц: 4</div>
		</div>

		<h1 class="title">Назначение сеанса гемодиализа</h1>
		<FirstSessionWrapper />
		<h2 class="title" v-if="steps > 1">Назначение после сеанса</h2>
		<AfterSessionWrapper v-if="steps > 1" />
		<h2 class="title" v-if="steps > 2 || newSession.tableData.length">
			Лечение на дому
		</h2>
		<HomeSessionWrapper v-if="steps > 2 || newSession.tableData.length" />
		<h2 class="title" v-if="steps > 3 || newSession.homeInfo.length">
			Рекомендации
		</h2>
		<RecomendationItem v-if="steps > 3 || newSession.homeInfo.length" />
		<a-button
			v-if="steps > 3 || newSession.homeInfo.length"
			@click="store.sendSession"
		>
			Добавить
		</a-button>
	</div>
</template>

<script setup lang="ts">
	import FirstSessionWrapper from '@/components/first-session/FirstSessionWrapper.vue';
	import AfterSessionWrapper from '@/components/after-session/AfterSessionWrapper.vue';
	import HomeSessionWrapper from '@/components/home-session/HomeSessionWrapper.vue';
	import RecomendationItem from '@/components/RecomendationItem.vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';

	const store = useSessionStore();
	const { newSession, steps } = storeToRefs(store);
</script>

<style lang="scss">
	.session {
		max-width: 1080px;
		margin: 0 auto;
		padding: 20px;
		border: 1px solid #ccc;
		min-height: 100vh;

		&__top {
			display: flex;
			align-items: center;
		}

		&__title {
			font-size: 24px;
		}

		&__number {
			flex: 1;

			text-align: center;
		}
	}
	.title {
		margin: 10px 0;
	}
</style>
