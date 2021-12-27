import React,{ useState, useEffect} from "react";
import api from './services/api'; 

import  './App.css';

//componentes
import Header  from "./components/Header";



export default function App(){
  
  //usestate retorna um array com duas posicoes 
  // 1º Variavel com o seu valor inicial
  // 2º funcao para atualizarmos esses valores

  const [projects,setprojects] = useState([]);
  useEffect(()=>{
    api.get('/projects').then(Response=>{
      setprojects(Response.data);
    })
  },[]);


  async function handleAddProject(){

  //   projects.push(`novo Projeto ${Date.now()}`); 

  // setprojects([...projects,`novo Projeto ${Date.now()}`]); 
  const response  = await api.post('/projects',{
    title: `novo Projeto ${Date.now()}`,
    owner: 'sergio souza'
  });

  const project = response.data;

  setprojects([...projects, project]);

  }

  return (
    <>
      <Header title="Projects"/>
    

      <ul>
        {projects.map(project => <li key={project.id}>{project.title }</li>)}
      </ul>
      <button tipe="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}
