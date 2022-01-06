import { Popover, Grid, Box, TextField, Button, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Check, CancelOutlined } from "@material-ui/icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { addTask_API } from "./TaskAPI";
import { CategoryType } from "../../typings";

export default function NewTask(props:any) {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
	const [categoryInput, setCategoryInput] = useState<string>("");

	const queryClient = useQueryClient();

	// get a list of categories created by the user
	let data:CategoryType[] = [{category_id: -1, category_name: "All"} ];
	let userCategories:(CategoryType[] | undefined) = queryClient.getQueryData('categories');
	if (userCategories) {
		data = userCategories;	
	}

	const addTask = useMutation(
		() => addTask_API({
			title, 
			description, 
			category_id: selectedCategory?.category_id, 
			user:queryClient.getQueryData('user')
		}),
		{
			onSuccess: () => queryClient.invalidateQueries('tasks'),
			onSettled: () => queryClient.invalidateQueries('tasks')
		}
	)

	const handleAddTask = () => {
		addTask.mutate();
		
		setTitle("");
		setDescription("");
		setSelectedCategory(null);
		setCategoryInput("");

		props.onClose();
	}

	const handleDiscard = () => {
		setTitle("");
		setDescription("");
		setSelectedCategory(null);
		setCategoryInput("");

		props.onClose();
	}

	return (
		<Popover {...props}>
			<Box sx={{ bgcolor: '#F6FFEE', minWidth: '50vw', padding: 30, borderRadius: 20 }}>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Typography variant='h4'>New Task</Typography>
					</Grid>

					<Grid item>
						<TextField variant='filled' fullWidth label='Title' value={title} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
					</Grid>

					<Grid item>
					<TextField variant='outlined' fullWidth multiline label='Additional details' value={description} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
					</Grid>

					<Grid item>
						<Grid container spacing={1} alignItems='center'>
							<Grid item xs={8}>
								<Autocomplete
									disablePortal
									id="list-of-categories"
									options={data}
									renderInput={(params) => <TextField {...params} label="Category" />}
									getOptionLabel={(option: CategoryType) => option.category_name}

									value={selectedCategory}
									onChange={(event: any, newValue: CategoryType | null) => {
										setSelectedCategory(newValue)
									}}

									inputValue={categoryInput}
									onInputChange={(event:any, newInputValue:string) => {
										setCategoryInput(newInputValue)
									}}
								/>
							</Grid>

							<Grid item>
								<Button onClick={handleAddTask} variant='contained' startIcon={<Check />}>Add Task</Button>
							</Grid>

							<Grid item>
								<Button onClick={handleDiscard} startIcon={<CancelOutlined />}>Discard</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Popover>
	)
}

export const fakeCategories:CategoryType[] = [
	{ category_id: 0, category_name: 'supplies' },
	{ category_id: 1, category_name: 'shelter' },
]