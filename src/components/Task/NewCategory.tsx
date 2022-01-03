import { Popover, Grid, Box, TextField, Button, Typography } from "@material-ui/core";
import { Check, CancelOutlined } from "@material-ui/icons";
import { useState } from "react";

export default function NewCategory(props:any) {
	const [categoryName, setCategoryName] = useState<string | null>(null);

	const handleCreateNewCategory = () => {
		// TODO
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
								<Button variant='contained' startIcon={<Check />}>Add</Button>
							</Grid>

							<Grid item>
								<Button startIcon={<CancelOutlined />} onClick={() => props.onClose()}>Discard</Button>
							</Grid>
						</Grid>
					</Grid>		
				</Grid>
			</Box>
		</Popover>
	)
}