import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal from '../default-modal';
import { removeChannel } from 'store/modules/action/board';

const title = 'DO YOU WANT TO\nREMOVE THIS CHANNEL?';
const body =
  'Are you sure you want to delete this channel?\nRemove channel is irreversible once executed.';

const RemoveChannelContainer = (props) => {
  const history = useHistory();
  const buttons = [
    {
      name: 'YES',
      onClickHandelr: () => {
        props.remove(
          { token: props.token, channel: props.channel },
          (success) => {
            props.changeHandler();
            history.goBack();
          }
        );
      },
    },
    {
      name: 'NO',
      onClickHandelr: () => props.changeHandler(),
    },
  ];

  return (
    <Modal
      show={props.visible}
      changeHandler={props.changeHandler}
      title={title}
      body={body}
      buttons={buttons}
    />
  );
};

const mapStateToProps = ({ account, channel }) => ({
  token: account.token,
  channel: channel.data.id,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (payload, callbackHandler) =>
    dispatch(removeChannel(payload, callbackHandler)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveChannelContainer);
