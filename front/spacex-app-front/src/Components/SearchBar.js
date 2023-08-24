import React, {useRef} from "react";
import { InputAdornment } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';


export default function SearchBar({handleSearch}){
    const inputRef = useRef();

    
    return(
    <div className="search-parent-container">
        <h3> Registro de lançamentos</h3>
        <div className="search-container">
            <div className="search-bar-container">
                {/* <img src="" alt="imagem"/> */}
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#f57900",}} />
                <input className='search-text' type="text" placeholder='Search here' ref = {inputRef}/>

            </div>
            <button className="search-btn" onClick={()=>{handleSearch(inputRef.current.value)}}>Buscar</button>
        </div>
        
    </div>
    )

}