import React from 'react';
import { Chart } from "react-google-charts";


export default function pieChart({data}){

    const options = {
        title: "Lançamentos de Foguetes",
        backgroundColor: '#abb2b9',
      };

    return (
        <div className='pie-chart'>
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"450px"}
                height={"300px"}
            />
        </div>
    )

}