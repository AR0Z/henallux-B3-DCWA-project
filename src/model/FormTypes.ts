export type ComboBoxAttributes = {
	type: "combobox";
	options: string[];
};

export type DefaultAttirubtes = {
	type: "text" | "number" | "password" | "email" | "tel" | "checkbox" | "date";
};

export type LineOfForm = {
	label: string;
	id: string;
	required: boolean;
} & (ComboBoxAttributes | DefaultAttirubtes);
