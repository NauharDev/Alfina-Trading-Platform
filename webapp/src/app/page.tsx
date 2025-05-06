'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
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
} from 'chart.js'
import { useEffect, useState } from 'react'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Mock data for the portfolio chart
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'Portfolio Performance',
      data: [10000, 11200, 10800, 12400, 12800, 14500, 15200, 16800, 18500],
      fill: true,
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

const mockStockData = [
  { symbol: 'AAPL', price: 182.52, change: +1.25 },
  { symbol: 'GOOGL', price: 141.80, change: -0.45 },
  { symbol: 'TSLA', price: 172.63, change: +2.80 },
  { symbol: 'AMZN', price: 178.15, change: +1.63 },
  { symbol: 'MSFT', price: 420.45, change: +3.21 },
]

const StockTicker = ({ stock }: { stock: typeof mockStockData[0] }) => {
  const [currentPrice, setCurrentPrice] = useState(stock.price)
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price changes
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 2
        return Number((prev + change).toFixed(2))
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const priceChange = currentPrice - stock.price
  const isPositive = priceChange >= 0

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <div className="font-semibold text-gray-800">{stock.symbol}</div>
      <div className="flex items-center space-x-3">
        <span className="font-mono">${currentPrice.toFixed(2)}</span>
        <span className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} 
          {Math.abs(priceChange).toFixed(2)}%
        </span>
      </div>
    </motion.div>
  )
}

// Add this new mock data for the rule builder demo
const demoRules = [
  { type: 'UNIVERSE', condition: 'Market Cap > $1B' },
  { type: 'UNIVERSE', condition: 'Volume > 500K' },
  { type: 'SIGNAL', condition: 'RSI(14) < 30' },
  { type: 'META', condition: 'MACD Line > Signal Line' },
  { type: 'EXIT', condition: 'Take Profit: 15%' },
  { type: 'EXIT', condition: 'Stop Loss: 5%' },
]

export default function HomePage() {
  return (
    <main className="h-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 text-transparent bg-clip-text animate-gradient"
            >
              Build Your Strategy With No Code
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 mb-8"
            >
              Create, backtest, and deploy trading strategies without writing a single line of code. 
              Start trading smarter, not harder.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="/signup" 
                className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started for Free
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Portfolio Performance Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Chart */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Portfolio Performance</h2>
                <div className="flex space-x-2">
                  {['1D', '1W', '1M', '1Y', 'ALL'].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px]">
                <Line data={chartData} options={chartOptions} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold"
                >
                  +85% YTD
                </motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: 'Total Value', value: '$18,532.21' },
                  { label: 'Daily Change', value: '+$345.12' },
                  { label: 'Return', value: '85.32%' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-lg font-semibold text-gray-800">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stock Tickers */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Market Watch</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  View All
                </motion.button>
              </div>
              <div className="space-y-2">
                {mockStockData.map((stock, index) => (
                  <StockTicker key={stock.symbol} stock={stock} />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-gray-50 rounded-lg"
              >
                <div className="text-sm text-gray-600 mb-2">Market Summary</div>
                <div className="text-sm text-gray-800">
                  S&P 500: <span className="text-green-500">+1.2%</span> • 
                  NASDAQ: <span className="text-green-500">+0.8%</span> • 
                  DOW: <span className="text-red-500">-0.3%</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rule Builder Demo Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Build Trading Rules Visually
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Create complex trading strategies using our intuitive rule builder. No coding required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Rule Builder Preview */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex space-x-4 mb-6">
                {['Universe', 'Signal', 'Holding', 'Exit'].map((tab, index) => (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      index === 0 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-3">
                {demoRules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      rule.type === 'UNIVERSE' ? 'bg-blue-100 text-blue-700' :
                      rule.type === 'SIGNAL' ? 'bg-green-100 text-green-700' :
                      rule.type === 'META' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {rule.type}
                    </span>
                    <span className="text-gray-700 font-medium">{rule.condition}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="ml-auto text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </motion.button>
                  </motion.div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
                >
                  + Add Rule
                </motion.button>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">Simple Yet Powerful</h3>
                <p className="text-gray-600">
                  Our visual rule builder lets you create sophisticated trading strategies without writing code. 
                  Combine technical indicators, price action, and fundamental data with ease.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Universe Rules', desc: 'Filter your trading universe based on market cap, volume, sector, and more.' },
                  { title: 'Signal Generation', desc: 'Combine technical indicators and create complex entry conditions.' },
                  { title: 'Risk Management', desc: 'Set stop-loss and take-profit levels to protect your capital.' },
                  { title: 'Position Sizing', desc: 'Define how much capital to allocate to each trade.' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  id="tryRuleBuilderButton"
                  href="/signup" 
                  className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Try Rule Builder
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
          >
            Why Choose Our Platform?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: '🎯',
                title: 'Visual Strategy Builder',
                description: 'Drag and drop indicators, set conditions, and create complex trading strategies with our intuitive interface.'
              },
              {
                icon: '📊',
                title: 'Real-Time Backtesting',
                description: 'Test your strategies against historical data and optimize them for better performance.'
              },
              {
                icon: '🚀',
                title: 'One-Click Deployment',
                description: 'Deploy your strategies to live markets with a single click and monitor their performance.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="text-blue-500 text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10K+', label: 'Active Traders' },
              { value: '$2M+', label: 'Daily Volume' },
              { value: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20">
        <div className="container mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of traders who are already using our platform to automate their trading strategies.
            </p>
            <Link 
              href="/signup" 
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}