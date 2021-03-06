import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import QAModal from './view/QAModal';
import { askQuestion } from 'store/modules/action/qa';
import { active, sleep } from 'store/modules/creators/modal';
import { startUpperCase } from 'common/utility/string';

const title = 'ASK ME ANYTHING!';

const onChangeQuestion = (setQuestion) => (data) => {
  const question = startUpperCase(data);
  setQuestion(question);
};

const onRecognitionHandler = (recognition, setRecognition) => (
  setAnswer
) => () => {
  setAnswer('');
  setRecognition({
    ...recognition,
    onSpeach: true,
    info: 'SPEAK YOUR QUESTION',
  });
};

const finishRecognition = (recognition, setRecognition) => () => {
  setRecognition({
    ...recognition,
    onSpeach: false,
    info: 'PLEASE WAIT',
  });
};

const resetRecognition = (recognition, setRecognition) => () => {
  setRecognition({
    ...recognition,
    onSpeach: false,
    info: 'CLICK THE MIC BEFORE SPEAK',
  });
};

const QAModalContainer = (props) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [recognition, setRecognition] = useState({
    onSpeach: false,
    info: 'CLICK THE MIC BEFORE SPEAK',
  });

  useEffect(() => {
    return () => {
      setQuestion('');
      setAnswer('');
    };
  }, []);

  const sendQuestion = (token, document) => (q) => {
    setQuestion(question + '?');
    props.ask(token, document, q + '?', (response) => {
      props.setActive();
      setAnswer(startUpperCase(response));
      resetRecognition(recognition, setRecognition);
    });
    props.setSleep();
  };

  return (
    <QAModal
      show={props.visible}
      title={title}
      info={recognition.info}
      recognition={recognition.onSpeach}
      question={question}
      answer={answer}
      onOverlayHandler={props.changeHandler}
      onRecognitionHandler={onRecognitionHandler(
        recognition,
        setRecognition
      )(setAnswer)}
      finishRecognition={finishRecognition(recognition, setRecognition)}
      resetRecognition={resetRecognition(recognition, setRecognition)}
      sendQuestion={sendQuestion(props.token, props.document)}
      onChangeQuestion={onChangeQuestion(setQuestion)}
    />
  );
};

const mapStateToProps = ({ account, unit }) => ({
  token: account.token,
  document: unit.data.unit.document,
});

const mapDispatchToProps = (dispatch) => ({
  ask: (token, document, question, callback) =>
    dispatch(askQuestion({ token, document, question }, callback)),
  setActive: () => dispatch(active()),
  setSleep: () => dispatch(sleep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QAModalContainer);
