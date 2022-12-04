import React, { useEffect } from 'react';
import AskQuestionContainer from '../../domain/questions/components/AskQuestionContainer';
import { loadRemainingQuestionsAction } from '../../domain/questions/store/actions';
import { loadRemainingResponsesAction } from '../../domain/responses/store/actions';
import { useAppDispatch, useAppSelector } from '../store';
import FatalErrorScreen from './FatalErrorScreen';
import FullScreenLoader from './FullScreenLoader';

const InitContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const remainingResponse = useAppSelector((s) => s.responses.remainingResponses);
    const remainingQuestions = useAppSelector((s) => s.questions.remainingQuestions);

    useEffect(() => {
        dispatch(loadRemainingResponsesAction.started());
        dispatch(loadRemainingQuestionsAction.started());
    }, [dispatch]);

    if (
        remainingQuestions.status === 'FINISHED' &&
        remainingResponse.status === 'FINISHED' &&
        remainingQuestions.data.length > 0
    ) {
        return <AskQuestionContainer questions={remainingQuestions.data} />;
    } else if (remainingQuestions.status === 'FAILED') {
        return <FatalErrorScreen error={remainingQuestions.error} />;
    } else if (remainingResponse.status === 'FAILED') {
        return <FatalErrorScreen error={remainingResponse.error} />;
    } else {
        return <FullScreenLoader />;
    }
};

export default InitContainer;
