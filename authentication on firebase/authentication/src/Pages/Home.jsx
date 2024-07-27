import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../App.css"
import "./Home.css"
function Home() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isSignUpActive, setisSignUpActive] = useState(true)
    const [error, seterror] = useState("")

    const navigate = useNavigate();

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSignIn() {
        if (!email || !password) {
            seterror('Email and password both are required')
            return
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                navigate("/private")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterror(errorMessage)
                console.log({ errorCode, errorMessage })
            })
            setEmail("")
        setPassword("")
    }

    function handleSignUp() {
        if (!email || !password) {
            seterror('Email and password both are required')
            return
        }
        

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                navigate('/private')
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                seterror(errorMessage)
                console.log({ errorCode, errorMessage })
            })

            setEmail("")
        setPassword("")
    }
    function handleMethodChange() {
        setisSignUpActive(!isSignUpActive)
        seterror("");
    }

    function handleFormSubmit() {
       
    }
    return (
        <div className="form-container">
         <form className="form" onSubmit={handleFormSubmit}>
            {isSignUpActive && <legend><h2>Sign Up</h2></legend>}
            {!isSignUpActive && <legend><h2 id="h2">Sign In </h2></legend>}
            <fieldset>
                <ul>
                    <li>
                        <label htmlFor="email" > Email:</label>
                        <input type="email" id="email" placeholder="Enter your email..." value={email} onChange={handleEmailChange} className="input-field"/>
                    </li>
                    <li>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password..." value={password} onChange={handlePasswordChange} className="input-field"/>
                    </li>
                </ul>
                {error && <p id="error-message">{error}</p>}
                {isSignUpActive && (
                    <button type="button" onClick={handleSignUp} className="button sign-up-btn">Sign Up</button>
                )}
                {!isSignUpActive && (
                    <button type="button" onClick={handleSignIn} className="button sign-in-btn">Sign In</button>
                )}
            </fieldset>
        <p>
            {isSignUpActive && <span onClick={handleMethodChange}>Already have an account? <a className="link">Sign In</a> </span> }



            {/* {isSignUpActive && <a onClick={handleMethodChange}>Already have an account? Sign In </a>} */}
            {!isSignUpActive && <span onClick={handleMethodChange}>Don't have an account? <a className="link"> Sign Up</a> </span>}
            </p>
        </form>
        </div>

    )
}

export default Home