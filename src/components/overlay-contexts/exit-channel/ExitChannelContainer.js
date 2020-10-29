import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal from '../default-modal';
import { exitChannel } from 'store/modules/action/board';

const title = 'DO YOU WANT TO\nEXIT THIS CHANNEL?';
const body = 'Exit channel is irreversible once executed.\n';

const ExitChannelContainer = (props) => {
  const history = useHistory();
  const buttons = [
    {
      name: 'YES',
      onClickHandelr: () => {
        props.exit(
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
  exit: (payload, callbackHandler) =>
    dispatch(exitChannel(payload, callbackHandler)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExitChannelContainer);
