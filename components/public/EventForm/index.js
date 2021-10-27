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
import DateTimePicker from '@mui/lab/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableFooter } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

const mapStatusEvent = {
  1: "Active",
  2: "Cancel"
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const useStyles = makeStyles(styles);

const EventForm = () => {
  const classes = useStyles();
  const [value, setValue] = useState([null, null]);

  const handleChangeFile = (files) => {
    console.log(files)
  };

  const handleChangeStatus = (status) => {
    console.log(status)
  };

  const handleChangeDateSubEvent = (newValue) => {
    console.log(newValue);
  }

  const handleOnSubmit = (e) => {
    console.log(e);
  };

  const handleChangeCategry = (e) => {
    console.log(e);
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
                    <TextField label="Date start" className={classes.dateRangePicker} {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField label="Date end" className={classes.dateRangePicker} {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.selectContainer}>
            <FormControl style={{ width: "100%" }} className={classes.eventDescription}>
              <InputLabel id="event-category-label">Event category</InputLabel>
              <Select
                labelId="event-category-label"
                id="event-category"
                multiple
                value={[]}
                onChange={handleChangeCategry}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
                className={classes.eventDescription}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                  <TableCell>Sub Event Title</TableCell>
                  <TableCell align="right">Sub Event Description</TableCell>
                  <TableCell align="right">Datetime start</TableCell>
                  <TableCell align="right">Long</TableCell>
                  <TableCell align="right">Place</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">
                      <CustomInput
                        labelText="Sub-event name..."
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.icons}>drive_file_rename_outline</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="Sub-event description..."
                        multiline
                        variant="standard"
                        className={classes.eventDescription}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          label="Sub-event date"
                          onChange={handleChangeDateSubEvent}
                          renderInput={(params) => <TextField className={classes.dateRangePicker} {...params} />}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell align="right">
                      <CustomInput
                        labelText="Time long (hours)"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.icons}>timer</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        label="Place..."
                        multiline
                        variant="standard"
                        className={classes.eventDescription}
                      />
                    </TableCell>
                    <TableCell width={100} align="right" className={styles.selectContainerForm}>
                      <FormControl fullWidth className={classes.eventDescription}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                          Event status
                        </InputLabel>
                        <NativeSelect
                          inputProps={{
                            name: 'event-status',
                            id: 'event-status',
                          }}
                        >
                          <option value={1}>Active</option>
                          <option value={2}>Cancel</option>
                        </NativeSelect>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">
                      <Button style={styles.verticalCenter} justIcon round color="danger">
                        <Icon className={classes.icons}>delete_forever</Icon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "right" }}>
                    <Button round color="info" style={{ marginTop: "20px" }} onClick={handleOnSubmit}>
                      <Icon className={classes.icons}>add</Icon> &nbsp; Add event detail
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem md={12} style={{ textAlign: "center" }}>
          <br /><br />
          <Button round color="success" style={{ marginTop: "20px" }} onClick={handleOnSubmit}>
            <Icon className={classes.icons}>check</Icon> &nbsp; Create event
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default EventForm;