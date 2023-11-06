// import { IconButton, Stack } from "@mui/material"

import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionStore } from "./store/questions"
import SyntaxHighLighter from "react-syntax-highlighter"
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { type Question as QuestionType} from "./types"

const Question = ({info} : {info: QuestionType}) => {
    return (
        <Card variant="outlined" sx={{bgcolor:'#222', p: 2 ,textAlign: 'left'}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighLighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>

            <List sx={{bgcolor: '#333', textAlign:'center'}}>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={answer} sx={{ textAlign: 'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
export const Game = () => {

    const questions = useQuestionStore(state => state.questions)
    const currentQuestion = useQuestionStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]
    return (
        <>
            <Question info={questionInfo}/>
        </>
    )
}