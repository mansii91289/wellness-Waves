// src/components/charts/LineChart.jsx
//import { Mood } from "@mui/icons-material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const  sessionData = [
  { name: "Jan", Mood: 10 },
  { name: "Feb", Mood: 30  },
  { name: "Mar", Mood: 15  },
  { name: "Apr", Mood: 50 },
  { name: "May", Mood: 40 },
  { name: "May", Mood: 40 },
  { name: "Jun", Mood: 70 },
  { name: "Jul", Mood: 30 },
  { name: "Aug", Mood: 10 },
  { name: "sept",Mood: 15 },
  { name: "oct", Mood: 20},
  { name: "nov", Mood: 25},
  { name: "Dec", Mood: 50},
];

const SessionsChart = () => {
  const userId = localStorage.getItem("userId");
  const userSessionData = JSON.parse(localStorage.getItem(`sessionData_${userId}`)) || sessionData;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={userSessionData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Mood" stroke="#8884d8" strokeWidth={2} />
       
      </LineChart>
    </ResponsiveContainer>
  );
};
export default SessionsChart;