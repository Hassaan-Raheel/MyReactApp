import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

let [counter, setcounter ] = useState(0)

const addvalue = () => {
  console.log("clicked",counter);
  setcounter(counter + 1)  
}

const removevalue = () => {
  if (counter > 0) {
    console.log("Clicked", counter);
    setcounter(counter - 1);
  }
};
  return (
    <>
     <h1>FOODPANDA </h1>
     <h2>Add To Cart <br /> <br /> <button
     onClick={removevalue}
     >-</button>{counter } <button
     onClick={addvalue}
     >+ </button>  </h2>
    <h2>Total items selected <br/>{counter}</h2>
    </>
  )
}

export default App
