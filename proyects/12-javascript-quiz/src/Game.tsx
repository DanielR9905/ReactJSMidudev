// import { IconButton, Stack } from "@mui/material"

import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuestionsStore } from "./store/questions"
import SyntaxHighLighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { type Question as QuestionType} from "./types"
import { ArrowBackIosNew } from '@mui/icons-material'
import { Footer } from './Footer';

const getBackGroundColor = (info: QuestionType ,index: number ) =>{
    const { userSelectedAnswer, correctAnswer} = info
    if(userSelectedAnswer == null ) return 'transparent'
    //si ya soluciono pero la solucion es incorrecta
    if(index != correctAnswer && index != userSelectedAnswer) return 'transparent'
    //si esta es la solucion correcta
    if(index === correctAnswer) return 'green'
    //si esta es la selccion del usuario peor no es la correcta
    if(index === userSelectedAnswer) return 'red'
    //si no es ninguna de las anteriores
     return 'transparent'
}


const Question = ({info} : {info: QuestionType}) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex : number) => () =>{
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant="outlined" sx={{bgcolor:'#222', p: 2 ,textAlign: 'left', marginTop: 4}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighLighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>

            <List sx={{bgcolor: '#333', textAlign:'center'}}>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                        disabled={info.userSelectedAnswer != null}
                        sx={{backgroundColor:getBackGroundColor(info,index)}}
                        onClick={createHandleClick(index)}
                        >
                            <ListItemText primary={answer} sx={{ textAlign: 'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

    const questionInfo = questions[currentQuestion]
    return (
        <>  
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew/>
                </IconButton>
                {currentQuestion + 1} / { questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion > questions.length - 1}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
            <Footer/>
        </>
    )
}