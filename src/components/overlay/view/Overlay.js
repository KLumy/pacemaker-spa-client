import React from 'react';
import classNames from 'classnames';
import Menu from 'components/overlay-contexts/overlay-menu';
import './Overlay.scss';

const Overlay = ({ show, type, changeHandler }) => {
  let context = '';
  switch (type) {
    case 'MENU':
      context = <Menu show={show} changeHandler={changeHandler} />;
      break;
    case 'MY ACCOUNT':
      context = <div>MY ACCOUNT</div>;
      break;
    default:
  }
  return (
    <div className="Overlay">
      <div
        className={classNames('OverlayBackground', {
          Show: show,
          Hide: !show,
        })}
        onClick={() => changeHandler()}
      ></div>
      <div
        className={classNames('Container', {
          Show: show,
          Hide: !show,
        })}
      >
        {context}
      </div>
    </div>
  );
};

// const mapStateToProps = ({ counter }) => ({
//   color: counter.color,
//   number: counter.number,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ incrementAsync, decrement, getPost }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
export default Overlay;
