import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signinpage from "./pages/Signinpage";
import Signuppage from "./pages/Signuppage";
import Mainpage from "./pages/Mainpage";
import Reportdetailpage from "./pages/Reportdetailpage";
import Reportlistpage from "./pages/Reportlistpage";
import Reportwritepage from "./pages/Reportwritepage";
import Mypage from "./pages/Mypage";
import Changemypage from "./pages/Changemypage";

const Router = () => {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signinpage />} />
                    <Route path="/signup" element={<Signuppage />} />
                    <Route path="/main" element={<Mainpage />} />
                    <Route path="/reportlist" element={<Reportlistpage />} />
                    <Route path="/report/:id" element={<Reportdetailpage />} />
                    <Route path="/reportwrite" element={<Reportwritepage />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/changemy" element={<Changemypage />} />
                    {/* <Route path="signup" element={<Signup />} /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default Router