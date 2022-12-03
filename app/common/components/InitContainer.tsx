import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { loadRemainingQuestionsAction } from '../../domain/questions/store/actions';
import { loadRemainingResponsesAction } from '../../domain/responses/store/actions';
import { useAppDispatch, useAppSelector } from '../store';
import FatalErrorScreen from './FatalErrorScreen';
import FullScreenLoader from './FullScreenLoader';

const InitContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const remianingResponse = useAppSelector((s) => s.responses.remainingResponses);
    const remainingQuestions = useAppSelector((s) => s.questions.remainingQuestions);

    useEffect(() => {
        dispatch(loadRemainingResponsesAction.started());
        dispatch(loadRemainingQuestionsAction.started());
    }, [dispatch]);

    if (remainingQuestions.status === 'FINISHED' && remianingResponse.status === 'FINISHED') {
        return (
            <View>
                <Text>{JSON.stringify(remianingResponse)}</Text>
            </View>
        );
    } else if (remainingQuestions.status === 'FAILED') {
        return <FatalErrorScreen error={remainingQuestions.error} />;
    } else if (remianingResponse.status === 'FAILED') {
        return <FatalErrorScreen error={remianingResponse.error} />;
    } else {
        return <FullScreenLoader />;
    }
};

export default InitContainer;
