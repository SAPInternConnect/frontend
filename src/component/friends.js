import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/avatar';

import axios from 'axios';
import { authMiddleWare } from './auth';

const styles = (theme) => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	avatar: {
		height: 100,
		width: 100,
		flexShrink: 0,
		flexGrow: 0,
		margin: 20,
	},
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	submitButton: {
		display: 'block',
		color: 'white',
		textAlign: 'center',
		position: 'absolute',
		top: 14,
		right: 10,
	},
	floatingButton: {
		position: 'fixed',
		bottom: 0,
		right: 0,
	},
	form: {
		width: '98%',
		marginLeft: 13,
		marginTop: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
	root: {
		minWidth: 470,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	pos: {
		marginBottom: 12,
	},
	uiProgress: {
		position: 'fixed',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%',
	},
	dialogueStyle: {
		maxWidth: '50%',
	},
	viewRoot: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

class Friends extends Component {
	constructor(props) {
		super(props);

		this.state = {
			friends: '',
			title: '',
			body: '',
			todoId: '',
			errors: [],
			open: false,
			uiLoading: true,
			buttonType: '',
			viewOpen: false,
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/friends')
			.then((response) => {
				this.setState({
					friends: response.data,
					uiLoading: false,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const { classes } = this.props;
		const { open, errors, viewOpen } = this.state;

		if (this.state.uiLoading === true) {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{this.state.uiLoading && (
						<CircularProgress size={150} className={classes.uiProgress} />
					)}
				</main>
			);
		} else {
			return (
				<main className={classes.content}>
					<div className={classes.toolbar} />

					<Grid container spacing={2}>
						{this.state.friends.map((friend) => (
							<Grid item xs={12} sm={6}>
								<Card className={classes.root} variant='outlined'>
									<Avatar src={friend.imageUrl} className={classes.avatar} />
									<CardContent>
										<Typography variant='h5' component='h2'>
											{friend.firstName} {friend.lastName}
										</Typography>
										<Typography variant='body2' component='p'>
											Bio: {friend.bio}
										</Typography>
										<Typography variant='body2' component='p'>
											Position: {friend.position}
										</Typography>
										<Typography variant='body2' component='p'>
											City: {friend.city}
										</Typography>
										<Typography variant='body2' component='p'>
											Age: {friend.age}
										</Typography>
										<Typography variant='body2' component='p'>
											Email: {friend.email}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</main>
			);
		}
	}
}

export default withStyles(styles)(Friends);
