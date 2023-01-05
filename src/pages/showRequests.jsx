import React, { useEffect, useState } from "react";
//importing react Layout Component
import Layout from "../components/Layout";
import {Button, Table} from "semantic-ui-react";
// Link is exported from routes.js . It helps to create a link that can navigate user to specified route
import { Link, useParams } from "react-router-dom";
import Campaign from "../web3/campaign";
import RequestRow from "../components/RequestRow";

function ShowRequests() {

    const params = useParams();

    const [requests, setRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [approversCount, setApproversCount] = useState(0);

    async function getInitialProps() {
        const campaign = Campaign(params.address);
        const temprequestCount = await campaign.methods.getRequestsCount().call();
        const tempapproversCount = await campaign.methods.approversCount().call();
        setRequestCount(temprequestCount);
        setApproversCount(tempapproversCount);
        // As solidity cannot return Array of structs we fetch all request (which are of struct type)
        // one by one.
        const temprequests = await Promise.all(
          Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call();
          })
        );
        setRequests(temprequests);
        
      }

      useEffect(()=> {
        getInitialProps();
      },[requests]);

    function renderRows() {
        return requests.map((request, index) => {
          return (
            <RequestRow
              key={index}
              id={index}
              request={request}
              address={params.address}
              approversCount={approversCount}
            />
          );
        });
      }
      
    const {Header , Row, HeaderCell, Body} = Table;

    return (
        <Layout>
            <h3>Requests</h3>
            <Link to={"/campaigns/"+params.address+"/requests/new"}>
                <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
            </Link>
            <Table>
            <Header>
                <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
                </Row>
            </Header>
            <Body>
                {renderRows()}
            </Body>
            </Table>
            <div>Found {requestCount} requests.</div>
        </Layout>
    );
}

export default ShowRequests;

