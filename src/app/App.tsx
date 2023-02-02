
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { UserPage } from "../pages/UserPage";
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:id' element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
