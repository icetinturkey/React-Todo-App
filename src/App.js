import {Routes, Route, Link, useLocation} from "react-router-dom";
import Home from "./components/home";
import New from "./components/new";
import { useState, useEffect } from "react";
import Login from "./components/login";

function App() {
    const [username, setUsername] = useState([]);
    let location = useLocation();

    useEffect(() => {
        const un = localStorage.getItem('username');
        if (un) {
            setUsername(un);
        }
    }, [location]);

    function logout(){
        localStorage.removeItem('username');
        setUsername("");
    }

    const karanlikMod = (event) => {
        event.preventDefault();
        document.querySelector('body').classList.toggle("dark-mode");
        document.querySelector('.navbar').classList.toggle("bg-dark");
        document.querySelector('.navbar').classList.toggle("navbar-dark");
    }

  return (
    <div className="App">

          <nav className="navbar navbar-expand-lg bg-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">To-Do App</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                          aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <Link className="nav-link" to="/">Anasayfa</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="new">Yeni Ekle</Link>
                          </li>
                          <li className="nav-item">
                              <a href="#" className="nav-link" onClick={karanlikMod}>Karanlık Mod</a>
                          </li>
                      </ul>
                      <form className="d-flex" >
                          <div className="usernameDiv">
                              <span>
                              {username.length > 0 && username}
                              </span>
                          </div>
                          {username.length > 0 ? <button className="btn btn-outline-success" type="button" onClick={logout}>Çıkış Yap</button> : <Link className="btn btn-outline-success" to="login">Giriş Yap</Link>}

                      </form>
                  </div>
              </div>
          </nav>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new" element={<New />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
