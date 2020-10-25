import React, {Component} from 'react'
import axios from 'axios';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import NotesIcon from '@material-ui/icons/Notes';
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button'
import {authMiddleWare} from './auth'

const drawerWidth = 500;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	
	drawer: {
		width: drawerWidth,
        flexShrink: 0,
        zIndex:-1
	},
	drawerPaper: {
        width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	avatar: {
		height: 350,
		width: 350,
		flexShrink: 0,
		flexGrow: 0,
		margin: 40
	},
	uiProgess: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
    },
    Grid: {
        margin:50,
        borderWidth: 1,
        borderColor: 'gray',
		borderStyle: 'solid',
		borderRadius: 10,
		padding: 20
    },
    Button: {
        position: 'absolute',
        left: 0
    },
	toolbar: theme.mixins.toolbar
});


class Profile extends Component {
    constructor(props) {
        super();

        this.state = {
			firstName: '',
            lastName: '',
            bio: '',
            profilePicture: '',
            location: '',
            school: '',
			uiLoading: false,
            imageLoading: false,
            editing: false
		};
      }
    
	  componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				console.log(response.data);
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					username: response.data.userCredentials.username,
					bio: response.data.userCredentials.bio,
					age: response.data.userCredentials.age,
					position: response.data.userCredentials.position,
					city: response.data.userCredentials.city,
					profilePicture: response.data.userCredentials.imageUrl,
					uiLoading: false
				});
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

    render() {
        const { classes } = this.props;
        if (this.state.uiLoading === true) {
			return (
				<div className={classes.root}>
					{this.state.uiLoading && <CircularProgress size={150} className={classes.uiProgess} />}
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<CssBaseline />
					<Grid container spacing={3}  alignItems="center">
					<Grid item key="basicInfo" lg={12} fullWidth style={{marginLeft: 50, marginTop: 10}}>
						<div className={classes.toolbar} />
						<center>
							<Avatar src={this.state.profilePicture} className={classes.avatar} />
							<Typography variant="h3" style={{margin: 20}}>
								{''}
								{this.state.firstName} {this.state.lastName}
							</Typography>
						</center>
						<Divider />
						<List>
							
							<ListItem button key="Account">
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary={this.state.city} />
							</ListItem>

							<ListItem key="school">
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary={this.state.position} />
							</ListItem>
						</List>
					</Grid>
                    </Grid>
                    <Grid container lg={12}  alignItems="center" style={{display: 'flex'}}>
                    
                    <Grid item  style={{width: '100%', flex: "1 1 auto"}}>
                        <Grid item className={classes.Grid}  style={{textAlign: "center"}}>
                        
                        <Typography variant="h2">
                            About {this.state.firstName}
                        </Typography>
                        <p>
                            {this.state.bio}
                        </p>
                        </Grid>
                    </Grid>
                  
                    </Grid>

				</div>
			);
		}
    }
}

export default withStyles(styles)(Profile)