import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, settodo] = useState("")

  // todos contains array of todo
  const [todos, settodos] = useState([])


  const [showFinished, setshowFinished] = useState(false)


  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      settodos(savedTodos);
    }
  }, []);
  

  // saving the todos to local storage
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo);

    let newtodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newtodos)

    saveToLS()
  }

  const handleDelete = (e, id) => {

    let newtodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newtodos)

    saveToLS()

  }

  const handleAdd = () => {
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    settodo("")

    saveToLS()

  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)

    saveToLS()

  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  
  

  return (
    <>
      <Navbar />

      <div className="mx-3 md:container my-[18vh] rounded-xl p-5 bg-indigo-100 bg-opacity-35 md:mx-auto md:w-[35%] min-h-full">
      <h1 className='font-bold text-2xl text-center'>Task X - Manage your Tasks at one place</h1>

        <div className="addTodo my-5 flex flex-col gap-4">

          <h2 className='text-lg font-bold'>Add a Todo</h2>

          <input onChange={handleChange} value={todo} className='w-full px-5 py-1 rounded-full' type="text" />

          <button onClick={handleAdd} disabled={todo.length < 1} className='bg-violet-800 disabled:bg-red-600 disabled:cursor-not-allowed hover:bg-violet-950 p-2 py-1 text-white rounded-md text-sm font-bold'>Save</button>

        </div>
        {/* end of addTodo */}

        <input className='my-4' onChange={toggleFinished} type="checkbox" name="" id="" checked={showFinished}/> Show finished Tasks

        <div className='bg-black h-[0.5px] mb-1'></div>

        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos">

          {todos.length === 0 && <div className='m-5 hover:cursor-not-allowed transition-all'>No Todos to Display :(</div>}

          {todos.map(item=> {

  

          return(showFinished || !item.isCompleted) && <div key={item.id} className="todo my-3 flex justify-between">

            <div className='flex gap-5'>
           <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>

            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><FaEdit /></button>

              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete /></button>
            </div>
            {/* end of button div */}

          </div>
          {/* end of todo div */}

        })}

        </div>
        {/* emd of todos div */}

      </div>
      {/* end of container div*/}
    </>
  )
}

export default App
