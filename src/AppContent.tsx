import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";
import App from "@/App.tsx";

const AppContent = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContent;
