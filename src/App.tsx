import { Navbar } from "@/components/navbar/Navbar";
import { Main } from "@/components/main/Main";
import { useAuthInit } from "./firebase/auth/hooks";

function App() {
  useAuthInit();
  return (
    <>
      <Navbar />
      <Main />
    </>
  );
}

export default App;
