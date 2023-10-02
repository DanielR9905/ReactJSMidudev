import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css";
import { useReducer } from 'react';

//1. Create a initialState
const initialState = {
  fromLanguaje: 'auto',
  toLanguaje: 'en',
  fromTexto: '',
  loading: false
}

//2. Create a reduce
function reducer(state, action) {
  //PAyload es lo que estamos enviando de info para actualizar el stado
    const { type, payload } = action

    if(type === 'INTERCHANGE_LANGUAJES'){
      return {
        ...state,
        fromLanguaje: state.toLanguaje,
        toLanguaje: state.fromLanguaje
      }
    }
    if (type === 'SET_FROM_LANGUAJE') {
      return {
        ...state,
        fromLanguaje: payload
      }
    }
    if (type === 'SET_TO_LANGUAJE') {
      return {
        ...state,
        toLanguaje: payload
      }
    }
    if(type === 'SET_FROM_TEXT'){
      return {
        ...state,
        loading: true,
        fromText: payload,
        result: ''
      }
    }
    if(type === 'SET_RESULT'){
      return {
        ...state,
        loading: false,
        result: payload
      }
    }

    return state
}

function App() {
  //3. usar el hook useReducer
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div className="app">
      <h1>Google Translate</h1>
    </div>
  );
}

export default App;
