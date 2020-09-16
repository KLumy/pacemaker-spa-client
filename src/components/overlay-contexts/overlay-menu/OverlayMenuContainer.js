import React from 'react';
import { useHistory } from 'react-router-dom';
import LocalPath from 'local-path';
import OverlayMenu from './view/OverlayMenu';

const main = [
  ['MY FEED', LocalPath.main.newspeed],
  ['FOR LEADER', LocalPath.main.leaderboard],
  ['FOR RUNNER', LocalPath.main.runnerboard],
  ['MY DOCUMENTS', LocalPath.main.documents],
];
const optional = [
  ['ABOUT US', LocalPath.help.aboutus],
  ['CONTACT', LocalPath.help.contact],
];

const OverlayMenuContainer = ({ show, changeHandler }) => {
  const history = useHistory();
  const onClickHandler = (path) => {
    history.push(path);
    changeHandler();
  };
  return (
    <OverlayMenu
      show={show}
      main={main}
      optional={optional}
      onClickHandler={onClickHandler}
    />
  );
};

// const mapStateToProps = ({ counter }) => ({
//   color: counter.color,
//   number: counter.number,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ incrementAsync, decrement, getPost }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
export default OverlayMenuContainer;
