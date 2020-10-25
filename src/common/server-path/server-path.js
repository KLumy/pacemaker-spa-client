export const app = {
  base: '',
};

const gqqa = {
  base: 'http://117.16.136.170/',
  qg: '/restful/qg/',
  qa: '/restful/qa/',
  generateQuestion: () => gqqa.base + gqqa.qg,
  answerQuestion: () => gqqa.base + gqqa.qa,
};

export const GQQA = {
  generateQuestion: gqqa.generateQuestion,
  answerQuestion: gqqa.answerQuestion,
};
