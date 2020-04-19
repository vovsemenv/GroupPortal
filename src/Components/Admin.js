import React,{useState} from 'react'
import { Jumbotron,Button, Row, Col, Container, Modal, Form} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import EditNews from './NewsEdit';
import StudentNews from './StudentEdit';



export default function Admin(props){
    const [modalShowNewsCreate, setModalShowNewsCreate] = React.useState(false);
    const [modalShowNewsEdit, setModalShowNewsEdit] = React.useState(false);
    const [modalShowStudentEdit, setModalShowStudentEdit] = React.useState(false);
    const [modalShowStudentsCreate, setModalShowStudentsCreate] = React.useState(false);
    
    let { slug } = useParams();

    return(
      
        <Container>
        
        
        <Switch>
          <Route exact path="/admin">
          <Jumbotron>
              <div style={{textAlign:"center"}}>Новости</div>
              <Row>
                  <Col xs="12" md="6"><Button onClick={() => setModalShowNewsCreate(true)}>Добавить новость</Button></Col>
                  <Col xs="12" md="6"><Button onClick={()=>setModalShowNewsEdit(true)}>Редактировать новость</Button></Col>
              </Row>
          </Jumbotron>
          <Jumbotron>
              <div style={{textAlign:"center"}}>Студенты</div>
              <Row>
                  <Col xs="12" md="6" ><Button onClick={() => setModalShowStudentsCreate(true)}>Добавить студента</Button></Col>
                  <Col xs="12" md="6" ><Button onClick={()=> {console.log("fdsf"); setModalShowStudentEdit(true)}} >Редактировать студента</Button></Col>
              </Row>
          </Jumbotron>
          
          </Route>
          <Route path={`/admin/news/`}><EditNews></EditNews></Route>  
          <Route path={`/admin/student/`}><StudentNews></StudentNews></Route>  
          </Switch>
        
        
        <MyVerticallyCenteredModalNewsCreate          
          show={modalShowNewsCreate}
          onHide={() => setModalShowNewsCreate(false)}
        />
        <MyVerticallyCenteredModalStudentsCreate
           show={modalShowStudentsCreate}
          onHide={() => setModalShowStudentsCreate(false)}
        />
        <MyVerticallyCenteredModalNewsEdit
           show={modalShowNewsEdit}
          onHide={() => setModalShowNewsEdit(false)}
        />
        <MyVerticallyCenteredModalStudentsEdit
           show={modalShowStudentEdit}
          onHide={() => setModalShowStudentEdit(false)}
        />
       
        </Container>
        
    )

}



function MyVerticallyCenteredModalNewsCreate(props) {
    function addnews(){
      let data = 
      {
      title: document.querySelector("#NewsTitle").value,
      text: document.querySelector("#NewsText").value,
      img:document.querySelector("#NewsImg").value
      }
      fetch("http://localhost:3010/news",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      props.onHide()
    }
  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>Создание новости</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Заголовок новости</Form.Label>
                    <Form.Control type="text" id="NewsTitle" placeholder="Заголовок" />
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Текст новости</Form.Label>
                    <Form.Control as="textarea" id="NewsText" rows="3" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ссылка на пркрепляемое изображение</Form.Label>
                    <Form.Control type="" id="NewsImg" placeholder="https://i.imgur.com/..." />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer style={{justifyContent:"center"}}>
          <Button onClick={addnews}>Опубликовать</Button>
        </Modal.Footer>
      </Modal>
    );
  }
function MyVerticallyCenteredModalNewsEdit(props) {
  let [options,setoption] = useState([]);

  if(options.length==0){
    fetch(`http://localhost:3010/news`).then(
      val=>{
          val.json().then(students=>{
              let opts = students.map(vay=><option>{vay.title}</option>);
              setoption(opts)
          })
      }
  );
  
  }
  
    function cl(){
      props.onHide();
      window.location = `http://localhost:3000/admin/news?id=${document.querySelector("#newsid").selectedIndex}`
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>Редактирование новости</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formGridState">
              <Form.Label>Редактируемая новость</Form.Label>
              <Form.Control id="newsid" as="select">
                {options}
              </Form.Control>
            </Form.Group>

                
            </Form>
        </Modal.Body>
        <Modal.Footer style={{justifyContent:"center"}}>
          <Button onClick={cl}>Выбрать</Button>
        </Modal.Footer>
      </Modal>
    
    );
  }
function MyVerticallyCenteredModalStudentsEdit(props) {
    
  let [options,setoption] = useState([]);

  if(options.length==0){
    fetch(`http://localhost:3010/students`).then(
      val=>{
          val.json().then(students=>{
              let opts = students.map(vay=><option>{vay.name}</option>);
              setoption(opts)
          })
      }
  );
  
  }
  
  
    function cl(){
      props.onHide();
      window.location = `http://localhost:3000/admin/student?id=${document.querySelector("#studentid").selectedIndex}`
    }
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
  
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        <span>Редактирование Студента</span>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
        <Form.Group controlId="formGridState">
          <Form.Label>Редактируемый студент</Form.Label>
          <Form.Control id="studentid" as="select">
            {options}
          </Form.Control>
        </Form.Group>

            
        </Form>
    </Modal.Body>
    <Modal.Footer style={{justifyContent:"center"}}>
      <Button onClick={cl}>Выбрать</Button>
    </Modal.Footer>
  </Modal>
    );
  }
function MyVerticallyCenteredModalStudentsCreate(props) {
  function addstudent(){
    let data = 
    {
    name: document.querySelector("#StudentName").value,
    about: document.querySelector("#StudentAbout").value,
    img:document.querySelector("#StudentImg").value
    }
    fetch("http://localhost:3010/students",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    props.onHide()
  }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>Добавление студента</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Имя студента</Form.Label>
                    <Form.Control type="text" id="StudentName" placeholder="Заголовок" />
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Небольшое описание</Form.Label>
                    <Form.Control as="textarea" id="StudentAbout" rows="3" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ссылка на пркрепляемое изображение(аватар)</Form.Label>
                    <Form.Control type="" id="StudentImg" placeholder="https://i.imgur.com/..." />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer style={{justifyContent:"center"}}>
          <Button onClick={addstudent}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }