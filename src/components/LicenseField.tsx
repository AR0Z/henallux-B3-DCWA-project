import { Button } from "@mui/material";
import { getEmailFromId } from "../api/api";
import { useEffect, useState } from "react";
import "./licenseField.css";
function LicenseField({ id }: { id: string }) {
	const [email, setEmail] = useState("");

	useEffect(() => {
		getEmailFromId(id).then((res) => setEmail(res));
	}, [id]);

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
		<div className="license-wrapper">
			<div className="license-field">
				<Button
					variant="contained"
					component="label"
					onClick={onDisplayPicture}>
					Display Picture
				</Button>
				<div className="email">{email}</div>
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
