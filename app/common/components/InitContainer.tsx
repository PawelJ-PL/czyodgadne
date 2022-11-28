import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { loadRemainingResponsesAction } from '../../domain/responses/store/actions';
import { useAppDispatch, useAppSelector } from './store';

const InitContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const remianingResponse = useAppSelector((s) => s.responses.remainingResponses);

    useEffect(() => {
        dispatch(loadRemainingResponsesAction.started());
    }, [dispatch]);

    return (
        <View>
            <Text>{JSON.stringify(remianingResponse, undefined, 4)}</Text>
        </View>
    );
};

export default InitContainer;
