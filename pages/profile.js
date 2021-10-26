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

import { DropzoneArea } from 'material-ui-dropzone';

// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import Button from "components/public/CustomButtons/Button.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";
import CustomInput from "components/public/CustomInput/CustomInput.js";

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
    userInfo ? getAccountRules() : Router.push('/');
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
      <Parallax small filter image="/img/profile-bg.jpg" />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src="/img/faces/christian.jpg"
                      alt="..."
                      className={imageClasses}
                    />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userInfo.sTenNguoidung}</h3>
                    <h6>{accountRule?.sTenQuyen}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem sm={12}>
                <h3 style={{ textAlign: "center" }}>Updates Profile</h3>
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Fullname..."
                  id="fullName"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: userBasicInfo?.fullName,
                    endAdornment: (
                      <InputAdornment position="end">
                        <People className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: userBasicInfo?.email,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Phone..."
                  id="phone"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    defaultValue: userBasicInfo?.phone,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Phone className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={12} style={{ textAlign: "center", marginBottom: "15px" }}>
                <Button round color="success">
                  <Save className={classes.icons} />&nbsp; Save
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaisedNext)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem sm={12}>
                <h3 style={{ textAlign: "center" }}>Change Password</h3>
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="New Password..."
                  id="newPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4}>
                <CustomInput
                  labelText="Confirm Password..."
                  id="confirmPassword"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <Lock className={classes.inputIconsColor} />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem sm={4} style={{ textAlign: "right" }}>
                <Button round color="info" style={{ marginTop: "20px" }}>
                  <Save className={classes.icons} />&nbsp; Change
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaisedNext)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem md={6}>
                <h3 style={{ textAlign: "center" }}>Verify buyer information</h3>
                <br />
                <GridContainer>
                  <GridItem md={12}>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Ảnh mặt trước CMT/CCCD"}
                      onChange={(files) => handleChangeFileBefore(files)}
                      dropzoneClass={classes.fileWrapper}
                      filesLimit={1}
                    />
                    <br />
                  </GridItem>
                  <GridItem md={12}>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      dropzoneText={"Ảnh mặt sau CMT/CCCD"}
                      onChange={(files) => handleChangeFileAfter(files)}
                      dropzoneClass={classes.fileWrapper}
                      filesLimit={1}
                    />
                    <br />
                  </GridItem>
                  <GridItem md={12} style={{ textAlign: "center" }}>
                    <Button round color="warning" style={{ marginTop: "20px" }}>
                      <Check className={classes.icons} />&nbsp; Submit
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem md={6}>
                <h3 style={{ textAlign: "center" }}>Verify history</h3>
                <br />
                <div>
                  <div className={classes.verifiedItem}>
                    <p>Gửi lúc: {new Date().toString()}</p>
                    <p>Trạng thái: Đang chờ xử lý</p>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>

      <div className={classNames(classes.main, classes.mainRaisedNext)}>
        <div style={{ paddingBottom: "20px" }}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <h3 style={{ textAlign: "center" }}>Seller Zone</h3>
              <br />
              <GridItem md={12} style={{ textAlign: "center" }}>
                <Button round color="primary" style={{ marginTop: "20px" }}>
                  <Check className={classes.icons} />&nbsp; Đăng ký với tư cách người bán
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
