
async function testarAPI(){

    let apiURL = 'https://api.spacexdata.com/v5/launches/';
    let result = await fetch(apiURL);
    
    // console.log(result);
    result = await result.json();

    // console.log(result);
    
    let PAGINAS = [];
    
    
    // get the array divide in groups of 5
    let n_results = result.length;
    let n_paginas =Math.round(n_results/5);
    let resto = n_results %5;
    
    let inicio=0;
    for(let i=0; i < n_paginas; i++){
        let pagina = result.slice(inicio,inicio+5);
        PAGINAS.push(pagina);
        inicio +=6;
    }
    if(resto){
        PAGINAS.push(result.slice(result.length-resto, result.length-1));
    }

    console.log(PAGINAS);
    
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

testarAPI();