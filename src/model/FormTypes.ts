export type ComboBoxAttributes = {
	type: "combobox";
	options: string[];
};

export type ComboBoxAttributesObject = {
	type: "comboboxObject";
	options: { label: string; value?: string }[];
	optionsLabels: string[];
	optionsValues: string[];
};

export type DefaultAttirubtes = {
	type:
		| "text"
		| "number"
		| "password"
		| "email"
		| "tel"
		| "checkbox"
		| "date"
		| "textarea";
};

export type LineOfForm = {
	label: string;
	id: string;
	required: boolean;
	regex?: RegExp;
	helperText?: string;
} & ((ComboBoxAttributes | ComboBoxAttributesObject) | DefaultAttirubtes);
