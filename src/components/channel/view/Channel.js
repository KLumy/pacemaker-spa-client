import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import UnitList from './sub-components/UnitList';
import RunnerList from './sub-components/RunnerList';
import arrow_left from 'resources/images/icon/arrow-left.png';
import arrow_down from 'resources/images/icon/arrow-down.png';
import remove_icon from 'resources/images/icon/delete.png';
import exit_icon from 'resources/images/icon/exit.png';

import plus from 'resources/images/icon/plus.png';

import './Channel.scss';

const Channel = ({
  channelId,
  type,
  title,
  detail,
  leader,
  image,
  units,
  runners,
  onClickCreateUnit,
  onClickAccessCode,
  onClickRemoveChannel,
  onClickExitChannel,
  onClickNotReadyFunction,
}) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({ tab: 'units', isBottom: false });
  const history = useHistory();
  const context = useRef(null);

  //TODO: 여기에 State가 있으면 안되는게 맞는거같음. 근데 컨테이너로 올리면 언제 초기화를 할지가 불분명.

  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  const changeTab = (name) => () => {
    setState({ ...state, tab: name });
  };
  const onScrollObserver = (ref) => () => {
    const target = ref.current;
    const height = target.scrollHeight - target.offsetHeight;
    if (target.scrollTop < height) setState({ ...state, isBottom: false });
    else setState({ ...state, isBottom: true });
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <div className={classNames('Channel', { Invisible: !visible })}>
      <div className="TopBar">
        <img
          draggable="false"
          className="ArrowLeft"
          src={arrow_left}
          alt=""
          onClick={goBack}
        />
      </div>
      <div className="ChannelInformationBar">
        <div className="ChannelTitle">{title}</div>
        <div className="ChannelDetail">{detail}</div>
        <div className="ChannelLeader">{leader}</div>
        <img
          draggable="false"
          className="RemoveOrExit"
          src={type === 'leader' ? remove_icon : exit_icon}
          alt=""
          onClick={
            type === 'leader' ? onClickRemoveChannel : onClickExitChannel
          }
        />
      </div>
      <div className="ChannelTabBar">
        <div className="Tab ShowChannelCode" onClick={onClickAccessCode}>
          CHANNEL CODE
        </div>
        <div className="Tab ShowUnit" onClick={changeTab('units')}>
          UNIT
        </div>
        <div className="Tab ShowRunnerList" onClick={changeTab('runners')}>
          RUNNER LIST
        </div>
        <div
          className="Tab ShowStatistics"
          onClick={() =>
            onClickNotReadyFunction({
              title: 'OOPS..!\nNOT READY YET...',
              body: `The feature is not ready yet!\nWe'll update the feature soon...\nWe will notify you when an update is available!`,
            })
          }
        >
          STATISTICS
        </div>
      </div>
      <div
        className="Context"
        onWheel={onScrollObserver(context)}
        ref={context}
      >
        {state.tab === 'units' && (
          <UnitList type={type} channel={channelId} units={units} />
        )}
        {state.tab === 'runners' && <RunnerList runners={runners} />}
      </div>
      <div className="FloatingIconSet">
        {type === 'leader' && (
          <img
            draggable="false"
            className="Icon Plus"
            src={plus}
            alt=""
            onClick={onClickCreateUnit}
          />
        )}
        <img
          draggable="false"
          className={classNames('Icon', 'ArrowDown', {
            Up: state.isBottom,
            Down: !state.isBottom,
          })}
          src={arrow_down}
          alt=""
        />
      </div>
      <div className="ImageContainer">
        <img draggable="false" className="ChannelImage" src={image} alt="" />
      </div>
    </div>
  );
};

export default Channel;
