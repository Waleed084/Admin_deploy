import * as React from 'react';
import { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import * as XLSX from 'xlsx';
import SleighHeadTable from './SleighHeadTable';
import DevanHeadTable from './DevanHeadTable';

export default function ToggleButtons() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [thisMonthSubmissions, setThisMonthSubmissions] = useState([]);
  const inlineStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '2rem',
      backgroundColor: '#f2e0ff', // Light violet background
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    select: {
      marginBottom: '1rem',
      minWidth: '200px'
    },
    button: {
      minWidth: '100px',
      backgroundColor: '#6200ea', // Violet button color
      color: 'white',
      marginTop: '1rem',
      marginLeft: '5%'
    }
  };
  const [selectedType, setSelectedType] = useState('sleigh'); // Default to Sleigh orders
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [checkboxState, setCheckboxState] = useState(false);

  const handleCheckboxChange = (orderId) => {
    // Logic for handling checkbox change and updating selectedOrders state
    // For example:
    // If orderId is in selectedOrders, remove it; otherwise, add it
    const selectedIndex = selectedOrders.indexOf(orderId);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedOrders, orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedOrders.slice(1));
    } else if (selectedIndex === selectedOrders.length - 1) {
      newSelected = newSelected.concat(selectedOrders.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedOrders.slice(0, selectedIndex),
        selectedOrders.slice(selectedIndex + 1)
      );
    }
    setSelectedOrders(newSelected);
    setCheckboxState(false);
  };
  // ... rest of your component code ...
  const handleToggleChange = (event, newType) => {
    setSelectedType(newType);
  };
  const handleStatusChange = async () => {
    if(selectedType === 'divan'){
      try {
        // Call your API endpoint to update the status of selected orders on the server side
        await axios.put('http://localhost:4000/api/submissions/update-status-devan', {
          orders: selectedOrders,
          status: selectedStatus,
        });
  
        // Update the status of selected orders in the local state
        const updatedOrders = thisMonthSubmissions.map((order) => {
          if (selectedOrders.includes(order._id)) {
            return {
              ...order,
              status: selectedStatus,
            };
          }
          return order;
        });
        // Fetch the updated data from the server
      const response = await axios.get('http://localhost:4000/api/submissions/this-month-devan');
  
      // Set the updated data in the local state
      setThisMonthSubmissions(response.data);
        // Update the state with the new orders
        setThisMonthSubmissions(updatedOrders);
  
        // Clear the selected orders after updating their status
        setSelectedOrders([]);
      } catch (error) {
        console.error('Error updating order status:', error);
      }
      setCheckboxState(true);
    }
    else if(selectedType === 'sleigh'){
      try {
        // Call your API endpoint to update the status of selected orders on the server side
        await axios.put('http://localhost:4000/api/submissions/update-status-sleigh', {
          orders: selectedOrders,
          status: selectedStatus,
        });
  
        // Update the status of selected orders in the local state
        const updatedOrders = thisMonthSubmissions.map((order) => {
          if (selectedOrders.includes(order._id)) {
            return {
              ...order,
              status: selectedStatus,
            };
          }
          return order;
        });
        // Fetch the updated data from the server
      const response = await axios.get('http://localhost:4000/api/submissions/this-month-sleigh');
  
      // Set the updated data in the local state
      setThisMonthSubmissions(response.data);
        // Update the state with the new orders
        setThisMonthSubmissions(updatedOrders);
  
        // Clear the selected orders after updating their status
        setSelectedOrders([]);
      } catch (error) {
        console.error('Error updating order status:', error);
      }
      setCheckboxState(true);
    }
  };
  const getApiEndpointForDownload = () => {
    if (selectedType === 'divan') {
      return 'http://localhost:4000/api/submissions/this-month-devan';
    } if (selectedType === 'sleigh') {
      return 'http://localhost:4000/api/submissions/this-month-sleigh';
    }
    // Add more cases if needed
    return '';
  };
  
  const handleDownloadExcel = async () => {
    if(selectedType === 'sleigh'){
      try {
        // Fetch the data for downloading
        const response = await axios.get(getApiEndpointForDownload());
    
        // Extract the relevant data from the API response
        
        const excelData = response.data.map((item) => ({
          submissionDate: item.submissionDate,
          Type: item.Type,
          status: item.status,
          Seller: item.Seller,
          route: item.route,
          size: item.size,
          Color: item.Color,
          HeadBoard: item.HeadBoard,
          mattress: item.mattress,
          ottoman: item.ottoman,
          Glift: item.Glift,
          threeD: item.threeD,
          totalPrice: item.totalPrice,
          customerDetails: item.customerDetails,
          postalCode: item.postalCode,
          remarks: item.remarks,
          sprice: item.sprice,
          profit: item.profit,
        }));
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Convert the data to an array of arrays (2D array) for XLSX formatting
        const excelArrayData = excelData.map((item) => [
          item.submissionDate,
          item.Type,
          item.Seller,
          item.status,
          item.route,
          item.size,
          item.Color,
          item.HeadBoard,
          item.mattress,
          item.ottoman,
          item.Glift,
          item.threeD,
          item.totalPrice,
          item.customerDetails,
          item.postalCode,
          item.remarks,
          item.sprice,
          item.profit,
        ]);
    
        // Add headers to the data
        const headers = ['Submission Date', 'Type','Seller', 'Status', 'Route', 'Size', 'Color', 'HeadBoard', 'Mattress', 'Ottoman', 'Glift', '3D', 'Total Price', 'Customer Details', 'Postal Code', 'Remarks', 'Sprice', 'Profit'];
        const ws = XLSX.utils.aoa_to_sheet([headers, ...excelArrayData]);
        
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    
        // Save the workbook to a file
        XLSX.writeFile(wb, 'downloaded_data.xlsx');
      } catch (error) {
        console.error('Error downloading data:', error);
      }
    } else if(selectedType === 'divan'){
      try {
        // Fetch the data for downloading
        const response = await axios.get(getApiEndpointForDownload());
    
        // Extract the relevant data from the API response
        
        const excelData = response.data.map((item) => ({
          submissionDate: item.submissionDate,
          Type: item.Type,
          status: item.status,
          Seller: item.Seller,
          route: item.route,
          size: item.size,
          Color: item.Color,
          HeadBoard: item.HeadBoard,
          mattress: item.mattress,
          Set: item.Set,
          assembly: item.assembly,
          siplet: item.siplet,
          threeD: item.threeD,
          totalPrice: item.totalPrice,
          customerDetails: item.customerDetails,
          postalCode: item.postalCode,
          remarks: item.remarks,
          sprice: item.sprice,
          profit: item.profit,
        }));
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        
        // Convert the data to an array of arrays (2D array) for XLSX formatting
        const excelArrayData = excelData.map((item) => [
          item.submissionDate,
          item.Type,
          item.Seller,
          item.status,
          item.route,
          item.size,
          item.Color,
          item.HeadBoard,
          item.mattress,
          item.Set,
          item.assembly,
          item.threeD,
          item.siplet,
          item.totalPrice,
          item.customerDetails,
          item.postalCode,
          item.remarks,
          item.sprice,
          item.profit,
        ]);
    
        // Add headers to the data
        const headers = ['Submission Date', 'Type','Seller', 'Status', 'Route', 'Size', 'Color', 'HeadBoard', 'Mattress', 'Set Type', 'Assembly', '3D', 'Siplet', 'Total Price', 'Customer Details', 'Postal Code', 'Remarks', 'Sprice', 'Profit'];
        const ws = XLSX.utils.aoa_to_sheet([headers, ...excelArrayData]);
        
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    
        // Save the workbook to a file
        XLSX.writeFile(wb, 'downloaded_data.xlsx');
      } catch (error) {
        console.error('Error downloading data:', error);
      }
    }
  };
  
  

  return (
    <Container>
      <div>
      <FormControl style={inlineStyles.select}>
          <InputLabel>Status</InputLabel>
          <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} required>
            <MenuItem value="Text Sent">Text Sent</MenuItem>
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="No Answer">No Answer</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={inlineStyles.button}
          onClick={handleStatusChange}
        >
          Update Status
        </Button>
        <Button
          variant="contained"
          style={inlineStyles.button}
          onClick={handleDownloadExcel}
        >
          Download Excel
        </Button>

    </div>


      {/* Additional Toggle Buttons */}
      <ToggleButtonGroup
        value={selectedType}
        exclusive
        onChange={handleToggleChange}
        aria-label="additional toggles"
      >
        <ToggleButton value="sleigh" aria-label="Sleigh">
          Sleigh
        </ToggleButton>
        <ToggleButton value="divan" aria-label="Divan">
          Divan
        </ToggleButton>
      </ToggleButtonGroup>
      {selectedType === 'sleigh' && <SleighHeadTable
                                    selectedOrders={selectedOrders} 
                                    thisMonthSubmissions={thisMonthSubmissions}
                                    onCheckboxChange={handleCheckboxChange} 
                                    checkboxState={checkboxState}
                                    handleStatusChange={handleStatusChange}/>}
      {selectedType === 'divan' && <DevanHeadTable 
                                    selectedOrders={selectedOrders} 
                                    thisMonthSubmissions={thisMonthSubmissions}
                                    onCheckboxChange={handleCheckboxChange} 
                                    checkboxState={checkboxState}
                                    handleStatusChange={handleStatusChange}/>}
    </Container>
  );
};
