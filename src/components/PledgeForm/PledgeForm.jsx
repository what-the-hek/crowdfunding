import React, { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";

function PledgeForm() {
    const authToken = window.localStorage.getItem("token")
    const [loggedIn] = useOutletContext();

    // enables redirect
    const navigate = useNavigate();

    // accesses project ID so the pledge can be connected to it
    const { id } = useParams();
    const [pledges, setPledges] = useState({
        "amount": null,
        "comment": "",
        "anonymous": false,
        "project": id,        
    });

    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state)
    const handleChange = (event) => {
        const { id, value } = event.target;
        setPledges((prevPledges) => ({
        ...prevPledges,
        [id]: value,
        }));
    };

    // submit the new data (state change) from handleChange. 
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}pledges/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(pledges),
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } else {
        navigate(`/login`);
        }
    };

    return (
        <>
        {loggedIn?
            <form className="pledgeform" onSubmit={handleSubmit}>
                <h3>Pledge</h3>
                <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    min="1"
                    type="number"
                    id="amount"
                    placeholder="Enter amount"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="comment">Comment:</label>
                <input
                    type="text"
                    id="comment"
                    placeholder="Enter Comment"
                    onChange={handleChange}
                />
                </div>
                <div>
                <label htmlFor="anonymous">Anonymous:</label>
                <input 
                    type="checkbox"
                    id="anonymous" 
                    onChange={handleChange} 
                />
                </div>
                {/* <div>
                <label htmlFor="project">Project:</label>
                <input
                    type="text"
                    id="project"
                    placeholder="needs to be auto-filled with current project"
                    onChange={handleChange}
                />
                </div> */}
                <button type="submit">Donate</button>
            </form>
        : (<p>Login to donate</p>) }
        </>
    );
}

export default PledgeForm;