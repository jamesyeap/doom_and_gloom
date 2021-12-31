import { Grid, Box, Typography } from '@material-ui/core';

import Header from '../components/Header';
import SignUp from '../components/SignUp';

export default function SignUpPage() {
	return (
		<Box bgcolor='#C6FAD2'>
			<Grid
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				<Header />
				<SignUp />
			</Grid>
		</Box>
	)
}