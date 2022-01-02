import { Box, Grid, Typography, Button } from '@material-ui/core';
import { useQueryClient } from 'react-query';

import Header from '../components/Header';
import { User } from '../typings';

export default function HomePage() {
	let queryClient = useQueryClient();
	let user:(User|undefined) = queryClient.getQueryData('user');

	return (
		<Box sx={{ minWidth: '100vw' }}>
			<Grid 
				container
				direction='column'
			>
				<Grid item>
					<Header />
				</Grid>

				<Grid item>
					<Typography variant="h5">Home Page</Typography>
				</Grid>

				<Grid item>
					{user?.username && <Button>Log Out</Button>}
				</Grid>
			</Grid>
		</Box>
	)
}