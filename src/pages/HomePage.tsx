import { Box, Grid, Typography, Button } from '@material-ui/core';
import { useQueryClient } from 'react-query';

import Header from '../components/Header';
import TasksList from '../components/Task/TasksList';
import Countdown from '../components/Countdown';
import { User } from '../typings';

export default function HomePage() {
	let queryClient = useQueryClient();
	let user:(User|undefined) = queryClient.getQueryData('user');

	return (
		<Box sx={{ minWidth: '100vw', minHeight: '100vh', bgcolor: '#C6FAD2' }}>
			<Grid
				container
				direction='column'
				spacing={1}
			>
				<Grid item>
					<Header />
				</Grid>

				<Grid item>
					<Grid container>
						<Grid item xs={10}>
							<TasksList />
						</Grid>

						<Grid item xs={2}>
							<Countdown />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}