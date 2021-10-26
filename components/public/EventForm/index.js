import React, { useState } from "react";

import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DropzoneArea } from 'material-ui-dropzone';

import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import styles from './styles.js';

const getWeeksAfter = (date, amount) => {
  return date ? addWeeks(date, amount) : undefined;
}

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles(styles);

const EventForm = () => {
    const classes = useStyles();
    const [value, setValue] = useState([null, null]);

    const handleChangeFile = (files) => {
      console.log(files)
    };

    return (
        <div className={classes.container}>
            <h2><span>Create new event</span></h2>
            <GridContainer>
              <GridItem md={12}>
                <CustomInput
                  labelText="Event name..."
                  id="eventName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>architecture</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                      disablePast
                      value={value}
                      maxDate={getWeeksAfter(value[0], 4)}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField className={classes.dateRangePicker} {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField className={classes.dateRangePicker} {...endProps} />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <CustomInput
                    labelText="Event location..."
                    id="eventLocation"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.icons}>map</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="eventDescription"
                    label="Event description..."
                    multiline
                    variant="standard"
                    className={classes.eventDescription}
                  />
                </div>
              </GridItem>
              <GridItem md={6}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Ảnh sự kiện"}
                  onChange={(files) => handleChangeFile(files)}
                  dropzoneClass={classes.fileWrapper}
                  filesLimit={1}
                />
              </GridItem>
              <GridItem md={12}>
              <br /><br />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </GridItem>
            </GridContainer>
        </div>
    );
}

export default EventForm;