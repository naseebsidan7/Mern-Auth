import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import waterFall from '../../public/images/wallpaperflare.com_wallpaper(20).jpg'
function HeroSection() {
  const {userInfo} = useSelector((state)=>state.auth)

  return (
    <Card className="text-center bgImage"    bg='light'>
      <Card.Header> </Card.Header>
      <Card.Body >
        <Card.Title className='headingMern'><h1 style={{color:'#e4fdfd'}}>MERN Authentication</h1></Card.Title>
        <Card.Text>
           This is simple Mern Project Done By naseeb sidan For Education Purpose 
        </Card.Text>
        <div >
       

      { userInfo?(<></> ) : (<>
        <LinkContainer  style={{backgroundColor:'white',color:'black',borderColor:'whitesmoke',width:'100px',marginTop:'20px'}}  to='/login'>
        <Button className=' me-3 ' >Login</Button>
        </LinkContainer>

        <LinkContainer to='/register' style={{backgroundColor:'transparent',color:'white',borderColor:'white',width:'100px',marginTop:'20px'}}>
        <Button >SignUp</Button>
        </LinkContainer>

        
        </>)
       }
        </div>
      </Card.Body>
      
      <Card.Footer
        
        className="text-muted"
      >
        {userInfo ? <h2 className='userNameHome' >Welcome <span style={{color:'#f27b7bfe'}} >{userInfo.name}</span> </h2> : <></>}
        
      </Card.Footer>

    </Card>
  );
}

export default HeroSection;