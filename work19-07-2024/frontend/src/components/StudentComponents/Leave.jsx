import React from 'react';

export default function Leave(props) {
   
    const containerStyle = {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        background: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const headingStyle = {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px'
    };

    const textStyle = {
        fontSize: '1.1em',
        color: '#555',
        lineHeight: '1.6',
        textAlign: 'left'
    };

    const listStyle = {
        listStyleType: 'disc',
        margin: '20px 0',
        paddingLeft: '20px'
    };

    const listItemStyle = {
        marginBottom: '10px'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Take Leave</h1>
            <h4 style={textStyle}>
                Hostel Leave Rules<br /><br />
                <h1>{props.a}</h1>
                To ensure the safety and well-being of all residents, the following leave rules must be adhered to:<br /><br />

                <ul style={listStyle}>
                    <li style={listItemStyle}><strong>Leave Application:</strong> Residents must submit a formal leave application to the hostel office at least 24 hours before the intended leave date. The application should include the reason for leave, duration, and a contact number where the resident can be reached.</li>
                    <li style={listItemStyle}><strong>Approval Process:</strong> Leave requests will be reviewed and approved based on necessity and availability. Residents will be notified of the approval status via email or in-person communication. Any unapproved leave will be considered unauthorized.</li>
                    <li style={listItemStyle}><strong>Leave Duration:</strong> Regular leave is granted for a maximum of 48 hours at a time. Extended leave requests must be accompanied by a valid reason and supporting documentation.</li>
                    <li style={listItemStyle}><strong>Sign-Out and Sign-In:</strong> Upon leaving the hostel, residents must sign out in the hostel register and sign in upon their return. Failure to comply with this procedure may result in disciplinary action.</li>
                    <li style={listItemStyle}><strong>Emergency Leave:</strong> In the case of emergencies, residents should inform the hostel authorities as soon as possible and provide necessary documentation upon return.</li>
                    <li style={listItemStyle}><strong>Accountability:</strong> Residents are responsible for ensuring that their leave does not interfere with their academic responsibilities or hostel rules. Repeated or unauthorized absences may lead to disciplinary measures.</li>
                </ul>

                We appreciate your cooperation in following these guidelines to maintain a safe and orderly environment for all hostel residents.
            </h4>
        </div>
    );
}
