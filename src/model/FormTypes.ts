export type ComboBox = {
	label: string;
	options: string[];
};

export type LineOfForm = {
	label: string;
	type:
		| "text"
		| "number"
		| "password"
		| "email"
		| "tel"
		| "checkbox"
		| "date"
		| ComboBox;
	id: string;
	required: boolean;
};
