import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function Header(props) {

const handleLogout=()=>{
    axios.get('/api/logout')
    .then(res=>{
      if(res.data.Status==="Success"){
        window.location.reload(true);    
      }else {
        alert("error ")
      }
      
    }).catch(err=>console.log(err))
  }


  return (
    <Navbar bg="dark" expand="lg" variant="dark" style={{ padding: '0.05rem 2rem' }}>
      <Container fluid>
        {/* <Navbar.Brand href="#">CRIS</Navbar.Brand> */}
        <a className="navbar-brand" href="#">
          {/* <img src={logo} style={{margin: -5 , marginLeft:4}} width="180" height="40" alt="logo" /> */}
          <p>mess</p>

        </a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mb-12 mb-lg-0">
            {/* <Nav.Link href="#">Home</Nav.Link> */}
            {/* <Nav.Link href="#zone">Zone</Nav.Link> */}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            <Nav.Link href="#welcome">Welcome {props.displayName}!!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  
}

export default Header;
