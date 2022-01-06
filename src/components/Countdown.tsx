import { Grid, Box, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';

type TimeLeft = {
	days?: number,
	hours?: number,
	minutes?: number,
	seconds?: number
}

const calculateTimeLeft = ():TimeLeft => {
	const difference = +new Date(`10/01/2022`) - +new Date();

	let timeLeft = {};

	if (difference > 0) {
	  timeLeft = {
		days: Math.floor(difference / (1000 * 60 * 60 * 24)),
		hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((difference / 1000 / 60) % 60),
		seconds: Math.floor((difference / 1000) % 60)
	  };
	}

	return timeLeft;
};

export default function Countdown() {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	})

	return (
		<Box sx={{ bgcolor: 'black', padding: 25, borderRadius: 20 }}>
			<Grid container direction='column' justifyContent='center' alignItems='center'>
				<Grid item>
					<Typography variant='h3'>The Dooms Clock</Typography>
				</Grid>

				{Object.keys(timeLeft).length === 0
				? (
					<Grid item>
						<Grid container direction='column' justifyContent='center' alignItems='center'>
							<Grid item>
								<Typography variant='h2'>RING DING DING!</Typography>
							</Grid>

							<Grid item>
								<Typography variant='subtitle1'>*yo time is up*</Typography>
							</Grid>
						</Grid>
					</Grid>
				)
				: (					
					<Grid item>
						<Grid container direction='column' justifyContent='center' alignItems='center'>
							<Grid item>
								<Typography variant='h2'>{timeLeft.days} days</Typography>
							</Grid>

							<Grid item>
								<Grid container spacing={1}>
									<Grid item>
										<Typography variant='h4'>{timeLeft.hours} hours</Typography>
									</Grid>

									<Grid item>
										<Typography variant='h4'>{timeLeft.minutes} minutes</Typography>
									</Grid>

									<Grid item>
										<Typography variant='h4'>{timeLeft.seconds} seconds</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Grid item>
								<Typography variant='subtitle1'>*till the coming of the antichrist. or comets. or whatever.*</Typography>
							</Grid>
						</Grid>
					</Grid>
				)
				}		
			</Grid>
		</Box>
	)
}