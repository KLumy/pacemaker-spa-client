import React from 'react';
import classNames from 'classnames';

import Input from 'components/custom-input';
import arrow from 'resources/images/icon/arrow-right.png';

import exit from 'resources/images/icon/exit.png';
import './ModifyAccount.scss';

const ModifyAccount = ({
  show,
  title,
  inputForms,
  onChangeHandler,
  modiftAccountHandler,
}) => {
  return (
    <div className="ModifyAccount">
      <div className="Container">
        <img className="Close" src={exit} alt="" />
        <div className="Context">
          <div>
            <div className="Title">{title}</div>
          </div>

          <div className="InputForms">
            {inputForms.map((input, index) => (
              <div key={index} className="InputLine">
                <div
                  key={index}
                  className={classNames('Input', {
                    Show: show,
                    Hide: !show,
                  })}
                >
                  <Input
                    title={input.title}
                    type={input.type}
                    size={input.fontSize}
                    onChangeHandler={onChangeHandler(input.title)}
                  />
                </div>
              </div>
            ))}

            <div className="InputLine">
              <img
                className={classNames('Arrow', {
                  Show: show,
                  Hide: !show,
                })}
                src={arrow}
                alt=""
                onClick={modiftAccountHandler}
              />
            </div>
          </div>
        </div>
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
export default ModifyAccount;
