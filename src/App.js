import './App.css';
import Main from './components/Main';
import {useState,useEffect} from "react";
function App() {
    const [todos,setTodos] = useState([{label:"Give talks",isCompleted:true},{label:"Write tutorials",isCompleted:false},{label:"Have a life!",isCompleted:false}]);
    const [filters,setFilters] = useState(0);
    const [name,setName] = useState("");
    const [empty,setEmpty] = useState(false);
    useEffect(()=>{//get & set select status.
        let _empty = true;
        todos.map((item)=>{
            if(item.isCompleted==true){
                _empty = false;
            }
        });
        setEmpty(_empty);
    },[todos]);

    const changeToggle = (e) => {//apply a filter.
        setFilters(e.target.value);
    };
    const formSubmitted = (e) => {//add new to-do.
        e.preventDefault();
        if(name===""){
            return false;
        }
        setTodos([...todos,{label:name,isCompleted:false}]);
        setName("");
    };
    const removeCompleteTodos = (e) => {//remove selected todos.
        const _removed = todos.filter(function(el) { return el.isCompleted == false; });
        setTodos([..._removed]);
    };
  return (
      <>
      <section className="todoapp">
        <header className="header">
            <div className="glitchContainer">
            <p className="glitch"><span aria-hidden="true">todos</span>todos<span aria-hidden="true">todos</span></p>
            </div>
          <form onSubmit={formSubmitted}>
            <input className="new-todo" placeholder="What needs to be done?" id="name" name="name" value={name} onChange={(e)=>setName(e.target.value)} autoFocus/>
          </form>
        </header>
        <Main list={todos} setList={setTodos} filt={filters} />
        <footer className="footer">
		<span className="todo-count">
			<span style={{fontWeight:"800"}}>{todos.length}</span>&nbsp;items
		</span>
            <div className="tabs">
                <label className="tab">
                    <input type="radio" name="filters" className="tab-input" value="0" onChange={changeToggle} defaultChecked />
                    <div className="tab-box">All</div>
                </label>
                <label className="tab">
                    <input type="radio" name="filters" className="tab-input" value="1" onChange={changeToggle} />
                    <div className="tab-box">Active</div>
                </label>
                <label className="tab">
                    <input type="radio" name="filters" className="tab-input" value="2" onChange={changeToggle} />
                    <div className="tab-box">Completed</div>
                </label>
            </div>
            {!empty?(
                <button className="clear-completed" onClick={removeCompleteTodos}>Clear completed</button>
            ):undefined}
        </footer>
      </section>
      <a href="https://github.com/icetinturkey" target="_blank" className="copyright">https://github.com/icetinturkey</a>
      </>
  );
}

export default App;
