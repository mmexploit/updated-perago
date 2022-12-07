import "../../index.css";
import { Box } from "@mantine/core"
import Tree from 'react-d3-tree';
import { useDispatch, useSelector } from "react-redux";
import { populateModalData, toogleModalOpen } from "../redux/Modal/modal.action";
import ModalBox from "../Modal/modal.component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Loader } from '@mantine/core'
// import { loadDataAsync } from "../../redux/Thunk/data.thunks";
// import { AppDispatch } from "../../redux/store";

function Chart() {
  const dispatch = useDispatch();
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [structuredData, setStructData] = useState([])
  const nodeSize = { x: 300, y: 150 };
  const navigate = useNavigate()

  // const { isFetching, data, errorMessage } = useSelector((state) => state.data);
  

  const fetchData = async () => {

        try {
          const APIData = await axios.get(`https://6389b272c5356b25a205f817.mockapi.io/organization`)
          .then(response => {
            setData(response.data)
            setStructData(convert(response.data))
            console.log(structuredData)
          })
          setLoading(true)
        }
        catch(error) {
          console.log(error)
        }
  }

  useEffect(() => {
    fetchData();
   }, [])

function convert(array){
    var map = {};
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
        obj.children= [];
        
        map[obj.Id] = obj;
        
        var parent = obj.Parent || '-';
        if(!map[parent]){
            map[parent] = {
                children: []
            };
        }
        map[parent].children.push(obj);
    }
    
    return map['-'].children;
    
}


      return(
        <Box id="treeWrapper" className="w-screen h-screen bg-blue-400">
          {loading ?
              (<React.Fragment>
                <Button className="bg-blue-400" onClick={() => navigate("/")}>Home</Button>
              <Tree 
            data={structuredData}
            orientation="vertical"
            nodeSize={nodeSize}
            rootNodeClassName="node__root [&>circle]:fill-red-700"
            onNodeClick={(node) => {
              console.log(node)
              dispatch(populateModalData(node))
              dispatch(toogleModalOpen())
            }}/>
            <ModalBox/>
            </React.Fragment>)
            : (<Loader color="white" size="xl" className="mx-auto align-middle justify-center"/>)}
        </Box>
      )
}

export default Chart;


// const orgChart = {
//         name: 'Yonas Alemayehu',
//         attributes: {
//           Description: "CEO",
//           Email: "yonasAlemayehu@gmail.com"
//         },
//         children: [
//           {
//             name: "Dagim Mekonnen",
//             attributes: {
//               Description: "HR",
//               Email: "dagimMekonnen@gmail.com"
//             }
//           },
//           {
//             name: "Mikiyas Jemberu",
//             attributes: {
//               Description: "COO",
//               Email: "mikiyasJemberu@gmail.com"
//             },
//             children: [
//               {
//                 name: "Zeleke Fasil",
//                 attributes: {
//                   Description: "Product Manager",
//                   Email: "zelekefasil@gmail.com"
//                 }
//               },
//               {
//                 name: "Gelani Amaru",
//                 attributes: {
//                   Description: "Operation Manager",
//                   Email: "gelaniamaru@gmail.com"
//                 }
//               },
//               {
//                 name: "Kelemu Yohannes",
//                 attributes: {
//                   Description: "Customer Relation",
//                   Email: "kelemuyohannes@gmail.com"
//                 }
//               }
//             ]
//           },
//           {
//             name: "Ashenafi Kebede",
//             attributes: {
//               Description: "CFO",
//               Email: "ashenafiKebede@gmail.com"
//             },
//             children: [
//               {
//                 name: "Kebede Atnafu",
//                 attributes: {
//                   Description: "Internal Audit",
//                   Email: "kebedeatnafu@gmail.com"
//                 }
//               },
//               {
//                 name: "Alemayhu Kifle",
//                 attributes: {
//                   Description: "Chief Accountant",
//                   Email: "alemayehukifle@gmail.com"
//                 },
//                 children: [
//                   {
//                     name: "G/Egizabher Alemu",
//                     attributes: {
//                       Description: "Financial Analyst",
//                       Email: "gebregizabher@gmail.com"
//                     }
//                   },
//                   {
//                     name: "Natnael Ashenafi",
//                     attributes: {
//                       Description: "Account and Payable",
//                       Email: "natnaela@gmail.com"
//                     }
//                   },
//                 ]
//               }
//             ]
//           },
          
//           {
//             name: 'Miheret Endale',
//             attributes: {
//               Description: 'CTO',
//               Email: "miheretendale@gmail.com"
//             },
//             children: [
//               {
//                 name: 'Kidus Afework',
//                 attributes: {
//                   Description: 'Project Manager',
//                   Email: "kidusafework@gmail.com"
//                 },
//                 children: [
//                   {
//                     name: 'Afomia Gebru',
//                     attributes: {
//                       Description: "Product Owner",
//                       Email: "afomiagebru@gmail.com"
//                     },
//                     children: [
//                       {
//                         name: "Feven Ashenafi",
//                         attributes: {
//                           Description: "Scrum Master",
//                           Email: "fevenashenafi@gmail.com"
//                         }
//                       },
//                       {
//                         name: "Abel Gelani",
//                         attributes: {
//                           Description: "QA Engineer",
//                           Email: "abelgelani@gmail.com"
//                         }
//                       },
//                       {
//                         name: "Dawit Shimels",
//                         attributes: {
//                           Description: "Tech Lead",
//                           Email: "dawitShimels@gmail.com"
//                         },
//                         children: [
//                           {
//                             name: "Melat Teklay",
//                             attributes: {
//                               Description: "Frontend Developer",
//                               Email: "melatTekaly@gmail.com"
//                             }
//                           },
//                           {
//                             name: "Eyob Haile",
//                             attributes: {
//                               Description: "Backend Developer",
//                               Email: "eyobHaile@gmail.com"
//                             }
//                           },
//                           {
//                             name: "Afomia Kebede",
//                             attributes: {
//                               Description: "DevOps Engineer",
//                               Email: "afomiakebede@gmail.com"
//                             }
//                           }
//                         ]
//                       },
//                     ]
//                   },
//                 ],
//               },
//             ],
//           },
//         ],
//       };




//var arr2 = [{"Id": "1", "name": "Yonas Alemayehu", "Parent": "", "attributes" : {"Description" : "CEO", "Email" : "yonasalemayehu@gmail.com"}},
//               {"Id": "2", "name": "Dagim Mekonnen", "Parent": "1", "attributes" : {"Description" : "HR", "Email" : "dagimmekonnen@gmail.com"}},
//               {"Id": "3", "name": "Mikiyas Jemberu", "Parent": "1", "attributes" : {"Description" : "COO", "Email" : "mikiyasjemeberu@gmail.com"}},
//               {"Id": "4", "name": "Zeleke Fasil", "Parent": "3", "attributes" : {"Description" : "Product Manager", "Email" : "zelekefasil@gmail.com"}},
//               {"Id": "5", "name": "Gelani Amaru", "Parent": "3", "attributes" : {"Description" : "Operation Manager", "Email" : "gelaniamaru@gmail.com"}},
//               {"Id": "6", "name": "Kelemu Yohannes", "Parent": "3", "attributes" : {"Description" : "Customer Relation", "Email" : "kelemuyohnannes@gmail.com"}},
//               {"Id": "7", "name": "Ashenafi Kebede", "Parent": "1", "attributes" : {"Description" : "CFO", "Email" : "ashenafikebede@gmail.com"}},
//               {"Id": "8", "name": "Kebede Atnafu", "Parent": "7", "attributes" : {"Description" : "Internal Audit", "Email" : "kebedeatnafu@gmail.com"}},
//               {"Id": "9", "name": "Alemayhu Kifle", "Parent": "7", "attributes" : {"Description" : "Chief Accountant", "Email" : "alemayehukifle@gmail.com"}},
//               {"Id": "10", "name": "G/Egizabher Alemu", "Parent": "9", "attributes" : {"Description" : "Financial Analyst", "Email" : "gegizabheralemu@gmail.com"}},
//               {"Id": "11", "name": "Natnael Ashenafi", "Parent": "9", "attributes" : {"Description" : "Account and Payable", "Email" : "natnaelashenafi@gmail.com"}},
//               {"Id": "12", "name": "Miheret Endale", "Parent": "1", "attributes" : {"Description" : "CTO", "Email" : "miheretendale@gmail.com"}},
//               {"Id": "13", "name": "Kidus Afework", "Parent": "12", "attributes" : {"Description" : "Project Manager", "Email" : "kidusafework@gmail.com"}},
//               {"Id": "14", "name": "Afomia Gebru", "Parent": "13", "attributes" : {"Description" : "Product Owner", "Email" : "afomiagebru@gmail.com"}},
//               {"Id": "15", "name": "Feven Ashenafi", "Parent": "14", "attributes" : {"Description" : "Scrum Master", "Email" : "fevenashenafi@gmail.com"}},
//               {"Id": "16", "name": "Abel Gelani", "Parent": "14", "attributes" : {"Description" : "QA Engineer", "Email" : "abelgelani@gmail.com"}},
//               {"Id": "17", "name": "Dawit Shimels", "Parent": "14", "attributes" : {"Description" : "Tech Lead", "Email" : "dawitshimels@gmail.com"}},
//               {"Id": "18", "name": "Melat Teklay", "Parent": "17", "attributes" : {"Description" : "Frontend Developer", "Email" : "melattekaly@gmail.com"}},
//               {"Id": "19", "name": "Eyob Haile", "Parent": "17", "attributes" : {"Description" : "Backend Developer", "Email" : "eyobhaile@gmail.com"}},
//               {"Id": "20", "name": "Afomia Kebede", "Parent": "17", "attributes" : {"Description" : "DevOps Engineer", "Email" : "afomiakebede@gmail.com"}},

//               ]

// const finalTrial = [
//  {
//   "name": "Yonas Alemayehu",
//   "Id": "1",
//   "Parent": "",
//   "attributes": {
//    "Description": "CEO",
//    "Email": "yonasalemayehu@gmail.com"
//   }
//  },
//  {
//   "name": "Dagim Mekonnen",
//   "Id": "2",
//   "Parent": "1",
//   "attributes": {
//    "Description": "HR",
//    "Email": "dagimMekonnen@gmail.com"
//   }
//  },
//  {
//   "name": "Mikiyas Jemberu",
//   "Id": "3",
//   "Parent": "1",
//   "attributes": {
//    "Description": "COO",
//    "Email": "mikiyasJemberu@gmail.com"
//   }
//  },
//  {
//   "name": "Zeleke Fasil",
//   "Id": "4",
//   "Parent": "3",
//   "attributes": {
//    "Description": "Product Manager",
//    "Email": "zelekefasil@gmail.com"
//   }
//  },
//  {
//   "name": "Gelani Amaru",
//   "Id": "5",
//   "Parent": "3",
//   "attributes": {
//    "Description": "Operation Manager",
//    "Email": "gelaniamaru@gmail.com"
//   }
//  },
//  {
//   "name": "Kelemu Yohannes",
//   "Id": "6",
//   "Parent": "3",
//   "attributes": {
//    "Description": "Customer Relation",
//    "Email": "kelemuyohannes@gmail.com"
//   }
//  },
//  {
//   "name": "Ashenafi Kebede",
//   "Id": "7",
//   "Parent": "1",
//   "attributes": {
//    "Description": "CFO",
//    "Email": "ashenafikebede@gmail.com"
//   }
//  },
//  {
//   "name": "Kebede Atnafu",
//   "Id": "8",
//   "Parent": "7",
//   "attributes": {
//    "Description": "Internal Audit",
//    "Email": "kebedeatnafu@gmail.com"
//   }
//  },
//  {
//   "name": "Alemayehu Kifle",
//   "Id": "9",
//   "Parent": "7",
//   "attributes": {
//    "Description": "Chief Accountant",
//    "Email": "alemayehukifle@gmail.com"
//   }
//  },
//  {
//   "name": "G/Egizabher Alemu",
//   "Id": "10",
//   "Parent": "9",
//   "attributes": {
//    "Description": "Financial Analyst",
//    "Email": "gebreegziabher@gmail.com"
//   }
//  },
//  {
//   "name": "Natnael Ashenafi",
//   "Id": "11",
//   "Parent": "9",
//   "attributes": {
//    "Description": "Account and Payable",
//    "Email": "natnaelashenafi@gmail.com"
//   }
//  },
//  {
//   "name": "Miheret Endale",
//   "Id": "12",
//   "Parent": "1",
//   "attributes": {
//    "Description": "CTO",
//    "Email": "miheretendale@gmail.com"
//   }
//  },
//  {
//   "name": "Kidus Afework",
//   "Id": "13",
//   "Parent": "12",
//   "attributes": {
//    "Description": "Project Manager",
//    "Email": "kidusafework@gmail.com"
//   }
//  },
//  {
//   "name": "Afomia Gebru",
//   "Id": "14",
//   "Parent": "13",
//   "attributes": {
//    "Description": "Product Owner",
//    "Email": "afomiagebru@gmail.com"
//   }
//  },
//  {
//   "name": "Feven Ashenafi",
//   "Id": "15",
//   "Parent": "14",
//   "attributes": {
//    "Description": "Scrum Master",
//    "Email": "fevenashenafi@gmail.com"
//   }
//  },
//  {
//   "name": "Abel Gelani",
//   "Id": "16",
//   "Parent": "14",
//   "attributes": {
//    "Description": "QA Engineer",
//    "Email": "abelgelani@gmail.com"
//   }
//  },
//  {
//   "name": "Dawit Shimels",
//   "Id": "17",
//   "Parent": "14",
//   "attributes": {
//    "Description": "Tech Lead",
//    "Email": "dawitshimels@gmail.com"
//   }
//  },
//  {
//   "name": "Melat Teklay",
//   "Id": "18",
//   "Parent": "17",
//   "attributes": {
//    "Description": "Frontend Developer",
//    "Email": "melatteklay@gmail.com"
//   }
//  },
//  {
//   "name": "Eyob Haile",
//   "Id": "19",
//   "Parent": "17",
//   "attributes": {
//    "Description": "Backend Developer",
//    "Email": "eyobhaile@gmail.com"
//   }
//  },
//  {
//   "name": "Afomia Kebede",
//   "Id": "20",
//   "Parent": "17",
//   "attributes": {
//    "Description": "DevOps Engineer",
//    "Email": "afomiakebede@gmail.com"
//   }
//  }
// ]