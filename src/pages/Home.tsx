import React from 'react';
import { Typography } from 'antd';
import { NewsList } from '../entities/news/components/NewsList';

const { Title } = Typography;

export const Home: React.FC = () => {
  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <Title level={2}>Новости по биткоину</Title>
      <NewsList />
    </div>
  );
};