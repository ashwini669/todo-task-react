import React from 'react';
import './Listitem.css'

function ListItem(props)
{ 
    let data; 
    
    if(localStorage.getItem('task_table')===null){
        data=[];
    } else{
        data= JSON.parse(localStorage.getItem('task_table'));
    
    }
    
    const items=data;
    const listItems= items.map(item =>
        { 
          
          return <div className="list" key={item.Key}>
                     <table>
                       <tbody>
                            <tr>
                                <td style={{width:"180px",padding:"10px"}}>{item.Task}</td>
                                <td style={{width:"30px"}}><button id="edit"
                                        onClick={()=>props.editItem(item.Task,item.Key)}>Edit</button>
                                </td>
                                <td style={{width:"30px"}}><button id="delete"
                                        onClick={()=>props.deleteItem(item.Key)}>Delete</button>
                                </td>
                            </tr>
                       </tbody>
                     </table>
                   </div>
        })
    
    return <div>{listItems}</div>
}


export default ListItem