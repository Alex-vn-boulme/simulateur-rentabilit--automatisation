import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Task {
  id: number;
  name: string;
  timePerTask: number;
  frequencyPerWeek: number;
}

interface ProjectionChartProps {
  tasks: Task[];
  hourlyCost: number;
}

export default function ProjectionChart({ tasks, hourlyCost }: ProjectionChartProps) {
  const years = ['Année 1', 'Année 2', 'Année 3', 'Année 4'];
  
  const colors = [
    { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.3)' },
    { border: '#e91e8c', bg: 'rgba(233, 30, 140, 0.3)' },
    { border: '#06b6d4', bg: 'rgba(6, 182, 212, 0.3)' },
    { border: '#10b981', bg: 'rgba(16, 185, 129, 0.3)' },
    { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.3)' },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#ffffff',
          padding: 15,
          font: {
            size: 13,
            weight: 'normal' as const
          },
          usePointStyle: false,
          boxWidth: 30,
          boxHeight: 12
        }
      },
      title: {
        display: true,
        text: 'Économies cumulées sur 4 ans',
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        color: '#ffffff',
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          beforeTitle: function(tooltipItems: any) {
            if (tooltipItems.length > 0) {
              const totalValue = Math.round(tooltipItems[tooltipItems.length - 1].parsed.y);
              return `💰 TOTAL: ${totalValue.toLocaleString('fr-FR')}€`;
            }
            return '';
          },
          title: function() {
            return '';
          },
          label: function(context: any) {
            const label = context.dataset.label;
            const value = context.parsed.y;
            const previousValue = context.dataset.previousData?.[context.dataIndex] || 0;
            const taskValue = Math.round(value - previousValue);
            
            return `${label}: ${taskValue.toLocaleString('fr-FR')}€`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return value.toLocaleString('fr-FR') + '€';
          },
          color: '#9ca3af'
        },
        grid: {
          color: '#1f2937'
        }
      },
      x: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: '#1f2937'
        }
      }
    }
  };

  // Calculer les données cumulatives
  const datasets: any[] = [];
  let previousData = [0, 0, 0, 0];
  
  tasks.filter(task => task.name).forEach((task, index) => {
    const yearlyTaskSavings = (task.timePerTask / 60) * task.frequencyPerWeek * hourlyCost * 52;
    const taskData = years.map((_, yearIndex) => yearlyTaskSavings * (yearIndex + 1));
    const cumulativeData = taskData.map((value, i) => value + previousData[i]);
    const colorIndex = index % colors.length;

    datasets.push({
      label: task.name || `Tâche ${index + 1}`,
      data: cumulativeData,
      borderColor: colors[colorIndex].border,
      backgroundColor: colors[colorIndex].bg,
      borderWidth: 2,
      fill: index === 0 ? 'origin' : `-${index}`,
      tension: 0.4,
      pointBackgroundColor: colors[colorIndex].border,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      previousData: previousData
    });

    previousData = [...cumulativeData];
  });


  const data = {
    labels: years,
    datasets: datasets,
  };

  return (
    <div className="h-80 mt-4">
      <Line options={options} data={data} />
    </div>
  );
}