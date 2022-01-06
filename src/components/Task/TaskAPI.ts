// functions to make API calls to backend
import axios from "axios";

import { url } from "../../App";
import { User, AddTaskAPIParams } from "../../typings";

export const fetchTasks_API = (user:(User|undefined), category_id:number, completion_status:number) => {
	return axios.post(
		`${url}/gettasks`,
		{
			user,
			category_id,
			completion_status
		}
	).then(res => { return res.data; });
}

export const fetchTaskByID_API = (id:number) => {
	return axios.post(
		`${url}/gettask`,
		{ id: id }
	).then(res => res.data);
}

export const addTask_API = (newTask:AddTaskAPIParams) => {
	return axios.post(
		`${url}/addtask`,
		{ ...newTask, 
			deadline: newTask.deadline ? newTask.deadline : null
		}
		).then(res => res.data);
}

export const markComplete_API = (id:number) => {
	return axios.post(
		`${url}/completetask`,
		{ 
			id,
		}
	);
}

export const markIncomplete_API = (id:number) => {
	return axios.post(
		`${url}/incompletetask`,
		{ id: id }
	);
}

export const updateTask_API = (id:number, title:string, description?:string, deadline?:string, category_id?:number) => {
	return axios.post(
		`${url}/updatetask`,
		{
			id,
			title,
			description: description ? description : "",
			category_id,
			deadline: deadline ? deadline : ""
		}
	)
}

export const deleteTask_API = (id:number) => {
	return axios.post(
		`${url}/deletetask`,
		{id: id}
	);
}

export const fetchCategories_API = (user:(User|undefined)) => {
	return axios.post(
		`${url}/allcategories`,
		JSON.stringify(user)
		).then(res => { return res.data; });	
}

export const addCategory_API = (user:(User|undefined), category_name: string) => {
	return axios.post(
		`${url}/addcategory`,
		{
			user,
			category_name
		}
	).then(res => { return res.data; });
}