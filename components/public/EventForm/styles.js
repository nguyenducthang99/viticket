import {
    primaryColor,
    dangerColor,
    successColor,
    defaultFont,
  } from "styles/jss/nextjs-material-kit.js";

const styles = {
    container: {
        "& h2 span": {
            fontWeight: "700",
            paddingBottom: "10px",
            borderBottom: "3px solid #333",
        }
    },
    disabled: {
      "&:before": {
        borderColor: "transparent !important",
      },
    },
    underline: {
      "&:hover:not($disabled):before,&:before": {
        borderColor: "#D2D2D2 !important",
        borderWidth: "1px !important",
      },
      "&:after": {
        borderColor: primaryColor,
      },
    },
    eventDescription: {
        width: "100%",
        "& label": {
          top: "-6px",
        },
        "& label + div ": {
          marginTop: "10px",
        }
    },
    selectContainer: {
      "& ul": {
        display: "flex",
      },
    },
    verticalCenter: {
      marginTop: "20px",
    },
    selectContainerForm: {
      width: "100%",
    },
    dateRangePicker: {
        width: "100%",
        margin: "0 0 17px 0",
        paddingTop: "27px",
        position: "relative",
        border: "none",
        "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
        color: "#495057",
        },
        "& label": {
            ...defaultFont,
            color: "#AAAAAA !important",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "1.42857",
            top: "13px",
            letterSpacing: "unset",
            "& + $underline": {
              marginTop: "0px",
            },
        },
        "& label + div fieldset": {
          border: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
          borderRadius: "0px",
        },
        "& input": {
            color: "#495057",
            height: "unset",
            width: "100%",
            "&,&::placeholder": {
                fontSize: "14px",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: "400",
                lineHeight: "1.42857",
                opacity: "1",
            },
            "&::placeholder": {
                color: "#AAAAAA",
            },
        }
    },
};

export default styles;