import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LineChart from "../charts/LineChart"; // Ensure this is the correct path for your chart component
import PropTypes from 'prop-types';

const CheckInReport = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="p-6 bg-white shadow-lg rounded-xl text-center"
      >
        <Typography variant="h6" className="font-semibold text-gray-800">
          Check-in Report
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          No check-in data available.
        </Typography>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-lg rounded-xl"
    >
      <Typography variant="h6" className="font-semibold text-gray-800">
        Check-in Report
      </Typography>
      <Card className="mt-4 shadow-md p-4 rounded-lg">
        <CardContent>
          <LineChart data={data} /> {/* Pass data to LineChart */}
        </CardContent>
      </Card>
    </motion.div>
  );
};
CheckInReport.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CheckInReport;

