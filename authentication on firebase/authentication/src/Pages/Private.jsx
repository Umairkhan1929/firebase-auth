import React from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import "./Private.css"

function Private() {
 
const handleSignout=()=>{
  signOut(auth)
  .then(()=>{
    alert("SignOut Successfully!")
  })
  .catch(error=>{
    console.log(error)
    alert(error.message)
  })
}

    return (
      <div style={{display:'flex',justifyContent:'center', flexDirection: 'column'}} className="private-container">
        <h1 className="private-h1">Welcome to the Dashboard</h1><br />
        <main className="private-content">
          <h2>Your profile</h2><br />
          <p>Welcome to the Dashboard. Here you can manage your setting and preferences.</p><br />
        </main>
       <footer className="private-footer">
        <button onClick={handleSignout}>SignOut</button>
        </footer>
      </div>
    )
  }
  
  export default Private