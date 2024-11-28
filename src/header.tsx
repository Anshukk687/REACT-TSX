import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const userInfo = localStorage.getItem('user-info');
    const user = userInfo ? JSON.parse(userInfo) : null;

    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate("/register");
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#">E-commerce</Navbar.Brand>
                <Nav className='mr-auto nav_bar_wrapper'>
                    {
                        user ?
                        <>
                            <Link to="/">Product List</Link>
                            <Link to="/add">Add Product</Link>
                            <Link to="/search">Search Product</Link>
                        </>
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/Register">Register</Link>
                        </>
                    }
                </Nav>
                {
                    user ?
                    <>
                        <Nav className='ml-auto'>
                            <NavDropdown title={user.user.name}>
                                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </>
                    : null
                }
            </Navbar>
        </div>
    )
}

export default Header;
