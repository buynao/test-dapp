import * as React from 'react';
import BasicCard from '../Card';
import { useSignMessage, useAccount } from 'wagmi';
import { getValueByContract } from '../../utils/index';
const msg =
  'metamask.badactor.io wants you to sign in with your Ethereum account:\n0xe9A147EADb46df9b149fD01A1A2A296263Fae7EE  accept the MetaMask Terms of Service: https://community.metamask.io/tos\n\nURI: https://localhost:5174\nVersion: 1\nChain ID: 1\nNonce: 32891757\nIssued At: 2021-09-30T16:25:24.000Z\nResources:\n- ipfs://Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu\n- https://example.com/my-web2-claim.json';
function EthSign() {
  const { address } = useAccount();
  const [message, setMessage] = React.useState(msg);
  const { signMessage, ...data } = useSignMessage({
    message,
  });
  const buttons = [
    {
      name: 'personal',
      disabled: !address,
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
            title: 'personal',
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
