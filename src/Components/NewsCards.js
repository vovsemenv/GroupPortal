import React, { useState } from 'react'
import {CardColumns,Card, Container, Row, Col, CardDeck} from 'react-bootstrap'

function CustomCard(props){
    return(
        <Col md="6" xl="4" className="mb-2 newscard">
            <Card>
              <Card.Img variant="top" src={props.img}/>
              <Card.Title>{props.Title}</Card.Title>
              <Card.Text className="newstext">{props.Text}</Card.Text>
             </Card>
        </Col>
    )
}

export default function NewsCards(props){
    
    let i = 0;
    let [newsData,setNewsData] = useState([])
    
    if(newsData.length==0){ fetch(`${props.dataURL}/news`).then(
        val=>{
            val.json().then(students=>{
                console.log(students)
                setNewsData(students);
            })
        }
    );
    }
    let content = newsData.map(post=>{
        return <CustomCard Title={post.title} Text={post.text} img={post.img} eventKey={i++} />
    })
    return (
        <Container>
        <CardDeck>
            {content}            
        </CardDeck>
        </Container>
    )
}