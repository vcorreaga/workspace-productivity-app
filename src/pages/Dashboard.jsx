import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");

        return savedTasks
            ? JSON.parse(savedTasks)
            : [
                  {
                      id: 1,
                      title: "Diseñar interfaz del dashboard",
                      description:
                          "Crear estructura visual organizada para mejorar la experiencia del usuario.",
                      priority: "Alta",
                      status: "Pendiente",
                  },
                  {
                      id: 2,
                      title: "Organizar flujo de tareas",
                      description:
                          "Definir prioridades y estructura visual del sistema de productividad.",
                      priority: "Media",
                      status: "En proceso",
                  },
              ];
    });

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleCompleteTask = (id) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    status: "Completada",
                };
            }

            return task;
        });

        setTasks(updatedTasks);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const completedTasks = tasks.filter(
        (task) => task.status === "Completada"
    ).length;

    const progress = Math.round(
        (completedTasks / tasks.length) * 100
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="max-w-6xl mx-auto">

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                    <h1 className="text-4xl font-bold">
                        Hola, {user?.username} 👋
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Departamento: {user?.department}
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

                    <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-2xl font-semibold text-lime-400">
                                    Enfoque de hoy
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    Organiza tus tareas prioritarias y mantén claridad en tu día.
                                </p>
                            </div>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-lime-400 hover:bg-lime-300 text-slate-950 px-5 py-3 rounded-xl font-semibold transition-all"
                            >
                                + Nueva tarea
                            </button>

                        </div>

                        <div className="mt-8 space-y-4">

                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    priority={task.priority}
                                    status={task.status}
                                    onComplete={handleCompleteTask}
                                />
                            ))}

                        </div>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                        <h2 className="text-2xl font-semibold text-lime-400">
                            Progreso
                        </h2>

                        <div className="mt-6">

                            <div className="flex justify-between text-sm text-slate-400 mb-2">
                                <span>Tareas completadas</span>
                                <span>{progress}%</span>
                            </div>

                            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-lime-400 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>

                            </div>

                        </div>

                        <div className="mt-8 bg-slate-800 rounded-2xl p-5 border border-slate-700">

                            <h3 className="text-lg font-semibold">
                                Prioridad del día
                            </h3>

                            <p className="text-slate-400 mt-3 text-sm">
                                Mantén enfoque en las tareas más importantes antes de comenzar nuevas actividades.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {isModalOpen && (
                <TaskModal
                    onClose={() => setIsModalOpen(false)}
                    onAddTask={handleAddTask}
                />
            )}

        </div>
    );
}

export default Dashboard;