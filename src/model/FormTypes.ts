export type ComboBoxAttributes = {
	type: "combobox";
	// type of option is array of {label: string, value: string}
	options: string[];
};

export type ComboBoxAttributesObject = {
	type: "comboboxObject";
	// type of option is array of {label: string, value: string}
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
} & ((ComboBoxAttributes | ComboBoxAttributesObject) | DefaultAttirubtes);
