import { useState } from "react";

const JsonFileHandler = () => {
  const [importedJson, setImportedJson] = useState(null);

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
    <div>
      <h2>JSON File Handler</h2>

      <div>
        <h3>Export JSON</h3>
        <button
          onClick={() =>
            exportJson({ name: "John Doe", age: 30, city: "New York" })
          }
        >
          Export Sample JSON
        </button>
      </div>

      <div>
        <h3>Import JSON</h3>
        <input type="file" accept=".json" onChange={importJson} />
      </div>

      {importedJson && (
        <div>
          <h3>Imported JSON Data</h3>
          <pre>{JSON.stringify(importedJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JsonFileHandler;
