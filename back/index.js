// libraries
const express = require('express');
const cors = require('cors');


// server creation
const app = express();
const PORT = 8000;


app.use(express.json());
app.use(cors());

let PAGINAS = [];
let ROCKETS = [];

async function getDataFromAPI(){
    // get data from the API
    let apiURL = 'https://api.spacexdata.com/v5/launches/';
    let result = await fetch(apiURL);
    
    // console.log(result);
    result = await result.json();
    console.log(result);
    
    PAGINAS = [];//clear the global array paginas.

    // get data about the rockets.
    let rockets = await fetch('https://api.spacexdata.com/v4/rockets');
    rockets = await rockets.json()
    // ROCKETS = [...rockets];//copy data to the global variable

    // replace the id of the rockets, with its name.
    result.forEach(obj => {
        let id = obj.rocket;
        let rocket  = rockets.find(rck => rck.id == id);
        if(rocket){
            // if it find the rocket
            obj.rocket = rocket.name;
        }
    })
    
    
    // get the array divide in groups of 5
    let n_results = result.length;
    let n_paginas =Math.round(n_results/5);
    console.log({n_paginas, n_results})
    let resto = n_results %5;
    
    let inicio=0;
    for(let i=0; i < n_paginas; i++){
        let pagina = result.slice(inicio,inicio+5);
        PAGINAS.push(pagina);
        inicio +=5;
    }
    if(resto){
        PAGINAS.push(result.slice(result.length-resto, result.length-1));
    }

    console.log(PAGINAS.length);

    



    // return PAGINAS;
    
    /*
     let numeroDePgs = Math.round(arrayDeResultados.length/50);
                let resto = arrayDeResultados.length % 50;
                
                let inicio=0;
                for(let i=0; i < numeroDePgs; i++){
                    let pagina = RESULTADO.slice(inicio,inicio+50);
                    PAGINAS.push(pagina);
                    inicio +=51;
                }
                if(resto){
                    PAGINAS.push(arrayDeResultados.slice(arrayDeResultados.length-resto, arrayDeResultados.length-1));
                }
    
    */

}





// ROTAS
app.get('/', (request,response)=>{
    
    response.status(200).send({"message": "Fullstack Challenge 🏅 - Space X API" });

})

app.get('/launches', async (request,response)=>{
    // get the query params (expect search and limit)
    let {search, limit,pg} = request.query;

    console.log({search,limit,pg});

    // filter the array with those params
    if(search){
        console.log('S E A R C H !!!    ')
    }

    let hasNext = (pg==PAGINAS.length? false : true);
    let hasPrev = (pg==0? false : true);

    // structure response

    let responseObj = {
        results: PAGINAS[pg],
        totalDocs: PAGINAS.length,
        page: pg,
        hasNext: hasNext,
        hasPrev: hasPrev
    }

    // send response.
    response.status(200).send(responseObj)
})

app.get('/launches/stats', (request,response)=>{

    response.status(200).send({"message": "Fullstack Challenge 🏅 - Space X API" });

})



app.listen(PORT, ()=>{
    console.log(`server online at http://localhost:${PORT}`);

    // get data from the API at the start of the aplication.
    getDataFromAPI();

    // set a cron task to query data every day, at 9 A.M.




})


