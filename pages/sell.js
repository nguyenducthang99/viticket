import React, { useEffect, useState } from "react";
import Router from "next/router";
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

import { API_URL } from "constants/commons.js";
import styles from "styles/jss/nextjs-material-kit/pages/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const userInfo = useSelector((state) => state.user.userInfo);

  const [userBasicInfo, setUserBasicInfo] = useState({
    fullName: userInfo?.sTenNguoidung,
    email: userInfo?.sEmail,
    phone: userInfo?.sSodienthoai,
  });
  const [userPassword, setUserPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const [accountRule, setAccountRule] = useState(null);

  useEffect(() => {
    // userInfo ? getAccountRules() : Router.push('/');
  }, [userInfo]);

  const getAccountRules = () => {
    axios
      .get(`${API_URL}/account/quyen/${userInfo.FK_iMaQuyen}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setAccountRule(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeFileBefore = (files) => {
    console.log(files)
  };
  const handleChangeFileAfter = (files) => {
    console.log(files)
  };

  // if (!userInfo) return null;

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
                <NavPills
                  color="info"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 2, md: 2 },
                    contentGrid: { xs: 12, sm: 10, md: 10 },
                  }}
                  tabs={[
                    {
                      tabButton: "Event",
                      tabIcon: Event,
                      tabContent: (<EventForm />),
                    },
                    {
                      tabButton: "List Events",
                      tabIcon: List,
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                        </span>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
