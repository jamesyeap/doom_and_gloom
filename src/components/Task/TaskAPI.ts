// functions to make API calls to backend
import axios from "axios";

import { User, UpdateTaskAPIParams, AddTaskAPIParams } from "../../typings";

export const fetchTasks_API = (user:(User|undefined)) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/alltasks",
		JSON.stringify(user)
		).then(res => { console.log(res); return res.data; });
}

export const fetchTaskByID_API = (id:number) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/gettask",
		{ id: id }
	);
}

export const fetchTaskByCategoryID_API = (category_id:number) => {
	console.log("fetching category_id: %d", category_id);

	return axios.post(
		"http://doom-and-gloom-cvwo2022-api.herokuapp.com/gettaskbycategoryid",
		{ category_id: category_id }
	)
}

export const addTask_API = (newTask:AddTaskAPIParams) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/addtask",
		{ ...newTask, 
			deadline: newTask.deadline ? newTask.deadline : null
		}
		).then(res => res.data);
}

export const markComplete_API = (id:number) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/completetask",
		{ 
			id,
		}
	);
}

export const markIncomplete_API = (id:number) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/incompletetask",
		{ id: id }
	);
}
	// export interface UpdateTaskAPIParams {
	// 	id:number,
	// 	title:string,
	// 	description?:string,
	// 	deadline?:string,
	// 	category_id?:number
	// }
export const updateTask_API = (id:number, title:string, description?:string, deadline?:string, category_id?:number) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/updatetask",
		{
			id,
			title,
			description: description ? description : "",
			deadline: deadline ? deadline : ""
		}
	)
}

export const deleteTask_API = (id:number) => {
	return axios.post(
		"https://doom-and-gloom-cvwo2022-api.herokuapp.com/deletetask",
		{id: id}
	);
}