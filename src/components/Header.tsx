import { Typography, Box, Grid } from '@material-ui/core'

const Header = () => (
	<Box 
		bgcolor='#C6FAD2'
	>
        <Grid 
        container 
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant="h3">
          The World is Ending
        </Typography>

        <Typography variant="subtitle1">
          wake up, sheeple
        </Typography>
        </Grid>
	</Box>
)

export default Header;