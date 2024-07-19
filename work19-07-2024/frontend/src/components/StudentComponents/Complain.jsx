import React from 'react';

export default function Complain() {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)',
            color: 'white',
            padding: '20px',

        },
        iframeContainer: {
            marginTop: '20px',
        }
    };

    return (
        <div style={styles.container}>
            <h1>Complain</h1>
            <h4>Add miscellaneous</h4>

            <div style={styles.iframeContainer}>
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdBgq3Naq87sz3hvM95-TZraViz6Ur7HkikBlNh6GUvAQjodA/viewform?embedded=true"
                    width="640"
                    height="720"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="Complain Form"
                >Loading…</iframe>
            </div>
        </div>
    );
}
