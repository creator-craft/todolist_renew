import React, { useEffect, useState } from "react";
import { getTodolist, Todo } from "./API";

export default () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const loadTodos = async () => {
			const data = await getTodolist();
			setTodos(data);
		};
		loadTodos();
	}, []);

	const completed = todos.filter((item) => item.completed).length;
	const pending = todos.length - completed;

	return (
		<section className="card">
			<div className="stats-grid">
				<article className="stat">
					<h2>Total</h2>
					<p>{todos.length}</p>
				</article>
				<article className="stat">
					<h2>Completed</h2>
					<p>{completed}</p>
				</article>
				<article className="stat">
					<h2>Pending</h2>
					<p>{pending}</p>
				</article>
			</div>
		</section>
	);
};
