import { LineOfForm } from "./FormTypes";

import { CRUDApiType } from "api/crudApi";

export interface Form {
	path: string;
	Lines: LineOfForm[];
	baseData: CRUDApiType;
	isNew?: boolean;
}