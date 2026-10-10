import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [showPassword,setShowPassword]=useState(false);

    const handleSubmit=(e)=>{

        e.preventDefault();

        login({

            name:"AGVI Customer",

            email

        });

        navigate("/");

    };

    return(

        <section className="login-page">

            <div className="login-card">

                <h1>

                    Welcome Back

                </h1>

                <p>

                    Login to continue shopping

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>

                            Email

                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Password

                        </label>

                        <div className="password-box">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={()=>
                                    setShowPassword(!showPassword)
                                }
                            >

                                {showPassword
                                    ? <FaEyeSlash/>
                                    : <FaEye/>
                                }

                            </button>

                        </div>

                    </div>

                    <div className="login-options">

                        <label>

                            <input type="checkbox"/>

                            Remember Me

                        </label>

                        <Link to="/forgot-password">

                            Forgot Password?

                        </Link>

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >

                        Login

                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Login;