
// import BarChart from '../models/barChart.model.js';
// import Employee from '../models/employee.model.js';

// export const updateBarChartData = async (req, res) => {
//   try {
//     const { month, category } = req.body;
//     const employeeId = req.employee.id;

//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ success: false, message: 'Employee not found' });
//     }

//     let barChartData = await BarChart.findOne({
//       employeeId,
//       month
//     });

//     if (!barChartData) {
//       barChartData = new BarChart({
//         employeeId,
//         employeeEmail: employee.email,
//         month,
//         [category]: 1
//       });
//     } else {
//       barChartData[category] += 1;
//     }

//     await barChartData.save();
    
//     res.status(200).json({ 
//       success: true, 
//       data: barChartData
//     });

//   } catch (error) {
//     console.error("❌ Error updating bar chart data:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const getBarChartData = async (req, res) => {
//   try {
//     const employee = req.employee;
    
//     // Use employee email for filtering
//     const barChartData = await BarChart.find({ 
//       employeeEmail: employee.email 
//     }).sort({ month: 1 });
    
//     console.log("Fetching data for email:", employee.email);
    
//     // Transform data
//     const transformedData = barChartData.map(entry => ({
//       month: entry.month,
//       Program: entry.Program || 0,
//       LiveSessions: entry.LiveSessions || 0,
//       Experts: entry.Experts || 0,
//       Challenge: entry.Challenge || 0
//     }));

//     res.status(200).json({
//       success: true,
//       data: transformedData
//     });
//   } catch (error) {
//     console.error("❌ Error fetching bar chart data:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

import BarChart from '../models/barChart.model.js';
import Employee from '../models/employee.model.js';

export const updateBarChartData = async (req, res) => {
  try {
    const { month, category } = req.body;
    const employeeId = req.employee.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }

    let barChartData = await BarChart.findOne({
      employeeId,
      month
    });

    if (!barChartData) {
      barChartData = new BarChart({
        employeeId,
        employeeEmail: employee.email,
        month,
        [category]: 1
      });
    } else {
      const changeValue = (req.body.operation === 'decrease' && req.body.value) ? req.body.value : 1;
      barChartData[category] = Math.max(0, barChartData[category] + changeValue);
    }

    await barChartData.save();
    
    res.status(200).json({ 
      success: true, 
      data: barChartData
    });

  } catch (error) {
    console.error("❌ Error updating bar chart data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBarChartData = async (req, res) => {
  try {
    const employee = req.employee;
    
    // Use employee email for filtering
    const barChartData = await BarChart.find({ 
      employeeEmail: employee.email 
    }).sort({ month: 1 });
    
    console.log("Fetching data for email:", employee.email);
    
    // Transform data
    const transformedData = barChartData.map(entry => ({
      month: entry.month,
      Program: entry.Program || 0,
      LiveSessions: entry.LiveSessions || 0,
      Experts: entry.Experts || 0,
      Challenge: entry.Challenge || 0
    }));

    res.status(200).json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    console.error("❌ Error fetching bar chart data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
