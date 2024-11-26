'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SessionData } from '@/types/dashboard'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SessionChartProps {
  data: SessionData
}

export function SessionChart({ data }: SessionChartProps) {
  const chartData = {
    labels: ['Present', 'Absent', 'Excused'],
    datasets: [
      {
        data: [data.present, data.absent, data.excused],
        backgroundColor: ['#20B2AA', '#FF6B6B', '#FFB347'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Session Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}

