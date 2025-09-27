
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChallengeDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Typography variant="h4" className="mb-8 font-bold text-center">
        45 Days of Stress Release
      </Typography>
      <Button
        variant="outlined"
        onClick={() => navigate("/challenges")}
        className="text-indigo-700 border-indigo-700 hover:bg-indigo-50 transition-all duration-300"
        startIcon={<span>←</span>}
      >
        Back to Challenges
      </Button>
      {/* Add more details here */}
    </div>
  );
};

export default ChallengeDetail;