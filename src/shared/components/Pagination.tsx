import React from 'react';
import { Pagination as AntPagination } from 'antd';

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ current, total, pageSize, onChange }) => {
  return (
    <AntPagination current={current} total={total} pageSize={pageSize} onChange={onChange} />
  );
};