import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

import { MainDataType, DailyDataType, BuiltDaylyDataType, ChartPropsType } from "../../Types/covidDataType";
import {fetchDailyData} from "../../Services/API";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


const Chart = ({ data: { cases, recovered, deaths }, country }: ChartPropsType) => {
  const [dailyData, setDailyData] = useState<BuiltDaylyDataType>({
    dateLabels: [],
    casesLine: [],
    deathsLine: [],
  });

  const buildDailyData = (data: DailyDataType) => {
    const dateLabels: string[] = [];
    const casesLine: number[] = [];
    const deathsLine: number[] = [];
    
    const weeklyAverageDateLabels: string[] = [];
    const weeklyAverageCasesLine: number[] = [];
    const weeklyAverageDeathsLine: number[] = [];

    let prevDate: null | string = null;

    for (let date in data.cases) {
      if (!prevDate) {
        dateLabels.push(date);
        casesLine.push(0);
        deathsLine.push(0);
        prevDate = date;
        continue;
      }
      
      dateLabels.push(date);
      casesLine.push(data.cases[date] - data.cases[prevDate]);
      deathsLine.push(data.deaths[date] - data.deaths[prevDate]);
      prevDate = date;
    }

    for (let i = 6; i <= dateLabels.length; i++) {      
      weeklyAverageDateLabels.push(dateLabels[i]);
      weeklyAverageCasesLine.push((casesLine[i] + casesLine[i-1] + casesLine[i-2] + casesLine[i-3] + casesLine[i-4] + casesLine[i-5] + casesLine[i-6]) / 7);
      weeklyAverageDeathsLine.push((deathsLine[i] + deathsLine[i-1] + deathsLine[i-2] + deathsLine[i-3] + deathsLine[i-4] + deathsLine[i-5] + deathsLine[i-6]) / 7);
    }

    return { dateLabels: weeklyAverageDateLabels, casesLine: weeklyAverageCasesLine, deathsLine: weeklyAverageDeathsLine };
  };  

  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await fetchDailyData();
      const builtData = buildDailyData(data);
      setDailyData(builtData);
    };

    fetchAPI();
  }, []);

  const lineChart = !dailyData ? (
    <div className="error">Can't fetch daily data</div>
  ) : dailyData.dateLabels ? (
    <Line
      data={{
        labels: dailyData.dateLabels,
        datasets: [
          {
            data: dailyData.casesLine,
            label: "Infected",
            borderColor: "#3333ff",
            fill: false,
          },
          {
            data: dailyData.deathsLine,
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5",
            fill: true,
          },
          
        ],
        
      }}
      options={{
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
          },
        },
      }}
    />
  ) : null;

  const barChart = cases ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [cases, recovered, deaths],
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            display: false,
          },
         
          title: {
            display: true,
            text: `Current state in ${country}`,
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
          },
        },
      }}
    />
  ) : null;

  return (
    <div className="container">
      {country !== "global" ? barChart : lineChart}
    </div>
  );
};

export default Chart;
