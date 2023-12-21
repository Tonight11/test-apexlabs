<template>
	<div class="form-control">
		<label>Тип инъекции</label>
		<a-radio-group v-model:value="newSession.selectedNeedle" size="large">
			<a-radio-button value="Игла">Игла</a-radio-button>
			<a-radio-button value="Катетер">Катетер</a-radio-button>
		</a-radio-group>
	</div>
	<NeedleItems v-if="newSession.selectedNeedle" />
</template>

<script setup lang="ts">
	import NeedleItems from '@/components/first-session/NeedleItems.vue';

	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';

	const store = useSessionStore();
	const { newSession } = storeToRefs(store);
</script>

<style>
	.ant-modal-close {
		display: none;
	}
</style>
