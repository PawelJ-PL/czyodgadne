import { Question } from './../types/question';

export const allQuestions = (): Question[] => [
    {
        id: 1,
        question: 'Czy to ssak?',
        answers: { yes: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 15] },
        excludes: [2, 3, 4, 5],
    },
    { id: 2, question: 'Czy to gad?', answers: { yes: [9] }, excludes: [1, 3, 4, 5] },
    { id: 3, question: 'Czy to płaz?', answers: { yes: [10] }, excludes: [1, 2, 4, 5] },
    { id: 4, question: 'Czy to ryba?', answers: { yes: [] }, excludes: [1, 2, 3, 5] },
    { id: 5, question: 'Czy to owad?', answers: { yes: [14] }, excludes: [1, 2, 3, 4] },
    {
        id: 6,
        question: 'Czy jest na tyle małe, że można je trzymać w rękach?',
        answers: { yes: [8, 9, 10, 14] },
    },
    { id: 7, question: 'Czy jest roślinożerne?', answers: { yes: [2, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15] } },
    { id: 8, question: 'Czy jest mięsożerne?', answers: { yes: [1, 3, 4, 10, 14] } },
    { id: 9, question: 'Czy naturalnie mieszka w Polsce?', answers: { yes: [2, 3, 4, 8, 9, 10, 11, 12, 14] } },
    { id: 10, question: 'Czy to zwierzę domowe?', answers: { yes: [3, 4, 8, 9] } },
    { id: 11, question: 'Czy lata?', answers: { yes: [14] } },
    { id: 12, question: 'Czy chodzi na dwóch nogach/łapach?', answers: { yes: [6] } },
    { id: 13, question: 'Czy mieszka w wodzie?', answers: { yes: [9, 10] } },
    { id: 14, question: 'Czy wspina się na drzewa?', answers: { yes: [4, 6, 13] } },
    { id: 15, question: 'Czy jest niebezpieczne dla ludzi?', answers: { yes: [1, 15] } },
];
