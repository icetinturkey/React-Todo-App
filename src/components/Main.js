import '../App.css';
import {useState,useEffect} from "react";
import PropTypes from "prop-types";
function Main({list,setList,filt}){
    const [arrow,setArrow] = useState(false);
    const onChangeCheck = (e) => {//change the status of a specific to-do.
        list.map((item)=>{
            if(item.label==e.target.name){
                item.isCompleted=!item.isCompleted
            }
        });
        setList([...list]);
    };
    useEffect(()=>{//trigger if anyone changed & set arrow button's state.
        let _all = true;
        list.map((item)=>{
            if(item.isCompleted==false){
                _all = false;
            }
        });
        setArrow(_all);
    });
    const setAllTodos = (e) => {//change the status of all todos.
        const _set = !arrow;
        list.map((item)=>{
            item.isCompleted=_set;
        });
        setList([...list]);
    };
    const onChangeInput = (e) => {//change the label of a specific to-do.
        list.map((item)=>{
            if(item.label==e.target.name){
                item.label=e.target.value
            }
        });
        setList([...list]);
    };
    const destroyTodo = (e) => {//remove a specific to-do.
        const _filtered = list.filter(function(el) { return el.label != e.target.name; });
        setList([..._filtered]);
    };
    const filtered = list.filter((item)=>{//apply a filter
        if(filt==0){return item;}
        if(filt==1){return item.isCompleted==false;}
        if(filt==2){return item.isCompleted==true;}
    });
    return(
        <section className="main">
            <input className="toggle-all" id="toggle-all" type="checkbox" checked={arrow} onChange={setAllTodos} />
            <label htmlFor="toggle-all">
                Mark all as complete
            </label>
            <ul className="todo-list">
            {
                filtered.map((item,index)=>(
                    <li key={index} className={item.isCompleted?"completed":undefined}>
                        <div className="view">
                            <input name={item.label} className="toggle" type="checkbox" checked={item.isCompleted} onChange={onChangeCheck} />
                            <input name={item.label} type="text" className="label" value={item.label} onChange={onChangeInput} />
                            <button name={item.label} className="destroy" onClick={destroyTodo}></button>
                        </div>
                    </li>
                ))
            }
            </ul>
        </section>
    );
}
Main.propTypes = {
    filt:PropTypes.number.isRequired,
    list:PropTypes.array
};
export default Main;