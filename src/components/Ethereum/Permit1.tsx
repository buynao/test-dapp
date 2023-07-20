import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';

const msgParams = {
    "types": {
        "Permit": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            },
            {
                "name": "nonce",
                "type": "uint256"
            },
            {
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "EIP712Domain": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "version",
                "type": "string"
            },
            {
                "name": "chainId",
                "type": "uint256"
            },
            {
                "name": "verifyingContract",
                "type": "address"
            }
        ]
    },
    "domain": {
        "name": "TST",
        "version": "1",
        "chainId": 5,
        "verifyingContract": "0x004c13f6f5ef19cd6d0244bd268b6c84f5fe2228"
    },
    "primaryType": "Permit",
    "message": {
        "owner": "0xe9a147eadb46df9b149fd01a1a2a296263fae7ee",
        "spender": "0x0000000000000000000000000000000000000001",
        "value": "1",
        "nonce": "0",
        "deadline": "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    }
}

function SignTypeData() {
  const { address } = useAccount();
  const [message, setMessage] = React.useState(jsonString(msgParams.message));
  const [domain, setDomain] = React.useState(jsonString(msgParams.domain));
  const [types, setTypes] = React.useState(jsonString(msgParams.types));
  const [type, setType] = React.useState(msgParams.primaryType);
  const { signTypedData, ...data } = useSignTypedData({
    domain: jsonParse(domain),
    primaryType: type,
    types: jsonParse(types),
    message: jsonParse(message),
  });
  const buttons = [
    {
      name: 'permit',
      disabled: !address,
      onClick: () => {
        signTypedData();
      },
    },
    {
      name: 'data reset',
      disabled: !address,
      onClick: () => {
        setMessage(jsonString(msgParams.message));
        setDomain(jsonString(msgParams.domain));
        setTypes(jsonString(msgParams.types));
        setType(msgParams.primaryType);
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
            title: 'TST - Permit',
          },
          {
            type: 'textArea',
            title: 'Domain',
            label: 'Domain',
            value: domain,
            rows: 8,
            setValue: setDomain,
          },
          {
            type: 'input',
            label: 'primaryType',
            value: type,
            setValue: setType,
          },
          {
            type: 'textArea',
            title: 'Types',
            label: 'Types',
            value: types,
            setValue: setTypes,
          },
          {
            type: 'textArea',
            title: 'Message',
            label: 'Message',
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

export default SignTypeData;
