import React from 'react'
import StatsGrid from './Dashboard/StatsGrid.jsx';
import ChartSection from "./Dashboard/ChartSection.jsx";
import TableSection from "./Dashboard/TableSection.jsx";
import ActivityFeed from './Dashboard/ActivityFeed.jsx';

function Dashboard() {
  return (
    <div className="space-y-6 min-h-screen bg-white dark:bg-slate-900 p-6 transition-colors duration-300">
      <StatsGrid/>

      <ChartSection/>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TableSection />
        </div>
        <div className="">
          <ActivityFeed/>
        </div>
      </div>

    </div>
  )
}

export default Dashboard