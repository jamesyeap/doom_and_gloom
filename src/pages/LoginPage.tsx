import { Grid, Box, Typography, TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import explosion from '../lotties/explosion.json';
import toiletpaper from  '../lotties/toiletpaper.json';

import Header from '../components/Header';
import { User, Credentials } from '../typings';
import { url } from '../App';

const login_API = (username:string, password:string) => {
	return axios.post(
		`${url}/login`,
		{ 
			username: username,
			password: password
		}
	).then(res => res.data);
}

export default function LoginPage() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [startLogin, setStartLogin] = useState<boolean>(false);
	const [showSuccessfulLogin, setShowSuccessfulLogin] = useState<boolean>(false);
	const [loginError, setLoginError] = useState<Error | undefined>(undefined);

	let navigate = useNavigate();

	const loginQuery = useQuery<User, Error>(
		'user', 
		() => login_API(username, password),
		{
			enabled: startLogin, // only active when user clicks on "Log in"
			onSettled: () => { setStartLogin(false); },
			onSuccess: () => { 
				setShowSuccessfulLogin(true);				
				navigate("/home");
			},
			onError: (error) => { setLoginError(error); },
			cacheTime: Infinity // keep user information around until user logs out
		}
	);
	
	const handleLogIn = () => {
		setStartLogin(true);
	}

	const explosionOptions = {
		loop: true,
		autoplay: true,
		animationData: explosion,
		rendererSettings: {
		  // preserveAspectRatio: "xMidYMid slice"
		}
	};

	const toiletpaperOptions = {
		loop: true,
		autoplay: true,
		animationData: toiletpaper,
		rendererSettings: {
		  // preserveAspectRatio: "xMidYMid slice"
		}
	}

	return (
		<Box sx={{ bgcolor:'#C6FAD2', minWidth: '100vw', minHeight: '100vh' }}>
			<Grid
				container
				direction='column'
				justifyContent='center'				
			>
				
				<Grid item>
					<Header />
				</Grid>				

				<Grid item>
					<Grid container alignItems='center'>
							<Box sx={{maxWidth: '60vw', bgcolor: '#F6FFEE', borderRadius: 20, padding: 20}} margin={5}>
								<Typography variant="h4">Climate change! Rising sea-levels! The Antichrist!</Typography>
								<Box sx={{maxWidth: '60vw', bgcolor: '#F6FFEE'}}>
									<Typography variant="h6">
										{`
										Oh my, the world could end for so many reasons! 
										I could go on: A zombie apocalypse. The coming of the Antichrist. The Illuminati.
										Are we doomed?
										`}
									</Typography>
								</Box>							
							</Box>

							<Grid item>
								<Lottie options={explosionOptions} height={250} width={250} />
							</Grid>
						</Grid>
				</Grid>

				<Grid item>
					<Grid 
						container
						justifyContent='flex-end'
					>
						<Lottie options={toiletpaperOptions} height={250} width={250} />

						<Box sx={{maxWidth: '60vw', bgcolor: '#F6FFEE', borderRadius: 20, padding: 20}} margin={5}>
							<Typography variant="h4">Get Prepared!</Typography>
							<Box sx={{maxWidth: '60vw'}}>
								<Typography variant="h6">
									Fear not, sheeple, for you still can do the most logical thing ever in times of crises: hoard. So grab a tinfoil hat, and rush down to your nearest supermarket. Stock up on food, water, and toilet paper, and you'll be set to ride out humanity's last days in comfort.
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>

				<Grid item>
					<Grid container>
						<Grid item>
							<Box sx={{maxWidth: '40vw', bgcolor: '#F6FFEE', borderRadius: 10, padding: 20}} margin={5}>
								<Typography variant="h4" gutterBottom>
									Start planning your demise.
								</Typography>

								<Typography variant="h6" gutterBottom>
									We know your attention-span has been utterly ravaged by social media. Lucky for you, we've made a task-management app to track your actions. Wait, that's not quite right. Errrm, hmmm, ah yes, to help you devise your escape-plan.
								</Typography>
							</Box>
						</Grid>

						<Grid item>
							<Box sx={{minWidth: '45vw', bgcolor: '#DFE667', borderRadius: 10, padding: 20 }} margin={5}>
								<Typography variant="h4">Welcome back</Typography>

								<TextField
									label="Your Username"
									variant="filled"
									fullWidth
									helperText=" "
									value={username}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
								/>

								<TextField
									label="Your Password"
									type='password'
									variant="filled"
									fullWidth
									helperText=" "
									value={password}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
								/>

								<Grid container spacing={1}>
									<Grid item>
										<Button variant="contained" color="primary" onClick={handleLogIn}>
											Log In
										</Button>
									</Grid>

									<Grid item>
										<Button variant="outlined" color="secondary" component={Link} to="/signup">
											Oh, you're new here?
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Snackbar open={loginQuery.isFetching} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}>
							<Box sx={{ minWidth: '25vw' }}>
								<Alert severity="info" >Logging you in</Alert>
							</Box>
						</Snackbar>

						<Snackbar open={showSuccessfulLogin} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }} autoHideDuration={1000} onClose={() => setShowSuccessfulLogin(false)}>
							<Box sx={{ minWidth: '25vw' }}>
								<Alert severity="success" >Welcome back!</Alert>
							</Box>
						</Snackbar>

						<Snackbar open={loginError !== undefined} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}>
							<Box sx={{ minWidth: '25vw' }}>
								<Alert severity="error" onClose={() => setLoginError(undefined)}>{ loginError?.message }</Alert>
							</Box>
						</Snackbar>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}