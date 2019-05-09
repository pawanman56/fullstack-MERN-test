import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const[ data ] = useState( [] );
  const[ id ] = useState(0);
  const[ message, setMessage ] = useState(null);
  const[ idToDelete, setIdToDelete ] = useState(null);
  const[ idToUpdate, setIdToUpdate ] = useState(null); 
  const[ objectToUpdate, setObjectToUpdate ] = useState(null);
  const[ intervalIsSet, setIntervalIsSet ] = useState(false);

  function getDataFromDb() {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json);
  }

  function putDataToDB() {
    let currentIds = data.map(data => data.id);
    let idToBeAdded = 0;

    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
  }

  function deleteFromDb() {
    let objToDelete = null;

    data.forEach(data => {
      if (data.id === idToDelete) {
        objToDelete = data._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objToDelete
      }
    });
  }

  function updateDb(idToUpdate, updateToApply) {
    let objIdToUpdate = null;

    data.forEach(data => {
      if (data.id === idToUpdate) {
        objIdToUpdate = data._id
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  }

  useEffect(() => {
    getDataFromDb();

    if (!intervalIsSet) {
      let interval = setInterval(getDataFromDb, 1000);
      setIntervalIsSet(interval);
    }

    return () => {
      if (intervalIsSet) {
        clearInterval(intervalIsSet);
        setIntervalIsSet(null);
      }
    }
  });

  return (
    <div className="App">
      <ul>
        {
          data.length <= 0 ? "No DB entries yet" : data.map(data => (
            <li style={{ padding: "10px" }} key={data.message}>
              <span style={{ color: "grey" }}>id:</span> { data.id }<br />
              <span style={{ color: "grey" }}>data:</span> {data.message}
            </li>
          ))
        }
      </ul>
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange={e => setMessage(e.target.value)}
          placeholder="Add something in the database"
          style={{ width: "200px" }}
        />
        <button onClick={() => {putDataToDB(message)}}>Add</button>
      </div>
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange={e => setIdToDelete(e.target.value)}
          placeholder="put id of item to delete"
          style={{ width: "200px" }}
        />
        <button onClick={() => {deleteFromDb(idToDelete)}}>Delete</button>
      </div>
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange={e => setIdToUpdate(e.target.value)}
          placeholder="put id of item to update"
          style={{ width: "200px" }}
        />
        <input
          type="text"
          onChange={e => setObjectToUpdate(e.target.value)}
          placeholder="put new value of the item here"
          style={{ width: "200px" }}
        />
        <button onClick={() => {updateDb(idToUpdate, objectToUpdate)}}>Delete</button>
      </div>
    </div>
  );
}
