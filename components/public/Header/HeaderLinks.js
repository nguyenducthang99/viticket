/*eslint-disable*/
import React from "react";
import Link from "next/link";

import { useSelector, useDispatch } from 'react-redux';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { AccountCircle } from "@material-ui/icons";

// core components
import CustomDropdown from "components/public/CustomDropdown/CustomDropdown.js";
import Button from "components/public/CustomButtons/Button.js";

import { setUserInfo } from "../../../store/actions/user";
import styles from "styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(setUserInfo(null));
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>auto_awesome</Icon> Concerts
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>sports_soccer</Icon> Sports
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>sports_martial_arts</Icon> Art & Theater
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>family_restroom</Icon> Family
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>more</Icon> More
        </Button>
      </ListItem>
      {userInfo ? (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            navDropdown
            buttonText={`Hi, ${userInfo.sTenNguoidung}`}
            buttonProps={{
              className: classes.navLink,
              color: "transparent",
            }}
            buttonIcon={AccountCircle}
            dropdownList={[
              <Link href="/profile">
                <a className={classes.navLink}><Icon className={classes.icons}>assignment_ind</Icon>&nbsp; My Account</a>
              </Link>,
              <Link href="/orders">
                <a className={classes.navLink}><Icon className={classes.icons}>event</Icon>&nbsp; My Tickets</a>
              </Link>,
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={handleLogout}
              >
                <Icon className={classes.icons}>logout</Icon>&nbsp; Logout
              </Button>,
            ]}
          />
        </ListItem>
      ) : (

        <ListItem className={classes.listItem}>
          <Button
            href="/login"
            color="transparent"
            className={classes.navLink}
          >
            <Icon className={classes.icons}>login</Icon> Sigin
          </Button>
        </ListItem>
      )
      }
    </List >
  );
}
