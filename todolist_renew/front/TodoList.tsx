import React, { useEffect, useState, useMemo } from "react";
import {
	getTodolist,
	addTodo as createTodoApi,
	removeTodo as removeTodoApi,
	modifyTodo as modifyTodoApi,
	Todo,
} from "./API";
import { TodoItem } from "./TodoItem";

type Filter = "all" | "done" | "pending";

export default () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTitle, setNewTitle] = useState<string>("");
	const [filter, setFilter] = useState<Filter>("all");

	const loadTodos = async (): Promise<void> => {
		const data = await getTodolist();
		setTodos(data);
	};

	useEffect(() => {
		loadTodos();
	}, []);

	const visibleTodos = useMemo(() => {
		return (
			filter === "done"
				? todos.filter((todo) => todo.completed)
				: filter === "pending"
					? todos.filter((todo) => !todo.completed)
					: todos
		).sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		);
	}, [todos, filter]);

	const handleAddTodo = async (): Promise<void> => {
		if (newTitle.trim().length !== 0) {
			const created = await createTodoApi(newTitle);
			setTodos((prev) => [...prev, created]);
			setNewTitle("");
		}
	};

	const handleToggleTodo = async (todo: Todo): Promise<void> => {
		const updated = await modifyTodoApi(todo.id, null, !todo.completed);
		setTodos((prev) =>
			prev.map((item) => (item.id === todo.id ? updated : item)),
		);
	};

	const handleRemoveTodo = async (todo: Todo): Promise<void> => {
		if (await removeTodoApi(todo.id))
			setTodos((prev) => prev.filter((item) => item.id !== todo.id));
	};

	return (
		<section className="card">
			<div className="controls">
				<input
					type="text"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
					placeholder="Add a task..."
					onKeyUp={(e) => {
						if (e.key === "Enter") handleAddTodo();
					}}
				/>
				<button type="button" onClick={handleAddTodo}>
					Add
				</button>
			</div>

			<div className="controls">
				<select
					value={filter}
					onChange={(e) => setFilter(e.target.value as Filter)}
				>
					<option value="all">All</option>
					<option value="done">Done</option>
					<option value="pending">Pending</option>
				</select>
				<button type="button" onClick={loadTodos}>
					Refresh
				</button>
			</div>

			{visibleTodos.length === 0 ? (
				<p className="empty">
					{filter === "all"
						? "No tasks yet"
						: filter === "done"
							? "No complete tasks yet"
							: "No pending tasks yet"}
				</p>
			) : (
				<ul className="todo-list">
					{visibleTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							onToggle={handleToggleTodo}
							onRemove={handleRemoveTodo}
						/>
					))}
				</ul>
			)}
		</section>
	);
};
