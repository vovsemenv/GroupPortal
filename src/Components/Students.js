import React,{useState,useEffect} from 'react'
import {Accordion,Card, CardDeck,Col, Container} from 'react-bootstrap'
export function StudentCard(props){

    return (
        <Card>
                <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
                {props.Title} <img classname="Little-Ava" className="User-Avatar-Toggle" src={props.img}/>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={props.eventKey}>
                <Card.Body>
                <Card.Img variant="top" src={props.img}/>
                    {props.about}
                </Card.Body>
                </Accordion.Collapse>
            </Card>

    )
}
function CustomCard(props){
    
    return(
        <Col md="6" xl="4" className="mb-2 newscard">
            <Card>
              <Card.Img variant="top" src={props.img}/>
              <Card.Title>{props.Title}</Card.Title>
              <Card.Text className="newstext">{props.about}</Card.Text>
             </Card>
        </Col>
    )
}

function useWindowSize() {

    const isClient = typeof window === 'object';
  
  
  
    function getSize() {
  
      return {
  
        width: isClient ? window.innerWidth : undefined,
  
        height: isClient ? window.innerHeight : undefined
  
      };
  
    }
  
  
  
    const [windowSize, setWindowSize] = useState(getSize);
  
  
  
    useEffect(() => {
  
      if (!isClient) {
  
        return false;
  
      }
  
      
  
      function handleResize() {
  
        setWindowSize(getSize());
  
      }
  
  
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
  
    }, []); // Empty array ensures that effect is only run on mount and unmount
  
  
  
    return windowSize;
  
  }
export default function Students(props){
    let i = 0;
    let size = useWindowSize();
    let cont1;
    let cont2;
    let content;
    
    let [data,setdata] = useState([]);
    if(data.length==0){ fetch(`${props.dataURL}/students`).then(
        val=>{
            val.json().then(students=>{
                console.log(students)
                setdata(students);
            })
        }
    );
    }
    cont1 = data.map(student=>{
        return <StudentCard Title={student.name} about={student.about} img={student.img} eventKey={i++} />
    })
    cont2 = data.map(student=>{
        return <CustomCard Title={student.name} about={student.about} img={student.img} eventKey={i++} />
    })

    if(size.width<770){
        content = (
            <Accordion>
                {cont1}
                
            </Accordion>
        );
    }else{
        content = (
            <CardDeck>
                {cont2}
            </CardDeck>
        );
    }


    return (
        <Container>
        {content}
        </Container>
    )
}