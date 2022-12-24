import './App.css';
import {Container} from "react-bootstrap";

import HomeScreen from "./Screens/HomeScreen";
import {Routes, Route} from "react-router-dom";
import {Header} from "./Components/Header";
import {SideBar} from "./Components/SideBar";
import {SignupScreen} from "./Screens/SignupScreen";

export default function App() {

    return (
        <div className="site_container flex-column bg-black d-flex">
            <Header />
            <div className="d-flex flex-column">
                <SideBar />
                <main>
                    <Container className="bg-black">
                        <Routes>
                            <Route path="/auth" element={<SignupScreen />} />
                            <Route path="/" element={<HomeScreen />} />
                        </Routes>
                    </Container>
                </main>
            </div>
        </div>
    );
    
}