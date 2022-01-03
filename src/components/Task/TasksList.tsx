import { Grid, Box, Typography, Button } from '@material-ui/core';
import { Add, FilterList } from '@material-ui/icons';
import { MouseEvent, useState, createContext } from 'react';

import Task from "./Task";
import NewTask from './NewTask';
import NewCategory from './NewCategory';
import FilterOptions from './FilterOptions';
import { TaskType, CategoryType } from "../../typings";

export let TasksListContext = createContext<any>(null);

export default function TasksList() {
	let data:TaskType[] = generateFakeData();

	const [newTaskAnchor, setNewTaskAnchor] = useState<HTMLButtonElement | null>(null);	
	const showNewTaskForm = Boolean(newTaskAnchor);
	const newTaskFormId = showNewTaskForm ? 'add-new-task-form' : undefined;
	const handleStartNewTask = (event: MouseEvent<HTMLButtonElement>) => {
		setNewTaskAnchor(event.currentTarget);
	};
	const handleDiscardNewTask = () => {
		setNewTaskAnchor(null);
	};

	const [newCategoryAnchor, setNewCategoryAnchor] = useState<HTMLButtonElement | null>(null);	
	const showNewCategoryForm = Boolean(newCategoryAnchor);
	const newCategoryFormId = showNewCategoryForm ? 'add-new-category-form' : undefined;
	const handleStartNewCategory = (event: MouseEvent<HTMLButtonElement>) => {
		setNewCategoryAnchor(event.currentTarget);
	};
	const handleDiscardNewCategory = () => {
		setNewCategoryAnchor(null);
	}

	const [filterOptionsAnchor, setFilterOptionsAnchor] = useState<HTMLButtonElement | null>(null);	
	const showFilterOptions = Boolean(filterOptionsAnchor);
	const filterOptionsId = showFilterOptions ? 'filter-options' : undefined;
	const handleShowFilterOptions = (event: MouseEvent<HTMLButtonElement>) => {
		setFilterOptionsAnchor(event.currentTarget);
	};
	const handleHideFilterOptions = () => {
		setFilterOptionsAnchor(null);
	}

	// options to filter tasks shown by category or completion status
	const [categoryFilter, setCategoryFilter] = useState<CategoryType | null>(null);
	const [categoryInput, setCategoryInput] = useState<string>("");
	const [completionFilter, setCompletionFilter] = useState<number>(0);

	return (
		<Box sx={{ bgcolor: '#02075d', borderRadius: 20, padding: 10 }}>
			<Grid container direction='column' spacing={3}>
				<Grid item>
					<Grid container direction='row' spacing={2} justifyContent='center' alignItems='center'>
						<Grid item>
							<Typography variant='h4'>Well don't just stand there, hoard something!</Typography>
						</Grid>

						<Grid item>
							<Button variant="contained" startIcon={<Add />} onClick={handleStartNewTask}>Add Task</Button>
						</Grid>
						<NewTask id={newTaskFormId} open={showNewTaskForm} anchorEl={newTaskAnchor} onClose={handleDiscardNewTask} />

						<Grid item>
							<Button variant="contained" startIcon={<Add />} onClick={handleStartNewCategory}>Add Category</Button>
						</Grid>
						<NewCategory id={newCategoryFormId} open={showNewCategoryForm} anchorEl={newCategoryAnchor} onClose={handleDiscardNewCategory} />

						<Grid item>
							<Button variant="contained" startIcon={<FilterList />} onClick={handleShowFilterOptions}>Filter</Button>
						</Grid>
						<TasksListContext.Provider value={{categoryFilter, setCategoryFilter, categoryInput, setCategoryInput, completionFilter, setCompletionFilter}}>
							<FilterOptions id={filterOptionsId} open={showFilterOptions} anchorEl={filterOptionsAnchor} onClose={handleHideFilterOptions} />
						</TasksListContext.Provider>
					</Grid>
				</Grid>

				<Grid item>
					<Grid container spacing={2}>
						{data.map(t => (
							<Grid item key={t.id}>
								<Task {...t} />
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	)
}

function generateFakeData(): (TaskType[]) {
	return [
		{
			id: 0,
			title: "Buy tin-foil hat.",
			description: "never hurts to have one more amirite bois ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy",
			category_id: 0,
			category_name: "supplies",
			completed: false,
			created_at: String(new Date().getDate()),
			updated_at: String(new Date().getDate())
		},
		{
			id: 1,
			title: "Hoard toilet paper.",
			description: "never hurts to have one more amirite bois ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy ayyyyyy",
			completed: false,
			created_at: String(new Date().getDate()),
			updated_at: String(new Date().getDate())
		}
	]
}