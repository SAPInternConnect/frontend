
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Card, CardActions, CardContent, Divider } from '@material-ui/core';
import {authMiddleWare} from '../auth';

import axios from 'axios';

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	progess: {
		position: 'absolute'
	},
	
});

class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			position: '',
			city: '',
			age: '',
			bio:'',
			errors: [],
			loading: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const newUserData = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			position: this.state.position,
			city: this.state.city,
			age: this.state.age,
			bio: this.state.bio
		};
		axios
			.post('/signup', newUserData)
			.then((response) => {
				localStorage.setItem('AuthToken', `${response.data.token}`);
				this.setState({ 
					loading: false,
				});	
				this.props.history.push(ROUTES.MYPROFILE);
			})
			.catch((error) => {
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									name="firstName"
									autoComplete="firstName"
									helperText={errors.firstName}
									error={errors.firstName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lastName"
									helperText={errors.lastName}
									error={errors.lastName ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12} >
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="User Name"
									name="username"
									autoComplete="username"
									helperText={errors.username}
									error={errors.username ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							

							
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									helperText={errors.email}
									error={errors.email ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="city"
									label="City"
									name="city"
									autoComplete="city"
									helperText={errors.city}
									error={errors.city ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="age"
									label="Age"
									name="Age"
									helperText={errors.age}
									error={errors.age ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="position"
									label="Position at SAP"
									name="position"
									helperText={errors.position}
									error={errors.position ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									className={classes.TextField}
									variant="outlined"
									required
									fullWidth
									id="bio"
									label="Write a short bio here."
									name="bio"
									helperText={errors.position}
									error={errors.position ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									helperText={errors.password}
									error={errors.password ? true : false}
									onChange={this.handleChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									id="confirmPassword"
									autoComplete="current-password"
									onChange={this.handleChange}
								/>
							</Grid>
						</Grid>		
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={this.handleSubmit}
                            disabled={loading || 
                                !this.state.email || 
                                !this.state.password ||
                                !this.state.firstName || 
                                !this.state.lastName ||
                                !this.state.city || 
                                !this.state.bio || 
                                !this.state.position}
						>
							Sign Up
							{loading && <CircularProgress size={30} className={classes.progess} />}
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href={ROUTES.LOGIN} variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(styles)(signup);