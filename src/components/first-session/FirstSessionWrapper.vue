<template>
	<div class="session-wrapper">
		<ApparatItems />

		<NeedleWrapper />

		<AdditionalItems />

		<div>
			<a-button @click="generate">Сформировать сеанс</a-button>
		</div>
		<SessionInfo v-if="showSession" />
	</div>
</template>

<script setup lang="ts">
	import NeedleWrapper from '@/components/first-session/NeedleWrapper.vue';
	import ApparatItems from '@/components/first-session/ApparatItems.vue';
	import SessionInfo from '@/components/first-session/SessionInfo.vue';
	import AdditionalItems from '@/components/first-session/AdditionalItems.vue';
	import { notification } from 'ant-design-vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import { ref } from 'vue';

	const showSession = ref(false);

	const store = useSessionStore();
	const { steps } = storeToRefs(store);

	const generate = () => {
		const resp = store.generateSession();
		if (resp === true) {
			showSession.value = true;
			steps.value = 2;
		} else {
			notification['error']({
				message: 'Запомните все поля',
			});
		}
	};
</script>

<style lang="scss" scoped></style>
