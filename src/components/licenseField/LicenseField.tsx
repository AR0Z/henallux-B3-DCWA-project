import { Button } from "@mui/material";
import "./licenseField.css";
import { useState } from "react";
import api from "../../api/api";
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

type Props = {
	user: User;
	key: number;
};

function LicenseField({ user, key }: Props) {
	const [imgFace, setImgFace] = useState(<img></img>);
	const [imgLicense, setImgLicense] = useState(<img></img>);
	const [isFaceActive, setIsFaceActive] = useState<boolean>(false);
	const [isLicenseActive, setIsLicenseActive] = useState<boolean>(false);
	const [isDisplay, setIsDisplay] = useState<boolean>(false);

	function onAccept() {
		api.put("users/toCheck/" + user.id, { action: "accept" });
	}

	function onReject() {
		api.put("users/toCheck/" + user.id, { action: "refuse" });
	}

	function onDisplayPicture() {
		if (isDisplay) {
			setImgFace(<></>);
			setImgLicense(<></>);
			setIsDisplay(false);
		} else {
			setImgFace(
				<img
					src={`https://smartcities.aroz.be/api/v1/uploads/${user.faceImg}?token=${user.tokenImg}`}
					alt=""
					height={100}
					id="face-img"
				/>
			);
			setImgLicense(
				<img
					src={`https://smartcities.aroz.be/api/v1/uploads/${user.drivingLicence}?token=${user.tokenImg}`}
					alt=""
					height={100}
					id="license-img"
				/>
			);
			setIsDisplay(true);
		}
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

				<div
					id="face-wrapper"
					className={isFaceActive ? "active" : "inactive"}
					onClick={() => setIsFaceActive(!isFaceActive)}>
					{imgFace}
				</div>
				<div
					id="license-wrapper"
					className={isLicenseActive ? "active" : "inactive"}
					onClick={() => setIsLicenseActive(!isLicenseActive)}>
					{imgLicense}
				</div>
			</div>
		</div>
	);
}

export default LicenseField;
