import './Agent.css'
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ThisAgent = () => {
    const [agent, setAgent] = useState([]);
    const { uuid } = useParams();
    const [retrieved, setRetrieved] = useState(false);

    useEffect(() => {
        getAgent()
    }, []);

    const getAgent = () => {
        fetch(`https://valorant-api.com/v1/agents/${uuid}`)
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                console.log('Response error')
            }
        }, [])
        .then(data => {
            setAgent(data.data)
            setRetrieved(true)
        })
        .catch((err) => console.log(err))
      
    }

    return (
        <>
            <img className='Agentpic' src={agent.fullPortraitV2} alt='Agent'></img>
            <p>{agent.displayName}</p>
            <p>{agent.description}</p>
            { retrieved ? agent.abilities.map((ability, i)=> {
                const {slot, displayName, description, displayIcon} = ability
                return(
                    <React.Fragment key={i}>
                        <img src={displayIcon} alt="display_icon"/>
                        {/* <p>{slot}</p> */}
                        <p>{displayName}</p>
                        <p>{description}</p>
                    </React.Fragment>
                )
            }) 
            : 
            <>
            <p>Agent has no abilities</p>
            </>}
        </>
    )
};

export default ThisAgent;

//()