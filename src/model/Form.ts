import { LineOfForm } from "./FormTypes";

export interface Form {
	path: string;
	Lines: LineOfForm[];
	baseData: any;
}