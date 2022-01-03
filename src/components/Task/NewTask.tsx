import { Popover, Grid, Box, TextField, Button, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Check, CancelOutlined } from "@material-ui/icons";
import { useState } from "react";

import { CategoryType } from "../../typings";

// const filter = createFilterOptions<CategoryType>();

export default function NewTask(props:any) {
	const [title, setTitle] = useState<string | null>(null);
	const [details, setDetails] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
	const [categoryInput, setCategoryInput] = useState<string>("");

	return (
		<Popover {...props}>
			<Box sx={{ bgcolor: '#F6FFEE', minWidth: '50vw', padding: 30, borderRadius: 20 }}>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Typography variant='h4'>What's next?</Typography>
					</Grid>

					<Grid item>
						<TextField variant='filled' fullWidth label='Title' value={title} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
					</Grid>

					<Grid item>
					<TextField variant='outlined' fullWidth multiline label='Additional details' value={details} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDetails(e.target.value)} />
					</Grid>

					<Grid item>
						<Grid container spacing={2} alignItems='center'>
							<Grid item xs={7}>
								<Autocomplete
									disablePortal
									id="list-of-categories"
									options={fakeCategories}
									renderInput={(params) => <TextField {...params} label="Category" />}
									getOptionLabel={(option: CategoryType) => option.category_name}

									value={selectedCategory}
									onChange={(event: any, newValue: CategoryType | null) => {
										setSelectedCategory(newValue)

										// for testing only, -> delete in production
										console.log(selectedCategory);
									}}

									inputValue={categoryInput}
									onInputChange={(event:any, newInputValue:string) => {
										setCategoryInput(newInputValue)
									}}
								/>
							</Grid>

							<Grid item xs={2}>
								<Button variant='contained' startIcon={<Check />}>Add</Button>
							</Grid>

							<Grid item xs={2}>
								<Button variant='outlined' startIcon={<CancelOutlined />} onClick={() => props.onClose()}>Discard</Button>
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