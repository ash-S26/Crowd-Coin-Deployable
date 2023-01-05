// This is form component that allows user to contribute to campaigns

// As this is a react component we import react and we will use class defination
// to define react component
import React, { useState } from "react";
// semantic-ui-react pakage allows us to us premade components so we don't have to
// write all code from scratch and we pre-writed react components which comes comes with
// predefined styles. We imported specific components we needs.
import {Form, Input, Message, Button} from "semantic-ui-react";
import Campaign from "../web3/campaign";
import web3 from "../web3/web3";

function ContributeForm(props) {

    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(event) {
        event.preventDefault();
        setErrorMessage("");  // We can use setState to set any state variable on change which we want
        setLoading(true);
        const campaign = Campaign(props.address);
        try {
          // get the list of account from users wallet and use 1st account at index 0 for transaction
          const accounts = await web3.eth.getAccounts();
          // Calling the contribute function defined in our Campaign contract
          await campaign.methods.contribute()
            .send({
              from: accounts[0],
              value: web3.utils.toWei(value, 'ether')
            });
            // Route user to other route (replaceRoute don't cache the previous route ie if we go back then we won't get back our form and data we filled)
            window.location.reload();
        } catch (err) {
          setErrorMessage(err.message);
        }
        setValue("");
        setLoading(false);
      };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
            <label>Amount to Contribute</label>
            <Input
                value={value}
                onChange={event => setValue(event.target.value)}
                label="ether"
                labelPosition="right"
            />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage}/>
            <Button primary loading={loading}>
            Contribute!
            </Button>
        </Form>
    );
}


export default ContributeForm;
