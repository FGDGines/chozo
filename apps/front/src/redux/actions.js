import axios from 'axios';
export const GET_ARTICLES = "GET_ARTICLES";

export const getArticles = (rutaPpal) => {
    return async (dispatch) => {
        try {
          const response = await axios.get(`${rutaPpal}api/articulos`);
          const data = response.data;
          console.log("articulos", data);
          return dispatch({
            type: GET_ARTICLES,
            payload: data,
          });
        } catch (error) {
          console.log(error);
        }
      };
};