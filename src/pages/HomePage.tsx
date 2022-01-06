import { Box, Grid, Typography, Button } from '@material-ui/core';
import { useQueryClient } from 'react-query';
import { ExitToApp } from "@material-ui/icons";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import TasksList from '../components/Task/TasksList';
import Countdown from '../components/Countdown';
import { User } from '../typings';

export default function HomePage() {
	let queryClient = useQueryClient();
	let user:(User|undefined) = queryClient.getQueryData('user');

	let navigate = useNavigate();

	const handleLogout = () => {
		queryClient.removeQueries('user');
		navigate("/");
	}

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
					<Box sx={{ padding: 10 }}>
						<Grid container spacing={2}>
							<Grid item xs={9}>
								<TasksList />
							</Grid>

							<Grid item>
								<Grid container direction='column' justifyContent='center' alignItems='center' spacing={2}>
									<Grid item>
										<Countdown />
									</Grid>
									
									<Grid item>
										<Button onClick={handleLogout} variant='contained' size='large' startIcon={<ExitToApp />} color="secondary">Log Out</Button>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}