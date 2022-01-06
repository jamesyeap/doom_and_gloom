import { Typography, Box, Grid } from '@material-ui/core'

const Header = () => (
  <Box sx={{ minWidth: '100vw' }} >
    <Grid container justifyContent='center'>
      <Grid item>
        <Box 
          sx={{ bgcolor:'#006355', padding: 25, maxWidth: '25vw', borderRadius: 10 }}
        >
              <Grid 
              container 
              direction='column'
              alignItems='center'
              justifyContent='center'
              >
                <Grid item>
                  <Typography variant="h3">
                    The World is Ending!
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="subtitle1">
                    *run. panic. hoard.*
                  </Typography>
                </Grid>
              </Grid>
        </Box>
      </Grid>
    </Grid>
  </Box>
)

export default Header;