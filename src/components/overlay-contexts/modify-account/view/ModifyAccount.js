import React from 'react';
import classNames from 'classnames';

import Input from 'components/custom-input';
import arrow from 'resources/images/icon/arrow-right.png';

import cross from 'resources/images/icon/cross.png';
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
        <img draggable="false" className="Close" src={cross} alt="" />
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
                    maxLength={input.max}
                    onChangeHandler={onChangeHandler(input.title)}
                  />
                </div>
              </div>
            ))}

            <div className="InputLine">
              <img
                draggable="false"
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
export default ModifyAccount;
