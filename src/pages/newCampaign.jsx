import React, { useState } from 'react';
import factory from "../web3/factory";
import Layout from "../components/Layout";
import {Form , Button , Input, Message} from "semantic-ui-react";
import web3 from "../web3/web3";
import { useNavigate } from 'react-router-dom';

function NewCampaign() {

    const navigate = useNavigate();

    const [minimumContribution, changeAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, seterrorMessage] = useState("");

    async function createNewCampaign (event){

        event.preventDefault();
        setLoading(true);
        seterrorMessage("");
        try {
          const accounts = await web3.eth.getAccounts();
          await factory.methods.createCampaign(minimumContribution)
            .send({
              from: accounts[0]
            });
          navigate("/");
        } catch (err) {
          seterrorMessage(err.message);
        }
        setLoading(false);
      }

    return (
        <Layout>
            <h3>Create a Campaign</h3>
            <Form onSubmit={createNewCampaign} error={!!errorMessage}>
                <Form.Field>
                <label>Minimum Contribution To Become A Contributor</label>
                <Input
                    value={minimumContribution}
                    onChange={(event) => {changeAmount(event.target.value)}}
                    label="Wei"
                    labelPosition="right"
                />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage}/>
                <Button primary loading={loading}>Create</Button>
            </Form>
      </Layout>
    );
}

export default NewCampaign;