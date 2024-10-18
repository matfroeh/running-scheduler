import GpxParser from "gpxparser";
import haversine from "haversine-distance";

export const handleGpxUpload = (file) => {
  var extractedData = {};

  // Function to handle file upload and processing
  if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const gpxData = e.target.result;

    // Parse GPX data
    const gpxParser = new GpxParser();
    // gpxParser.parse(gpxData);
    gpxParser.parse(file);
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
      extractedData.name = gpxParser.tracks[0].name;
      extractedData.date = gpxParser.metadata.time; // carries the date
      extractedData.duration = totalTime / 60; // duration in minutes
      extractedData.distance = totalDistance / 1000; // convert meters to kilometers
      extractedData.speed = (totalDistance / totalTime) * 3.6; // convert m/s to km/h
      extractedData.tempo = totalTime / 60 / extractedData.distance; // convert to min/km

      // console.log("Tempo:", extractedData.tempo);
      // console.log(`Total distance: ${extractedData.distance} km`);
    }
    // console.log(extractedData);
  }
  // reader.readAsText(file);

  // }

  return extractedData;
};
