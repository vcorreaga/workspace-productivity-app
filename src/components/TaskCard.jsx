function TaskCard({
  id,
  title,
  description,
  priority,
  status,
  onComplete,
}) {

  const priorityStyles = {
    Alta: "bg-red-500/20 text-red-400",
    Media: "bg-yellow-500/20 text-yellow-400",
    Baja: "bg-green-500/20 text-green-400",
  };

  return (
    <div
      className={`border rounded-2xl p-5 transition-all ${
        status === "Completada"
          ? "bg-lime-500/10 border-lime-500"
          : "bg-slate-800 border-slate-700"
      }`}
    >

      <div className="flex items-start justify-between">

        <div>

          <h3
            className={`text-lg font-semibold ${
              status === "Completada"
                ? "line-through text-slate-500"
                : "text-white"
            }`}
          >
            {title}
          </h3>

          <p
            className={`text-sm mt-2 ${
              status === "Completada"
                ? "text-slate-500"
                : "text-slate-400"
            }`}
          >
            {description}
          </p>

        </div>

        <span
          className={`${priorityStyles[priority]} text-xs px-3 py-1 rounded-full`}
        >
          {priority}
        </span>

      </div>

      <div className="flex items-center justify-between mt-6">

        <span className="text-sm text-slate-500">
          {status}
        </span>

        <button
          onClick={() => onComplete(id)}
          disabled={status === "Completada"}
          className={`text-sm ${
            status === "Completada"
              ? "text-slate-500 cursor-not-allowed"
              : "text-lime-400 hover:text-lime-300"
          }`}
        >
          {status === "Completada"
            ? "Completada"
            : "Completar"}
        </button>

      </div>

    </div>
  );
}

export default TaskCard;