import "../../index.css"
import { useForm } from "react-hook-form"
import { Button } from '@mantine/core';
import axios from "axios";
import { useEffect, useState } from "react";
import { Select } from '@mantine/core';
// import { yupResolver } from "@hookform/resolvers/yup";
// import Select from "react-select";

import * as yup from "yup";
import { useSelector } from "react-redux";
import { selectModalData } from "../redux/Modal/modal.selectors";
import HomePage from "../HomePage/homePage.component";
import { useNavigate } from "react-router-dom";

function Form() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("")
    const [ description, setDescription ] = useState("");
    const [ parent, setParent ] = useState("");
    const [ APIData, setAPIData ] = useState([]);

    const navigate = useNavigate()

    const modalData = useSelector(selectModalData);
    console.log(modalData)

    useEffect(() => {
      if(modalData.data.name) {
        const nameArray = modalData.data.name.split(" ");
        setFname(nameArray[0])
        setLname(nameArray[1])
        setEmail(modalData.data.attributes.Email)
        setDescription(modalData.data.attributes.Description)
      }
    }, [])

    console.log(fname)

    const { 
      register, 
      handleSubmit,
      formState: { errors }} = useForm({
        defaultValues: {
          firstName: "",
          lastName: "",
          email: "",
          Role: "",
        },
       //  resolver: yupResolver(schema)
    });

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

    if(APIData === null) 
          return null;

    const handleChange = selectedOption => {
      setDescription(selectedOption)
      setParentFunction(selectedOption)
    }

      //  const options = [
      //   { value: "CEO", label: "CEO", id: "1" },
      //   { value: "CTO", label: "CTO", id: "3" },
      //   { value: "CFO", label: "CFO", id: "7" }
      // ];

      const options2 = [];
      //function to populate options passed to the select dropdown from new role added to the API
      const populateOptions = (APIData) => {
        APIData.forEach(data => {
          const index = options2.findIndex(object => ((object.id === data.Id) && (object.label === `"${data.name} - ${data.attributes.Description}"`) && (object.id === modalData.data.Id)));
          if(index === -1) {
            options2.push({value: `${data.attributes.Description}`, label: `${data.name} - ${data.attributes.Description}`, id: `${data.Id}`})
          }
        })
      }

      populateOptions(APIData)
      console.log(options2)

      
      //function to get the selected dept under which the employee is to placed under and finds it's index to map it as parentId in this specific employee
      const setParentFunction = (selectedOption) => {
        let dropdown = options2.find(item => item.value === selectedOption);
        setParent(dropdown.id);
      }

      const axiosRequest = () => {
        if(modalData.data.name) {
          axios.put(`https://6389b272c5356b25a205f817.mockapi.io/organization/${modalData.data.Id}`, 
            {
                name: `${fname} ${lname}`,
                Parent: parent,
                attributes: {
                  Description: role,
                  Email: email
                }
            }).then(function (response) {
                  console.log(response);
                  console.log("Successfully Logged in ");
                  navigate("/")
                
                })
                .catch(function (error) {
                  console.log(error);
              });  
        } else {
          axios.post(`https://6389b272c5356b25a205f817.mockapi.io/organization`, 
            {
                name: `${fname} ${lname}`,
                Parent: parent,
                attributes: {
                  Description: role,
                  Email: email
                }
            }).then(function (response) {
              console.log(response);
              console.log("Successfully Logged in ");
              navigate("/")
            
            })
            .catch(function (error) {
              console.log(error);
          });  
        }
      }
      

    return(
      <div className="flex justify-center p-8 mt-16 w-5/6 mx-auto h-30 rounded-lg bg-blue-400 md:w-2/5">
        <form onSubmit={handleSubmit((data) => {
            setFname(data.firstName)
            setLname(data.lastName)
            setEmail(data.email)
            axiosRequest()
          })}>
            <input value={fname} onChange={(e) => setFname(e.target.value)} className="input-style" placeholder="First Name"/>
      
            {/* <p>{errors.firstName?.message}</p> */}
      
            <input value={lname} onChange={(e) => setLname(e.target.value)} className="input-style" placeholder="Last Name"/>

            {/* <p>{errors.lastName?.message}</p> */}

            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-style" placeholder="Email"/>

            {/* <p>{errors.email?.message}</p> */}

            <input value={role} className="input-style" onChange={(e) => setRole(e.target.value)} placeholder="Role"/>

            {/* <p>{errors.Role?.message}</p> */}
      
            <div className=''>
                <div className='mt-3'>
                  <Select
                    className="bg-inherit"
                    data={options2}
                    label="Under which dept do you want this employee be managed?"
                    placeholder="Pick one"
                    required
                    onChange={handleChange}/>
                </div>
              </div>
            <Button className="bg-sky-600 hover:bg-sky-800 mt-10 mx-auto" type="submit">Submit</Button>
          </form>
       </div>
    )
   }
   
   export default Form;

   // let schema = yup.object().shape({
    //     email: yup.string().email(),
    //     status: yup
    //         .object()
    //         .shape({
    //             label: yup.string().required("status is required (from label)"),
    //             value: yup.string().required("status is required")
    // })
    // .nullable() // for handling null value when clearing options via clicking "x"
    // .required("status is required (from outter null check)")
    //   });

    //  className={`w-96 rounded-lg text-3xl ${errors.Description &&
                                  //   " focus:border-red-500 focus:ring-red-500 border-red-500"}`}
                                  //  {...register("Description", { required: 'Description is required' })}
                                  /* <option value=''>--Select Gender--</option>
                                 <option value='male'>Male</option>
                                 <option value='female'>Female</option>
                                 <option value='other'>other</option>
                             </Select> */