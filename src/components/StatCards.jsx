import React from "react";

const StatCard = ({ title, value, icon, color = "indigo" }) => {
  const bgColor = `bg-${color}-100`;
  const textColor = `text-${color}-700`;
  const iconBg = `bg-${color}-200`;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg shadow-sm border ${bgColor}`}>
      <div className={`p-2 rounded-full ${iconBg} text-xl`}>
        {icon}
      </div>
      <div>
        <h4 className={`text-sm font-medium ${textColor}`}>{title}</h4>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;