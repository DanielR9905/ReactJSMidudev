import { create } from 'zustand'
import { Question } from '../types'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: ( questionId: number, answerIndex: number ) => void
}


export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,

        fetchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const json = await res.json()

            const questions = json.sort(()=> Math.random() - 0.5).slice(0, limit)
            set({questions})
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
                const { questions } = get()
                //usar el structuredClone para clonar el objeto
                const newQuestions = structuredClone(questions)
                //Encontramos el indice de la pregunta
                const questionIndex = newQuestions.findIndex(q => q.id === questionId)
                //obtenemos la información de la pregunta
                const questionInfo = newQuestions[questionIndex]
                //Averiguamos si el usuario a seleccionado la respuesta correcta
                const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
                //Cambiar esta informacion en la copia de la pregunta
                newQuestions[questionIndex] = {
                    ...questionInfo,
                    isCorrectUserAnswer,
                    userSelectedAnswer: answerIndex
                }
                //Actualizar el estado
                set({questions : newQuestions})
          },
    }
})