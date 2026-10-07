import React from "react";
import { Todo } from "./API";

interface TodoItemProps {
	todo: Todo;
	onToggle: (todo: Todo) => void;
	onRemove: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	onToggle,
	onRemove,
}) => {
	return (
		<li className={`todo-item ${todo.completed ? "done" : ""}`}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() => onToggle(todo)}
			/>
			<div>
				<p className="title">{todo.title}</p>
				<p className="meta">{todo.created_at}</p>
			</div>
			<button type="button" className="delete" onClick={() => onRemove(todo)}>
				Delete
			</button>
		</li>
	);
};
