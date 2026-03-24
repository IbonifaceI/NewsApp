import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { List, Typography, Image, Space, Spin, Alert } from 'antd';
import { useNews } from '../hooks/useNews';
import { newsStore } from '../../../app/stores/newsStore';
import { Pagination } from '../../../shared/components/Pagination';
import dayjs from 'dayjs';

const { Paragraph, Link, Text } = Typography;

export const NewsList: React.FC = observer(() => {
  const { page, pageSize } = newsStore;
  const { data, isLoading, isError, error } = useNews(page, pageSize);

  useEffect(() => {
    if (data) {
      newsStore.setNewsData(data.articles, data.totalResults);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    newsStore.setPage(page);
  };

  if (isLoading) {
    return <Spin tip="Loading news..." style={{ textAlign: 'center', marginTop: 50 }} />;
  }

  if (isError || !data) {
    return <Alert message="Error loading news" description={error?.message} type="error" showIcon />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '20px' }}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={newsStore.articles}
        renderItem={article => (
          <List.Item
            key={article.url}
            extra={
              article.urlToImage ? <Image width={272} alt={article.title} src={article.urlToImage} /> : null
            }
          >
            <List.Item.Meta
              title={<Link href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</Link>}
              description={`${article.source.name} — ${dayjs(article.publishedAt).format('DD MMM YYYY HH:mm')}`}
            />
            <Paragraph ellipsis={{ rows: 3, expandable: true }}>
              {article.description ?? article.content ?? 'No description'}
            </Paragraph>
            <Text type="secondary">Author: {article.author ?? 'Unknown'}</Text>
          </List.Item>
        )}
      />
      <Pagination
        current={page}
        total={newsStore.totalResults}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </Space>
  );
});