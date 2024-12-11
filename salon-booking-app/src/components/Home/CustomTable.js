


import {Container,Row,Col,Table,Button} from 'react-bootstrap'
import {useState} from 'react'

const CustomTable=({data,id,handleAppointment,onClose})=>{

const [disable,setDisable]=useState(false)
    const handleClick=(staf)=>{
        setDisable(true)
         if (window.confirm(`Are you sure ${staf.name} is appointed `) == true) {
            console.log("You pressed OK!");
            handleAppointment({...staf,notificationId:id})
            onClose()
          } else {
            console.log("You canceled!");
            setDisable(false)
          }
          
    }
    
    return(
        <Container className='position-absolute z-2 '>
            <div className='d-flex justify-content-end border border-ridge '>x</div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>StafName</th>
          <th>Specialization</th>
          <th>Availabality</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((staf,index)=><tr key={staf.id}>
            <td>{index+1}</td>
          <td>{staf.name}</td>
          <td>{staf.specialization}</td>
          <td>
            {staf.availabality}
          </td>
          <td>
          <Button className={disable?'disabled':''} onClick={()=>handleClick(staf)}>Appoint</Button>
          </td>
        </tr>)}
      </tbody>
    </Table>
         </Container>   
    )
}

export default CustomTable