import * as React from 'react';
import BasicCard from '../Card';
import { useSignMessage, useAccount } from 'wagmi';
import { getValueByContract } from '../../utils/index';
const msg = 'imToken';

function EthSign() {
  const { address } = useAccount();
  const [message, setMessage] = React.useState(msg);
  const { signMessage, ...data } = useSignMessage({
    message,
  });
  const buttons = [
    {
      name: 'eth_sign',
      disabled: true,
      onClick: () => {
        signMessage();
      },
    },
  ];
  return (
    <React.Fragment>
      <BasicCard
        buttons={buttons}
        list={[
          {
            type: 'title',
            title: 'Contract Manage',
          },
          {
            type: 'textArea',
            title: 'Message',
            value: message,
            setValue: setMessage,
          },
          {
            type: 'content',
            title: 'Result',
            content: getValueByContract(data),
          },
        ]}
      />
    </React.Fragment>
  );
}

export default EthSign;
