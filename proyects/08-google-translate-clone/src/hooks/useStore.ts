import { useReducer } from "react";
import { Action, FromLanguaje, Languaje, type State } from "../types.d";
import { AUTO_LANGUAJE } from "../constants";
//1. Create a initialState
const initialState: State = {
  fromLanguaje: "auto",
  toLanguaje: "en",
  fromText: "",
  result: "",
  loading: false,
};

//2. Create a reduce
function reducer(state: State, action: Action) {
  //PAyload es lo que estamos enviando de info para actualizar el stado
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAJES") {
    //Logica del estado dentro del reducer
    //Porque lo evitamos en los componentes
    if (state.fromLanguaje === AUTO_LANGUAJE) return state;
    return {
      ...state,
      fromLanguaje: state.toLanguaje,
      toLanguaje: state.fromLanguaje,
    };
  }
  if (type === "SET_FROM_LANGUAJE") {
    return {
      ...state,
      fromLanguaje: action.payload,
    };
  }
  if (type === "SET_TO_LANGUAJE") {
    return {
      ...state,
      toLanguaje: action.payload,
    };
  }
  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    };
  }
  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}
export function useStore() {
  //3. usar el hook useReducer
  const [{ fromLanguaje, toLanguaje, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  //4. Crear funciones que despachen acciones
  const setFromLanguaje = (payload: FromLanguaje) =>
    dispatch({ type: "SET_FROM_LANGUAJE", payload });
  const setToLanguaje = (payload: Languaje) => {
    dispatch({ type: "SET_TO_LANGUAJE", payload });
  };
  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };
  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };
  const interchangeLanguajes = () =>
    dispatch({ type: "INTERCHANGE_LANGUAJES" });

  return {
    fromLanguaje,
    toLanguaje,
    fromText,
    result,
    loading,
    setFromLanguaje,
    setToLanguaje,
    setFromText,
    setResult,
    interchangeLanguajes,
  };
}
