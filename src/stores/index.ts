import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { SessionItem } from '@/types/session';
import sessionData from '@/composables/sessionData.json';

export const useSessionStore = defineStore('session', () => {
	const newSession = ref<SessionItem>(sessionData);
	const steps = ref(1);

	const generateSession = (): boolean => {
		if (
			!newSession.value.selectedProgram ||
			!newSession.value.HD.dialyzer ||
			!newSession.value.HD.concentrator ||
			!newSession.value.HD.volume ||
			!newSession.value.HDF.dialyzer ||
			!newSession.value.HDF.concentrator ||
			!newSession.value.HDF.volume ||
			!newSession.value.UF.dialyzer ||
			!newSession.value.UF.concentrator ||
			!newSession.value.UF.volume ||
			!newSession.value.selectedNeedle ||
			((!newSession.value.needleType || !newSession.value.catheterType) &&
				newSession.value.selectedNeedle) ||
			!newSession.value.bicarbonate ||
			!newSession.value.dryWeight ||
			!newSession.value.anticoagulation ||
			!newSession.value.volume
		) {
			return false;
		}
		return true;
	};

	const generateAfterSession = (): boolean => {
		if (
			!newSession.value.medicine ||
			!newSession.value.path ||
			!newSession.value.dozirovka ||
			!newSession.value.sitNumbers ||
			!newSession.value.dateStart ||
			!newSession.value.dateEnd ||
			!newSession.value.days
		) {
			return false;
		}
		return true;
	};

	const generateHomeSession = () => {
		if (
			!newSession.value.homeMedicine ||
			!newSession.value.homePath ||
			!newSession.value.homeDozirovka ||
			!newSession.value.homeDay ||
			!newSession.value.homeStart ||
			!newSession.value.homeEnd ||
			!newSession.value.homeCount
		) {
			return false;
		}
		return true;
	};

	const sendSession = () => {
		alert(JSON.stringify(newSession.value));
	};

	return {
		newSession,
		generateSession,
		generateAfterSession,
		generateHomeSession,
		sendSession,
		steps,
	};
});
