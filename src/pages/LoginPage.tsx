import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';

import Header from '../components/Header';

export default function LoginPage() {
	return (
		<Box bgcolor='#C6FAD2'>
			<Grid
				container
				direction='column'
				justifyContent='center'
			>
				<Header />

				<Box bgcolor='inherit' margin={5}>
					<Typography variant="h4">Climate change. Rising sea-levels. Umbrage man.</Typography>
					<Box sx={{maxWidth: '60vw'}}>
						<Typography variant="h6">
							Good morning, ladies and gentlemen. I hope that today, one of our world’s last, finds you well and ready. For, as you know, a threatening future looms over us. Hundred of years ago... (something-something Mayans blah blah...)
						</Typography>
					</Box>
				</Box>

				<Box bgcolor='inherit' margin={5}>
					<Typography variant="h4">Get Prepared!</Typography>
					<Box sx={{maxWidth: '60vw'}}>
						<Typography variant="h6">
							But fear not, sheeple, for you can get prepared. Stock up on food, water, and toilet paper, and you'll be set to ride out humanity's last days in comfort.
						</Typography>
					</Box>
				</Box>

				<Box sx={{maxWidth: '60vw'}} margin={5}>
					<Typography variant="h4" gutterBottom>
						Start planning your demise.
					</Typography>

					<Typography variant="h6" gutterBottom>
						We know your attention-span has been ravaged by social media. Lucky for you, we've made a task-management app to track your actions. Wait, that's not quite right. Errrm, hmmm, ah yes, to help you devise your escape-plan.
					</Typography>

					<TextField
						label="Your Username"
						variant="filled"
						fullWidth
						helperText=" "
					/>

					<TextField
						label="Your Password"
						variant="filled"
						fullWidth
						helperText=" "
					/>

					<Button variant="contained">
						Login
					</Button>
					
				</Box>

			</Grid>
		</Box>
	)
}