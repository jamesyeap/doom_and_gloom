import { Grid, Box, Typography } from '@material-ui/core';

export default function Countdown() {
	return (
		<Box sx={{ bgcolor: 'black', padding: 10, borderRadius: 20 }}>
			<Grid container direction='column'>
				<Grid item>
					<Typography variant='h3'>46 days left</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}