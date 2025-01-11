import React, { useContext } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { GlobalState } from '../../../GlobalState';

function CategoriesChart({ statistics }) {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  if (statistics === null || statistics === undefined) {
    return <p>Loading...</p>;
  }

  const categoryIds = statistics.categoryStats
    .filter(category => category.totalSold > 0)
    .map(category => ({ name: category._id, value: category.totalSold }));

  const updatedData = categoryIds.map(item => {
    const category = categories.find(category => category._id === item.name);
    const name = category ? category.name : item.name;
    return { name, value: item.value };
  });

  const COLORS = generateRandomColors(updatedData.length);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart width={400} height={280}>
          <Pie
            data={updatedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {updatedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="color-explain">
        {updatedData.map((item, index) => (
          <div key={item.name} className="color-explain-item">
            <div className="color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
            <div className="category-type">{item.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function generateRandomColors(count) {
  const colors = [];

  for (let i = 0; i < count; i++) {
    let color = generateRandomColor();

    while (colors.includes(color)) {
      color = generateRandomColor();
    }

    colors.push(color);
  }

  return colors;
}

function generateRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export default CategoriesChart;
