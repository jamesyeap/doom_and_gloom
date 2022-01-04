export type User = {
	id: number,
	username: string
}

export type Credentials = {
	username: string,
	password: string
}

export type TaskType = {
	id:number,
	title:string,
	description?:string,
	category_id?: number,
	category_name?:string,
	deadline?:string,
	completed:boolean,
	created_at:string,
	updated_at:string
}

export type CategoryType = {
	category_id: number,
	category_name: string
}
export interface UpdateTaskAPIParams {
	id:number,
	title:string,
	description?:(string|undefined|null),
	deadline?:string,
	category_id?:number
}
export interface AddTaskAPIParams {
	title:string,
	description?:(string|null),
	category_id?: (number|null),
	deadline?:string,
	user?: User
}