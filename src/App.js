
import './App.css';
import React, {useEffect, useState} from "react";
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import Paginations from "./Components/pagination";

function App() {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);



  const sortOptions = ["Stars Count", "Watchers Count", "Score", "Name", "Created at", "Updated at"]
  

  useEffect(()=>{
   if(!search) {
     return;
    }
    fetch(`https://api.github.com/search/repositories?q=${search}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      setRepos(data.items)
    });
  },[search])


  
  //get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = repos.slice(indexOfFirstPost, indexOfLastPost); 

  //change Page
  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber);
  }

  const handleSubmit = (e) =>{
        e.preventDefault();
        setSearch(e.target.elements.query.value);
  }

  const handleSort = (e) =>{
     let value = e.target.value
     setSortValue(value);
    
    if(value==="Stars Count"){
      repos.sort(function(a, b){
        return b.stargazers_count - a.stargazers_count;
      })
    }

    if(value==="Watchers Count"){
      repos.sort(function(a, b){
        return b.watchers_count - a.watchers_count;
      })
    }

     if(value==="Score"){
       repos.sort(function(a, b){
         return b.score - a.score;
       })
     }

    if(value==="Name"){
      repos.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;

      })
    }

    if(value==="Created at"){
      repos.sort(function(a, b){
        return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf();
      })
      console.log(repos);
    }

    if(value==="Updated at"){
      repos.sort(function(a, b){
        return new Date(b.updated_at).valueOf() - new Date(a.updated_at).valueOf();
      })
    }

  }

  return (
    <div className="App">
      <br/>
      <div className='navbar'>
        <h1 style={{position:"absolute"}}>Github Repos...</h1>
      <h2 style= {{marginLeft: "600px", marginTop:"50px"}}>Sort by...</h2>
      </div>
      
      
      <Form className = 'form' onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Input
          position="fixed"
          type="text"
          name="query"
          placeholder="Search github repos..." />
          <Form.Button type="submit" style = {{ marginLeft : "10px"}}>search</Form.Button>

          <div className="sort">
            
             <h3 style={{marginLeft:"100px", position:"absolute"}}>Sort by...</h3>
            
             <select 
             style={{position: 'absolute', marginLeft:"100px", width:"200px"}}
             onChange={handleSort}
             value={sortValue}
             >
                 <option value="" disabled selected>Please select value</option>
                 {
                  sortOptions.map((item, index)=>(
                    <option value={item} key={index}>{item}</option>
                  ))
                 }
              </select>
          </div>
          

          </Form.Group>
      </Form>
      

     


    <div className='cards'>
      {
        currentPosts.map((data)=>(
          <div className='card' key = {data.id}>
      <Card>
    <Image src={data.owner.avatar_url} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{data.name}</Card.Header>
      
      <Card.Description>
        <b>Description: </b> {data.description}
      </Card.Description>
      <Card.Description>
       <b> Language: </b> {data.language}
      </Card.Description>
      <Card.Description>
        <b>Created at: </b> {data.created_at}
      </Card.Description>
      <Card.Description>
        <b>Updated at: </b> {data.updated_at}
      </Card.Description>

    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='star' />
        {data.stargazers_count}
      </a>
    </Card.Content>
    
  </Card>

      </div>


        ))
      }

      </div>

      <Paginations postsPerPage={postsPerPage} totalPosts={repos.length} paginate={paginate} />

    </div>
  );
}

export default App;
