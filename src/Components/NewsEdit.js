import React, { useState } from "react"
import {Modal,Button,Form} from 'react-bootstrap'
export default function EditNews(params){
    var url = new URL(window.location);
    var c = url.searchParams.get("id");
    let [data,setData] = useState(sample)
    if(data==sample){ fetch(`http://localhost:3010/news/${c}`).then(
        val=>{
            val.json().then(students=>{
                console.log(students)
                setData(students);
                document.querySelector("#NewsTitle").value = students.title;
                document.querySelector("#NewsText").value = students.text;
                console.log(students.Img)
                document.querySelector("#NewsImg").value = students.img;
            })
        }
    );
    }
    let [EditedTitle,setEditedtitle] = useState(false); 
    function save(){
        let data = 
      {
      title: document.querySelector("#NewsTitle").value,
      text: document.querySelector("#NewsText").value,
      img:document.querySelector("#NewsImg").value
      }
      fetch(`http://localhost:3010/news/${c}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
    }
    let value = "Заголовок"
    
    
    return (
        <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Заголовок новости</Form.Label>
                    <Form.Control type="text" id="NewsTitle" placeholder={data.title} />
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Текст новости</Form.Label>
                    <Form.Control as="textarea" id="NewsText" rows="3" placeholder={data.text} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ссылка на пркрепляемое изображение</Form.Label>
                    <Form.Control type="" id="NewsImg" placeholder={data.img} />
                </Form.Group>
                
            <Button onClick={save}>Сохранить</Button>
            </Form>
    )
}
const sample = {title:"Заголовок",text:"Текст",img:"dfg"};