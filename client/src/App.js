import React, { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Chart from "./components/Chart/Chart";
import api from "./api/bets";
import { filters } from "./constants/filters";
import "./App.css";

const App = () => {
  const { betType } = filters;
  const betTypes = Object.keys(betType);
  const [betData, setBetData] = useState([]);
  const [filterSelection, setFilterSelection] = useState(betType[betTypes[0]]);
  const [dropDownSelection, setDropDownSelection] = useState("");
  const [highlights, setHighlights] = useState({
    avg: null,
    min: null,
    max: null,
  });

  useEffect(() => {
    const chartData = fetchBetData(
      filterSelection.statType,
      dropDownSelection,
      filterSelection.xAxis,
      filterSelection.yAxis
    );

    const highlightData = fetchHighlights(
      filterSelection.statType,
      dropDownSelection,
      filterSelection.yAxis
    );

    const fetchData = async () => {
      try {
        Promise.all([chartData, highlightData]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filterSelection, dropDownSelection]);

  const fetchBetData = async (statType, statTypeSelection, xAxis, yAxis) => {
    try {
      const resp = await api.getBets(statType, statTypeSelection, xAxis, yAxis);

      setBetData(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHighlights = async (statType, statTypeSelection, yAxis) => {
    try {
      const resp = await api.getHighlights(statType, statTypeSelection, yAxis);

      setHighlights(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterSelection = (e) => {
    const newFilterSelection = betType[e.target.value];

    setFilterSelection(newFilterSelection);
    newFilterSelection.statTypeSelection.length > 0
      ? setDropDownSelection(newFilterSelection.statTypeSelection[0])
      : setDropDownSelection("");
  };

  const handleDropDownSelection = (events) => {
    setDropDownSelection(events);
  };

  return (
    <>
      <Header />
      <main>
        <div className="main__container">
          <div className="main__title">
            <span>MIN vs UTAH Data Visualization & Trends</span>
          </div>
          <div className="flex-container">
            <div className="flex-container__filters">
              <Filters
                filters={betTypes}
                filterSelection={filterSelection}
                onClick={handleFilterSelection}
                dropDownValues={filterSelection.statTypeSelection}
                dropDownSelection={dropDownSelection}
                onSelect={handleDropDownSelection}
              />
            </div>
            <div className="flex-container__highlights">
              <div className="flex-container__highlights-avg">
                <h2>{highlights.avg}</h2>
                <span>Average</span>
              </div>
              <div className="flex-container__highlights-min">
                <h2>{highlights.min}</h2>
                <span>Low</span>
              </div>
              <div className="flex-container__highlights-max">
                <h2>{highlights.max}</h2>
                <span>High</span>
              </div>
            </div>
          </div>
          <Chart
            data={betData}
            filterSelection={filterSelection}
            average={highlights.avg}
          />
        </div>
      </main>
    </>
  );
};

export default App;
