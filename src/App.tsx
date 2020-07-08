import React, { useState, useRef } from "react";

// Guardamos el tipo de dato que se espera del formulario
type FormElement = React.FormEvent<HTMLFormElement>;

// Interfaz
interface ITask {
	// Tipo de dato con el que se guardaran las tareas
	name: string;
	done: boolean;
}

function App(): JSX.Element {
	// Declaramos los estados que estaremos usando
	const [newTask, setNewTask] = useState<string>(""); // estado para la nueva tarea
	const [tasks, setTasks] = useState<ITask[]>([]); // Estado para todas las tareas

	// Guardamos la referencia del input
	const taskInput = useRef<HTMLInputElement>(null);

	// Manejador de evento para guardar las tareas
	const handleSubmit = (e: FormElement) => {
		e.preventDefault();
		addTask(newTask);
		setNewTask("");
		taskInput.current?.focus();
	};

	// Guardar tareas
	const addTask = (name: string): void => {
		const newTasks: ITask[] = [...tasks, { name, done: false }];
		setTasks(newTasks);
	};

	// Cambiar el estado de la tarea
	const toogleDomTask = (index: number): void => {
		// Creamos una copia de las tareas actuales
		const newTasks: ITask[] = [...tasks];

		// Cambia de true a false y viceversa con cada llamada a la funcion
		newTasks[index].done = !newTasks[index].done;

		setTasks(newTasks);
	};

	// Eliminar una tarea
	const deleteTask = (index: number): void => {
		// Clonamos el arreglo
		const newTasks: ITask[] = [...tasks];
		// Buscamos el indice y borramos 1 espacio
		newTasks.splice(index, 1);
		// Actualizamos las tareas
		setTasks(newTasks);
	};

	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-body">
							<form
								onSubmit={(e) => {
									handleSubmit(e);
								}}
							>
								<input
									type="text"
									onChange={(e) => setNewTask(e.target.value)} // Guardar el valor de las tareas
									value={newTask}
									className="form-control"
									autoFocus
									ref={taskInput}
								/>
								<button className="btn btn-success btn-block mt-2">
									Save Task
								</button>
							</form>

							{tasks.map((task: ITask, i: number) => (
								<div className="card card-body mt-2" key={i}>
									<h2
										style={{
											textDecoration: task.done
												? "line-through"
												: "",
											color: task.done
												? "#9e9e9e"
												: "black",
										}}
									>
										{task.name}
									</h2>
									<div>
										<button
											className="btn btn-secondary"
											onClick={() => toogleDomTask(i)}
										>
											{task.done ? "✓" : "X"}
										</button>
										<button
											className="btn btn-danger"
											onClick={() => deleteTask(i)}
										>
											⌫
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
