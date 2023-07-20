import * as React from 'react';
import BasicCard from '../Card';
import { useSignTypedData, useAccount } from 'wagmi';
import { getValueByContract, jsonParse, jsonString } from '../../utils/index';

const msgParams ={
    "types": {
        "PermitBatch": [
            {
                "name": "details",
                "type": "PermitDetails[]"
            },
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "sigDeadline",
                "type": "uint256"
            }
        ],
        "PermitDetails": [
            {
                "name": "token",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint160"
            },
            {
                "name": "expiration",
                "type": "uint48"
            },
            {
                "name": "nonce",
                "type": "uint48"
            }
        ],
        "EIP712Domain": [
            {
                "name": "name",
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
        "name": "Permit2",
        "chainId": 5,
        "verifyingContract": "0x000000000022d473030f116ddee9f6b43ac78ba3"
    },
    "primaryType": "PermitBatch",
    "message": {
        "details": [{
            "token": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
            "amount": "1461501637330902918203684832716283019655932542975",
            "expiration": "1692344904",
            "nonce": "0"
        }, {
            "token": "0x004c13f6f5ef19cd6d0244bd268b6c84f5fe2228",
            "amount": "1234555",
            "expiration": "1702344904",
            "nonce": "0"
        }],
        "spender": "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad",
        "sigDeadline": "1689754704"
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
      name: 'permit2Batch',
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
            title: 'Uniswap - PermitBatch',
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
