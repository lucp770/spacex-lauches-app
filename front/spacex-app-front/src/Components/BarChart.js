import React from "react";
import { Chart } from "react-google-charts";

export default function barChart({data}){

    let n_categorias = 4; //numero de diferentes foguetes.
    let newData = [
        [
            "Month",
            "Bolivia",
            "Ecuador",
            "Madagascar",
            "Papua New Guinea",
            "Rwanda",
            "Average",
          ],
          ["2004/05", 165, 938, 522, 998, 450, 614.6],
          ["2005/06", 135, 1120, 599, 1268, 288, 682],
          ["2006/07", 157, 1167, 587, 807, 397, 623],
          ["2007/08", 139, 1110, 615, 968, 215, 609.4],
          ["2008/09", 136, 691, 629, 1026, 366, 569.6],
        ];

        const options = {
            backgroundColor: '#abb2b9',
            title: "Monthly Coffee Production by Country",
            vAxis: { title: "Cups" },
            hAxis: { title: "Month" },
            seriesType: "bars",
            series: { 5: { type: "line" } },
          };

    return(
        <div className='bar-chart'>
            <Chart
                chartType="ComboChart"
                width="450px"
                height="300px"
                data={newData}
                options={options}
                />
        </div>
    )
}



