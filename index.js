import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

function index() {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
}

export default index;
