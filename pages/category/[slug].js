import React from "react";
import Link from 'next/link';

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/public/Header/Header.js";
import Footer from "components/public/Footer/Footer.js";
import GridContainer from "components/public/Grid/GridContainer.js";
import GridItem from "components/public/Grid/GridItem.js";
import Button from "components/public/CustomButtons/Button.js";
import HeaderLinks from "components/public/Header/HeaderLinks.js";
import Parallax from "components/public/Parallax/Parallax.js";
import TopSearch from "components/public/TopSearch/index.js";

import styles from "./styles.js";

const temp = [
    {
      PK_iMaSukien: 1,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 2,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 3,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 4,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 5,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 6,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 7,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
    {
      PK_iMaSukien: 8,
      sTenSukien: 'Imagine Dragons',
      sSlugSukien: 'imagine-dragons',
      sLinkanh: 'https://s1.ticketm.net/dam/a/c96/5457b1ce-bffb-49ed-b9c0-b864bb2d3c96_1565391_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=400&height=225&fit=crop&auto=webp',
      eventDetails: [1, 2, 3, 4, 5]
    },
  ];
  
// Sections for this page
import TopSellerSection from "pages-sections/LandingPage-Sections/TopSellerSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const cat = {
    PK_iMaTheloai: 1,
    sTenTheloai: 'Concerts',
    sSlugTheloai: "concerts",
    sLinkAnh: 'https://www.ticketmaster.com/s3images/discovery/Concerts.jpg'
  }

  return (
    <div>
        <Header
            color="transparent"
            routes={dashboardRoutes}
            brand="Viticket"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "white",
            }}
            {...rest}
        />
        <Parallax filter responsive image="/img/landing-bg.jpg">
            <div className={classes.container}>
            <GridContainer className={classes.gridContainer}>
                <GridItem xs={12} sm={12} md={12}>
                <h1 className={classes.title}>Let's Make Live Happen.</h1>
                <h4>Shop millions of live events and discover can't-miss concerts, games, theater and more.</h4>
                <TopSearch />
                </GridItem>
            </GridContainer>
            </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.section}>
                <h2 className={classes.catTitle}>{cat.sTenTheloai}</h2>
                <div className={classes.categoriesEventsWrapper}>
                    <div key={cat.PK_iMaTheloai} className={classes.categoriesEvents}>
                        <div className={classes.events}>
                            {temp.map(event => (
                            <Link key={event.PK_iMaSukien} href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`}>
                                <a href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`} className={classes.eventWrapper}>
                                <img src={`https://picsum.photos/400/255?random=${cat.PK_iMaTheloai}${event.PK_iMaSukien}`} />
                                <div className={classes.eventThumb}>
                                    <p>{event.sTenSukien}</p>
                                    <span>{event.eventDetails?.length || 0} Events</span>
                                </div>
                                </a>
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
}
