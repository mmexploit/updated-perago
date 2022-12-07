import "../../index.css"

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux' 
import { Modal, Button, Group } from '@mantine/core';
import { selectModalData, selectModalHidden } from "../redux/Modal/modal.selectors";
import { toogleModalOpen } from "../redux/Modal/modal.action";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ModalBox() {
  const opened = useSelector(selectModalHidden);
  const data = useSelector(selectModalData);
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const handleDelete = () => {
    if(data.children) {
      alert("The employee you are trying to delete is in a manageral role. Please relocate the employees under this employee to other manager before proceeding")
    }
     else {
      axios.delete(`https://6389b272c5356b25a205f817.mockapi.io/organization/${data.data.Id}`)
     .then(
        function (response) {
                  console.log(response);
                  console.log("Successfully Deleted Entry");
                  
                  navigate("/tree")
                  window.location.reload();
                })
                .catch(function (error) {
                  console.log(error);
        });} 
  }


  return (
    <>
      <Modal
        opened={opened}
        onClose={() => dispatch(toogleModalOpen())}
        title="Employee Description"
      >
         
        {/* Modal content */
        <>
          <p>Name: {data.data.name} </p>
          <span> Department: {data.data.attributes.Description}</span>
          <p>Email: {data.data.attributes.Email}</p>
          <Link to="/create"><Button className="bg-green-400 text-white mt-5 mb-3 hover:bg-green-700">Update</Button></Link>
          <Button onClick={() => handleDelete()} className="bg-red-400 text-white mt-5 mb-3 ml-7 hover:bg-red-700">Delete</Button>
        </>
        }
      </Modal>

      <Group position="center">
        <Button onClick={() =>{
          dispatch(toogleModalOpen())
          }}>Open Modal</Button>
      </Group>
    </>
  );
}

export default ModalBox;