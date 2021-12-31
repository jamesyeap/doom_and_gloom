import { Grid } from '@material-ui/core';

import Header from '../components/Header';
import SignUp from '../components/SignUp';

export default function SignUpPage() {
	return (
		<Grid
			container
			direction='column'
			justifyContent='center'
		>
			<Header />
			<SignUp />
		</Grid>
	)
}