import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { loadRemainingQuestionsAction } from '../../domain/questions/store/actions';
import { loadRemainingResponsesAction } from '../../domain/responses/store/actions';
import { useAppDispatch, useAppSelector } from '../store';
import FullScreenLoader from './FullScreenLoader';

const InitContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const remianingResponse = useAppSelector((s) => s.responses.remainingResponses);
    const remainingQuestions = useAppSelector((s) => s.questions.remainingQuestions);

    useEffect(() => {
        dispatch(loadRemainingResponsesAction.started());
        dispatch(loadRemainingQuestionsAction.started());
    }, [dispatch]);

    return (
        <View style={{}}>
            <ScrollView>
                {/* <FullScreenLoader /> */}
                <Text>{JSON.stringify(remianingResponse, undefined, 4)}</Text>
                <Text>{JSON.stringify(remainingQuestions, undefined, 4)}</Text>
            </ScrollView>
        </View>
    );
};

export default InitContainer;
