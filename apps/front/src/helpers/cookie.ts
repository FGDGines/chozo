import Cookies from 'js-cookie';

const cookieHelper = {
  // Guardar un valor en la cookie
  guardarValorEnCookie: (nombreCookie, valor) => {
    Cookies.set(nombreCookie, valor, { expires: 7 }); // Puedes ajustar el tiempo de expiración según tus necesidades
  },

  // Borrar un valor de la cookie
  borrarValorDeCookie: (nombreCookie) => {
    Cookies.remove(nombreCookie);
  },
};

export default cookieHelper;
