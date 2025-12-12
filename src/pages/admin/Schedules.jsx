import React, { useState } from 'react';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Clock, MapPin, X, Check } from 'lucide-react';

const Schedules = () => {
  const [schedules, setSchedules] = useState([
    { 
      id: 1, 
      title: 'Opening Ceremony', 
      date: '2025-02-15', 
      startTime: '09:00', 
      endTime: '10:30',
      location: 'Main Stage',
      description: 'Welcome speech and cultural performances',
      isPublished: true
    },
    { 
      id: 2, 
      title: 'Tech Workshop', 
      date: '2025-02-15', 
      startTime: '11:00', 
      endTime: '13:00',
      location: 'Seminar Hall A',
      description: 'Latest tech trends and hands-on session',
      isPublished: false
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    isPublished: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentSchedule) {
      setSchedules(schedules.map(sch => 
        sch.id === currentSchedule.id ? { ...formData, id: currentSchedule.id } : sch
      ));
    } else {
      const newSchedule = { ...formData, id: Date.now() };
      setSchedules([...schedules, newSchedule]);
    }
    setIsModalOpen(false);
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      description: '',
      isPublished: false
    });
    setCurrentSchedule(null);
  };

  const handleEdit = (schedule) => {
    setCurrentSchedule(schedule);
    setFormData({
      title: schedule.title,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      location: schedule.location,
      description: schedule.description,
      isPublished: schedule.isPublished
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(schedule => schedule.id !== id));
    }
  };

  const togglePublish = (id) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, isPublished: !schedule.isPublished } : schedule
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Schedules</h1>
        <button
          onClick={() => {
            setCurrentSchedule(null);
            setFormData({
              title: '',
              date: '',
              startTime: '',
              endTime: '',
              location: '',
              description: '',
              isPublished: false
            });
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule
        </button>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{schedule.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span className="mr-4">{schedule.date}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{schedule.startTime} - {schedule.endTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => togglePublish(schedule.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    schedule.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {schedule.isPublished ? 'Published' : 'Draft'}
                </button>
                <button
                  onClick={() => handleEdit(schedule)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(schedule.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 text-sm text-gray-600">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-gray-700">{schedule.location}</span>
              </div>
              {schedule.description && (
                <p className="mt-2 text-gray-600">{schedule.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {currentSchedule ? 'Edit Schedule' : 'Add New Schedule'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endTime">
                    End Time *
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublished"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                      Publish this event
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {currentSchedule ? 'Update Schedule' : 'Create Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;
