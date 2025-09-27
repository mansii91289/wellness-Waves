
import { useEffect, useState } from "react";
import { CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CustomBarChart from "../charts/BarChart";

const defaultSessionData = [
  { name: "Jan", Program: 1, Expert: 1, GroupCoaching: 10, LiveSessions: 0 },
  { name: "Feb", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Mar", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Apr", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "May", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Jun", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Jul", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Aug", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Sep", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Oct", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Nov", Program: 0, Expert: 0, GroupCoaching: 0, LiveSessions: 0 },
  { name: "Dec", Program: 0, Expert: 40, GroupCoaching: 0, LiveSessions: 0 },
];

const SessionsCard = () => {
  const [sessionData, setSessionData] = useState(defaultSessionData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSessionData = async () => {
      const userId = localStorage.getItem("userId");
      const savedData = localStorage.getItem(`sessionData_${userId}`);

      if (savedData) {
        setSessionData(JSON.parse(savedData));
        setLoading(false);
        return;
      }

      try {
        const responses = await Promise.all([
          fetch("http://localhost:3000/api/profileSessions"),
          fetch("http://localhost:3000/api/liveSessions"),
          fetch("http://localhost:3000/api/challengeSessions"),
          fetch("http://localhost:3000/api/expertSessions"),
        ]);

        const data = await Promise.all(responses.map(res => res.json()));

        const updatedData = defaultSessionData.map(month => ({
          ...month,
          Program: data[0].find(s => s.name === month.name)?.sessions || 0,
          Expert: data[1].find(s => s.name === month.name)?.sessions || 0,
          GroupCoaching: data[2].find(s => s.name === month.name)?.sessions || 0,
          LiveSessions: data[3].find(s => s.name === month.name)?.sessions || 0,
        }));

        setSessionData(updatedData);
        localStorage.setItem(`sessionData_${userId}`, JSON.stringify(updatedData));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  if (loading) {
    return (
      <motion.div className="p-6 bg-white shadow-lg rounded-xl">
        <Typography variant="h6" className="font-semibold text-gray-800">
          No. of Sessions Attended
        </Typography>
        <Typography className="text-gray-500">Loading sessions...</Typography>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="p-6 bg-white shadow-lg rounded-xl">
        <Typography variant="h6" className="font-semibold text-gray-800">
          No. of Sessions Attended
        </Typography>
        <Typography className="text-red-500">Error: {error}</Typography>
      </motion.div>
    );
  }

  return (
    <motion.div className="p-6 bg-white shadow-lg rounded-xl">
      <Typography variant="h6" className="font-semibold text-gray-800">
        No. of Sessions Attended
      </Typography>
      <CardContent>
        <CustomBarChart data={sessionData} />
      </CardContent>
    </motion.div>
  );
};

export default SessionsCard;