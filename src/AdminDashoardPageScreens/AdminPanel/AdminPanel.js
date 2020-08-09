import React from 'react';
import './AdminPanel.css';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Dashboard from '../Dashboard/Dashboard';
import ClassForm from '../Forms/ClassForm';
import StudentForm from '../Forms/StudentForm';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import ListOfClasses from '../ViewPanel/ClassList';
import StudentList from '../ViewPanel/studentList';
import FeeForm from '../Forms/FeeForm';
import ListOfFee from '../ViewPanel/FeeList';
import TransferStudent from '../ViewPanel/TransferStudent';
import AddIcon from '@material-ui/icons/Add';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Switch, Route, NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import { loggedInUserMethod, loggedOutUserMethod } from '../../Redux/Actions/loggedInUser';
import Firebase from '../../Config/Config';

const drawerWidth = 240;

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundImage: 'linear-gradient(to right, #32be8f, #38d39f, #32be8f)'

  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const AdminPanel = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  console.log('props', props.loggedUser);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOutUser = () => {
    Firebase.auth().signOut();
    props.setloggedOutUser(null);
    props.history.push(`/`);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, 'icon-button', open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="main-title-styling" variant="h6" noWrap>
            DASHBOARD
            </Typography>
          <Button onClick={logOutUser} className="logOut-btn" color="inherit" style={{ marginLeft: '70%', fontFamily: "'El Messiri', sans-serif ", fontSize: '17px' }} ><ExitToAppIcon style={{ marginRight: '5px' }} />Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <div>
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={props.loggedUser.profile} />
            </StyledBadge>
            <span style={{ marginLeft: '10px', fontFamily: "'El Messiri', sans-serif", fontSize: '17px' }}>{props.loggedUser.name}</span>
          </div>
          <IconButton className="icon-button" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

        </div>
        <Divider />
        <List>
          <NavLink to="/dashboard/home" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button >
              <ListItemIcon className="list-icon-container">
                <DashboardIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" ><span> Dashboard </span></ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/classForm" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <AddIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Class </span></ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/studentForm" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <AddIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Student </span></ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/studentTransfer" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <TransferWithinAStationIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Transfer Students </span></ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/feeForm" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <AddIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Fee </span></ListItemText>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink to="/dashboard/viewClasses" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <ViewListIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Classes </span></ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/viewStudents" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <ViewListIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Students </span></ListItemText>
            </ListItem>
          </NavLink>
          <NavLink to="/dashboard/viewFees" exact activeClassName="active-list-item" >
            <ListItem className="list-style" button>
              <ListItemIcon className="list-icon-container">
                <ViewListIcon className="list-icon" />
              </ListItemIcon>
              <ListItemText className="list-text-container" > <span> Fees </span></ListItemText>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, "content-container", {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path="/dashboard/home" exact component={Dashboard} />
          <Route path="/dashboard/classForm" exact component={ClassForm} />
          <Route path="/dashboard/studentForm" exact component={StudentForm} />
          <Route path="/dashboard/viewClasses" exact component={ListOfClasses} />
          <Route path="/dashboard/viewStudents" exact component={StudentList} />
          <Route path="/dashboard/feeForm" exact component={FeeForm} />
          <Route path="/dashboard/viewFees" exact component={ListOfFee} />
          <Route path="/dashboard/studentTransfer" exact component={TransferStudent} />
        </Switch>
      </main>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedInUser.LoggedInUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    setLoggedInUser: (data) => { dispatch(loggedInUserMethod(data)) },
    setloggedOutUser: (data) => { dispatch(loggedOutUserMethod(data)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);