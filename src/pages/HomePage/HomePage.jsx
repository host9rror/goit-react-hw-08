import { useEffect } from 'react';

const HomePage = () => {
    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = 'hidden';

        // Enable scrolling on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            textAlign: 'center',
            height: '80vh',  
        },
        title: {
            fontSize: '2.5rem',
            marginBottom: '20px'
        },
        subtitle: {
            fontSize: '1.2rem',
            color: '#666'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to your personal contact book</h1>
        </div>
    );
};

export default HomePage;
