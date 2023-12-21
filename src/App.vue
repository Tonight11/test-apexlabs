<template>
	<a-config-provider
		:theme="{
			token: {
				colorPrimary: '#00b96b',
			},
		}"
	>
		<router-view />
	</a-config-provider>
</template>

<script setup lang="ts">

</script>

<style>
	.session-wrapper {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;
	}
</style>
