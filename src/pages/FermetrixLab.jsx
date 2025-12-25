import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, FlaskConical, Code, Database, Atom, Shield, Cpu, Server, Network } from 'lucide-react';

const FermetrixLab = () => {
  useEffect(() => {
    document.title = 'Fermetrix Lab | Ekarikthin 2025';
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-indigo-600" />,
      title: 'AI & Machine Learning',
      description: 'Pioneering research in artificial intelligence and machine learning applications.'
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-indigo-600" />,
      title: 'Biotechnology',
      description: 'Innovative research at the intersection of biology and technology.'
    },
    {
      icon: <Code className="w-8 h-8 text-indigo-600" />,
      title: 'Software Development',
      description: 'Building cutting-edge software solutions for complex problems.'
    },
    {
      icon: <Database className="w-8 h-8 text-indigo-600" />,
      title: 'Data Science',
      description: 'Transforming data into actionable insights and intelligence.'
    },
    {
      icon: <Atom className="w-8 h-8 text-indigo-600" />,
      title: 'Quantum Computing',
      description: 'Exploring the next frontier of computational power.'
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: 'Cybersecurity',
      description: 'Developing robust security solutions for the digital age.'
    },
    {
      icon: <Cpu className="w-8 h-8 text-indigo-600" />,
      title: 'Embedded Systems',
      description: 'Innovating at the hardware-software interface.'
    },
    {
      icon: <Server className="w-8 h-8 text-indigo-600" />,
      title: 'Cloud Computing',
      description: 'Building scalable and reliable cloud infrastructure.'
    },
    {
      icon: <Network className="w-8 h-8 text-indigo-600" />,
      title: 'IoT Solutions',
      description: 'Connecting the physical and digital worlds.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Director of Research',
      expertise: 'AI & Machine Learning',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Lead Biotechnologist',
      expertise: 'Biotechnology',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Senior Data Scientist',
      expertise: 'Data Science & Analytics',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Quantum Computing Lead',
      expertise: 'Quantum Algorithms',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Fermetrix Lab
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Pioneering the Future of Technology and Innovation
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                to="/contact" 
                className="px-8 py-3 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-indigo-100 transition duration-300 transform hover:scale-105"
              >
                Get in Touch
              </Link>
              <Link 
                to="#research" 
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300 transform hover:scale-105"
              >
                Explore Research
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shaping the Future Through Innovation
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Fermetrix Lab is a cutting-edge research facility dedicated to pushing the boundaries of technology and science. 
              Our interdisciplinary team of experts collaborates to solve complex problems and create groundbreaking solutions.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Our Mission</h2>
                <p className="text-xl text-gray-500">
                  To drive technological innovation through interdisciplinary research, collaboration, and education, creating solutions that address global challenges.
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
                  {features.slice(0, 4).map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                          <p className="mt-1 text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Research Areas</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Exploring the Frontiers of Technology
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our research spans multiple disciplines, driving innovation and creating real-world impact.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flow-root bg-white px-6 pb-8 rounded-lg h-full">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-md shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet Our Experts
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              A diverse team of researchers, scientists, and innovators driving our mission forward.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex items-center justify-center h-24 w-24 rounded-full overflow-hidden bg-gray-200">
                        <img
                          className="h-full w-full object-cover"
                          src={member.image}
                          alt={member.name}
                        />
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">{member.name}</h3>
                    <p className="mt-1 text-base text-indigo-600 text-center">{member.role}</p>
                    <p className="mt-2 text-sm text-gray-500 text-center">{member.expertise}</p>
                    <div className="mt-4 flex justify-center space-x-4">
                      <a href="#" className="text-gray-400 hover:text-indigo-600">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-indigo-600">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-indigo-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-10"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
          <div className="absolute inset-0 bg-indigo-900 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to collaborate?</span>
            <span className="block">Let's build the future together.</span>
          </h2>
          <div className="mt-8 flex">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Contact Us
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-100 bg-indigo-800 bg-opacity-60 hover:bg-opacity-70"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FermetrixLab;
