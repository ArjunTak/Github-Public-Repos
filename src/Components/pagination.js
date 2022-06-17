import React from "react";
import { Pagination } from "semantic-ui-react";


const Paginations = ({postsPerPage, totalPosts, paginate}) =>{
    const pageNumbers = [];

    for (let i =1; i<=Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav>
            
            <ul className='ui pagination menu'>
                {pageNumbers.map((number)=>(
                    <li key={number} className='item'>
                        <a onClick={() => paginate(number)} href='!#' className='link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
           

        </nav>
    )

}

export default Paginations;