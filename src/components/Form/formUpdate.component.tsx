import "../../index.css"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectModalData } from "../redux/Modal/modal.selectors";
import axios from "axios";

function FormUpdate() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [ description, setDescription ] = useState("");
    const [ parent, setParent ] = useState("");
    const [ APIData, setAPIData ] = useState([]);
    const modalData = useSelector(selectModalData);

    useEffect(() => {
        if(modalData.data.name) {
          const nameArray = modalData.data.name.split(" ");
          setFname(nameArray[0])
          setLname(nameArray[1])
        }
      }, [])

      useEffect(() => {
        const fetchData = () => {
          try {axios.get(`https://6389b272c5356b25a205f817.mockapi.io/organization`)
            .then(response => setAPIData(response.data))}
          catch(error) {
            console.log(error)
          }
        }
        fetchData();
      }, [])

    
}