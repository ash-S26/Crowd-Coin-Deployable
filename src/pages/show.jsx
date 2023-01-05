import React, { useEffect, useState } from 'react';
import { Grid, Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';
import Campaign from "../web3/campaign";
import { Link, useParams } from 'react-router-dom';
import web3 from '../web3/web3';
import ContributeForm from '../components/ContributionForm';





function Show() {

    const [addressSummary, setAddressSummary] = useState([]);

    const params = useParams();


    async function getAddressSummary(){
        const campaign = Campaign(params.address);
        const summary = await campaign.methods.getSummary().call();
        setAddressSummary(Object.values(summary));
        //console.log(addressSummary);
    }

    useEffect(() => {
        getAddressSummary();
    },[addressSummary])

    function renderCards() {
        //console.log(Object.values(addressSummary));
        const [
          minimumContribution,
          balance=0,
          requestsCount,
          approversCount,
          manager
         ] = addressSummary;
        const items = [
          {
            header:  manager,
            meta:  "Address of Manager",
            description: "The manager created this campaign and can request to withdraw money.",
            style: {overflowWrap: 'break-word'}
          },
          {
            header:  minimumContribution,
            meta:  "Minimum Contribution (wei)",
            description: "You must contribute atleast this much wei to become a approver.",
            style: {overflowWrap: 'break-word'}
          },
          {
            header:  requestsCount,
            meta:  "Number of Requests",
            description: "A request tries to withdraw money from the contract. Request must be approved by approvers.",
            style: {overflowWrap: 'break-word'}
          },
          {
            header:  approversCount,
            meta:  "Number of Approvers",
            description: "Number of people who have already donated to the campaign.",
            style: {overflowWrap: 'break-word'}
          },
          {
            header: ((balance)/1000000000000000000).toFixed(10),
            meta:  "Campaign Balance (ether)",
            description: "The balance is how much this campaign has left to spend.",
            style: {overflowWrap: 'break-word'}
          }
        ];
    
        return <Card.Group items={items} />
      }

    return (

        <Layout>
          <h3>Campaign Details</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                {renderCards()}
              </Grid.Column>
              <Grid.Column width={6}>
                <ContributeForm address={params.address} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Link to={"/campaigns/"+params.address+"/requests"}>
                  View Requests
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
      );
}

export default Show;