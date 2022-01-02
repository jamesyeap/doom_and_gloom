/* checks if user has been logged in */

import { Navigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

export function RequireAuth({ children }: { children: JSX.Element }) {
	let queryClient = useQueryClient();

	console.log(queryClient.getQueryData('user'));

	if (queryClient.getQueryData('user') === undefined) {
		return <Navigate to="/" />;
	}

	return children;
}