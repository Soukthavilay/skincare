import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ProductChart() {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/statistics/allMonth')
      .then(response => response.json())
      .then(data => setStatistics(data))
      .catch(error => console.log(error));
  }, []);

  if (statistics === null || statistics === undefined) {
    return <p>Loading...</p>;
  }

  const monthData = Array.from({ length: 12 }, (_, index) => {
    const month = index + 1;
    const name = `${month.toString().padStart(2, '0')}`;
    const value = statistics.find(item => item.month === month)?.totalOrders || 0;
  
    return { name, value };
  });
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        width={500}
        height={400}
        data={monthData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ProductChart;
