import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filter, setFilter] = useState("Todas");

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
                    dueDate: "2026-05-30",
                    status: "Pendiente",
                },
                {
                    id: 2,
                    title: "Organizar flujo de tareas",
                    description:
                        "Definir prioridades y estructura visual del sistema de productividad.",
                    priority: "Media",
                    dueDate: "2026-05-28",
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

    const handleDeleteTask = (id) => {

        const updatedTasks = tasks.filter(
            (task) => task.id !== id
        );

        setTasks(updatedTasks);

    };

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };

    useEffect(() => {

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }, [tasks]);

    const completedTasks = tasks.filter(
        (task) => task.status === "Completada"
    ).length;

    const progress = tasks.length
        ? Math.round(
            (completedTasks / tasks.length) * 100
        )
        : 0;

    const pendingTasks = tasks.filter(
        (task) => task.status !== "Completada"
    ).length;

    const highPriorityTasks = tasks.filter(
        (task) => task.priority === "Alta"
    ).length;

    const overdueTasks = tasks.filter((task) => {

        const today = new Date();
        const taskDate = new Date(task.dueDate);

        return (
            taskDate < today &&
            task.status !== "Completada"
        );

    }).length;

    const filteredTasks = tasks.filter((task) => {

        if (filter === "Pendientes") {
            return task.status !== "Completada";
        }

        if (filter === "Completadas") {
            return task.status === "Completada";
        }

        if (filter === "Alta") {
            return task.priority === "Alta";
        }

        if (filter === "Atrasadas") {

            const today = new Date();
            const taskDate = new Date(task.dueDate);

            return (
                taskDate < today &&
                task.status !== "Completada"
            );

        }

        return true;

    });

    return (

        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="max-w-7xl mx-auto">

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-5xl font-bold">
                            Hola, {user?.username} 👋
                        </h1>

                        <p className="text-slate-400 mt-3">
                            Departamento: {user?.department}
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-400 px-6 py-4 rounded-2xl font-semibold transition-all"
                    >
                        Cerrar sesión
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">

                    <button
                        onClick={() => setFilter("Todas")}
                        className={`border rounded-2xl p-5 text-left transition-all ${
                            filter === "Todas"
                                ? "bg-lime-400 text-slate-950 border-lime-400"
                                : "bg-slate-900 border-slate-800"
                        }`}
                    >

                        <p className={`text-sm ${
                            filter === "Todas"
                                ? "text-slate-900"
                                : "text-slate-400"
                        }`}>
                            Total tareas
                        </p>

                        <h3 className="text-3xl font-bold mt-2">
                            {tasks.length}
                        </h3>

                    </button>

                    <button
                        onClick={() => setFilter("Pendientes")}
                        className={`border rounded-2xl p-5 text-left transition-all ${
                            filter === "Pendientes"
                                ? "bg-yellow-400 text-slate-950 border-yellow-400"
                                : "bg-slate-900 border-slate-800"
                        }`}
                    >

                        <p className={`text-sm ${
                            filter === "Pendientes"
                                ? "text-slate-900"
                                : "text-slate-400"
                        }`}>
                            Pendientes
                        </p>

                        <h3 className="text-3xl font-bold mt-2 text-yellow-400">
                            {pendingTasks}
                        </h3>

                    </button>

                    <button
                        onClick={() => setFilter("Alta")}
                        className={`border rounded-2xl p-5 text-left transition-all ${
                            filter === "Alta"
                                ? "bg-red-400 text-slate-950 border-red-400"
                                : "bg-slate-900 border-slate-800"
                        }`}
                    >

                        <p className={`text-sm ${
                            filter === "Alta"
                                ? "text-slate-900"
                                : "text-slate-400"
                        }`}>
                            Prioridad alta
                        </p>

                        <h3 className="text-3xl font-bold mt-2 text-red-400">
                            {highPriorityTasks}
                        </h3>

                    </button>

                    <button
                        onClick={() => setFilter("Atrasadas")}
                        className={`border rounded-2xl p-5 text-left transition-all ${
                            filter === "Atrasadas"
                                ? "bg-orange-400 text-slate-950 border-orange-400"
                                : "bg-slate-900 border-slate-800"
                        }`}
                    >

                        <p className={`text-sm ${
                            filter === "Atrasadas"
                                ? "text-slate-900"
                                : "text-slate-400"
                        }`}>
                            Atrasadas
                        </p>

                        <h3 className="text-3xl font-bold mt-2 text-orange-400">
                            {overdueTasks}
                        </h3>

                    </button>

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

                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={() => setFilter("Todas")}
                                className={`px-4 py-2 rounded-xl text-sm ${
                                    filter === "Todas"
                                        ? "bg-lime-400 text-slate-950"
                                        : "bg-slate-800 text-white"
                                }`}
                            >
                                Todas
                            </button>

                            <button
                                onClick={() => setFilter("Pendientes")}
                                className={`px-4 py-2 rounded-xl text-sm ${
                                    filter === "Pendientes"
                                        ? "bg-lime-400 text-slate-950"
                                        : "bg-slate-800 text-white"
                                }`}
                            >
                                Pendientes
                            </button>

                            <button
                                onClick={() => setFilter("Completadas")}
                                className={`px-4 py-2 rounded-xl text-sm ${
                                    filter === "Completadas"
                                        ? "bg-lime-400 text-slate-950"
                                        : "bg-slate-800 text-white"
                                }`}
                            >
                                Completadas
                            </button>

                        </div>

                        <div className="mt-8 space-y-4">

                            {filteredTasks.map((task) => (

                                <TaskCard
                                    key={task.id}
                                    id={task.id}
                                    title={task.title}
                                    description={task.description}
                                    priority={task.priority}
                                    dueDate={task.dueDate}
                                    status={task.status}
                                    onComplete={handleCompleteTask}
                                    onDelete={handleDeleteTask}
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

                                <span>
                                    Tareas completadas
                                </span>

                                <span>
                                    {progress}%
                                </span>

                            </div>

                            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

                                <div
                                    className="h-full bg-lime-400 transition-all duration-500"
                                    style={{
                                        width: `${progress}%`,
                                    }}
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
                    onClose={() =>
                        setIsModalOpen(false)
                    }
                    onAddTask={handleAddTask}
                />

            )}

        </div>

    );
}

export default Dashboard;