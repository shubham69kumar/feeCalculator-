import { useState } from "react";
import {feeData} from "./assets/feeData.js";

export default function App() {
  const [selectedFee, setSelectedFee] = useState(null);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleFeeSelect = (fee) => {
    setSelectedFee(fee);
    setSelectedNationality(null);
    setSelectedCourse(null);
    setSelectedLevel(null);
  };

  const handleNationalitySelect = (nationality) => {
    setSelectedNationality(nationality);
    setSelectedCourse(null);
    setSelectedLevel(null);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedLevel(null);
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const calculateFee = () => {
    if (
      !selectedFee ||
      !selectedNationality ||
      !selectedCourse ||
      !selectedLevel
    ) {
      return null;
    }

    const feeObj =
      feeData[selectedFee][selectedNationality][selectedCourse][selectedLevel];
    return feeObj ? feeObj.amount : null;
  };


  const renderNationalityOptions = () => {
    if (!selectedFee) return null;
    return Object.keys(feeData[selectedFee]).map((nationality) => (
      <button
        key={nationality}
        onClick={() => handleNationalitySelect(nationality)}
      >
        {nationality}
      </button>
    ));
  };

  const renderCourseOptions = () => {
    if (!selectedFee || !selectedNationality) return null;
    const courseData = feeData[selectedFee][selectedNationality];
    const courses = Object.keys(courseData);
    const isAllCourses = courses.includes("ALL_COURSES");

    if (isAllCourses) {
      
      return (
        <>
          <button onClick={() => handleCourseSelect("ALL_COURSES")}>
            Medical
          </button>
          <button onClick={() => handleCourseSelect("ALL_COURSES")}>
            Dental
          </button>
          <button onClick={() => handleCourseSelect("ALL_COURSES")}>
            Ayurveda
          </button>
        </>
      );
    } else {
      
      return courses.map((course) => (
        <button key={course} onClick={() => handleCourseSelect(course)}>
          {course}
        </button>
      ));
    }
  };

  const renderLevelOptions = () => {
    if (!selectedFee || !selectedNationality || !selectedCourse) return null;
    const levelData = feeData[selectedFee][selectedNationality][selectedCourse];
    const levels = Object.keys(levelData);
    const isAllLevels = levels.includes("ALL_LEVEL");

    if (isAllLevels) {
     
      return (
        <>
          <button onClick={() => handleLevelSelect("ALL_LEVEL")}>UG</button>
          <button onClick={() => handleLevelSelect("ALL_LEVEL")}>PG</button>
          <button onClick={() => handleLevelSelect("ALL_LEVEL")}>
            DIPLOMA
          </button>
          <button onClick={() => handleLevelSelect("ALL_LEVEL")}>Ph.D</button>
        </>
      );
    } else {
      
      return levels.map((level) => (
        <button key={level} onClick={() => handleLevelSelect(level)}>
          {level}
        </button>
      ));
    }
  };

  return (
    <div>
      <h1>University Fee Calculator</h1>
      <p>Select your fee type:</p>
      <div>
        {Object.keys(feeData).map((fee) => (
          <button key={fee} onClick={() => handleFeeSelect(fee)}>
            {fee}
          </button>
        ))}
      </div>

      {selectedFee && (
        <>
          <p>Select your nationality:</p>
          <div>{renderNationalityOptions()}</div>

          {selectedNationality && (
            <>
              <p>Select your course:</p>
              <div>{renderCourseOptions()}</div>

              {selectedCourse && (
                <>
                  <p>Select your course level:</p>
                  <div>{renderLevelOptions()}</div>

                  {selectedLevel && (
                    <p>Your fee amount is: {calculateFee()} Rs.</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
