
import { PieChart, Pie, Cell, Legend } from "recharts";
import { useState, useEffect } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d45087", "#a05195"];

const CustomPieChart = () => {
  const [data, setData] = useState([
    { name: "Dashboard", value: 30 },
    { name: "Challenges", value: 20 },
    { name: "Expert", value: 15 },
    { name: "Recorded Sessions", value: 25 },
    { name: "Group Coaching", value: 15 },
    { name: "Live Sessions", value: 10 },
  ]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const savedData = JSON.parse(localStorage.getItem(`pieChartData_${userId}`));
    if (savedData) {
      setData(savedData);
    }
  }, []);

  return (
    <PieChart width={300} height={200}>
      <Pie 
        data={data} 
        cx="50%" 
        cy="50%" 
        outerRadius={60} 
        fill="#8884d8" 
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={COLORS[index % COLORS.length]} 
          />
        ))}
      </Pie>
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;
