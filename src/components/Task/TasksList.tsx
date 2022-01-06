import { Grid, Box, Typography, Button, CircularProgress } from '@material-ui/core';
import { Add, FilterList } from '@material-ui/icons';
import Lottie from 'react-lottie';
import { useQuery, useQueryClient } from 'react-query';
import { MouseEvent, useState, createContext, useEffect } from 'react';

import Task from "./Task";
import NewTask from './NewTask';
import NewCategory from './NewCategory';
import FilterOptions from './FilterOptions';
import { fetchCategories_API, fetchTasks_API } from './TaskAPI';
import { User, TaskType, CategoryType } from "../../typings";
import empty from "../../lotties/empty.json"

const emptyOptions = {
	loop: true,
	autoplay: true,
	animationData: empty,
	rendererSettings: {
	  // preserveAspectRatio: "xMidYMid slice"
	}
};

export let TasksListContext = createContext<any>(null);

export default function TasksList() {
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
	const handleShowFilterOptions = (event: MouseEvent<HTMLButtonElement>) => {
		setFilterOptionsAnchor(event.currentTarget);
	};
	const handleHideFilterOptions = () => {
		setFilterOptionsAnchor(null);
	}
	const showFilterOptions = Boolean(filterOptionsAnchor);
	const filterOptionsId = showFilterOptions ? 'filter-options' : undefined;

	// options to filter tasks shown by category or completion status
	const [categoryFilter, setCategoryFilter] = useState<CategoryType>({ category_id: -1, category_name: "All" });
	const [categoryInput, setCategoryInput] = useState<string>("");
	const [completionFilter, setCompletionFilter] = useState<number>(0);

	const queryClient = useQueryClient();
	const tasksQuery = useQuery(
		['tasks', categoryFilter?.category_id, completionFilter], 
		() => fetchTasks_API(
			queryClient.getQueryData('user'),
			categoryFilter.category_id,
			completionFilter
		),
		{
			onSuccess: (data) => {
				// create a Query for each individual task so that we won't
				//		have to refetch the entire-task list when we edit a task
				data.forEach((task:TaskType) => queryClient.setQueryData(['task', task.id], task));
			},
			staleTime: 500, // task list is not refreshed (unless tasks are added/edited/deleted) until 
							// 		0.5 seconds passes; after which it will refresh when user clicks away 
							//		from the window and clicks back again.
		}
	);

	const categoriesQuery = useQuery(
		'categories', () => fetchCategories_API(queryClient.getQueryData('user')), 
		{
			staleTime: Infinity // never refetch list of categories unless a new category is added
		}
 	)

	if (tasksQuery.isLoading || tasksQuery.isFetching) {
		return (
			<Box sx={{ bgcolor: '#02075d', borderRadius: 20, padding: 30, minHeight: '60vh' }}>
				<Grid container alignItems='center' justifyContent='center'>
					<Grid item>
						<CircularProgress size={200} />
					</Grid>
				</Grid>
			</Box>
		)
	}

	return (
		<Box sx={{ bgcolor: '#02075d', borderRadius: 20, padding: 30, minHeight: '60vh' }}>
			<Grid container direction='column' spacing={3}>
				<Grid item>
					<Grid container direction='row' alignItems='center' justifyContent='space-between'>
						<Grid item>							
							<Typography variant='h4'>Well don't just stand there, hoard something!</Typography>
						</Grid>

						<Grid item>
							<Grid container spacing={1}>
								<Grid item>
									<Button variant="contained" startIcon={<Add />} onClick={handleStartNewTask} color="secondary">Add Task</Button>
								</Grid>
								<NewTask id={newTaskFormId} open={showNewTaskForm} anchorEl={newTaskAnchor} onClose={handleDiscardNewTask} />

								<Grid item>
									<Button variant="contained" startIcon={<Add />} onClick={handleStartNewCategory}>New Category</Button>
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
					</Grid>
				</Grid>

				<Grid item>
					<Grid container spacing={2}>
						{
						tasksQuery.data
							? (tasksQuery.data?.map((t:TaskType) => (
								<Grid item key={t.id}>
									<Task id={t.id} />
								</Grid>
							)))
							: (<Grid item>
								<Box sx={{ borderRadius: 20, padding: 20, bgcolor: '#F6FFEE' }}>
									<Lottie options={emptyOptions} height={250} width={250} />
									<Typography variant="h4">It seems like there's nothing here.</Typography>
								</Box>
							</Grid>)
						}
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