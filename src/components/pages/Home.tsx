import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getList } from '../../api/insurtech';
import type { ListItem } from '../../utils/utils';
import { isThisMonth, isToday } from '../../utils/utils';
import Layout from '../layout/Layout';

const Home = () => {
  const navigate = useNavigate();

  // 사고접수 리스트 데이터 상태
  const [listData, setListData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 카드별 카운트 상태
  // 현재 월 구하기 (1~12)
  const now = new Date();
  const currentMonthLabel = `${now.getMonth() + 1}월 총 접수`;
  const currentMonthCompletedLabel = `${now.getMonth() + 1}월 총 종결`;
  const [cardStats, setCardStats] = useState([
    {
      key: 'todayReceived',
      label: '오늘 접수',
      count: 0,
      icon: '📝',
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
    },
    {
      key: 'todayCompleted',
      label: '오늘 종결',
      count: 0,
      icon: '✅',
      color: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
    {
      key: 'monthReceived',
      label: currentMonthLabel,
      count: 0,
      icon: '📅',
      color: 'bg-indigo-100',
      textColor: 'text-indigo-700',
    },
    {
      key: 'monthCompleted',
      label: currentMonthCompletedLabel,
      count: 0,
      icon: '🏁',
      color: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
  ]);

  useEffect(() => {
    // 리스트 데이터 조회 및 카드별 카운트 계산
    const fetchList = async () => {
      try {
        const response = await getList();
        const items = response.data.items || [];
        setListData(items);

        // 오늘 접수: 오늘(createdAt) + 상태 무관
        const todayReceived = items.filter((item: ListItem) => isToday(item.createdAt)).length;
        // 오늘 종결: 오늘(createdAt) + 상태가 COMPLETED
        const todayCompleted = items.filter(
          (item: ListItem) => isToday(item.createdAt) && item.status === 'COMPLETED'
        ).length;
        // 당월 접수: 이번달(createdAt) + 상태 무관
        const monthReceived = items.filter((item: ListItem) => isThisMonth(item.createdAt)).length;
        // 당월 종결: 이번달(createdAt) + 상태가 COMPLETED
        const monthCompleted = items.filter(
          (item: ListItem) => isThisMonth(item.createdAt) && item.status === 'COMPLETED'
        ).length;

        setCardStats([
          {
            key: 'todayReceived',
            label: '오늘 접수',
            count: todayReceived,
            icon: '📝',
            color: 'bg-blue-100',
            textColor: 'text-blue-700',
          },
          {
            key: 'todayCompleted',
            label: '오늘 종결',
            count: todayCompleted,
            icon: '✅',
            color: 'bg-orange-100',
            textColor: 'text-orange-500',
          },
          {
            key: 'monthReceived',
            label: currentMonthLabel,
            count: monthReceived,
            icon: '📅',
            color: 'bg-indigo-100',
            textColor: 'text-indigo-700',
          },
          {
            key: 'monthCompleted',
            label: currentMonthCompletedLabel,
            count: monthCompleted,
            icon: '🏁',
            color: 'bg-orange-100',
            textColor: 'text-orange-500',
          },
        ]);
      } catch (err: any) {
        setError('사고접수 현황을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  return (
    <Layout>
      {/* 사고접수 대시보드 카드 */}
      <div className="w-full max-w-4xl mx-auto mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {cardStats.map(card => (
            <div
              key={card.key}
              className={`rounded-2xl shadow-lg flex flex-col p-6 border border-gray-50 relative transition hover:shadow-xl duration-200 bg-white`}
            >
              {/* 카드 상단: label(좌), count(우) */}
              <div className="w-full flex flex-row justify-between items-start mb-2">
                {/* 카드 라벨 - 좌측 상단 */}
                <div className="text-xl font-semibold text-gray-500 tracking-wide">
                  {/* 카드 라벨 */}
                  {card.label}
                </div>
                {/* 카드 카운트 - 우측 상단 */}
                <div className="flex items-end gap-1">
                  <span className={`text-3xl font-extrabold ${card.textColor}`}>{card.count}</span>
                  <span className="text-sm text-gray-400 mb-1">건</span>
                </div>
              </div>
              {/* 카드 하단의 label 건수 텍스트 제거됨 */}
            </div>
          ))}
        </div>
        {loading && <div className="text-center text-gray-400 mt-2">현황 불러오는 중...</div>}
        {error && <div className="text-center text-red-500 mt-2">{error}</div>}
      </div>
      <div className="px-4 py-6 sm:px-0 flex items-center justify-center">
        {/* 새로운 사고 접수하기 버튼 */}
        <button
          className="w-full max-w-md flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-colors duration-200 shadow-md text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-300"
          onClick={() => navigate('/register')}
        >
          <FiPlus className="text-2xl" />
          사고 접수하기
        </button>
      </div>
    </Layout>
  );
};

export default Home;
