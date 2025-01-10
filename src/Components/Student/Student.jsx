import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    year: "",
    coursesEnrolled: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://node-mongo-all.onrender.com/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle delete
  const handleDelete = async (rollNumber) => {
    try {
      await axios.delete(`https://node-mongo-all.onrender.com/students/v1/${rollNumber}`);
      // Update the UI immediately by filtering out the deleted student
      setStudents((prev) => prev.filter((student) => student.rollNumber !== rollNumber));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Handle edit
  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      department: student.department,
      year: student.year,
      coursesEnrolled: student.coursesEnrolled.join(", "),
    });
    setEditMode(true);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedStudents;

      if (editMode) {
        // Update existing student
        await axios.patch(
          `https://node-mongo-all.onrender.com/students/${formData.rollNumber}`,
          {
            ...formData,
            coursesEnrolled: formData.coursesEnrolled.split(",").map((course) => course.trim()),
          }
        );
        updatedStudents = students.map((student) =>
          student.rollNumber === formData.rollNumber
            ? { ...student, ...formData, coursesEnrolled: formData.coursesEnrolled.split(",").map((course) => course.trim()) }
            : student
        );
      } else {
        // Add new student
        await axios.post("https://node-mongo-all.onrender.com/students", {
          ...formData,
          coursesEnrolled: formData.coursesEnrolled.split(",").map((course) => course.trim()),
        });
        updatedStudents = [...students, { ...formData, coursesEnrolled: formData.coursesEnrolled.split(",").map((course) => course.trim()) }];
      }

      // Update state with new list of students
      setStudents(updatedStudents);

      // Clear the form and reset the edit mode
      setFormData({
        name: "",
        rollNumber: "",
        department: "",
        year: "",
        coursesEnrolled: "",
      });
      setEditMode(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex">
      {/* Left Side - Student List */}
      <div className="w-3/5 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6">Student List</h1>
        {students.length > 0 ? (
          <ul className="space-y-4">
            {students.map((student, index) => (
              <li
                key={`${student.rollNumber}-${index}`}  // Adding index as a fallback for uniqueness
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Name:</strong> {student.name}
                  </p>
                  <p>
                    <strong>Roll Number:</strong> {student.rollNumber}
                  </p>
                  <p>
                    <strong>Department:</strong> {student.department}
                  </p>
                  <p>
                    <strong>Year:</strong> {student.year}
                  </p>
                  <p>
                    <strong>Courses Enrolled:</strong> {student.coursesEnrolled.join(", ")}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(student.rollNumber)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg">No students to display.</p>
        )}
      </div>

      {/* Right Side - Form */}
      <div className="w-2/5 p-6 bg-white rounded-lg shadow-lg ml-4">
        <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Student" : "Add Student"}</h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Enter roll number"
            value={formData.rollNumber}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
            disabled={editMode}
          />
          <input
            type="text"
            name="department"
            placeholder="Enter department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="year"
            placeholder="Enter year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="coursesEnrolled"
            placeholder="Enter courses (comma-separated)"
            value={formData.coursesEnrolled}
            onChange={(e) => setFormData({ ...formData, coursesEnrolled: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
          >
            {editMode ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentList;
