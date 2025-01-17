import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client' 
import App from './App.jsx'


function  Myapp2(){
  return(
    <div>
      <h1>Zelle Solutions App</h1>
      </div>
  )
}
const anotherElement = (
  
   <a href="https://google.com" target='_blank'>Visit Google</a>

)

const reactElement = React.createElement(
  'a',
  {href: 'https://google.com', target: '_blank'},
  'Click me to visit google'
)

ReactDOM.createRoot(document.getElementById('root')).render(
 
    //<Myapp2 />
    //anotherElement
    //reactElement
    <App />
)
