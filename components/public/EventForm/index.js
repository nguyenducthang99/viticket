import React, { useState } from "react";
import { format, set } from 'date-fns'

import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";

import addWeeks from 'date-fns/addWeeks';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { DropzoneArea } from 'material-ui-dropzone';

import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

import styles from './styles.js';
import { toast } from 'react-toastify';

const getWeeksAfter = (date, amount) => {
  return date ? addWeeks(date, amount) : undefined;
}

const rows = [
  {
    PK_iMaCTSuKien: 1,
    FK_iMaSuKien: 1,
    dNgayToChuc: new Date(),
    sThongTinChiTiet: "Imagine Dragons: Mercury Tour",
    sMoTa: `Age Limit: Everyone requires a ticket, regardless of age.
    Doors Open: 6:00 PM.
    Suite Rental Information: Click for Info
    Event Info & Details on Colonial Life Arena Website
    To allow for more Card Members to enjoy the show, American Express has set a two-order limit for this offer. This limit applies across all Cards associated with all of your American Express accounts. Prepaid Cards are not eligible.`,
    iThoiLuong: 180,
    sViTri: "Colonial Life Arena, Columbia, SC",
    iTrangThai: 1,
  },
  {
    PK_iMaCTSuKien: 2,
    FK_iMaSuKien: 1,
    dNgayToChuc: new Date(),
    sThongTinChiTiet: "Imagine Dragons: Mercury Tour",
    sMoTa: `Age Limit: Everyone requires a ticket, regardless of age.
    Doors Open: 6:00 PM.
    Suite Rental Information: Click for Info
    Event Info & Details on Colonial Life Arena Website
    To allow for more Card Members to enjoy the show, American Express has set a two-order limit for this offer. This limit applies across all Cards associated with all of your American Express accounts. Prepaid Cards are not eligible.`,
    iThoiLuong: 180,
    sViTri: "Colonial Life Arena, Columbia, SC",
    iTrangThai: 1,
  },
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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  const [isOpenModal, setOpenModal] = useState(false);
  const [listEventDetails, setListEventDetails] = useState(rows);
  const initialState = {
    PK_iMaCTSuKien: 0,
    FK_iMaSuKien: 1,
    dNgayToChuc: new Date(),
    sThongTinChiTiet: "",
    sMoTa: "",
    iThoiLuong: 0,
    sViTri: "",
    iTrangThai: 1,
  };
  const [eventDetailEdit, setEventDetailEdit] = useState(initialState);

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

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleClickEdit = (detail) => {
    const newDetail = { ...detail }
    setOpenModal(true);
    setEventDetailEdit(newDetail);
  }

  const handleClickAddDetail = () => {
    setOpenModal(true);
    setEventDetailEdit(initialState);
  }

  const handleOnSubmitDetail = () => {
    const checkValidate = validateEventDetail();
    if (!checkValidate) return false;

    let newListEventDetail = [...listEventDetails];
    if (eventDetailEdit?.PK_iMaCTSuKien) {
      newListEventDetail = listEventDetails.map((detail) => {
        return (newDetail?.PK_iMaCTSuKien === detail?.PK_iMaCTSuKien) ? eventDetailEdit : detail;
      })
    } else {
      newListEventDetail.push({...eventDetailEdit, PK_iMaCTSuKien: new Date().getTime()});
    }
    setListEventDetails(newListEventDetail);
    setOpenModal(false);
  }

  const handleOnCloseDetail = () => {
    setOpenModal(false);
  }

  const validateEventDetail = () => {
    for (const [key, value] of Object.entries(eventDetailEdit)) {
      if (key === 'PK_iMaCTSuKien') continue;
      if (key === 'iThoiLuong' && value < 1) {
        toast.error(`Time can't be lower than 1 minutes!`);
        return false;
      }
      if (!value) {
        toast.error(`${key} can't be empty!`);
        return false;
      };
    };
    return true;
  }

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
            <FormControl style={{ width: "100%" }} className={classes.eventCategory}>
              <InputLabel id="event-category-label">Event category</InputLabel>
              <Select
                labelId="event-category-label"
                id="event-category"
                multiple
                value={[]}
                onChange={handleChangeCategry}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
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
          <TableContainer className={classes.customTable} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sub Event Title</TableCell>
                  <TableCell align="right">Datetime start</TableCell>
                  <TableCell align="right">Long (minutes)</TableCell>
                  <TableCell align="right">Place</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listEventDetails.map((row) => (
                  <TableRow
                    key={row.PK_iMaCTSuKien}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.sThongTinChiTiet}</TableCell>
                    <TableCell align="right">{format(row.dNgayToChuc, 'HH:mm MM/dd/yyyy')}</TableCell>
                    <TableCell align="right">{row.iThoiLuong}</TableCell>
                    <TableCell align="right">{row.sViTri}</TableCell>
                    <TableCell align="right">{mapStatusEvent[row.iTrangThai]}</TableCell>
                    <TableCell align="right">
                      <Button
                        style={styles.verticalCenter}
                        size="sm"
                        justIcon
                        round
                        color="primary"
                        onClick={() => handleClickEdit(row)}
                      >
                        <Icon className={classes.icons}>edit</Icon>
                      </Button>
                      <Button style={styles.verticalCenter} size="sm" justIcon round color="danger">
                        <Icon className={classes.icons}>delete_forever</Icon>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7} style={{ textAlign: "right" }}>
                    <Button round color="info" onClick={handleClickAddDetail}>
                      <Icon className={classes.icons}>add</Icon> &nbsp; Add event detail
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem md={12} style={{ textAlign: "center" }}>
          <Button round color="success" style={{ marginTop: "20px" }} onClick={handleOnSubmit}>
            <Icon className={classes.icons}>check</Icon> &nbsp; Create event
          </Button>
        </GridItem>
      </GridContainer>
      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {eventDetailEdit?.PK_iMaCTSuKien ? 'Edit event detail' : 'Add event detail'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <GridContainer>
              <GridItem md={12}>
                <CustomInput
                  labelText="Event detail name..."
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: eventDetailEdit?.sThongTinChiTiet,
                    onChange: (e) => setEventDetailEdit({
                      ...eventDetailEdit,
                      sThongTinChiTiet: e.target.value.trim(),
                    }),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>drive_file_rename_outline</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={12}>
                <TextField
                  defaultValue={eventDetailEdit?.sMoTa}
                  label="Event detail description..."
                  multiline
                  variant="standard"
                  className={classes.eventDescription}
                  onChange={(e) => setEventDetailEdit({
                    ...eventDetailEdit,
                    sMoTa: e.target.value.trim(),
                  })}
                />
              </GridItem>
              <GridItem md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Event detail date"
                    onChange={(date) => setEventDetailEdit({
                      ...eventDetailEdit,
                      dNgayToChuc: date,
                    })}
                    value={eventDetailEdit?.dNgayToChuc}
                    renderInput={(params) => <TextField className={classes.dateRangePicker} {...params} />}
                  />
                </LocalizationProvider>
              </GridItem>
              <GridItem md={6}>
                <CustomInput
                  labelText="Time long (hours)"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: eventDetailEdit?.iThoiLuong,
                    onChange: (e) => setEventDetailEdit({
                      ...eventDetailEdit,
                      iThoiLuong: e.target.value,
                    }),
                    type: "number",
                    min: 1,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.icons}>timer</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem md={6}>
                <TextField
                  defaultValue={eventDetailEdit?.sViTri}
                  label="Place..."
                  multiline
                  variant="standard"
                  className={classes.eventDescription}
                  onChange={(e) => setEventDetailEdit({
                    ...eventDetailEdit,
                    sViTri: e.target.value.trim(),
                  })}
                />
              </GridItem>
              <GridItem md={6}>
                <FormControl fullWidth className={classes.eventDescription}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Event status
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      defaultValue: eventDetailEdit?.iTrangThai,
                      onChange: (e) => setEventDetailEdit({
                        ...eventDetailEdit,
                        iTrangThai: e.target.value,
                      }),
                      name: 'event-status',
                      id: 'event-status',
                    }}
                  >
                    <option value={1}>Active</option>
                    <option value={2}>Cancel</option>
                  </NativeSelect>
                </FormControl>
              </GridItem>
              <GridItem md={12} style={{ textAlign: "center" }}>
                <Button round color="success" style={{ marginTop: "20px" }} onClick={handleOnSubmitDetail}>
                  <Icon className={classes.icons}>check</Icon> &nbsp; {eventDetailEdit?.PK_iMaCTSuKien ? 'Save event detail' : 'Add event detail'}
                </Button>
                &emsp;
                <Button round color="default" style={{ marginTop: "20px" }} onClick={handleOnCloseDetail}>
                  <Icon className={classes.icons}>close</Icon> &nbsp; Close
                </Button>
              </GridItem>
            </GridContainer>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default EventForm;