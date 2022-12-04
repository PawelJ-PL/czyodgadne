import React from 'react';
import FullScreenLoader from '../../../common/components/FullScreenLoader';
import { Question } from '../types/question';
import AskQuestionView from './AskQuestionView';

type Props = {
    questions: Question[];
};

const AskQuestionContainer: React.FC<Props> = ({ questions }) => {
    if (questions.length < 1) {
        return <FullScreenLoader />;
    } else {
        return <AskQuestionView question={questions[0]} />;
    }
};

export default AskQuestionContainer;
