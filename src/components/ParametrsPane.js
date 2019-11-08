import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

// const BootstrapInput = withStyles(theme => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(30)
//     }
//   },
//   input: {
//     borderRadius: 4,
//     // position: "flex",
//     backgroundColor: theme.palette.common.black,
//     border: "1px solid #ced4da",
//     fontSize: 10,
//     width: "auto",
//     padding: "101px 12px",

//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"'
//     ].join(","),
//     "&:focus": {
//       boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//       borderColor: theme.palette.primary.main
//     }
//   }
// }))(InputBase);

const useStyles = makeStyles(theme => ({
    root: {
        // display: "flex",
        // position: "relative",
        // flexWrap: "wrap",
        // padding: "1px 1px 1px 120px"
    },
    margin: {
        color: "white",
        //  display: "flex",
        // position: "relative",
        // margin: "1px 50px 1px 1px",
        // padding: "1px 1px 11px 120px",
        backgroundColor: "red"
    }
}));
export default function MultilineTextFields() {
    const classes = useStyles();
    const [value, setValue] = React.useState("Controlled");

    const handleChange = event => {
        setValue(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <InputBase multiline className={classes.margin} rows="10"/>
            </div>
        </form>
    );
}
