import React from 'react';
import FullScreenLoader from '../../../common/components/FullScreenLoader';
import { useAppSelector } from '../../../common/store';
import { Question } from '../types/question';
import AskQuestionView from './AskQuestionView';

type Props = {
    questions: Question[];
};

const AskQuestionContainer: React.FC<Props> = ({ questions }) => {
    const saveQuestionsResult = useAppSelector((s) => s.questions.saveQuestionsResult);
    const saveResponsesResult = useAppSelector((s) => s.responses.saveResponsesResult);

    if (questions.length < 1 || [saveQuestionsResult.status, saveResponsesResult.status].includes('PENDING')) {
        return <FullScreenLoader />;
    } else {
        return <AskQuestionView question={questions[0]} />;
    }
};

export default AskQuestionContainer;
