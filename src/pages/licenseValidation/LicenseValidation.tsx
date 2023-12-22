import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import LicenseField from "../../components/licenseField/LicenseField";
import { toCheck } from "../../api/api";

type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	drivingLicence: string;
	faceImg: string;
	isDriver: boolean;
	isAdmin: boolean;
	tokenImg: string;
};

function LicenseValidation() {
	document.title = "License Validation";
	const [data, setData] = useState<User[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setData(await toCheck());
		};
		fetchData();
	}, []);

	return (
		<>
			<div
				className="license-wrapper"
				style={{
					margin: "1.5rem 2.5rem",
				}}>
				<Header
					title="License Validation"
					subtitle="Validez les permis de conduire"
				/>
				{data?.length > 0 ? (
					<div className="license-fields">
						{data.map((user, index) => (
							<LicenseField user={user} key={index} />
						))}
					</div>
				) : (
					<div style={{ marginTop: "10px" }}>
						Il n'y a pas de permis à valider
					</div>
				)}
			</div>
		</>
	);
}

export default LicenseValidation;
