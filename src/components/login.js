import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [inp1, setInp1] = useState([]);
    const navigate = useNavigate();
    function login(){
        if(inp1.length>3){
            localStorage.setItem('username',inp1);
            navigate('/');
        }else{
            alert("En az 3 karakter girmelisiniz !");
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(inp1.length>3){
                localStorage.setItem('username',inp1);
                navigate('/');
            }else{
                alert("En az 3 karakter girmelisiniz !");
            }
        }
    }
    return (
        <div className="App signin">
            <main className="form-signin w-100 m-auto">

                    <img className="mb-4" src="https://www.svgrepo.com/show/151143/login.svg" alt="" width="72" height="57" />
                        <h1 className="h3 mb-3 fw-normal">Üye Girişi</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="" onChange={event => setInp1(event.target.value)} onKeyDown={handleKeyDown} />
                                <label htmlFor="floatingInput">Kullanıcı Adı</label>
                        </div>


                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" checked disabled /> Beni Hatırla
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={login}>Giriş Yap</button>
                        <p className="mt-5 mb-3 text-muted">© github.com/icetinturkey</p>

            </main>
        </div>
    );
}

export default Login;