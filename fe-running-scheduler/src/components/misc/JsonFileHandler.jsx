import { useState } from "react";

const JsonFileHandler = ({ schedule, runs, calendarTitle }) => {
  const [importedJson, setImportedJson] = useState(null);

  const combinedCalendars = {
    schedule: schedule,
    runs: runs,
  };

  // Function to export a JSON object to a file
  const exportJson = (jsonObject, fileName = "data.json") => {
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Function to handle importing a JSON file
  const importJson = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonObject = JSON.parse(e.target.result);
          setImportedJson(jsonObject);
          alert("JSON imported successfully!");
        } catch (error) {
          alert("Invalid JSON file!");
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please select a valid JSON file.");
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-center">
        <button
          className="btn"
          onClick={() => exportJson(combinedCalendars, "calendars.json")}
        >
          {`Export \u0022${calendarTitle}\u0022 as JSON`}
        </button>
      </div>

      {/* <div>
      <h3>Import JSON Data</h3>
        <input type="file" accept=".json" onChange={importJson} />
      </div>

      {importedJson && (
        <div>
          <h3>Imported JSON Data</h3>
          <pre>{JSON.stringify(importedJson, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default JsonFileHandler;
