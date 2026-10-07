export interface Todo {
	id: number;
	title: string;
	created_at: string;
	completed: boolean;
}

export const getTodolist = async (): Promise<Todo[]> =>
	await (await fetch("/api/todos")).json();

export const getTodo = async (id: number): Promise<Todo> =>
	await (await fetch("/api/todos/" + id)).json();

export const addTodo = async (title: string): Promise<Todo> =>
	await (
		await fetch("/api/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title }),
		})
	).json();

export const removeTodo = async (id: number): Promise<boolean> => {
	try {
		const res = await fetch("/api/todos/" + id, { method: "DELETE" });
		return res.ok;
	} catch {
		return false;
	}
};

export const modifyTodo = async (
	id: number,
	title: string | null,
	completed: boolean | null,
): Promise<Todo> =>
	await (
		await fetch("/api/todos/" + id, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, completed }),
		})
	).json();
