import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./state/store";
import { Provider } from "react-redux";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
