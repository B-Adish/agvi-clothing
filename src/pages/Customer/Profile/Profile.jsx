import "./Profile.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile(){

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout=()=>{

        logout();

        navigate("/login");

    };

    return(

        <section className="profile-page">

            <div className="container">

                <div className="profile-card">

                    <div className="profile-avatar">

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <h2>

                        {user?.name}

                    </h2>

                    <p>

                        {user?.email}

                    </p>

                    <div className="profile-menu">

                        <button>

                            My Orders

                        </button>

                        <button>

                            Wishlist

                        </button>

                        <button>

                            Saved Addresses

                        </button>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >

                            Logout

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Profile;