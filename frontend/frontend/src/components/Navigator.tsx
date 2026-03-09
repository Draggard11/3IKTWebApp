import { NavLink } from "react-router"

const Navigator = () => {
    return (
        <div>
            <div>
                {/*"ingrapon, ruva, VCSCHCIBP"*/}
                <h1>Vietnamese Blog</h1>
                <nav>
                    <NavLink to="/Home">Chicken</NavLink> 
                    <NavLink to="/Blogs">Blogs</NavLink>
                    <NavLink to="/Login">Login</NavLink>
                    <NavLink to="/Register">Register</NavLink>
                </nav>
            </div>
        </div>
    )
}