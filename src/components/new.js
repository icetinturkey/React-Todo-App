import { useNavigate } from 'react-router-dom';
function New() {
    const navigate = useNavigate();
    function newTodo(e) {
        e.preventDefault();
        let icerik = document.querySelector('.content-text').value;
        if(icerik.length>3){
        postRq(icerik).then((result)=>{
            navigate('/');
        });
        }else{alert('En az 3 karakter girin.');}

    }
    async function postRq(content) {
        const response = await fetch('https://63133194a8d3f673ffc62c26.mockapi.io/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "content": content })
        });
        const data = await response.json();
        return data;
    }
    return (
        <div className="App container mt-4">

            <div className="card" style={{"maxWidth":"767px","margin":"0 auto"}}>
                <div className="card-header">
                    Yeni Kayıt Ekle
                </div>
                <div>
                    <div style={{"padding":"20px"}}>
                        <label htmlFor="firstName" className="form-label">İçerik:</label>
                        <textarea className="form-control content-text"></textarea>
                        <div className="d-flex justify-content-center mt-2">
                            <button type="button" className="btn btn-primary" onClick={newTodo}>Ekle</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default New;