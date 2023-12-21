interface SessionTable {
	medicine: string;
	path: string;
	dozirovka: string;
	dateStart: string;
	dateEnd: string;
	sitNumbers: number[] | string;
	days: number;
}

export interface SessionItem {
	selectedProgram: string;
	HD: {
		concentrator: string;
		dialyzer: string;
		volume: string;
	};
	HDF: {
		concentrator: string;
		dialyzer: string;
		volume: string;
	};
	UF: {
		concentrator: string;
		dialyzer: string;
		volume: string;
	};
	selectedNeedle: string;
	needle: string;
	needleType: string;
	catheter: string;
	catheterType: string;
	needleItem: string[];
	needleTypeItem: string[];
	catheterItem: string[];
	catheterTypeItem: string[];
	bicarbonate: string;
	dryWeight: string;
	anticoagulation: string;
	volume: string;
	medicine: string;
	medicineItem: string[];
	path: string;
	dozirovka: string;
	sitNumbers: number[];
	dateStart: Date | null | string;
	dateEnd: Date | null | string;
	days: number;
	tableData: SessionTable[];
	homeMedicine: string;
	homePath: string;
	homeDozirovka: string;
	homeDay: string;
	homeStart: Date | null | string;
	homeEnd: Date | null | string;
	homeCount: number;
	homeInfo: string[];
	recomend: string;
	recomendItems: string[];
}
