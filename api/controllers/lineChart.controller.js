
import LineChart from '../models/lineChart.model.js';
import Employee from '../models/employee.model.js';

export const updateLineChartData = async (req, res) => {
  try {
    const { month, category, duration, operation = 'increase' } = req.body;
    const employeeId = req.employee.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    let lineChartData = await LineChart.findOne({
      employeeId,
      month
    });

    if (!lineChartData) {
      lineChartData = new LineChart({
        employeeId,
        employeeEmail: employee.email,
        month,
        [category]: operation === 'increase' ? duration : -duration
      });
    } else {
      const change = operation === 'increase' ? duration : -duration;
      lineChartData[category] = Math.max(0, (lineChartData[category] || 0) + change);
    }

    await lineChartData.save();
    
    res.status(200).json({ 
      success: true, 
      data: lineChartData
    });

  } catch (error) {
    console.error("Error updating line chart data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLineChartData = async (req, res) => {
  try {
    const employee = req.employee;
    
    const lineChartData = await LineChart.find({ 
      employeeEmail: employee.email 
    }).sort({ month: 1 });
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const transformedData = months.map(month => {
      const monthData = lineChartData.find(entry => entry.month === month) || {};
      return {
        name: month,
        program: monthData.program || 0,
        livesessions: monthData.livesessions || 0,
        expert: monthData.expert || 0,
        challenges: monthData.challenges || 0,
        groupcoaching: monthData.groupcoaching || 0
      };
    });

    res.status(200).json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    console.error("Error fetching line chart data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
