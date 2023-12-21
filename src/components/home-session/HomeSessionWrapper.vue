<template>
	<div class="session-wrapper">
		<AfterSessionFirst medicine="homeMedicine" />
		<HomeSessionUnit />
		<div class="input-group">
			<div>
				<label>Кратность приема</label>
				<div class="input-control">
					<a-input
						v-model:value="newSession.homeDay"
						placeholder="Спр. Кр-ть приема"
						disabled
					/>
					<div @click="openModal = true" class="input-control__icon">
						<MenuFoldOutlined />
					</div>
					<Teleport to="body">
						<BicarbonateModalUi
							@close="changeDay"
							v-if="openModal"
							:open="openModal"
							:items="['1 раз в день', '2 раз в день', '3 раз в день']"
						/>
					</Teleport>
				</div>
			</div>

			<div>
				<div class="date-range">
					<div>Начало приема - Конец приема</div>
					<a-range-picker v-model:value="date" />
					<span v-if="newSession.sitNumbers.length"
						>количесвто сеансов {{ newSession.sitNumbers.length }}</span
					>
				</div>
			</div>
		</div>
		<div class="home-session__count">
			Количество дней <span>{{ newSession.homeCount || 'ХХ' }}</span>
		</div>

		<div>
			<a-button @click="addInfo">Добавить</a-button>
		</div>
		<div v-if="newSession.homeInfo.length">
			<div>Лечение на дому</div>
			<div class="home-session__info">
				{{ newSession.homeInfo.join(', ') }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import AfterSessionFirst from '@/components/after-session/AfterSessionFirst.vue';
	import HomeSessionUnit from '@/components/home-session/HomeSessionUnit.vue';
	import { useSessionStore } from '@/stores';
	import { storeToRefs } from 'pinia';
	import BicarbonateModalUi from '../ui/modals/BicarbonateModalUi.vue';
	import { MenuFoldOutlined } from '@ant-design/icons-vue';
	import { ref, watch } from 'vue';
	import { useDateChange } from '@/composables/useDateChange';
	import { notification } from 'ant-design-vue';

	const store = useSessionStore();
	const { newSession, steps } = storeToRefs(store);
	const openModal = ref(false);

	const { date, dateStart, dateEnd, days } = useDateChange();

	const changeDay = (value: string) => {
		newSession.value.homeDay = value;
	};

	const addInfo = () => {
		const resp = store.generateHomeSession();
		if (resp === true) {
			newSession.value.homeInfo.push(
				`${newSession.value.homeMedicine} ${newSession.value.homePath} ${
					newSession.value.homeDozirovka
				} ${newSession.value.homeDay} c ${
					(newSession.value.homeStart as Date).toISOString().split('T')[0]
				} по ${
					(newSession.value.homeEnd as Date).toISOString().split('T')[0]
				} ${newSession.value.homeCount} дней`
			);
			steps.value = 4;
		} else {
			notification['error']({
				message: 'Запомните все поля',
			});
		}
	};

	watch(
		// @ts-ignore
		[dateStart, dateEnd, days],
		([dateStart, dateEnd, days]: [Date, Date, number]) => {
			newSession.value.homeStart = dateStart;
			newSession.value.homeEnd = dateEnd;
			newSession.value.homeCount = days;
		}
	);
</script>

<style lang="scss">
	.home-session__info {
		border: 1px solid #ccc;
		padding: 10px;
	}

	.home-session__count {
		& span {
			color: aquamarine;
		}
	}
</style>
