
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import StudentDetails from './pages/StudentDetails'
StudentDetails


function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/student-details' element={<StudentDetails/>}/>
    </Routes>
     
    </>
  )
}

export default App
