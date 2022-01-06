import { Popover, Grid, Box, Typography, TextField, Select, MenuItem, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Check, Replay } from "@material-ui/icons";
import { useContext } from "react";
import { useQueryClient } from "react-query";

import { TasksListContext } from "./TasksList";
import { CategoryType } from "../../typings";

export default function FilterOptions(props:any) {
	const { categoryFilter, setCategoryFilter, categoryInput, setCategoryInput, completionFilter, setCompletionFilter} = useContext(TasksListContext);

	const queryClient = useQueryClient();

	const handleReset = () => {
		props.onClose();

		setCategoryFilter({ category_id: -1, category_name: "All" });
		setCategoryInput("");
		setCompletionFilter(0);
	}

	// get a list of categories created by the user
	let data:CategoryType[] = [ {category_id: -1, category_name: "All"} ];
	let userCategories:(CategoryType[] | undefined) = queryClient.getQueryData('categories');
	if (userCategories) {
		data = userCategories;	
	}
	
	return (
		<Popover {...props}>
			<Box sx={{ bgcolor: '#F6FFEE', minWidth: '25vw', padding: 30, borderRadius: 20 }}>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Typography variant='h4'>Set Filter</Typography>
					</Grid>

					<Grid item>
						<Autocomplete
							disablePortal
							id="list-of-categories"
							options={data}							
							renderInput={(params) => <TextField {...params} label="Category" />}
							getOptionLabel={(option: CategoryType) => option.category_name}

							value={categoryFilter}
							defaultValue={{category_id: -1, category_name: "All"}}
							onChange={(event: any, newValue: CategoryType | null) => {
								setCategoryFilter(newValue === null ? {category_id: -1, category_name: "All"} : newValue)
							}}

							inputValue={categoryInput}
							onInputChange={(event:any, newInputValue:string) => {
								setCategoryInput(newInputValue)
							}}
						/>						
					</Grid>

					<Grid item>
						<Grid container spacing={2}>
							<Grid item>
								<Select
									label='completion status'
									value={completionFilter}
									onChange={(e:any) => setCompletionFilter(e.target.value)}
								>
									<MenuItem value={0}>Show all tasks</MenuItem>
									<MenuItem value={1}>Show completed tasks only</MenuItem>
									<MenuItem value={2}>Show outstanding tasks only</MenuItem>
								</Select>
							</Grid>
						</Grid>
					</Grid>

					<Grid item>
							<Grid container spacing={2}>							
								<Grid item>
									<Button onClick={handleReset} startIcon={<Replay />}>Reset Filter</Button>
								</Grid>
							</Grid>
					</Grid>				
				</Grid>
			</Box>
		</Popover>
	)
}