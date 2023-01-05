import React, { useState } from "react";
import Layout from "../components/Layout";
import {Form , Button , Message, Input} from "semantic-ui-react";
import web3 from "../web3/web3";
import Campaign from "../web3/campaign";
import {Link, useNavigate, useParams} from "react-router-dom";


function NewRequest() {

    const params = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");

    async function onSubmit(event){
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
        const campaign = Campaign(params.address);
        try {
          const accounts = await web3.eth.getAccounts();
          await campaign.methods.createRequest(description,web3.utils.toWei(value, 'ether'),recipient)
            .send({
              from: accounts[0]
            });
            // Redirect user to specified route , pushRoute allows user to go back to page on which they were previously
            navigate("/campaigns/"+params.address+"/requests");
        } catch (err) {
          setErrorMessage(err.message);
        }
        setLoading(false);
      };

    return (
        <Layout>
        <Link to={"/campaigns/"+params.address+"/requests"}>
          Back
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={value}
              onChange={event => setValue(event.target.value)}
              label="Ether"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={recipient}
              onChange={event => setRecipient(event.target.value)}
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button primary loading={loading}>
            Request
          </Button>
        </Form>
      </Layout>
    );
}

export default  NewRequest;