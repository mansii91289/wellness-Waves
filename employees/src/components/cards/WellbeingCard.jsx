
import { Card, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const fetchWellbeingData = async () => {
  return {
    wellbeingScore: 6,
    wellbeing: [
      { name: "Health", value: 6 },
      { name: "Resilience", value: 8 },
      { name: "Culture", value: 7 },
    ],
  };
};

const WellbeingCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wellbeingData, setWellbeingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWellbeingData();
        if (!data) throw new Error("No wellbeing data received");
        setWellbeingData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <Card sx={{ p: 4, textAlign: "center", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Typography>Loading...</Typography>
    </Card>
  );

  if (error) return <Typography color="error">❌ {error}</Typography>;

  const score = wellbeingData.wellbeingScore;
  const angle = -180 + (score / 10) * 180; // Convert score to angle

  return (
    <Card sx={{ p: 4, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Wellbeing Profile
        </Typography>
      </Box>

      <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
        <svg width="100%" height="100%" viewBox="0 0 200 100">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="50%" stopColor="#66bb6a" />
              <stop offset="100%" stopColor="#43a047" />
            </linearGradient>
          </defs>

          {/* Score markers */}
          {Array.from({ length: 11 }).map((_, i) => {
            const tickAngle = -180 + (i * 180) / 10;
            const x = 100 + 70 * Math.cos((tickAngle * Math.PI) / 180);
            const y = 100 + 70 * Math.sin((tickAngle * Math.PI) / 180);
            const textY = 100 + 85 * Math.sin((tickAngle * Math.PI) / 180);
            return (
              <g key={i}>
                <line
                  x1={100 + 65 * Math.cos((tickAngle * Math.PI) / 180)}
                  y1={100 + 65 * Math.sin((tickAngle * Math.PI) / 180)}
                  x2={x}
                  y2={y}
                  stroke="#666"
                  strokeWidth={2}
                />
                <text 
                  x={100 + 90 * Math.cos((tickAngle * Math.PI) / 180)}
                  y={textY}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {i}
                </text>
              </g>
            );
          })}

          {/* Main arc */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Score pointer */}
          <motion.g
            initial={{ rotate: -180 }}
            animate={{ rotate: angle }}
            transition={{ duration: 1.5, type: "spring" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            <line
              x1="100"
              y1="100"
              x2="165"
              y2="100"
              stroke="#1a1a1a"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="#1a1a1a" />
          </motion.g>

          {/* Score text */}
          <text x="100" y="130" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1a1a1a">
            {score}
          </text>
        </svg>
      </Box>

      {/* Individual scores */}
      <Box sx={{ mt: 4 }}>
        {wellbeingData.wellbeing.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 1,
            }}
          >
            <Typography>{item.name}</Typography>
            <Typography sx={{ minWidth: 24 }}>{item.value}</Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default WellbeingCard;