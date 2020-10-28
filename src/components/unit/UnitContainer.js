import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getUnit,
  makeReservation,
  verifyQuestion,
} from 'store/modules/action/unit';

import { update } from 'store/modules/creators/unit';
import { show } from 'store/modules/creators/modal';

import { LocalMainPage } from 'common/local-path';
import unitDocument from 'store/modules/action/document';

import Unit from './view/Unit';

const documentHandler = (state, setState) => (type) => (data) => {
  switch (type) {
    case 'title':
      setState({
        ...state,
        title: data,
      });
      return;
    case 'body':
      setState({
        ...state,
        body: data,
      });
      return;
    default:
      return;
  }
};

const onAnswerHandler = (state, setState) => (index, answer) => () => {
  setState({
    ...state,
    questions: state.questions.map((question, i) =>
      i === index ? { ...question, user_answer: answer } : question
    ),
  });
};

const onVerifyHandler = (state, setState) => (id) => () => {
  setState({
    ...state,
    questions: state.questions.map((question) =>
      question.id === id
        ? { ...question, verified: !question.verified }
        : question
    ),
  });
};

const createDocument = (createDocs) => (token, channel, unit) => (
  callbackHandler
) => () => {
  createDocs({ token, channel, unit }, callbackHandler);
};

const updateDocument = (updateDocs) => (token, document) => (
  callbackHandler
) => () => {
  updateDocs({ token, document }, callbackHandler);
};

const cancelDoceument = (updateHandler) => (state, action) => (
  callbackHandler
) => () => {
  updateHandler({
    ...state,
    title: action.title,
    body: action.body,
  });
  callbackHandler();
};

const updatePaper = (updateHandler) => (state, action) => () => {
  console.log('update');
  updateHandler({
    ...state,
    unit: {
      ...state.unit,
      paper: action,
    },
  });
};

// const editDocument = (token, document) => () => {};

const verifyPaper = (verifyHandler) => (
  token,
  unit,
  local,
  setLocalState
) => () => {
  const verified = [];
  const removed = [];
  local.questions.forEach((question) => {
    if (question.verified) verified.push(question);
    else removed.push({ pair_id: question.id });
  });
  setLocalState({
    ...local,
    questions: verified,
  });
  verifyHandler({ token, unit, removed });
};

const onReservationHandler = (reservation) => (token, unit) => () => {
  reservation({ token, unit }, () => console.log('callback'));
};

const onRemoveUnitHandler = (modal, history) => (
  token,
  channel,
  unit
) => () => {
  modal(
    'REMOVE UNIT',
    {
      token,
      channel,
      unit,
    },
    () => {
      history(LocalMainPage.root);
    }
  );
};

const UnitContainer = ({
  type,
  channelId,
  unitId,
  tab,
  data,
  token,
  isReady,
  getUnit: getUnitHandler,
  update: updateHandler,
  show: showModalHandler,
  reservation,
  verifyQuestion: verifyHandler,
  createDocs,
  updateDocs,
}) => {
  const history = useHistory();

  const [document, setDocument] = useState(data.unit.document);
  const [paper, setPaper] = useState(data.unit.paper);

  useEffect(() => {
    if (token === null) return;
    getUnitHandler({ token: token, channel: channelId, unit: unitId });
  }, []);

  useEffect(() => {
    setDocument(data.unit.document);
    setPaper(data.unit.paper);
  }, [data.unit.document, data.unit.paper]);

  //AXIOS 시작하면 isReady: true->false
  //AXIOS 종료되면 isReady: false->true
  if (!isReady || data.channel === null) return <div />;
  if (!data.unit.isOpened) history.goBack();
  return (
    <Unit
      type={type}
      channel={data.channel}
      unit={data.unit}
      tab={tab}
      document={document}
      paper={paper}
      onRemoveUnitHandler={onRemoveUnitHandler(showModalHandler, history)(
        token,
        channelId,
        unitId
      )}
      showModalHandler={showModalHandler}
      createDocument={createDocument(createDocs)(token, channelId, unitId)}
      updateDocument={updateDocument(updateDocs)(token, document)}
      cancelDoceument={cancelDoceument(setDocument)(
        document,
        data.unit.document
      )}
      documentHandler={documentHandler(document, setDocument)}
      //FIXME: updateHandler를 통해서 redux 접근. 이 부분을 서버통신으로 변경
      updatePaper={updatePaper(updateHandler)(data, paper)}
      verifyPaper={verifyPaper(verifyHandler)(token, unitId, paper, setPaper)}
      onVerifyHandler={onVerifyHandler(paper, setPaper)}
      onAnswerHandler={onAnswerHandler(paper, setPaper)}
      onReservationHandler={onReservationHandler(reservation)(token, unitId)}
    />
  );
};

const mapStateToProps = ({ account, unit }) => ({
  token: account.token,
  data: unit.data,
  isReady: unit.state.ready,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUnit,
      show,
      update,
      verifyQuestion,
      reservation: makeReservation,
      createDocs: unitDocument.create,
      updateDocs: unitDocument.update,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(UnitContainer);
