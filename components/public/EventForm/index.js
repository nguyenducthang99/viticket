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

import { DropzoneArea } from 'material-ui-dropzone'

import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import styles from './styles.js';

const getWeeksAfter = (date, amount) => {
  return date ? addWeeks(date, amount) : undefined;
}

const useStyles = makeStyles(styles);

const EventForm = () => {
    const classes = useStyles();
    const [value, setValue] = useState([null, null]);

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
              <GridItem md={12}>
                <TextField
                  id="eventDescription"
                  label="Event description..."
                  multiline
                  variant="standard"
                  className={classes.eventDescription}
                />
              </GridItem>
              <GridItem md={6}>
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
              </GridItem>
              <GridItem md={6}>
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
              </GridItem>
            </GridContainer>
        </div>
    );
}

export default EventForm;