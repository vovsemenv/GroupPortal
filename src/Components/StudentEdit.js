import React, { useState } from "react"
import {Modal,Button,Form} from 'react-bootstrap'
export default function StudentNews(params){
    var url = new URL(window.location);
    var c = url.searchParams.get("id");
    let [data,setData] = useState(sample)
    if(data==sample){ fetch(`http://localhost:3010/students/${c}`).then(
        val=>{
            val.json().then(students=>{
                console.log(students)
                setData(students);
                document.querySelector("#NewsTitle").value = students.name;
                document.querySelector("#NewsText").value = students.about;
                document.querySelector("#NewsImg").value = students.img;
                
            })
        }
    );
    }
    let [EditedTitle,setEditedtitle] = useState(false); 
    function save(){
        let data = 
      {
      name: document.querySelector("#NewsTitle").value,
      about: document.querySelector("#NewsText").value,
      img:document.querySelector("#NewsImg").value
      }
      fetch(`http://localhost:3010/students/${c}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
    }
   
    
    return (
        <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Имя студента</Form.Label>
                    <Form.Control type="text" id="NewsTitle" placeholder={data.name} />
                </Form.Group>
                
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>О студенте</Form.Label>
                    <Form.Control as="textarea" id="NewsText" rows="3" placeholder={data.about} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Ссылка на аватарку</Form.Label>
                    <Form.Control type="" id="NewsImg" placeholder={data.img} />
                </Form.Group>
                
            <Button onClick={save}>Сохранить</Button>
            </Form>
    )
}
const sample = {title:"Заголовок",text:"Текст",img:"dfg"};