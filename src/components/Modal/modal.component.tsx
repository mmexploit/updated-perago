import "../../index.css"

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux' 
import { Modal, Button, Group } from '@mantine/core';
import { selectModalData, selectModalHidden } from "../redux/Modal/modal.selectors";
import { toogleModalOpen } from "../redux/Modal/modal.action";
import { Link } from "react-router-dom";

function ModalBox() {
  const opened = useSelector(selectModalHidden);
  const data = useSelector(selectModalData);
  const dispatch = useDispatch();


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
          <Button className="bg-red-400 text-white mt-5 mb-3 ml-7 hover:bg-red-700">Delete</Button>
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