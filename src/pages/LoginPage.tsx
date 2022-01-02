import { Grid, Box, Typography, TextField, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';

import Header from '../components/Header';



export default function LoginPage() {
	const [showLoggingIn, setShowLoggingIn] = useState<boolean>(false);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<Box bgcolor='#C6FAD2'>
			<Grid
				container
				direction='column'
				justifyContent='center'
			>
				<Grid item>
					<Header />
				</Grid>

				<Grid item>
					<Box sx={{maxWidth: '60vw', bgcolor: 'white', borderRadius: 20, padding: 20}} margin={5}>
						<Typography variant="h4">Climate change. Rising sea-levels. Umbrage man.</Typography>
						<Box sx={{maxWidth: '60vw'}}>
							<Typography variant="h6">
								Good day, ladies and gentlemen. I hope that today, one of our world’s last, finds you well and ready. For, as you know, a threatening future looms over us. Hundred of years ago... (something-something Mayans blah blah...)
							</Typography>
						</Box>
					</Box>
				</Grid>

				<Grid item>
					<Grid 
						container
						justifyContent='flex-end'
					>
						<Box sx={{maxWidth: '60vw', bgcolor: 'white', borderRadius: 20, padding: 20}} margin={5}>
							<Typography variant="h4">Get Prepared!</Typography>
							<Box sx={{maxWidth: '60vw'}}>
								<Typography variant="h6">
									But fear not, sheeple, for you can get prepared. Stock up on food, water, and toilet paper, and you'll be set to ride out humanity's last days in comfort.
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>

				<Grid item>
					<Grid container>
						<Grid item>
							<Box sx={{maxWidth: '40vw', bgcolor: 'white', borderRadius: 10, padding: 20}} margin={5}>
								<Typography variant="h4" gutterBottom>
									Start planning your demise.
								</Typography>

								<Typography variant="h6" gutterBottom>
									We know your attention-span has been utterly ravaged by social media. Lucky for you, we've made a task-management app to track your actions. Wait, that's not quite right. Errrm, hmmm, ah yes, to help you devise your escape-plan.
								</Typography>
							</Box>
						</Grid>

						<Grid item>
							<Box sx={{maxWidth: '50vw', bgcolor: 'white', borderRadius: 10, padding: 20}} margin={5}>
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
										<Button variant="contained" color="primary" onClick={() => setShowLoggingIn(true)}>
											Log In
										</Button>
									</Grid>

									<Grid item>
										<Button variant="outlined" color="secondary">
											Oh, you're new here?
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Grid>

						<Snackbar open={showLoggingIn} anchorOrigin={{ vertical:'bottom', horizontal: 'right' }}>
							<Box sx={{ minWidth: '25vw' }}>
								<Alert severity="info" >Logging you in</Alert>
							</Box>
						</Snackbar>
						
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}