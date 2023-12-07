import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Checkbox, Button } from '@mui/material';
import axios from 'axios';

const columns = [
  { id: 'submissionDate', label: 'Submission Date', minWidth: 170 },
  { id: 'Type', label: 'Type', minWidth: 100 },
  { id: 'Seller', label: 'Seller Name', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'route', label: 'Route', minWidth: 100 },
  { id: 'size', label: 'Size', minWidth: 100 },
  { id: 'Color', label: 'Color', minWidth: 100 },
  { id: 'HeadBoard', label: 'Head Board', minWidth: 170 },
  { id: 'mattress', label: 'Mattress', minWidth: 120 },
  { id: 'Set', label: 'Set', minWidth: 100 },
  { id: 'assembly', label: 'Assembly', minWidth: 100 },
  { id: 'siplet', label: 'Siplet Wyvas', minWidth: 100 },
  { id: 'threeD', label: '3D Upgrade', minWidth: 100 },
  { id: 'totalPrice', label: 'Calculated Price', minWidth: 100 },
  { id: 'customerDetails', label: 'Customer Details', minWidth: 150 },
  { id: 'postalCode', label: 'Postal Code', minWidth: 100 },
  { id: 'remarks', label: 'Seller Remarks', minWidth: 100 },
  { id: 'sprice', label: 'Seller Price', minWidth: 100 },
  { id: 'profit', label: 'Total Profit', minWidth: 100 }
  // Add more columns as needed based on your schema
];
const columnsWithCheckbox = [{ id: 'checkbox', label: '', minWidth: 50 }, ...columns];
const TDevanHeadTable = ({ selectedOrders, thisMonthSubmissions, onCheckboxChange, checkboxState }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOrdersLocal, setSelectedOrdersLocal] = useState(selectedOrders); // Declare local state for selected orders
  const [thisMonthSubmissionsLocal, setThisMonthSubmissionsLocal] = useState(thisMonthSubmissions);
  const copyOrderDetailsToClipboard = () => {
    const orderDetails = selectedOrdersLocal.map(orderId => {
      const order = thisMonthSubmissionsLocal.find(order => order._id === orderId);
      return `Submission Date: ${order.submissionDate.localString()}\nType: ${order.Type}\nSeller Name: ${order.Seller}\nStatus: ${order.status}\nRoute: ${order.route}\nSize: ${order.size}\nColor: ${order.Color}\nHead Board: ${order.HeadBoard}\nMattress: ${order.mattress}\nSet: ${order.Set}\nAssembly: ${order.assembly}\nSiplet Wyvas: ${order.siplet}\n3D Upgrade: ${order.threeD}\nCalculated Price: ${order.totalPrice}\nCustomer Details: ${order.customerDetails}\nPostal Code: ${order.postalCode}\nSeller Remarks: ${order.remarks}\nSeller Price: ${order.sprice}\nTotal Profit: ${order.profit}\n\n`;
    });

    const clipboardText = orderDetails.join('\n');
    navigator.clipboard.writeText(clipboardText);
    setSelectedOrdersLocal([]);
  };
  useEffect(() => {
    // Check if checkboxState is true, and uncheck all checkboxes if it is
    if (checkboxState) {
      const newSelectedOrdersLocal = [];
      setSelectedOrdersLocal(newSelectedOrdersLocal);
      onCheckboxChange(newSelectedOrdersLocal);
    }
  }, [checkboxState, onCheckboxChange]);

  useEffect(() => {
    const fetchThisMonthSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/submissions/today-devan');
        setThisMonthSubmissionsLocal(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    if (checkboxState) {
      fetchThisMonthSubmissions();
    }
  }, [checkboxState]);

  useEffect(() => {
    const fetchThisMonthSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/submissions/today-devan');
        setThisMonthSubmissionsLocal(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchThisMonthSubmissions();
  }, []); 

  const handleCheckboxChange = (orderId) => {
    const selectedIndex = selectedOrdersLocal.indexOf(orderId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedOrdersLocal, orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedOrdersLocal.slice(1));
    } else if (selectedIndex === selectedOrdersLocal.length - 1) {
      newSelected = newSelected.concat(selectedOrdersLocal.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedOrdersLocal.slice(0, selectedIndex),
        selectedOrdersLocal.slice(selectedIndex + 1)
      );
    }
    onCheckboxChange(orderId);
    setSelectedOrdersLocal(newSelected);
  };

  const isSelected = (orderId) => selectedOrdersLocal.indexOf(orderId) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1px' }}>
        <Button onClick={copyOrderDetailsToClipboard} variant="contained" color="primary">
          Copy Order Details
        </Button>
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsWithCheckbox.map((column) => (
                <TableCell
                  key={column.id}
                  align="left" // Align left for text-based data
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {thisMonthSubmissionsLocal
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row._id);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() => handleCheckboxChange(row._id)}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={thisMonthSubmissionsLocal.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
  };
  TDevanHeadTable.propTypes = {
    selectedOrders: PropTypes.array.isRequired,
    thisMonthSubmissions: PropTypes.array.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
    checkboxState: PropTypes.bool.isRequired,
  };
  export default TDevanHeadTable;
