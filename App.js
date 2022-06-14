import './App.css';
import React, { useState } from 'react';
import Popup from './popup';
import { useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const App=(props)=> {
  const [show,setShow]=useState(false);
  const hiddenFileInput = React.useRef(null);
  const [arr, setArr] = useState([<p></p>]);
  const [file1,setFile1]=useState("");
  const location=useLocation();
  
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setFile1(fileUploaded.name);
    
    setShow(true);
    
  };
  useEffect(() => {
    // console.log(location.state.det);
    // console.log(location.has);
  }, [location]);
  const onDevice=()=>{
    console.log("inside onDevice");
    const value1={
      name1:location.state.det.name1,
      currentName1:location.state.det.currentName1,
      currentType1:location.state.det.currentType1,
      ownerLand1:location.state.det.ownerLand1,
      password1:location.state.det.password1,
      fileloc1:file1
    }
    // console.log(value1);
    axios.post("http://localhost:8001/",value1).then(res=>{
             const vi={
               nam:res.data.Name,
               ipfs:res.data.IpfsHash,
               sub:res.data.Submarined
             }
             console.log(vi);
             setArr([...arr, <p><p id="p1">{vi.nam}</p><p id="p2">{vi.ipfs}</p><p id="p3">{vi.sub}</p></p>])
             document.getElementById('p').style.display='none';
          }).catch(err=>{
              console.log(err.message+" "+err.response+" "+err.status);
          })
  // setArr([...arr, <p><p id="p1"></p><p id="p2">IpfsHash</p><p id="p3">Submarined</p></p>])
  }
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  
  return (
        <div>
          <h1>Hey Gokulprasanth</h1>
          <div id="div1">
              <h3>My files</h3>
              <button onClick={handleClick}>Upload a file</button>
              <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{display: 'none'}} />
              
              <Popup trigger={show} setTrigger={setShow}>
                <h3>My popup</h3>
              </Popup>
              
              <p id="pin">pinned status</p>
              <select id="pin1">
                <option value="pinned" default>pinned</option>
                <option value="unpinned">unpinned</option>
                <option value="All">All</option>
              </select>

              <p id="border1"></p>
              <p><p onClick={onDevice} id="p1">Name</p><p id="p2">Cid</p><p id="p3">Submarined</p></p>
              <p id="border2"></p>
              <div>
              {arr.map((a, i) => (
          <p key={i}>{a}</p>
        ))}
              </div>
              <p id="p">No more pins</p>
          </div>

        </div>
  );
}

export default App;
