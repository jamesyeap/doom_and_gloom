import { Grid, Box, Typography, Checkbox, IconButton, Chip, TextField, CircularProgress, Popover, Button } from '@material-ui/core';
import { Check, Cancel, Edit, DeleteOutline } from '@material-ui/icons'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { CategoryType, TaskType } from "../../typings";

import { markComplete_API, markIncomplete_API, deleteTask_API, updateTask_API, fetchTaskByID_API } from './TaskAPI';

export default function Task({ id }:{ id:number }) {
	const taskQuery = useQuery<TaskType, Error>(
		['task', id], 
		() => fetchTaskByID_API(id), 
		{
			staleTime: Infinity // never refetch a task unless some changes are made
		}	
	)

	const [editMode, setEditMode] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(taskQuery.data ? taskQuery.data.title: "");
	const [description, setDescription] = useState<string | undefined>(taskQuery.data?.description);
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined | null>({ category_id: taskQuery.data?.category_id || 0, category_name: taskQuery.data?.category_name || "All" });
	const [categoryInput, setCategoryInput] = useState<string>("");

	const queryClient = useQueryClient();

	const completeTask = useMutation(
		() => markComplete_API(id),
		{
			onSuccess: () => queryClient.invalidateQueries(['task', id]),
			onSettled: () => queryClient.invalidateQueries(['task', id])
		}
	)

	const undoTask = useMutation(
		() => markIncomplete_API(id),
		{
			onSuccess: () => queryClient.invalidateQueries(['task', id]),
			onSettled: () => queryClient.invalidateQueries(['task', id])
		}
	)

	const deleteTask = useMutation(
		() => deleteTask_API(id),
		{
			onSuccess: () => queryClient.invalidateQueries('tasks'),
			onSettled: () => queryClient.invalidateQueries('tasks')
		}
	)

	const editTask = useMutation(
		() => updateTask_API(
			id,
			title,
			description,
			taskQuery.data?.deadline,
			selectedCategory?.category_id
		), 
		{
			onSuccess: () => queryClient.invalidateQueries(['task', id]),
			onSettled: () => queryClient.invalidateQueries(['task', id])
		}
	)

	const handleChangeTaskCompletion = () => {
		if (taskQuery.data) {
			taskQuery.data.completed 
				? undoTask.mutate()
				: completeTask.mutate()
		}
	}

	const handleSaveEdit = () => {		
		editTask.mutate();
		setEditMode(false);
	}

	const handleDiscardEdit = () => {
		setTitle(taskQuery.data ? taskQuery.data.title: "");
		setDescription(taskQuery.data?.description);
		setEditMode(false);
	}

	// get a list of categories created by the user
	let data:CategoryType[] = [{category_id: -1, category_name: "All"} ];
	let userCategories:(CategoryType[] | undefined) = queryClient.getQueryData('categories');
	if (userCategories) {
		data = userCategories;	
	}

	const [categoryListAnchor, setCategoryListAnchor] = useState<HTMLButtonElement | null>(null);	
	const showCategoryList = Boolean(categoryListAnchor)
	const categoryListId = showCategoryList ? 'add-category-tag-form' : undefined;
	const handleStartTagTask = (event:any) => {
		setCategoryListAnchor(event.currentTarget);
	};
	const handleConfirmTagTask = () => {
		setCategoryListAnchor(null);
	}
	const handleDiscardTagTask = () => {
		setSelectedCategory({ category_id: taskQuery.data?.category_id || 0, category_name: taskQuery.data?.category_name || "All" })
		setCategoryListAnchor(null);
	}
	const handleUntagTask = () => {
		setSelectedCategory({ category_id: 0, category_name: "All" });
	};

	if (taskQuery.isFetching) {
		return (
			<Box sx={{ bgcolor: '#F6FFEE', padding: 10, borderRadius: 20, minWidth: '20vw', minHeight: '15vh' }}>
				<Grid container justifyContent='center' alignItems='center'>
					<Grid item>
						<CircularProgress size={100} />
					</Grid>
				</Grid>
			</Box>
		)
	}
	
	return (
		<Box sx={{ bgcolor: '#F6FFEE', padding: 20, borderRadius: 20, minWidth: '20vw', minHeight: '10vh' }}>
			<Grid container justifyContent='space-between' alignItems='center'>
				<Grid item>
					{!editMode && (
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<Typography variant="h4">{taskQuery.data ? taskQuery.data.title: ""}</Typography>
						</Grid>

						<Grid item>
							<Box sx={{maxWidth: '20vw'}}>
								<Typography variant="body1">{taskQuery.data?.description}</Typography>
							</Box>
						</Grid>

						{taskQuery.data?.category_name ? (
						<Grid item>
							<Chip label={taskQuery.data?.category_name} variant="outlined" />
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

							<Grid item>
							{(selectedCategory?.category_name !== "All") ? (
							<Grid item>
								<Chip onDelete={handleUntagTask} label={selectedCategory?.category_name} variant="outlined" />
							</Grid>
							) : (
							<Grid item>
								<Chip onClick={handleStartTagTask} label="add category" variant="outlined" />
							</Grid>
							)}
							</Grid>

							{showCategoryList && (
							<Popover
								id={categoryListId} 
								open={showCategoryList} 
								anchorEl={categoryListAnchor} 
								onClose={handleDiscardTagTask}
							>
								<Grid item>
									<Box sx={{ minWidth: '20vw', minHeight: ' 30vh', padding: 20, borderRadius: 20}}>
										<Autocomplete
											disablePortal
											id="list-of-categories"
											options={data}
											renderInput={(params) => <TextField {...params} label="Category" />}
											getOptionLabel={(option: CategoryType) => option.category_name}

											value={selectedCategory}
											onChange={(event: any, newValue:(CategoryType | null)) => {												
												setSelectedCategory(newValue)
											}}

											inputValue={categoryInput}
											onInputChange={(event:any, newInputValue:string) => {
												setCategoryInput(newInputValue)
											}}
										/>

										<Button onClick={handleConfirmTagTask}>Confirm</Button>
										<Button onClick={handleDiscardTagTask}>Cancel</Button>
									</Box>
								</Grid>
							</Popover>)
							}
						</Grid>
					</Box>
					)}
				</Grid>

				<Grid item>
					{!editMode && (
					<Grid container direction="column">
						<Grid item>
							<Checkbox
								checked={taskQuery.data?.completed}
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