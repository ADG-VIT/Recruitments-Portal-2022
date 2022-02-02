import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
	<SnackbarProvider maxSnack={2}>
		<React.StrictMode>
			<HashRouter>
				<App />
			</HashRouter>
		</React.StrictMode>
	</SnackbarProvider>,
	document.getElementById("root")
);
