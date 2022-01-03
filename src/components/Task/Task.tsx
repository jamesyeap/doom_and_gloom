import { Grid, Box, Typography, Checkbox, IconButton, Chip, TextField } from '@material-ui/core';
import { Check, Cancel, Edit, DeleteOutline } from '@material-ui/icons'
import { useState } from 'react';
import { TaskType } from "../../typings";

export default function Task(props:TaskType) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(props.title);
	const [description, setDescription] = useState<string | null | undefined>(props.description);

	const handleSaveEdit = () => {
		// TODO
	}

	const handleCompleteTask = () => {
		// TODO
	}

	const handleUndoTask = () => {
		// TODO
	}
	
	return (
		<Box sx={{ bgcolor: '#F6FFEE', padding: 20, borderRadius: 20, minWidth: '20vw' }}>
			<Grid container>
				<Grid item>
					{!editMode && (
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<Typography variant="h4">{props.title}</Typography>
						</Grid>

						<Grid item>
							<Box sx={{maxWidth: '20vw'}}>
								<Typography variant="body1">{props.description}</Typography>
							</Box>
						</Grid>

						{props.category_name ? (
						<Grid item>
							<Chip label={props.category_name} variant="outlined" />
						</Grid>
						) : (
						<Grid item>
							<Chip label="no category" variant="outlined" />
						</Grid>
						)}
					</Grid>
					)}

					{editMode && (
					<Box sx={{ minWidth: '20vw' }}>
						<Grid container direction="column" spacing={2}>
							<Grid item>
								<TextField 
									label='Title'
									value={title ? title : ""}
									onChange={(e:any) => setTitle(e.target.value)}
									fullWidth
								/>
							</Grid>

							<Grid item>
								<TextField
									label='Additional details'
									value={description ? description : ""}
									onChange={(e:any) => setDescription(e.target.value)}
									multiline
									fullWidth
								/>
							</Grid>
						</Grid>
					</Box>
					)}
				</Grid>

				<Grid item>
					{!editMode && (
					<Grid container direction="column">
						<Grid item>
							<Checkbox />
						</Grid>

						<Grid item>
							<IconButton onClick={() => setEditMode(true)}>
								<Edit />
							</IconButton>
						</Grid>

						<Grid item>
							<IconButton>
								<DeleteOutline />
							</IconButton>
						</Grid>
					</Grid>
					)}

					{editMode && (
					<Grid container direction="column">
						<Grid item>
							<IconButton>
								<Check />
							</IconButton>
						</Grid>

						<Grid item>
							<IconButton onClick={() => setEditMode(false)}>
								<Cancel />
							</IconButton>
						</Grid>
					</Grid>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}