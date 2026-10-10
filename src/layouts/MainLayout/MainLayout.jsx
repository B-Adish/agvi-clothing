import { Outlet } from "react-router-dom";
import AnnouncementBar from "../../components/AnnouncementBar/AnnouncementBar";
import Navbar from "../../components/Navbar/Navbar";
import NavMenu from "../../components/NavMenu/NavMenu";
import Footer from "../../components/Footer/Footer";

function MainLayout() {
    return (
        <>
            <AnnouncementBar />
            <Navbar />
            <NavMenu /> 
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
}

export default MainLayout;