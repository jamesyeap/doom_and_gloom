import { Grid, Box, Typography } from '@material-ui/core';

export default function Countdown() {
	return (
		<Box sx={{ bgcolor: 'black', padding: 25, borderRadius: 20 }}>
			<Grid container direction='column' justifyContent='center' alignItems='center'>
				<Grid item>
					<Typography variant='h4'>The Dooms Clock</Typography>
				</Grid>

				<Grid item>
					<Typography variant='h2'>46 days</Typography>
				</Grid>

				<Grid item>
					<Typography variant='subtitle1'>*tickity tockity*</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}