import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";

import { useSelector } from 'react-redux';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Save from "@material-ui/icons/Save";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";
import Check from "@material-ui/icons/Check";
import Dashboard from "@material-ui/icons/Dashboard";
import Event from "@material-ui/icons/Event";
import List from "@material-ui/icons/List";

// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";
import NavPills from "components/public/NavPills/NavPills.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";
import EventForm from "components/public/EventForm";
import EventList from "components/public/EventList";

import { API_URL } from "constants/commons.js";
import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

const getEventIds = async () => {
  return await axios.get(`${API_URL}/event/ids`);
}

export default function AddTicketsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { id } = props;
  const [eventInfo, setEventInfo] = useState(null);

  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();

  const getEventInfo = () => {
    
  }
  
  if (!userInfo) return null;

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
            <GridContainer>
              <GridItem md={12}>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
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
