import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { format, set, compareAsc } from 'date-fns';
import { useSelector } from 'react-redux';

import Icon from "@material-ui/core/Icon";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";

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

import { API_URL } from "constants/commons.js";
import styles from "./styles.js";

const useStyles = makeStyles(styles);

const getEventIds = async () => {
  return await axios.get(`${API_URL}/event/ids`);
}
const mapTrangThaiSuKien = {
  1: 'Available',
  2: 'Cancelled'
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

export default function AddTicketsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { id } = props;
  const [isOpenModal, setOpenModal] = useState(false);
  const [eventInfo, setEventInfo] = useState(null);
  const [categoriesEvent, setCategoriesEvent] = useState([]);
  const [categories, setCategories] = useState({});
  const [activeDetail, setActiveDetail] = useState(null);

  const initialDetailState = {
    FK_iMaLoaive: null,
    sVitri: "",
    iGiave: "",
    iTrangThai: "",
  };
  const [editAddTicket, setEditAddTicket] = useState(initialDetailState);

  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      getEventInfo();
    } else {
      router.push('/');
    }
  }, [userInfo]);

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const getCategories = () => {
    axios
      .get(`${API_URL}/account/the-loai`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          const newTheLoai = {};
          res.data.forEach((cat) => {
            newTheLoai[`${cat.PK_iMaTheloai}`] = cat;
          })
          setCategories(newTheLoai);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEventCategories = () => {
    const eventIDs = [id];
    axios
      .post(`${API_URL}/event/the-loai-event`, {
        eventIDs
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          getCategories();
          setCategoriesEvent(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getEventInfo = () => {
    axios
      .get(`${API_URL}/event/edit-events/${id}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setEventInfo(res.data)
          console.log(res.data)
          getEventCategories();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const compareToday = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const dateCompare = new Date(date).setHours(0, 0, 0, 0);
    return compareAsc(dateCompare, today);
  }


  const getTrangThaiSuKien = (event) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const compareStart = compareAsc(new Date(event.dThoigianBatdau).setHours(0, 0, 0, 0), today);
    const compareEnd = compareAsc(today, new Date(event.dThoigianKetthuc).setHours(0, 0, 0, 0));
    if (compareStart === 1) return 'Pendding';
    if (compareEnd === 1) return 'Finished';
    return 'Active now';
  }

  const getTheLoai = (eventId) => {
    const eventCat = categoriesEvent
                      .filter((cat) => cat.PK_iMaSukien === eventId)
                      .map((cat) => {
                        return categories[cat.PK_iMaTheloai]
                      })
    console.log(eventCat)
    return eventCat?.map((cat) => cat?.sTenTheloai).join(', ');
  }

  const onClickAddTicket = (detail) => {
    setOpenModal(true);
    setActiveDetail(detail);
  }
  
  if (!userInfo || !eventInfo) return null;

  return (
    <div>
      <Header
        color="transparent"
        brand="Viticket"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image="/img/profile-bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} className={classes.headerWrapper}>
              <h1 className={classes.title}>Let's Make Live Happen.</h1>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.containerFluid}>
            <h2 className={classes.eventTitle}>Main event</h2>
            <GridContainer>
              <GridItem md={3}>
                <div className={classes.thumbnailWrapper}>
                  <img src="https://s1.ticketm.net/dam/a/010/aa178e43-b5e8-44aa-bc2b-8c5975412010_1419701_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp" />
                </div>
              </GridItem>
              <GridItem md={9}>
                <div className={classes.infoWrapper}>
                  <h3>
                    <Icon className={classes.icons}>loyalty</Icon>&nbsp; {eventInfo?.sTenSukien}
                  </h3>
                  <p><b>Status: </b>{eventInfo.FK_iMaTrangthai === 1 ? getTrangThaiSuKien(eventInfo) : mapTrangThaiSuKien[eventInfo.FK_iMaTrangthai]}</p>
                  <div className={classes.eventInfoWapper}>
                    <GridContainer>
                      <GridItem md={4}>
                        <p><b>#&nbsp; Place:</b> {eventInfo.sDiadiem}</p>
                      </GridItem>
                      <GridItem md={8}>
                        <p><b>#&nbsp; Time: </b>From {format(new Date(eventInfo.dThoigianBatdau), 'dd/MM/yyyy')} to {format(new Date(eventInfo.dThoigianKetthuc), 'dd/MM/yyyy')}</p>
                      </GridItem>
                      <GridItem md={12}>
                        <p><b>#&nbsp; Categories:</b> {getTheLoai(eventInfo.PK_iMaSukien)}</p>
                      </GridItem>
                      <GridItem md={12}>
                        <p><b>#&nbsp; Description:</b> {eventInfo.sMota}</p>
                      </GridItem>
                    </GridContainer>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      
      {eventInfo.eventDetails?.map((detail) => (
        <div className={classNames(classes.main, classes.mainRaisedNext)}>
          <div style={{ paddingBottom: "20px" }}>
            <div className={classes.containerFluid}>
              <div className={classes.subEventHeader}>
              </div>
              <GridContainer>
                <GridItem md={8}>
                  <h3 className={classes.subEventTitle}>{detail.sThongTinChiTiet}</h3>
                </GridItem>
                <GridItem md={4}>
                  <h5 className={classes.subEventStatus}>Status: {mapTrangThaiSuKien[detail.iTrangThai]}</h5>
                </GridItem>
                <GridItem md={4}>
                  <p><b>#&nbsp; Location: </b>{detail.sViTri}</p>
                </GridItem>
                <GridItem md={8}>
                  <p><b>#&nbsp; Time: </b>start from {format(new Date(detail.dNgayToChuc), 'dd/MM/yyyy HH:ii')} - long {detail.iThoiLuong} minutes</p>
                </GridItem>
                <GridItem md={12}>
                  <TableContainer className={classes.customTable} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Ticket type</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Sold</TableCell>
                          <TableCell align="right">Action</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={5} align="right">
                            <Button size="sm" round color="info" onClick={() => onClickAddTicket(detail)}>
                              <Icon className={classes.icons}>add</Icon> Add ticket
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      ))}
      <Footer />

      <Modal
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add ticket for: {activeDetail?.sThongTinChiTiet}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <GridContainer>
              <GridItem md={6}>
                <FormControl fullWidth className={classes.eventDescription}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Ticket type
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      value: '',
                      onChange: (e) => setEditAddTicket({
                        ...editAddTicket,
                        FK_iMaLoaive: e.target.value,
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
              <GridItem md={6}>
              </GridItem>
            </GridContainer>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await getEventIds();
  const items = res?.data || [];
  const paths = items.map((item) => ({
      params: { id: item.PK_iMaSukien.toString() },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(props) {
  const { id } = props.params;

  return {
    props: {
      id,
    },
  }
}
