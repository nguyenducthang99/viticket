import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Link from 'next/link';
import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/categoriesStyle.js";
import { useLazyQuery, useQuery } from "@apollo/client";
import client from "../../services";
import { catEventsQuery, getCatEvents } from 'services/event.js'


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

const useStyles = makeStyles(styles);

export default function ProductSection(props) {
  const classes = useStyles();
  const { cat } = props;
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const res = await getCatEvents({ id: Number(cat.PK_iMaTheloai) });
    console.log(res);
    setEvents(res?.data?.catEventsId);
    console.log(res?.data?.catEventsId)
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={classes.categoriesEvents}>
      <h3>
        <span>{cat.sTenTheloai}</span>
        <Link href={`/category/${cat.sSlugTheloai}-${cat.PK_iMaTheloai}`}>
          <a className={classes.seeAll} href={`/category/${cat.sSlugTheloai}-${cat.PK_iMaTheloai}`}>See All {cat.sTenTheloai}</a>
        </Link>
      </h3>

      <div className={classes.events}>
        {events?.map(event => (
          <Link key={event.PK_iMaSukien} href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`}>
            <a href={`/event/${event.sSlugSukien}-${event.PK_iMaSukien}`} className={classes.eventWrapper}>
              <img src={`https://picsum.photos/400/255?random=${cat.PK_iMaTheloai}${event.PK_iMaSukien}`} />
              <div className={classes.eventThumb}>
                <p>{event.sTenSukien}</p>
                <span>{event.eventDetails || 0} Events</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
