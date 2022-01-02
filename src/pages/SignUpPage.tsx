import { Grid, Box, Typography, TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { User, Credentials } from '../typings';
import tinfoilHat from '../tinfoil_hat.png';
import Header from '../components/Header';

const signup_API = (username:string, password:string) => {
	return axios.post(
		"https://tomato-backend-api.herokuapp.com/signup",
		{ 
			username: username,
			password: password
		}
	).then(res => res.data);
}

export default function SignUpPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [startSignup, setStartSignup] = useState<boolean>(false);
	const [showSuccessfulSignup, setShowSuccessfulSignup] = useState<boolean>(false);
	const [signupError, setSignupError] = useState<Error | undefined>(undefined);

	let navigate = useNavigate();

	const signupQuery = useQuery<User, Error>(
		'user', 
		() => signup_API(username, password),
		{
			enabled: startSignup, // only active when user clicks on "Log in"
			onSettled: () => { 
				setStartSignup(false); 
				navigate("/home");
			},
			onSuccess: () => { setShowSuccessfulSignup(true); },
			onError: (error) => { setSignupError(error); }
		}
	);

	const handleSignUp = () => {
		setStartSignup(true);
	}

	return (
		<Box bgcolor='#C6FAD2'>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				<Header />
				<Box 
					bgcolor='#C6FAD2'
					padding={5}
					sx={{ minWidth: '100vw' }}
				>
					<Grid 
						container
						direction='row'
						justifyContent='center'
						alignItems='center'
						spacing={2}
					>
						
						<Grid item>
							<Box sx={{maxWidth: '80vw', bgcolor: '#F6FFEE', borderRadius: 10, padding: 20}}>
								<Grid item>
									<Typography variant="h4" gutterBottom>
										Hurry, put this on,
									</Typography>

									<img src={tinfoilHat} alt="Tinfoil Hat" width={300} />
								</Grid>
							</Box>
						</Grid>

						<Grid item>
							<Box sx={{maxWidth: '33vw', bgcolor: '#f2fd02', borderRadius: 10, padding: 20}}>								
								<Typography variant="h4" gutterBottom>
									And Join Us.
								</Typography>
									<TextField
										label="Choose a username"
										variant="filled"
										helperText="not your real name; the lizard people are listening."
										fullWidth
										value={username}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
									/>

									<TextField
										label="Choose a really secure password"
										variant="filled"
										type="password"
										helperText="don't let them get to you; I mean, your account."
										fullWidth
										value={password}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
									/>

									<Grid container spacing={1}>
										<Grid item>
											<Button variant="contained" color="primary" onClick={handleSignUp}>
												Create account.
											</Button>
										</Grid>

										<Grid item>
											<Button variant="outlined" color="secondary" component={Link} to="/" >
												Oh, you already have an account?
											</Button>
										</Grid>
									</Grid>

									<Snackbar open={signupQuery.isFetching} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}>
										<Box sx={{ minWidth: '25vw' }}>
											<Alert severity="info" >Creating a new account for you.</Alert>
										</Box>
									</Snackbar>

									<Snackbar open={showSuccessfulSignup} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }} autoHideDuration={1000} onClose={() => setShowSuccessfulSignup(false)}>
										<Box sx={{ minWidth: '25vw' }}>
											<Alert severity="success" >Welcome, fellow woke person.</Alert>
										</Box>
									</Snackbar>

									<Snackbar open={signupError !== undefined} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}>
										<Box sx={{ minWidth: '25vw' }}>
											<Alert severity="error" onClose={() => setSignupError(undefined)}>{ signupError?.message }</Alert>
										</Box>
									</Snackbar>															
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Box>
	)
}