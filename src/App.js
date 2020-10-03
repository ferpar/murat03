import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import { select, line, curveCardinal, axisBottom, scaleLinear } from "d3";

const initialData = [25, 45, 30, 74, 38, 80, 160, 240, 200, 100];

function App() {
  const [data, setData] = useState(initialData)
  const svgRef = useRef();
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, (data.length - 1)*50]);
    const yScale = scaleLinear()
      .domain([0, Math.max(...data)*1.2])
      .range([300, 0]);
    const xAxis = axisBottom();
    const myLine = line()
      .x( (value, idx) => xScale(idx))
      .y( value => yScale(value))
      .curve(curveCardinal);
    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", value => value)
    //   .attr("cx", value => value * 2)
    //   .attr("cy", value => value * 2)
    //   .attr("stroke", "red")
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue")
  }, [data]);
  return <React.Fragment>
    <svg ref={svgRef}></svg>
    <br/>
    <button onClick={() => setData(data.map( val => val + 5))}>Update Data</button>
    <button onClick={() => setData(data.filter( value => value  < 50))}> Filter Data</button>
    </React.Fragment>;
}

export default App;
