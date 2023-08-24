import React from "react";
import planet from "./../Images/planet-earth.png";
import ytLogo from "./../Images/youtube.png";

export default function ResultadoVoo(props){
        let {numero, logo, missao, dataDeLanc,foguete,resultado, video} = props.data;
        console.log(props);

        console.log({numero, logo, missao, dataDeLanc,foguete,resultado, video});

        return(
            <div className="resultado-voo">
                <div>{numero}</div>
                <div><a href={logo}><img src={planet} style={{width: '1.4rem'}} /></a></div>
                <div>{missao}</div>
                <div>{dataDeLanc}</div>
                <div>{foguete}</div>
                <div className={"voo-result-label " + ((resultado === 'Sucesso')? 'green': 'red')}>{resultado}</div>
                <div><a href={video}><img src={ytLogo} style={{width: '2rem'}} /></a></div>
            </div>);
}


/*
    <>
        <td>{numero}</td>
        <td>{logo}</td>
        <td>{missao}</td>
        <td>{dataDeLanc}</td>
        <td>{foguete}</td>
        <td>{resultado}</td>
        <td>{video}</td>
    </>
*/


/*

    <div className="resultado-voo">
        <div>{numero}</div>
        <div>{logo}</div>
        <div>{missao}</div>
        <div>{dataDeLanc}</div>
        <div>{foguete}</div>
        <div>{resultado}</div>
        <div>{video}</div>
    </div>
*/



/*

com tabela não parece mesmo dar certo !!!

TODO: fazer a implementação de ResultadoVoo com div.

*/

