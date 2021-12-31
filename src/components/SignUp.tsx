import { Grid, Box, Button, FormControl, TextField, Typography } from '@material-ui/core'
import tinfoilHat from '../tinfoil_hat.png';

export default function SignUp() {
	return (
		<Box 
			bgcolor='#C6FAD2'
			padding={5}
		>
			<Grid 
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				spacing={2}
			>
				<Grid item>
					<Typography variant="h4">
						Hurry, put this on.
					</Typography>
				</Grid>

				<Grid item>
					<img src={tinfoilHat} alt="Tinfoil Hat" width={300} />
					<Typography variant="h6"> 5G Deflectron 9000 </Typography>
				</Grid>				

				<Grid item>
					<Box minWidth={500}>
						<TextField
							label="Give Us Your Real Name"
							variant="filled"
							helperText="of course we aren't lizards"
							fullWidth
						/>
					</Box>
				</Grid>

				<Button variant="contained">
					Start Planning
				</Button>
			</Grid>
		</Box>
	)
}