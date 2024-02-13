import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Grupos() {
    const token = localStorage.getItem("token");
    const [grupos, setGrupos] = useState([]);
    const [sublineas, setSublineas] = useState([]);
    const [objeto, setObjeto] = useState({ngrupo: "", idSublinea: 0});

    const handleChange = (e) => {
       const property = e.target.name;
       const value = e.target.value;
       console.log(property,value)
       setObjeto({...objeto, [property]: value });
    };

    const handleGrabar = async(e) => {
        e.preventDefault();
        const datos = {gru_detalles: objeto.ngrupo, sublinea_id: objeto.idSublinea};
        const result = await axios.post('api/grupos', datos, {
           headers: {
              token: token,
           },
        });
        toast.success("¡Grupo creado!");
        cargarGrupos();
    };

    const cargarSublineas = async() => {
        const result = await axios('api/sublineas', {
           headers: {
             token: token,
           },
        });
        setSublineas(result.data);
     };

    const cargarGrupos = async() => {
       const result = await axios('api/grupos', {
          headers: {
            token: token,
          },
       });
       setGrupos(result.data);
       setObjeto({ngrupo: "", idSublinea: 0});
    };

    useEffect(() => {
       cargarGrupos(); 
       cargarSublineas();
    }, []);

    return (
       <div className="mx-auto mt-10 max-w-[80%]">
           <h2 className="text-2xl bg-customBlue p-2 rounded-md text-white">Maestros de Grupos</h2>
           <table className="w-1/2 text-sm text-left text-gray-700 dark:text-gray-700">
              <thead>
                 <tr><th>Id</th><th>Detalles</th></tr>
              </thead>
              <tbody>
              {grupos.map(ele =>
                  <tr key={ele.id}>
                     <td>{ele.id}</td>
                     <td>{ele.gru_detalles}</td>
                  </tr>
               )}
               </tbody>
           </table>
           <h1 className="bg-gray-800 text-white">Nuevo Grupo</h1>
           <form>
               <hr/><br/>
               <input type="text" 
                      name="ngrupo"
                      onChange={handleChange}
                      placeholder="Digite nombre Grupo"
                      value={objeto.ngrupo}/>
               <br/>
               <label className="bg-black text-white">Sublinea </label>
               <select name="idSublinea" onChange={(e)=>handleChange(e)}>
                   <option value="0">Seleccione Grupo</option>
                   {sublineas.map(elemen => 
                      <option value={elemen.id}>{elemen.sub_detalles}</option>
                   )}
               </select><br/>       
               <button className="bg-blue-800 text-white text-center p-2 rounded-md" onClick={handleGrabar}>Agregar Grupo</button>
           </form>
           <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="colored"
          />
       </div>
    )

};

export default Grupos;