import { Popover, Grid, Box, TextField, Button, Typography } from "@material-ui/core";
import { Check, CancelOutlined } from "@material-ui/icons";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

import { addCategory_API } from "./TaskAPI";

export default function NewCategory(props:any) {
	const [categoryName, setCategoryName] = useState<string>("");

	let queryClient = useQueryClient();

	const addCategory = useMutation(
		() => addCategory_API(
			queryClient.getQueryData('user'),
			categoryName
		), 
		{
			onSettled: () => queryClient.invalidateQueries('categories')
		}
	)

	const handleCreateNewCategory = () => {
		if (categoryName !== "") {
			addCategory.mutate();

			props.onClose();
		}
	}

	const handleDiscardNewCategory = () => {
		setCategoryName("");
		props.onClose();
	}
	
	return (
		<Popover {...props}>
			<Box sx={{ bgcolor: '#F6FFEE', minWidth: '25vw', padding: 30, borderRadius: 20 }}>
				<Grid container direction='column' spacing={2}>
					<Grid item>
						<Typography variant='h4'>New Category</Typography>
					</Grid>

					<Grid item>
						<TextField variant='filled' fullWidth label='Category Name' value={categoryName} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.target.value)} />
					</Grid>

					<Grid item>
						<Grid container spacing={2}>
							<Grid item>
								<Button onClick={handleCreateNewCategory} variant='contained' startIcon={<Check />}>Add</Button>
							</Grid>

							<Grid item>
								<Button onClick={handleDiscardNewCategory} startIcon={<CancelOutlined />}>Discard</Button>
							</Grid>
						</Grid>
					</Grid>		
				</Grid>
			</Box>
		</Popover>
	)
}