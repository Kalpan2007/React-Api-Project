import React, { useState, useEffect } from 'react';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  // Fetch students when the component loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://node-mongo-all.onrender.com/students');
        const textResponse = await response.text(); // Get response as text first
        console.log('Response text:', textResponse);  // Log the raw response text

        // Check if it's valid JSON
        try {
          const data = JSON.parse(textResponse);  // Try parsing the text as JSON
          console.log('Parsed data:', data);  // Log the parsed data
          setStudents(data);
        } catch (err) {
          setError('Invalid JSON response');
          console.error('Error parsing JSON:', err);
        }
      } catch (err) {
        setError(`Fetch error: ${err.message}`);
        console.error('Fetch error:', err);
      }
    };

    fetchStudents(); // Call the fetch function
  }, []); // Empty dependency array to run only once when the component loads

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center font-bold mb-6">Student List</h1>

      {error && <p className="text-red-600 font-bold text-center mb-4">Error: {error}</p>}

      {students.length > 0 ? (
        <ul className="space-y-4">
          {students.map((student) => (
            <li key={student._id} className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50">
              <div className="text-lg font-medium text-gray-800">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Department:</strong> {student.department}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>Courses Enrolled:</strong> {student.coursesEnrolled.join(', ')}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg">No students to display.</p>
      )}
    </div>
  );
};

export default StudentList;
