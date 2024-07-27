import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Private from './Pages/Private'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
 const [user, setUser] = useState(null)
 const [isFetching, setFetching] = useState(true)

 useEffect(()=>{
  const unsebscribe = onAuthStateChanged(auth,(user)=>{
      setUser(user)
      setFetching(false)
  })
    
    return ()=> unsebscribe()
  
  },[])

 if(isFetching){
  return <h1>Loading...</h1>
 }

  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/private' element={<ProtectedRoute user={user}><Private/></ProtectedRoute>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App