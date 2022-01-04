import { Grid, Box, Typography, Checkbox, IconButton, Chip, TextField } from '@material-ui/core';
import { Check, Cancel, Edit, DeleteOutline } from '@material-ui/icons'
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TaskType, UpdateTaskAPIParams } from "../../typings";

import { markComplete_API, markIncomplete_API, deleteTask_API, updateTask_API } from './TaskAPI';

export default function Task(props:TaskType) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(props.title);
	const [description, setDescription] = useState<string | undefined>(props.description);

	const queryClient = useQueryClient();

	const completeTask = useMutation(
		() => markComplete_API(props.id),
		{
			onSuccess: () => queryClient.invalidateQueries('tasks'),
			onSettled: () => queryClient.invalidateQueries('tasks')
		}
	)

	const undoTask = useMutation(
		() => markIncomplete_API(props.id),
		{
			onSuccess: () => queryClient.invalidateQueries('tasks'),
			onSettled: () => queryClient.invalidateQueries('tasks')
		}
	)

	const deleteTask = useMutation(
		() => deleteTask_API(props.id),
		{
			onSuccess: () => queryClient.invalidateQueries('tasks'),
			onSettled: () => queryClient.invalidateQueries('tasks')
		}
	)

	const editTask = useMutation(
		() => updateTask_API(
			props.id,
			title,
			description,
			props.deadline,
			props.category_id
		), 
		{
			onSuccess: () => queryClient.invalidateQueries('tasks'),
			onSettled: () => queryClient.invalidateQueries('tasks')
		}
	)

	const handleChangeTaskCompletion = () => {
		props.completed 
			? undoTask.mutate()
			: completeTask.mutate()			
	}

	const handleSaveEdit = () => {		
		editTask.mutate();
		setEditMode(false);
	}

	const handleDiscardEdit = () => {
		setTitle(props.title);
		setDescription(props.description);
		setEditMode(false);
	}
	
	return (
		<Box sx={{ bgcolor: '#F6FFEE', padding: 20, borderRadius: 20, minWidth: '20vw' }}>
			<Grid container justifyContent='space-between' alignItems='center'>
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
							<Checkbox
								checked={props.completed}
								onChange={handleChangeTaskCompletion}
							/>
						</Grid>

						<Grid item>
							<IconButton onClick={() => setEditMode(true)}>
								<Edit />
							</IconButton>
						</Grid>

						<Grid item>
							<IconButton onClick={() => deleteTask.mutate()}>
								<DeleteOutline />
							</IconButton>
						</Grid>
					</Grid>
					)}

					{editMode && (
					<Grid container direction="column">
						<Grid item>
							<IconButton onClick={handleSaveEdit}>
								<Check />
							</IconButton>
						</Grid>

						<Grid item>
							<IconButton onClick={handleDiscardEdit}>
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