import { useState, useEffect } from "react";

function Home() {
    const [todos, setTodos] = useState([]);



    useEffect(() => {
        async function getTodos() {
            const response = await fetch('https://63133194a8d3f673ffc62c26.mockapi.io/todos', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                },
            });
            const data = await response.json();
            setTodos(data);
            document.querySelector('#loadingDiv').classList.add("d-none");
        }
        getTodos();
    }, []);


    function changeState(e) {
        e.preventDefault();
        e.target.classList.toggle("disabled");
        const todoId = e.target.dataset['i'];
        const todoState = e.target.dataset['d'];
        let nextState = false;
        if(todoState=="false") nextState=true;
        putRq(todoId,nextState).then((result)=>{
            let updatedList = todos.map(item =>
            {
                if (item.id == todoId){
                    return {...item, isCompleted: !item.isCompleted};
                }
                return item;
            });
            setTodos(updatedList);
            e.target.classList.toggle("disabled");
        });
    }

    async function putRq(todoId,state) {
        const response = await fetch('https://63133194a8d3f673ffc62c26.mockapi.io/todos/'+todoId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "isCompleted": state })
        });
        const data = await response.json();
        return data;
    }


    document.addEventListener('shown.bs.modal', event => {
        const todoId = event.relatedTarget.dataset['i'];
        todos.map(item =>
        {
            if (item.id == todoId){
                document.querySelector('.modal-title').innerHTML = "To-Do " + todoId;
                document.querySelector('.text-area').value = item.content;
            }
        });

    })
    document.addEventListener('hidden.bs.modal', event => {
        document.querySelector('.modal-title').innerHTML = "To-Do";
        document.querySelector('.text-area').value = "";
    })
    function saveContent(e) {
        e.preventDefault();
        e.target.classList.toggle("disabled");
        const todoId = document.querySelector('.modal-title').innerHTML.split(' ')[1];
        putRq2(todoId,document.querySelector('.text-area').value).then((result)=>{
            let updatedList = todos.map(item =>
            {
                if (item.id == todoId){
                    return {...item, content: result.content};
                }
                return item;
            });
            setTodos(updatedList);
            e.target.classList.toggle("disabled");
            document.getElementById("closeBtn").click();
        });
    }
    async function putRq2(todoId,content) {
        const response = await fetch('https://63133194a8d3f673ffc62c26.mockapi.io/todos/'+todoId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "content": content })
        });
        const data = await response.json();
        return data;
    }
    //todos.forEach(todo => {
    function removeTodo(e) {
        e.preventDefault();
        const todoId = e.target.dataset['i'];
        deleteRq(todoId).then((result)=>{
            setTodos(todos.filter(item => item.id !== result.id));
        });
    }
    async function deleteRq(todoId) {
        const response = await fetch('https://63133194a8d3f673ffc62c26.mockapi.io/todos/'+todoId, {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            }
        });
        const data = await response.json();
        return data;
    }

    return (
        <div className="App container mt-4">
            <h2 id="loadingDiv" className="text-center">Yükleniyor ....</h2>
            <div className="row">

                {Array.isArray(todos)
                    ? todos.map((todo, index) => (
                        <div className="col-md-4 mt-4" key={index}>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">
                                    To-Do {todo.id}&nbsp;|&nbsp;
                                    {todo.isCompleted ? <b className="text-success">✓</b> : <b className="text-danger">✗</b>}
                                </h5>
                                <p className="card-text">{todo.content}&nbsp;<button data-bs-toggle="modal" data-bs-target="#myModal" data-i={todo.id.toString()}>&nbsp;✎&nbsp;</button></p>
                                <div className="d-flex justify-content-center">
                                <button type="button" className="btn btn-outline-primary btn-sm me-1" onClick={changeState} data-i={todo.id.toString()} data-d={todo.isCompleted.toString()}>Durum</button>
                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={removeTodo} data-i={todo.id.toString()}>Sil</button>
                                </div>
                            </div>
                        </div>
                        </div>

                    ))
                    : null}

            </div>

            <div className="modal fade" tabIndex="-1" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">To-Do</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><textarea className="form-control text-area"></textarea>
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="closeBtn" className="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                            <button type="button" className="btn btn-primary" onClick={saveContent}>Kaydet</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;