import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      marginRight: 8,
    },
    title: {
      padding: "20px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
    },
    appBar: {
      zIndex: 1200,
      backgroundColor: "#36342e !important",
    },
  })
);

export default function NavigationBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Box
        display={"flex"}
        flexDirection={"row-reverse"}
        justifyContent={"start"}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Customers
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/shops" className={classes.link}>
              Shops
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/products" className={classes.link}>
              Products
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/shoppings" className={classes.link}>
              Create Order
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link to="/orders" className={classes.link}>
              My Order
            </Link>
          </Typography>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
