import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../services/taskService";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [tasks, setTasks] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [editingTask, setEditingTask] = useState(null);

    const [filter, setFilter] = useState("Todas");

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const data = await getTasks();

            setTasks(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleAddTask = async (newTask) => {

        try {

            if (editingTask) {

                await updateTask(
                    editingTask.id,
                    newTask
                );

                setEditingTask(null);

            } else {

                await createTask(newTask);

            }

            loadTasks();

        } catch (error) {

            console.error(error);

        }

    };

    const handleCompleteTask = async (id) => {

        try {

            const taskToUpdate = tasks.find(
                (task) => task.id === id
            );

            const updatedTask = {
                ...taskToUpdate,
                status: "Completada",
            };

            await updateTask(
                id,
                updatedTask
            );

            loadTasks();

        } catch (error) {

            console.error(error);

        }

    };

    const handleDeleteTask = async (id) => {

        try {

            await deleteTask(id);

            loadTasks();

        } catch (error) {

            console.error(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };

    const completedTasks = tasks.filter(
        (task) => task.status === "Completada"
    ).length;

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

    const progress = tasks.length
        ? Math.round(
            (completedTasks / tasks.length) * 100
        )
        : 0;

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

    const getMotivationalMessage = () => {

        if (overdueTasks > 0) {

            return "Tienes tareas atrasadas. ¿Qué necesitas para retomarlas y avanzar nuevamente?";

        }

        if (completedTasks >= 1 && pendingTasks >= 1) {

            return "Excelente trabajo. Ya lograste avanzar en algunas tareas, continuemos con las siguientes.";

        }

        if (completedTasks >= 3) {

            return "Gran avance hoy. Mantener constancia también hace parte del progreso.";

        }

        if (tasks.length === 0) {

            return "No tienes tareas pendientes. Buen momento para planificar nuevas metas o actividades importantes.";

        }

        if (pendingTasks >= 5) {

            return "Hay varias tareas pendientes. Prioriza una antes de comenzar nuevas actividades.";

        }

        if (highPriorityTasks >= 3) {

            return "Tienes varias tareas de prioridad alta. Organiza tu enfoque paso a paso.";

        }

        if (progress === 100 && tasks.length > 0) {

            return "Completaste todas tus tareas. Excelente trabajo y compromiso.";

        }

        return "Mantén enfoque en las tareas más importantes del día.";

    };

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
                                onClick={() => {
                                    setEditingTask(null);
                                    setIsModalOpen(true);
                                }}
                                className="bg-lime-400 hover:bg-lime-300 text-slate-950 px-5 py-3 rounded-xl font-semibold transition-all"
                            >
                                + Nueva tarea
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
                                    onEdit={(task) => {
                                        setEditingTask(task);
                                        setIsModalOpen(true);
                                    }}
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
                                Estado del día
                            </h3>

                            <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                                {getMotivationalMessage()}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {isModalOpen && (

                <TaskModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingTask(null);
                    }}
                    onAddTask={handleAddTask}
                    editingTask={editingTask}
                />

            )}

        </div>

    );
}

export default Dashboard;