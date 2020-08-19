import React from 'react';
import { Typography, Text, Space } from 'antd';


export const Home = () => {

    const { Title, Text } = Typography;





    return (
        <div className="homeContainer">

            <Title className="welcomeMeassage" ><Text type="danger" style={{ align: 'center' }}>Welcome to Project Tracker</Text></Title>
        </div>
    )
}