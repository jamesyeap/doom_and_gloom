import { Grid, Box, Button, FormControl, TextField, Typography } from '@material-ui/core'
import tinfoilHat from '../tinfoil_hat.png';

export default function SignUp() {
	return (
		<Box 
			bgcolor='#C6FAD2'
			padding={5}
			sx={{ minWidth: '100vw' }}
		>
			<Grid 
				container
				direction='column'
				justifyContent='center'
				spacing={2}
			>
				<Grid item>
					<Typography variant="h4" gutterBottom>
						Hurry, put this on,
					</Typography>

					<img src={tinfoilHat} alt="Tinfoil Hat" width={300} />
				</Grid>

				<Grid item>
					<Typography variant="h4" gutterBottom>
						And Join Us.
					</Typography>

					<Box sx={{maxWidth: '33vw'}}>
						<TextField
							label="Choose a username"
							variant="filled"
							helperText="not your real name; the lizard people are listening."
							fullWidth
						/>

						<TextField
							label="Choose a really secure password"
							variant="filled"
							helperText="don't let them get to you; I mean, your account."
							fullWidth
						/>

						<Button variant="contained">
							Start Planning
						</Button>
					</Box>

				</Grid>
			</Grid>
		</Box>
	)
}