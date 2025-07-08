import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../api/insurtech';
import Layout from '../layout/Layout';

interface ListItem {
  id: number;
  insuranceCompany: string;
  status: string;
  requestType: string;
  caseType: string;
  insuranceCreateNote: string;
  insuredPreference: string;
  insuranceLeakCause: string;
  address: string;
  addressDetail: string;
  customerTellNo: string;
  claimNumber: string;
  createdByInsuranceMemberName: string;
  createdAt: string;
}

interface ListProps {
  // 필요한 props 정의
}

const List: React.FC<ListProps> = () => {
  const navigate = useNavigate();
  // 상태 관리
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [listData, setListData] = useState<ListItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await getList();

    setListData(response.data.items);
    setCurrentPage(response.data.currentPage);
    setTotalItems(response.data.totalItems);
    setTotalPages(response.data.totalPages);
  };

  // 검색 처리
  const handleSearch = useCallback(() => {
    console.log('Searching for:', searchKeyword);
  }, [searchKeyword]);

  // 초기화
  const handleReset = useCallback(() => {
    setSearchKeyword('');
    setCurrentPage(1);
    setSortOrder('desc');
  }, []);

  // 정렬 처리
  const handleSort = useCallback(() => {
    setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
  }, []);

  // 페이지 변경 처리
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 상태에 따른 스타일 및 텍스트 반환
  const getStatusStyle = (status: ListItem['status']) => {
    switch (status) {
      case 'DISPATCH':
        return {
          bgColor: 'bg-blue-500',
          text: '접수',
          textColor: 'text-blue-500',
        };
      case 'CONSTRUCTION_SCHEDULING':
        return {
          bgColor: 'bg-green-400',
          text: '시공일정조율',
          textColor: 'text-green-400',
        };
      case 'CONSTRUCTION':
        return {
          bgColor: 'bg-green-500',
          text: '시공',
          textColor: 'text-green-500',
        };
      case 'COST':
        return {
          bgColor: 'bg-orange-500',
          text: '비용정산',
          textColor: 'text-orange-500',
        };
      case 'COMPLETED':
        return {
          bgColor: 'bg-gray-500',
          text: '종결',
          textColor: 'text-gray-500',
        };
    }
  };

  const handleDetail = (id: number) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 페이지 제목 */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">사고 접수 목록</h1>
        </div>

        {/* 검색 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="검색어를 입력해 주세요"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                초기화
              </button>
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                검색
              </button>
            </div>
          </div>
        </div>

        {/* 리스트 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">총 개수: {totalItems}개</span>
              <button
                onClick={handleSort}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {sortOrder === 'desc' ? '최신순' : '오래된순'}
                <svg
                  className="ml-2 h-4 w-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    접수번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    요약
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    접수상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      접수일
                      {/* <button onClick={handleSort} className="ml-2">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </button> */}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listData?.map(item => {
                  const statusStyle = getStatusStyle(item.status);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.claimNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:text-blue-900"
                          onClick={() => handleDetail(item.id)}
                        >
                          {item.address} {item.addressDetail}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${statusStyle?.bgColor} mr-2`}
                          ></div>
                          <span className={`text-sm ${statusStyle?.textColor}`}>
                            {statusStyle?.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.createdAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center">
              {/* <div className="text-sm text-gray-700">
                {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} / 총 ${totalPages}개`}
              </div> */}
              <div className="flex items-center space-x-2 ">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
                    currentPage === 1
                      ? 'bg-gray-100 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-50'
                  } text-sm font-medium text-gray-500`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                      currentPage === index + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
                  className={`relative inline-flex items-center px-2 py-2 rounded-md border ${
                    currentPage === Math.ceil(totalItems / itemsPerPage)
                      ? 'bg-gray-100 cursor-not-allowed'
                      : 'bg-white hover:bg-gray-50'
                  } text-sm font-medium text-gray-500`}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default List;
