// functions to make API calls to backend
import axios from "axios";

import { UpdateTaskAPIParams } from "../../typings";

export const fetchTasks_API = () => {
	return axios.get(
		"https://tomato-backend-api.herokuapp.com/alltasks"
		);
}

export const fetchTaskByID_API = (id:number) => {
	return axios.post(
		"https://tomato-backend-api.herokuapp.com/gettask",
		{ id: id }
	);
}

export const fetchTaskByCategoryID_API = (category_id:number) => {
	console.log("fetching category_id: %d", category_id);

	return axios.post(
		"http://tomato-backend-api.herokuapp.com/gettaskbycategoryid",
		{ category_id: category_id }
	)
}

export const markComplete_API = (id:number) => {
	return axios.post(
		"https://tomato-backend-api.herokuapp.com/completetask",
		{ id: id }
	);
}

export const markIncomplete_API = (id:number) => {
	return axios.post(
		"https://tomato-backend-api.herokuapp.com/incompletetask",
		{ id: id }
	);
}

export const updateTask_API = (params:UpdateTaskAPIParams) => {
	return axios.post(
		"https://tomato-backend-api.herokuapp.com/updatetask",
		JSON.stringify(params)
		)
}

export const deleteTask_API = (id:number) => {
	return axios.post(
		"https://tomato-backend-api.herokuapp.com/deletetask",
		{id: id}
	);
}