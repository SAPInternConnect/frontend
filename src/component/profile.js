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
        borderStyle: 'solid'
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
			firstName: 'S',
            lastName: 'K',
            bio: 'my name is silvana hi hello whatsup',
            profilePicture: '',
            location: 'Vancouver',
            school: 'BCIT',
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
					phoneNumber: response.data.userCredentials.phoneNumber,
					country: response.data.userCredentials.country,
					username: response.data.userCredentials.username,
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
					<Grid container spacing={3}>
					<Grid item key="basicInfo" md={4}>
						<div className={classes.toolbar} />
						<Divider />
						<center>
							<Avatar src={this.state.profilePicture} className={classes.avatar} />
							<p>
								{''}
								{this.state.firstName} {this.state.lastName}
							</p>
						</center>
						<Divider />
						<List>
							
							<ListItem button key="Account">
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary={this.state.location} />
							</ListItem>

							<ListItem key="school">
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary={this.state.school} />
							</ListItem>
						</List>
					</Grid>
                    </Grid>
                    <Grid container md={8}>
                    
                    <Grid item>
                    <Button className={classes.Button}>edit</Button>
                        <Grid item className={classes.Grid}>
                        
                        <Typography variant="h2">
                            About {this.state.firstName}
                        </Typography>
                        <p>
                            {this.state.bio}
                        </p>
                        </Grid>
                    </Grid>
                    
                    <Grid item key="interests" md={8} className={classes.Grid} >
                    <Typography variant="h2" >
                            {this.state.firstName}'s Interests
                        </Typography>
                    </Grid>
                    </Grid>

				</div>
			);
		}
    }
}

export default withStyles(styles)(Profile)