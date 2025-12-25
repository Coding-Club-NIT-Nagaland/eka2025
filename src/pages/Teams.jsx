import React from 'react';
import { motion } from 'framer-motion';

const Teams = () => {
  // Sample data for team members
  const teamMembers = [
    // General Secretary
    {
      id: 1,
      name: 'John Doe',
      position: 'General Secretary',
      image: 'path/to/general-secretary.jpg',
      description: 'Overall in-charge of the team and events'
    },
    // Secretaries (8 pairs)
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 2, // Start from ID 2
      name: `Secretary ${i + 1} Name`,
      position: `Secretary ${i + 1}`,
      image: 'path/to/secretary.jpg',
      description: `Description for Secretary ${i + 1}`
    }))
  ];

  // Card component
  const MemberCard = ({ member, isGeneralSecretary = false }) => (
    <motion.div 
      className={`bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 
        ${isGeneralSecretary ? 'col-span-2' : 'h-full'}
        hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300`}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-4 overflow-hidden">
          {/* Replace with actual image */}
          <div className="w-full h-full flex items-center justify-center text-white text-4xl">
            {member.name.charAt(0)}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        <p className="text-cyan-400 font-medium mt-1">{member.position}</p>
        <p className="text-gray-300 mt-2 text-sm">{member.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="text-gray-300 mt-3">Meet the people behind Ekarikthin 2025</p>
        </div>

        {/* General Secretary */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">General Secretary</h2>
          <div className="max-w-2xl mx-auto">
            <MemberCard member={teamMembers[0]} isGeneralSecretary={true} />
          </div>
        </div>

        {/* Secretaries */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Secretaries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.slice(1).map((member, index) => (
              <React.Fragment key={member.id}>
                {index % 2 === 0 && index > 0 && (
                  <div className="col-span-2 text-center py-4">
                    <h3 className="text-xl font-semibold text-cyan-300">
                      {`Secretary ${index + 1} & ${index + 2}`}
                    </h3>
                  </div>
                )}
                <MemberCard member={member} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
