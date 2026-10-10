import "./ForgotPassword.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {

    const [email,setEmail]=useState("");

    const [submitted,setSubmitted]=useState(false);

    const handleSubmit=(e)=>{

        e.preventDefault();

        setSubmitted(true);

    };

    return(

        <section className="forgot-page">

            <div className="forgot-card">

                <h1>

                    Forgot Password

                </h1>

                <p>

                    Enter your registered email address.

                </p>

                {!submitted ? (

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

                        <button
                            className="forgot-btn"
                            type="submit"
                        >

                            Send Reset Link

                        </button>

                    </form>

                ) : (

                    <div className="success-box">

                        <h3>

                            Email Sent ✅

                        </h3>

                        <p>

                            Password reset instructions have been sent to your email.

                        </p>

                    </div>

                )}

                <div className="back-login">

                    <Link to="/login">

                        Back to Login

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default ForgotPassword;