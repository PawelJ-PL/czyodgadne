import { Button } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../../../common/store';
import { answerQuestionAction } from '../store/actions';
import { Question } from '../types/question';

type Props = {
    question: Question;
};

const AskQuestionView: React.FC<Props> = ({ question }) => {
    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Button
                title="Tak"
                containerStyle={styles.answerButtonContainer}
                color="success"
                radius="md"
                onPress={() => dispatch(answerQuestionAction({ questionId: question.id, answer: 'yes' }))}
            />
            <Button
                title="Nie"
                containerStyle={styles.answerButtonContainer}
                color="error"
                radius="md"
                onPress={() => dispatch(answerQuestionAction({ questionId: question.id, answer: 'no' }))}
            />
            <Button title="Nie wiem" containerStyle={styles.answerButtonContainer} color="grey2" radius="md" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 25,
    },
    answerButtonContainer: {
        minWidth: 250,
        marginTop: 30,
    },
});

export default AskQuestionView;
