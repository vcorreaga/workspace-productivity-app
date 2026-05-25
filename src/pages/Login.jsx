import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");

  const handleLogin = (e) => {
  e.preventDefault();

  if (!username || !department) {
    alert("Debes completar todos los campos");
    return;
  }

  const userData = {
    username,
    department,
  };

  localStorage.setItem("user", JSON.stringify(userData));

  navigate("/tablero");
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800">
        
        <h1 className="text-3xl font-bold text-white text-center">
          Workspace
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Organiza tu día con claridad y enfoque
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-slate-300 mb-2">
              Nombre de usuario
            </label>

            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-lime-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Departamento
            </label>

            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-lime-400"
            >
              <option>Selecciona un departamento</option>
              <option>Desarrollo</option>
              <option>Diseño</option>
              <option>Marketing</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-semibold py-3 rounded-xl transition-all"
          >
            Ingresar
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;