import GpxParser from "gpxparser";
import haversine from "haversine-distance";

export const handleGpxUpload = (file) => {
  var distance = 0;
  var speed = 0;
  var tempo = 0;
  var runName = "No name";
  var duration = 0;

  const getTempoAsMinutesSecondsString = (tempo) => {
    const minutes = Math.floor(tempo);
    const seconds = (tempo - minutes) * 60;
    return `${minutes}:${seconds.toFixed(0).padStart(2, "0")} min/km`;
  };

  const getDurationAsHoursMinutesSecondsString = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor((duration - hours) * 60);
    
  };

  // Function to handle file upload and processing
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const gpxData = e.target.result;

      // Parse GPX data
      const gpxParser = new GpxParser();
      gpxParser.parse(gpxData);
      // console.log(gpxParser);
      // console.log(gpxParser.metadata.time);
      // console.log(gpxParser.tracks[0].distance.total);

      const track = gpxParser.tracks[0];
      const points = track.points;

      if (points.length > 1) {
        // Calculate total distance and speed
        let totalDistance = 0;
        let totalTime = 0;

        for (let i = 1; i < points.length; i++) {
          const prevPoint = points[i - 1];
          const currentPoint = points[i];

          // Calculate distance between two points
          const prevCoords = { lat: prevPoint.lat, lon: prevPoint.lon };
          const currentCoords = {
            lat: currentPoint.lat,
            lon: currentPoint.lon,
          };
          const segmentDistance = haversine(prevCoords, currentCoords);
          totalDistance += segmentDistance;

          // Calculate time difference in seconds
          const prevTime = new Date(prevPoint.time).getTime();
          const currentTime = new Date(currentPoint.time).getTime();
          const timeDiff = (currentTime - prevTime) / 1000; // time in seconds
          totalTime += timeDiff;
        }
        // console.log(totalTime);

        // set run data
        runName = gpxParser.tracks[0].name;
        

        distance = totalDistance / 1000; // convert meters to kilometers
        speed = (totalDistance / totalTime) * 3.6; // convert m/s to km/h
        tempo = getTempoAsMinutesSecondsString(totalTime / 60 / distance); // convert to min/km
        
        console.log("Tempo:", tempo);
        console.log(`Total distance: ${distance} km`);
      }
    };
    reader.readAsText(file);
  }

  return { runName, distance, tempo, speed };
};
