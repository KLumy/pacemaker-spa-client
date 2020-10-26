import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createUnit } from 'store/modules/action/channel';
import CreateUnit from './view/CreateUnit';

const title = 'MAKE NEW UNIT';

const inputForms = [
  {
    title: 'TITLE',
    type: 'text',
    fontSize: '1.5em',
    max: 25,
  },
];

const CreateUnitContainer = ({
  visible,
  token,
  changeHandler,
  index,
  channelId,
  createUnit: create,
}) => {
  const [state, setState] = useState({
    title: '',
  });

  const onChangeHandler = (type) => (data) => {
    switch (type) {
      case 'TITLE':
        setState({ ...state, title: data });
        return;
      default:
        return;
    }
  };

  const requestCreateUnit = () => {
    create(
      { token, channel: channelId, index, title: state.title },
      changeHandler
    );
  };
  return (
    <CreateUnit
      show={visible}
      title={title}
      index={index}
      inputForms={inputForms}
      onChangeHandler={onChangeHandler}
      requestCreateUnit={requestCreateUnit}
    />
  );
};

const mapStateToProps = ({ account, channel }) => ({
  token: account.token,
  channelId: channel.data.id,
  index: channel.data.units.length + 1,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ createUnit }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUnitContainer);