function TaskCard({ title, description, priority, status }) {

 const priorityStyles = {
  Alta: "bg-red-500/20 text-red-400",
  Media: "bg-yellow-500/20 text-yellow-400",
  Baja: "bg-green-500/20 text-green-400",
};

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            {description}
          </p>

        </div>

        <span
        className={`${priorityStyles[priority]} text-xs px-3 py-1 rounded-full`}>
         {priority}
        </span>

      </div>

      <div className="flex items-center justify-between mt-6">

        <span className="text-sm text-slate-500">
          {status}
        </span>

        <button className="text-lime-400 text-sm hover:text-lime-300">
          Completar
        </button>

      </div>

    </div>
  );
}

export default TaskCard;