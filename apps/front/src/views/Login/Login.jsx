import React, { useState } from "react";
import logo from "../../assets/logo/elChozo.png";
import background from "../../assets/logo/background2.jpg";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usu_nombre: username,
          usu_password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Nombre de usuario o contraseña incorrectos");
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      onLogin(token);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center pt-3 w-screen justify-start bg-gray-200"
      style={backgroundStyle}
    >
      <div className="max-w-md mx-auto my-10 p-6 rounded-md shadow-md bg-blue-400">
        <img src={logo} alt="" className="mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-4 text-center">Ingresar</h2>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de Usuario:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
