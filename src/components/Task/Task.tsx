import { Grid, Box, Typography, Checkbox, IconButton, Chip } from '@material-ui/core';
import { Check, Edit, DeleteOutline } from '@material-ui/icons'
import { TaskType } from "../../typings";

export default function Task(props:TaskType) {
	return (
		<Box sx={{ bgcolor: '#F6FFEE', padding: 20, borderRadius: 20 }}>
			<Grid container>
				<Grid item>
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<Typography variant="h4">{props.title}</Typography>
						</Grid>

						<Grid item>
							<Box sx={{maxWidth: '20vw'}}>
								<Typography variant="body1">{props.description}</Typography>
							</Box>
						</Grid>

						{props.category_name && (
						<Grid item>
							<Chip label={props.category_name} variant="outlined" />
						</Grid>
						)}
					</Grid>
				</Grid>

				<Grid item>
					<Grid container direction="column">
						<Grid item>
							<Checkbox />
						</Grid>

						<Grid item>
							<IconButton>
								<Edit />
							</IconButton>
						</Grid>

						<Grid item>
							<IconButton>
								<DeleteOutline />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}