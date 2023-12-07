import * as React from 'react';
import { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
import TSleighHeadTable from './TSleighHeadTable';
import TDevanHeadTable from './TDevanHeadTable';

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
      marginTop: '1rem'
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
      const response = await axios.get('http://localhost:4000/api/submissions/today-devan');
  
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
      const response = await axios.get('http://localhost:4000/api/submissions/today-sleigh');
  
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
      {selectedType === 'sleigh' && <TSleighHeadTable
                                    selectedOrders={selectedOrders} 
                                    thisMonthSubmissions={thisMonthSubmissions}
                                    onCheckboxChange={handleCheckboxChange} 
                                    checkboxState={checkboxState}
                                    handleStatusChange={handleStatusChange}/>}
      {selectedType === 'divan' && <TDevanHeadTable 
                                    selectedOrders={selectedOrders} 
                                    thisMonthSubmissions={thisMonthSubmissions}
                                    onCheckboxChange={handleCheckboxChange} 
                                    checkboxState={checkboxState}
                                    handleStatusChange={handleStatusChange}/>}
    </Container>
  );
};
