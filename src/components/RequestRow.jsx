import React from "react";
import {Table, Button} from "semantic-ui-react";
import web3 from "../web3/web3";
import Campaign from "../web3/campaign";


function RequestRow(props) {

    async function onApprove (){
        const campaign = Campaign(props.address);
    
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send({
          from: accounts[0]
        });
      };
    
      async function onFinalize() {
        const campaign = Campaign(props.address);
    
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send({
          from: accounts[0]
        });
      }

      const {Row, Cell} = Table;
      var {id, request, approversCount} = props;
      var readyToFinalize = request.approvalCount > approversCount/2;

    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{request.value/1000000000000000000}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
            { request.complete ? null :
                <Button color="green" basic onClick={onApprove}>Approve</Button>
            }
            </Cell>
            <Cell>
            { request.complete ? null :
                <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
            }
            </Cell>
        </Row>
    );
}

export default RequestRow;