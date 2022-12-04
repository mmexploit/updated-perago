import { MantineProvider } from "@mantine/core";
import "./App.css";
import "./index.css";
import HomePage from "./components/HomePage/homePage.component";
import { Route, Routes, Link } from 'react-router-dom';
import Chart from "./components/Tree/tree.component";
import Form from "./components/Form/form.component";
import { useDispatch } from "react-redux";
// import { toogleModalOpen } from "./redux/Modal/modal.action";



function App() {
  return (
    <MantineProvider>
      <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/tree" element={<Chart/>}/>
            <Route path="/create" element={<Form/>}/>
        </Routes>
    </MantineProvider>
  );
}

export default App;
