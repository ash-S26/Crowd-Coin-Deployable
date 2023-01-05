import React, { useEffect, useState } from 'react';
import factory from "../web3/factory";
import { Card, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Home() {

    const [listOfCampaigns, setListOfCampaigns] = useState([]);

    async function getCampaigns() {
        var temp = await factory.methods.getDeployedCampaigns().call();
        setListOfCampaigns(temp);
    }

    useEffect(() => {
        getCampaigns();
    },[]);

    function showCampaigns() {
        const items = listOfCampaigns.map(address => {
            var temp = "/campaigns/"+address;
            return ({
              header: address,
              description: (
                <Link to={temp}>
                  View Campaign
                </Link>
              ),
              fluid: true
            });
          });
          return <Card.Group items={items} />;
    }

    return (
        <Layout>
            <div>
          <h3>Open Campaigns</h3>
          <Link to="/campaigns/new">
              <Button
                content="Create Campaign"
                icon="add circle"
                primary
                floated="right"
              />
          </Link>
          {showCampaigns()}
        </div>
        </Layout>
    )
}

export default Home;