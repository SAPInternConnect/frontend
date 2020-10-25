import React from 'react';
import * as ROUTES from '../constants/routes'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import history from './history';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Navigation = () => {
    return (
      localStorage.getItem('AuthToken') == null? <HeaderNonAuth />: <HeaderAuth/>
    )
    }


function HeaderNonAuth() { 
  const classes = useStyles()
        return (  
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
               
                <Typography variant="h5" className={classes.title} >
                <Link href={ROUTES.HOME} color="secondary" underline="none">
                    SAP Intern Connect App
                </Link>
                </Typography>
                <Button color="inherit" href={ROUTES.LOGIN}>Login</Button>
                <Button color="inherit" href={ROUTES.SIGNUP}>Sign-Up</Button>
                <Button color="inherit" href={ROUTES.MYPROFILE}>My Profile</Button>
                <Button color="inherit" href={ROUTES.MYFRIENDS}>My Friends</Button>
            </Toolbar>
        </AppBar>
        </div>
        )
}

const signOut = ()=> {
  localStorage.removeItem('AuthToken');
  history.push(ROUTES.LOGIN);
}

function HeaderAuth() { 
  const classes = useStyles()
        return (  
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
               
                <Typography variant="h5" className={classes.title} >
                <Link href={ROUTES.HOME} color="secondary" underline="none">
                    SAP Intern Connect App
                </Link>
                </Typography>
                <Button color="inherit" href={ROUTES.MYPROFILE}>My Profile</Button>
                <Button color="inherit" href={ROUTES.MYFRIENDS}>My Friends</Button>
                <Button color="inherit" onClick={signOut}>Sign Out</Button>
            </Toolbar>
        </AppBar>
        </div>
        )
}

export default Navigation