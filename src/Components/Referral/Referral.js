import React from "react";
import "./Referral.css";
import { ReactComponent as HeadSVG } from "./head.svg";
import { ReactComponent as CopySVG } from "./copy.svg";

function Referral() {
	return (
		<div className="refer-main">
			<div className="refer">
				<div className="top">
					<HeadSVG />
				</div>
				<div className="refer-body">
					<div>
						<p className="body-title">Refer your way to the Top!</p>
						<p className="body-sub">
							Earn a chance to Speedtrack your Recruitment
						</p>
					</div>
					<div>
						<p className="body-title">Referral Code</p>
						<p className="body-sub">Share it with your friends!</p>
					</div>
					<div className="code">
						<p>0x097564fr1</p>
						<div
							className="copy-code"
							onClick={() => {
								navigator.clipboard.writeText("Hello");
							}}
						>
							<CopySVG />
						</div>
					</div>

					<div className="body-end">
						<p className="body-title">How it Works?</p>
						<p className="body-sub">
							Share the Referral Code with your friends to get
							them extra time and vice versa
							<br /> <br />
							Top 5 people whose code gets used the most will get
							an exclusive chance to speedtrack their Recruitment
							Process
						</p>
					</div>
					{/* Button Component */}
				</div>
			</div>
		</div>
	);
}

export default Referral;
