import { Button } from "@mui/material";
import "./licenseField.css";

type User = {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	phone: string;
	drivingLicence: string;
	faceImage: string;
	isDriver: boolean;
	isAdmin: boolean;
	tokenImage: string;
};

function LicenseField({ user, key }: { user: User; key: number }) {
	function onAccept() {
		// TODO: call api to accept license
	}

	function onReject() {
		// TODO: call api to reject license
	}

	function onDisplayPicture() {
		// TODO: call api to display picture
	}

	return (
		<div className="license-wrapper" key={key}>
			<div className="license-field">
				<Button
					variant="contained"
					component="label"
					onClick={onDisplayPicture}>
					Display Picture
				</Button>
				<div className="email">{user.email}</div>
				<div className="action-btn">
					<Button
						variant="contained"
						component="label"
						color={"success"}
						onClick={onAccept}>
						Accept
					</Button>
					<Button
						variant="contained"
						component="label"
						color={"error"}
						onClick={onReject}>
						Reject
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LicenseField;
