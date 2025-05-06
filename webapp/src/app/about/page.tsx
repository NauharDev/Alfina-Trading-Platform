'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// Timeline data for company milestones
const milestones = [
  {
    year: '2024',
    title: 'Platform Launch',
    description: 'Launched our no-code trading platform, revolutionizing algorithmic trading accessibility.'
  },
  {
    year: '2024 Q2',
    title: 'First 1000 Users',
    description: 'Reached our first milestone of 1000 active traders on the platform.'
  },
  {
    year: '2024 Q3',
    title: 'Advanced Features',
    description: 'Introduced advanced backtesting and portfolio optimization tools.'
  },
  {
    year: '2024 Q4',
    title: 'Global Expansion',
    description: 'Expanded our services to international markets and multiple exchanges.'
  }
]

const teamMembers = [
  {
    initials: 'KL',
    name: 'Kevin Li',
    role: 'CEO & Co-founder',
    bio: 'Former quant with 10+ years of experience in trading.',
    skills: ['Quantitative Trading', 'Risk Management', 'Strategy Development'],
    gradientFrom: 'from-blue-500',
    gradientVia: 'via-indigo-500',
    gradientTo: 'to-teal-400'
  },
  {
    initials: 'AS',
    name: 'Ashwin Santhosh',
    role: 'CTO',
    bio: '15+ years in fintech, specialized in building trading systems.',
    skills: ['System Architecture', 'Trading Infrastructure', 'Team Leadership'],
    gradientFrom: 'from-indigo-500',
    gradientVia: 'via-blue-500',
    gradientTo: 'to-teal-400'
  },
  {
    initials: 'AL',
    name: 'Amos Liu',
    role: 'Managing Partner',
    bio: 'Product veteran with experience at leading fintech companies.',
    skills: ['Product Strategy', 'Market Analysis', 'Growth'],
    gradientFrom: 'from-teal-400',
    gradientVia: 'via-blue-500',
    gradientTo: 'to-indigo-500'
  }
]

const CompanyMetrics = () => {
  const [metrics] = useState([
    { label: 'Trading Volume', value: '$2M+', increment: '+127%' },
    { label: 'Active Users', value: '10,000+', increment: '+85%' },
    { label: 'Success Rate', value: '95%', increment: '+12%' },
    { label: 'Countries', value: '25+', increment: '+40%' }
  ])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</div>
          <div className="text-sm text-gray-600">{metric.label}</div>
          <div className="text-green-500 text-sm font-medium mt-2">{metric.increment} YoY</div>
        </div>
      ))}
    </div>
  )
}

const TeamMemberCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-auto"  // Changed from h-full
    >
      <div className="text-center p-8 rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 flex flex-col h-auto">  {/* Changed from h-full */}
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br ${member.gradientFrom} ${member.gradientVia} ${member.gradientTo} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white text-4xl font-bold">{member.initials}</span>
        </motion.div>
        <div className="flex flex-col">  {/* Removed flex-grow */}
          <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
          <p className="text-blue-600 mb-4">{member.role}</p>
          <p className="text-gray-600 mb-4">{member.bio}</p>
          <motion.div 
            animate={{ height: isHovered ? 'auto' : '0' }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 justify-center py-2">
              {member.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

const Timeline = () => (
  <div className="relative">
    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />
    {milestones.map((milestone, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-end' : ''}`}
      >
        <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 font-bold mb-2">{milestone.year}</div>
            <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
            <p className="text-gray-600">{milestone.description}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
)

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-400 text-transparent bg-clip-text animate-gradient">
                Our Mission
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Democratizing algorithmic trading by making it accessible to everyone, 
                regardless of their coding experience.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-8">
          <CompanyMetrics />
        </div>
      </div>

      {/* Our Story Section with Timeline */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
          >
            Our Journey
          </motion.h2>
          <Timeline />
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Our Culture
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                {
                  title: 'Innovation First',
                  description: 'We encourage creative thinking and embrace new technologies to stay ahead.',
                  icon: '🚀'
                },
                {
                  title: 'User Focused',
                  description: 'Every decision we make starts with our users needs.',
                  icon: '👥'
                },
                {
                  title: 'Continuous Learning',
                  description: 'We invest in our teams growth and development.',
                  icon: '📚'
                },
                {
                  title: 'Transparency',
                  description: 'We believe in open communication and shared success.',
                  icon: '🤝'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
  
  
  