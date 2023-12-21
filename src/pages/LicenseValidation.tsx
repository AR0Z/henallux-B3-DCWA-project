import Header from "../components/Header";
import LicenseField from "../components/LicenseField";

function LicenseValidation() {
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
				<LicenseField id="1" />
				<LicenseField id="2" />
			</div>
		</>
	);
}

export default LicenseValidation;
