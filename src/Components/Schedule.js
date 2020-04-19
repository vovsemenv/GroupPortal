import React, { useState, useEffect } from 'react'
import {Table, Nav, Col, Container, Form,Row} from 'react-bootstrap'

function ScheduleDay(props){
  let d = days[props.d];
    let rows = props.day.map((val,inex)=>{
        return(
            <tr>
                <td>{inex+1}</td>
                <td>{val.name}</td>
                <td>{val.room}</td>
                <td>{val.teacher}</td>
                
                
                
                
            </tr>
        )
    })
    return (
        
        <Col lg="6" xl="4" className="schedule-row">
        <span>{d}</span>
        <Table striped bordered hover size="sm">
        
            <thead>
                <tr>
                <th>Пара</th>
                <th>Название</th>
                <th>Каб</th>
                <th>Преподаватель</th>
                
                </tr>
            </thead>
            <tbody>
                {rows}
                

            </tbody>
</Table>
</Col>

    )
}
let days =["ПН","ВТ","СР","ЧТ","ПТ","CБ"]
export default function Schedule(props){
    let [options,setoptions]= useState([]);
    let [sched,setsched]= useState(schedule);
    
    if(options.length==0){
      fetch(`http://localhost:3010/schedules/`).then(val=>{val.json().then(schedules=>{
        setoptions(schedules.map(sc=><option>{sc.name}</option>));
      })})
    }
    let size = useWindowSize();
    let [activetab,setactivetab] = useState(1);
    let content =<ScheduleDay day={dataTransforn(sched,activetab,true) } title={activetab}></ScheduleDay> ;
    let all;
    function cha(){
      let index = document.querySelector("#groupid").selectedIndex;
      fetch(`http://localhost:3010/schedules/${index}`).then(val=>{val.json().then(schedules=>{
        setsched(schedules.data)
      })})
    }
    
    let mode;//true - deskt,false - mobile
    if(size.width<991){
      mode = true;
      all = (<Nav fill variant="tabs" defaultActiveKey="1">
            
            <Nav.Item>
                <Nav.Link id="d" eventKey="1"  onClick={()=>setactivetab(0)}>ПН</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  eventKey="2" onClick={()=>setactivetab(1)} >ВТ</Nav.Link>
            </Nav.Item>
            <Nav.Item>  
                <Nav.Link  eventKey="3" onClick={()=>setactivetab(2)}>СР</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  eventKey="4" onClick={()=>setactivetab(3)} >ЧТ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="5" onClick={()=>setactivetab(4)} >ПТ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="6" onClick={()=>setactivetab(5)}>СБ</Nav.Link>
            </Nav.Item>
            
            {content}
            
          </Nav>)
    }else{
      all = (
        
        <Row >
        <ScheduleDay day={dataTransforn(sched,0,true) } d={0} title={activetab}></ScheduleDay>
        <ScheduleDay day={dataTransforn(sched,1,true) } d={1} title={activetab}></ScheduleDay>
        <ScheduleDay day={dataTransforn(sched,2,true) } d={2} title={activetab}></ScheduleDay>
        <ScheduleDay day={dataTransforn(sched,3,true) } d={3} title={activetab}></ScheduleDay>
        <ScheduleDay day={dataTransforn(sched,4,true) } d={4} title={activetab}></ScheduleDay>
        <ScheduleDay day={dataTransforn(sched,5,true) } d={5} title={activetab}></ScheduleDay>
        </Row>
        
      )
    }


    useEffect(()=>{

        content = <ScheduleDay  day={dataTransforn(schedule,activetab,true)} title={activetab}></ScheduleDay>
    })
    return (
        <Container className="schedule">       
        <Form.Control onChange={cha} id="groupid" as="select">
            {options}
        </Form.Control>
        {all}

</Container>
        
        
    )
}
function dataTransforn(data,day,flag){//flag true - chet(even) false - nechet(odd)
    return data[day].map((value)=>{
        if(flag){
            return(value.even);
        }else{
            return(value.odd);
        }
    })


}
function getClass(data){
    
}
const schedule = [
  [
    {
      "odd": {
        "name": "Техн. обеспечение АС",
        "type": 0,
        "teacher": "Бескин А.Л.",
        "room": "А-177"
      },
      "even": {
        "name": "Техн. обеспечение АС",
        "type": 0,
        "teacher": "Бескин А.Л.",
        "room": "А-177"
      }
    },
    {
      "odd": {
        "name": "Операционные системы",
        "type": 2,
        "teacher": "Норица В.М.",
        "room": "А-424-1"
      },
      "even": {
        "name": "Операционные системы",
        "type": 1,
        "teacher": "Норица В.М.",
        "room": "А-424-1"
      }
    },
    {
      "odd": {
        "name": "Техн. обеспечение АС",
        "type": 1,
        "teacher": "Бескин А.Л.",
        "room": "Г-301б"
      },
      "even": {
        "name": "Техн. обеспечение АС",
        "type": 1,
        "teacher": "Бескин А.Л.",
        "room": "Г-301б"
      }
    },
    {
      "odd": {
        "name": "7,9,11,15 н. Экон. предприятия",
        "type": 1,
        "teacher": "Белоусова И.В.",
        "room": "А-213м"
      },
      "even": {
        "name": "Операционные системы",
        "type": 0,
        "teacher": "Карпов Д.А.",
        "room": "А-177"
      }
    },
    {
      "odd": {
        "name": "Основы сетевых технологий",
        "type": 0,
        "teacher": "Тулинов С.В.",
        "room": "А-17"
      },
      "even": {
        "name": "10,12 н. Гражд. оборона 2,4,6,8 н. Экономика предприятия",
        "teacher": "Михайлов В.М. Белоусова И.В.",
        "room": "А-9 А-9"
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    }
  ],
  [
    {
      "odd": {
        "name": "Основы сетевых технологий",
        "type": 1,
        "teacher": null,
        "room": "Д-321"
      },
      "even": {
        "name": "Основы сетевых технологий",
        "type": 1,
        "teacher": null,
        "room": "Д-321"
      }
    },
    {
      "odd": {
        "name": "Системы тестирования ПО",
        "type": 0,
        "teacher": "Басок Б.М.",
        "room": "А-214"
      },
      "even": {
        "name": "Системы тестирования ПО",
        "type": 0,
        "teacher": "Басок Б.М.",
        "room": "А-214"
      }
    },
    {
      "odd": {
        "name": "Системы тестирования ПО",
        "type": 1,
        "teacher": "Басок Б.М.",
        "room": "Г-301б"
      },
      "even": {
        "name": "Системы тестирования ПО",
        "type": 2,
        "teacher": "Басок Б.М.",
        "room": "Г-301б"
      }
    },
    {
      "odd": {
        "name": "ОО анализ и проектир. ПО",
        "type": 1,
        "teacher": "Смольянинова В.А.",
        "room": "Г-301б"
      },
      "even": {
        "name": "ОО анализ и проектир. ПО",
        "type": 0,
        "teacher": "Смольянинова В.А.",
        "room": "А-182"
      }
    },
    {
      "odd": {
        "name": "Физ.культура и спорт",
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": "Физ.культура и спорт",
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    }
  ],
  [
    {
      "odd": {
        "name": "Инф. безопасность в ИАС",
        "type": 0,
        "teacher": "Уманский С.А.",
        "room": "База"
      },
      "even": {
        "name": "Инф. безопасность в ИАС",
        "type": 0,
        "teacher": "Уманский С.А.",
        "room": "База"
      }
    },
    {
      "odd": {
        "name": "Инф. безопасность в ИАС (1 п/г)",
        "type": 2,
        "teacher": "Уманский С.А.",
        "room": "База"
      },
      "even": {
        "name": "Инф. безопасность в ИАС (2 п/г)",
        "type": 2,
        "teacher": "Дрягина А.Д.",
        "room": "База"
      }
    },
    {
      "odd": {
        "name": "1,5,9,13 н. Инф. безопасность в ИАС 3,7,11,15 н. Оценка качества ИАС",
        "teacher": "Уманский С.А. Кайтукова М.В.",
        "room": "База"
      },
      "even": {
        "name": "Оценка качества ИАС",
        "type": 0,
        "teacher": "Кайтукова М.В.",
        "room": "База"
      }
    },
    {
      "odd": {
        "name": "…………………",
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": "………………….",
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": "Физ.культура и спорт",
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    }
  ],
  [
    {
      "odd": {
        "name": "Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      },
      "even": {
        "name": "Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      }
    },
    {
      "odd": {
        "name": "Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      },
      "even": {
        "name": "Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      }
    },
    {
      "odd": {
        "name": "Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      },
      "even": {
        "name": "Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      }
    },
    {
      "odd": {
        "name": "3,5,7 н. Практика по ППУ и ОПД",
        "type": 1,
        "teacher": null,
        "room": "каф"
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    }
  ],
  [
    {
      "odd": {
        "name": "Военная подготовка",
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    }
  ],
  [
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": "6,14 н. ОО анализ и проектир. ПО",
        "type": 2,
        "teacher": "Аввакумов Г.Е.",
        "room": "Г-301б"
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": "6,14 н. ОО анализ и проектир. ПО",
        "type": 2,
        "teacher": "Аввакумов Г.Е.",
        "room": "Г-301б"
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    },
    {
      "odd": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      },
      "even": {
        "name": null,
        "type": null,
        "teacher": null,
        "room": null
      }
    }
  ]
]

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