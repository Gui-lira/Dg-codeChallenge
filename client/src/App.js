import React, { useState, useEffect } from 'react';
import FormInterface from './components/formInterface';
import RenderInk from './components/renderInkNeeded';
import './App.css';

function App() {  
  const [walls, setWalls] = useState([]);
  const [condition, setCondition] = useState(false);
  const [requestStatus, setStatus] = useState(401);
  const [requesBody, setBody] = useState({});
  const pushWall = (wall) => {
    setWalls(
      [...walls, wall]
    );
  }; 

  useEffect(() => {    
      const showInk = async () => {
        if (walls.length === 4) {
          const response = await fetch('/ink', {
            method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             },
             redirect: 'follow',
            body: JSON.stringify({ walls }),
          });
          
          const json = await response.json();
          console.log(json);
          if (response.status === 200) {            
            setBody(json);
            setStatus(200);
            setCondition(true);
            setWalls([]);
          } else {
            console.log(json);
            setStatus(response.status);
            setCondition(true);
            setWalls([]);
          }
        };
      };
      showInk();    
  }, [walls])

  const renderInkComponent = () => {
    if (requestStatus !== 200 && condition) return <h1>Há algo errado nos dados informados</h1>
    if(requestStatus === 200 && condition)  return <RenderInk ink={ requesBody } />
  }

  return (
    <div className="App">
      <FormInterface stateArr={ walls } pushWall={ pushWall } />
      { renderInkComponent() }
    </div>
  );
};

export default App;
