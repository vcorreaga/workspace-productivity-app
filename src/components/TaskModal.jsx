import { useState } from "react";

function TaskModal({ onClose, onAddTask }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Media");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert("Debes completar todos los campos");
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            dueDate,
            status: "Pendiente",
        };

        onAddTask(newTask);

        setTitle("");
        setDescription("");
        setPriority("Media");
        setDueDate("");

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">

            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">
                        Nueva tarea
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-xl"
                    >
                        ✕
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >

                    <div>

                        <label className="block text-slate-300 mb-2">
                            Título
                        </label>

                        <input
                            type="text"
                            placeholder="Escribe el título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-lime-400"
                        />

                    </div>

                    <div>

                        <label className="block text-slate-300 mb-2">
                            Descripción
                        </label>

                        <textarea
                            rows="4"
                            placeholder="Describe la tarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-lime-400 resize-none"
                        ></textarea>

                    </div>

                    <div>

                        <label className="block text-slate-300 mb-2">
                            Prioridad
                        </label>

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-lime-400"
                        >
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                        </select>

                    </div>

                    <div>

                        <label className="block text-slate-300 mb-2">
                            Fecha de vencimiento
                        </label>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-lime-400"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-semibold py-3 rounded-xl transition-all"
                    >
                        Crear tarea
                    </button>

                </form>

            </div>

        </div>
    );
}

export default TaskModal;