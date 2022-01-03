import { Popover, Grid, Box, Typography, TextField, Select, MenuItem, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Check, Replay } from "@material-ui/icons";
import { useState, useContext } from "react";

import { TasksListContext } from "./TasksList";
import { fakeCategories } from "./NewTask";
import { CategoryType } from "../../typings";

export default function FilterOptions(props:any) {
	const { categoryFilter, setCategoryFilter, categoryInput, setCategoryInput, completionFilter, setCompletionFilter} = useContext(TasksListContext);

	const handleSetFilter = () => {
		// TODO

		props.onClose();
	}

	const handleReset = () => {
		// TODO
		
		setCategoryFilter(null);
		setCategoryInput("");
		setCompletionFilter(0);

		props.onClose();
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
							options={fakeCategories}
							renderInput={(params) => <TextField {...params} label="Category" />}
							getOptionLabel={(option: CategoryType) => option.category_name}

							value={categoryFilter}
							onChange={(event: any, newValue: CategoryType | null) => {
								setCategoryFilter(newValue)

								// for testing only, -> delete in production
								console.log(categoryFilter);
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
									<Button onClick={handleSetFilter} variant='contained' startIcon={<Check />}>Confirm</Button>
								</Grid>

								<Grid item>
									<Button onClick={handleReset} startIcon={<Replay />}>Reset</Button>
								</Grid>
							</Grid>
					</Grid>				
				</Grid>
			</Box>
		</Popover>
	)
}