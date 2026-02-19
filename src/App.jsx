import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Profile from "./components/profile";
import Body from "./components/body";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import Feed from "./components/feed";
import Connections from "./components/connections";
import Request from "./components/request";
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/feed" element={<Feed/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/connections" element={<Connections/>}/>
            <Route path="/requests" element={<Request/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
