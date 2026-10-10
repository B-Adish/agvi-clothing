import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";

function Register() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form,setForm]=useState({

        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:""

    });

    const [showPassword,setShowPassword]=useState(false);

    const [showConfirmPassword,setShowConfirmPassword]=useState(false);

    const handleChange=(e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(form.password!==form.confirmPassword){

            alert("Passwords do not match");

            return;

        }

        login({

            name:form.name,

            email:form.email

        });

        navigate("/");

    };

    return(

        <section className="register-page">

            <div className="register-card">

                <h1>

                    Create Account

                </h1>

                <p>

                    Join AGVI Clothing today.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>

                            Full Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Mobile Number

                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter mobile number"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Password

                        </label>

                        <div className="password-box">

                            <input
                                type={showPassword?"text":"password"}
                                name="password"
                                placeholder="Create password"
                                value={form.password}
                                onChange={handleChange}
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

                    <div className="form-group">

                        <label>

                            Confirm Password

                        </label>

                        <div className="password-box">

                            <input
                                type={showConfirmPassword?"text":"password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={()=>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >

                                {showConfirmPassword
                                    ? <FaEyeSlash/>
                                    : <FaEye/>
                                }

                            </button>

                        </div>

                    </div>

                    <label className="terms">

                        <input
                            type="checkbox"
                            required
                        />

                        I agree to the Terms & Conditions

                    </label>

                    <button
                        className="register-btn"
                        type="submit"
                    >

                        Create Account

                    </button>

                </form>

                <div className="login-link">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Register;