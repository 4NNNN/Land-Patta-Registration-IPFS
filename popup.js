// import axios from 'axios';
import React from "react";
import "./popup.css";
// import axios from 'axios';
// import {useEffect} from 'react';
import {useState} from 'react';
// import {useLocation} from 'react-router-dom';
import {useHistory}from 'react-router-dom';
const Popup = props => {
  const history = useHistory();
  const [name,setName]=useState("");
  const [currentName,setCurrentname]=useState("");
  const [currentType,setCurrenttype]=useState("");
  const [ownerLand,setOwnerLand]=useState("");
  const [password,setPassword]=useState("");
  // const  history=useHistory();
//   const location=useLocation();
//   useEffect(() => {
//     console.log(location.pathname); // result: '/secondpage'
//     // console.log(location.state.file); // result: 'some_value'
//  }, [location]);
  const change=(event)=>{
    setName(event.target.value);
  }
  const change1=(event)=>{
    setCurrentname(event.target.value);
  }
  const change2=(event)=>{
    setCurrenttype(event.target.value);
  }
  const change3=(event)=>{
    setOwnerLand(event.target.value);
  }
  const change4=(event)=>{
    setPassword(event.target.value);
  }
  const submitChange=(e)=>{
    e.preventDefault();
  // console.log(name+" "+currentName+" "+currentType+" "+ownerLand+" "+password);
  const value={
    name1:name,
    currentName1:currentName,
    currentType1:currentType,
    ownerLand1:ownerLand,
    password1:password,
    // fileloc:location.state.file
  }
  console.log(value);

  //check
  if(name!=="" && currentName!=="" && currentType!=="" && ownerLand!=="" && password!=="" ){
  history.push({pathname:"./App",
    state:{
    det:value,
    }})
  }
  // axios.post("http://localhost:8001/",value).then(res=>{
  //   history.push({pathname:"./App",
  //   state:{
  //   det:res.data,
  //   }})
  //           }).catch(err=>{
  //               console.log(err.message+" "+err.response+" "+err.status);
  //           })
    
  props.setTrigger(false);
  }
  
  return props.trigger?(
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" id="btn" onClick={()=>props.setTrigger(false)}>close</button>
        {props.children}
        <form onSubmit={submitChange}>
          <input type="text" placeholder="name" className="name" value={name} onChange={change}/><br></br>
          <input type="text" placeholder="currentName" className="currentName" value={currentName} onChange={change1}/><br></br>
          <input type="text" placeholder="currentType" className="currentType" value={currentType} onChange={change2}/><br></br>
          <input type="text" placeholder="ownerLand" className="ownerLand" value={ownerLand} onChange={change3}/><br></br>
          <input type="password" placeholder="pass" className="password" value={password} onChange={change4}/><br></br>
          <input type="submit" id="btn2" value="save"/>
        </form>
      </div>
    </div>
  ):"";
};

export default Popup;