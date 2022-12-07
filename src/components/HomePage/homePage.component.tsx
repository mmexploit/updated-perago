import "../../index.css"
import { Button } from "@mantine/core";
import { Route, Routes, Link } from 'react-router-dom';
import Chart from "../Tree/tree.component";
import { useDispatch } from "react-redux";
import ModalBox from "../Modal/modal.component";
import { useEffect, useState } from "react";
// import { toogleModalOpen } from "../../redux/Modal/modal.action";


function HomePage() {
    // const dispatch = useDispatch();

    return(
        <>
        <Routes>
            <Route path="/tree" element={<Chart/>}/>
        </Routes>
        <div className="bg-blue-400 h-auto md:h-screen pl-1 md:grid grid-cols-[minmax(1em,_10%)_80ch_auto] grid-rows-[auto_150px]">
            <p className="text-5xl text-white pt-10 col-start-2 col-end-3 md:pt-20 md:text-6xl">
                Welcome To Perago Company Hierarcial Organization Structure
            </p>
            <p className="text-lg mt-10 md:text-2xl md:mt-1 col-start-2 col-end-3 md:mt-0">
                Use the navigation below to add a new employee or get tree structure.
            </p>
            <div className="flex flex-wrap col-start-2">
                <Link to="/create"><Button className="bg-white m-5 ml-0 w-fit text-blue-400 hover:text-white md:m-0">Add New Employee</Button></Link>
                <Link to="/tree"><Button className="bg-white m-5 ml-0 mt-3 col-start-2 w-fit text-blue-400 hover:text-white md:m-0 md:ml-20">Get Company Tree Structure</Button></Link>
            </div>
            
        </div>
        </>
    )
}

export default HomePage;