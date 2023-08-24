import { useState,useEffect } from 'react';

import PieChart from './Components/PieChart';
import BarChart from './Components/BarChart';
import SearchBar from './Components/SearchBar';
import ResultadoVoo from './Components/ResultadoVoo';

import './App.css';
import RocketImg from './Images/rocket.png';


function App() {
  const [searchResult, setSearch] = useState('');
  const [apiData, setApiData] = useState(null);
  // get the real data.
  // useEffect(()=>{
  //   // data from API without query Params.
  //   let url = 'http://localhost:8000/';
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(resp => console.log(resp));

  // },[])



  // first render,
  // get data from the API and store on a local state variable.
  useEffect(()=>{
    console.log('Pesquisa executada, buscando dados da API');
    console.log('\n FIRST RENDER');
    let url = 'http://localhost:8000/launches?pg=0';
    fetch(url)
      .then(response => response.json())
      .then(resp => setApiData(resp))
      .catch(err => alert('Erro ao buscar dados: ' + err));
  },[])


  // Properties of this component.

    let dados, totalDocs, page, hasNext, hasPrev, paginationList;
    let spanListTemplate;
    if(apiData){

        ({totalDocs, page, hasNext, hasPrev} = apiData);

        console.log({totalDocs, page, hasNext, hasPrev});
        
        // get the counter:
        let auxArray = Array.from({length: totalDocs}, (value, idx)=> idx);
        if(page ==0){
          // aux = [1,2,totalDocs-1];
          spanListTemplate = (`
          <span className = "current">1</span>
          <span>2</span>
          ...
          <span>${totalDocs}</span>
          `);
          
        }else if(page == (totalDocs -1)){
          // aux = [1, totalDocs-2, totalDocs-1];
          spanListTemplate = `
          <span>1</span>
          ...
          <span>${totalDocs-2}</span>
          <span className = "current">${totalDocs-1}</span>
          `;

        }else{
          // aux = [1,page-1, page, page+1,totalDocs-1];
          spanListTemplate = `
          <span>1</span>
          ...
          <span>${page-1}</span>
          <span className = "current">${page}</span>
          <span>${page+1}</span>
          ...
          <span>${totalDocs -1}</span>
          `;

        }

        // [previews, current, next,... last]

        paginationList = auxArray.map(obj => `<span className=" ${(obj == page? "current ": "available ")}">${obj}</span>`);
        console.log({paginationList});
        
        /*
        paginationList = [
          <span className = 'selected'>1<span>,
          <span>2<span>,
          <span>3<span>,
        ] 
        

        */
        dados = apiData.results.map(obj=> {
          let resultado = (obj.success? 'Sucesso' : 'Falha');
          let date = new Date(obj.date_utc);
          date = date.toLocaleString().split(',')[0];
          let dataObj = {numero: obj.flight_number, logo: obj.links.patch.small , missao: obj.name, dataDeLanc: date, foguete: obj.rocket, resultado: resultado, video: obj.links.webcast}
          
          return dataObj; 
        })
    
    }else{
      dados=[{numero: 180, logo:'link', missao: 'Starlink 4-27(v1.5)', dataDeLanc: '05/10/2022', foguete:'Used Falcon 9' ,resultado:'Sucesso', video: 'link'},
      {numero: 179, logo:'link', missao: 'Starlink 4-27(v1.5)', dataDeLanc: '05/10/2022', foguete:'Used Falcon 9' ,resultado:'Sucesso', video: 'link'},
      {numero: 178, logo:'link', missao: 'Starlink 3-3(v1.5)', dataDeLanc: '07/09/2022', foguete:'Used Falcon 9' ,resultado:'Falha', video: 'link'}
      ];

      let totalDocs =1, page =0, hasNext = false, hasPrev = false;
    }

    let chartData = [
      ["Foguete", "nLancamentos"],
      ["used Falcon 9", 60],
      ["New Falcon 9", 15],
      ["Falcon 1", 15],
      ["Falcon Heavy", 10],
    ];
    
      // console.log({dados})

  return (
    <div className="App">

      <h1> <img src={RocketImg} className='rocket-img'/>SPACE X </h1>
      <div className='plot-container'>
        <PieChart data = {chartData}/>
        <BarChart  data = {[1,2,3]}/>
      </div>
      <SearchBar handleSearch={setSearch}/>
      
      <div className='result-container'>

        <div className='table-header'>
          <span className='div-th'>NºVoo</span>
          <span className='div-th'>Logo</span>
          <span className='div-th'>Missão</span>
          <span className='div-th'>Data de Lançamento</span>
          <span className='div-th'>Foguete</span>
          <span className='div-th'>Resultado</span>
          <span className='div-th'>Vídeo  </span>
        </div>
        {dados.map((dataObj)=> {
              return (<ResultadoVoo data = {dataObj}/>);
            })}

        <div className='result-footer' dangerouslySetInnerHTML={{ __html: spanListTemplate}}>
    
        </div>

      </div>

    </div>
  );
}

export default App;

/*
components:

-grafico de barras
-grafico de pizza
-barra de pesquisa
-lista Resultados
  -varias componentes ResultadoVoo
  
-receber dados da API.
	-se dados sao recebidos mostrar, caso contrario mostrar algum template.

-verificar o sistema de paginação. Preencher o número de paginas de acordo com os dados da API.
-implementar sistema de busca, para buscar os novos dados da API ao clicar no botao 'Buscar"

*/
