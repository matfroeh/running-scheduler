import GpxParser from "gpxparser";
import haversine from "haversine-distance";
import xml2js from "xml-js";

export const handleGpxUpload = (file) => {
  var extractedData = {};

  // ToDO: this will work for COROS, but different watches have different Extensions-Format
  // ToDO: one refinement would be to have different options e.g. discarding the first 5 minutes of HR-recording
  const getAverageHeartRate = (file) => {
    let convert = xml2js;
    const parsedGpx = convert.xml2js(file, { compact: true, spaces: 4 });
    const trackPointsArray = parsedGpx.gpx.trk.trkseg.trkpt;
    let accHeartRate = 0;
    let numberOfTrackPointsWithHrData = trackPointsArray.length;
    for (let i = 0; i < trackPointsArray.length; i++) {
      // console.log(trackPointsArray[i]);

      if (trackPointsArray[i]?.extensions["gpxdata:hr"]?._text) {
        accHeartRate += parseInt(
          trackPointsArray[i].extensions["gpxdata:hr"]._text
        );
      }
      // if no HR data is available, exclude this track point from the average calculation
      else {
        numberOfTrackPointsWithHrData--;
      }
    }
    return accHeartRate / numberOfTrackPointsWithHrData;
  };

  // Function to handle file upload and processing
  if (file) {
    // Parse GPX data
    const gpxParser = new GpxParser();
    gpxParser.parse(file);
    const track = gpxParser.tracks[0];
    const points = track.points;

    if (points.length > 1) {
      // Calculate total distance and speed
      let totalDistance = 0;
      let totalTime = 0;
      // Distance and Time "active" i.e. excluding pauses
      let activityDistance = 0;
      let activityTime = 0;

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

        // Calculate "active" distance and time if speed is greater than threshold
        if (segmentDistance / timeDiff > 0.15) {
          activityDistance += segmentDistance;
          activityTime += timeDiff;          
        }
      }

      console.log("activityTime: ", activityTime);
      console.log("total time: ", totalTime);
      console.log("activityDistance: ", activityDistance);
      console.log("total distance: ", totalDistance);
      
      
      

      // set run data
      extractedData.name = gpxParser.tracks[0].name;
      extractedData.date = gpxParser.metadata.time; // carries the date
      extractedData.duration = activityTime; // duration in seconds
      extractedData.totalTime = totalTime; // duration in seconds
      extractedData.distance = parseFloat(totalDistance / 1000).toFixed(2); // convert meters to kilometers
      extractedData.speed = (activityDistance / activityTime) * 3.6; // convert m/s to km/h
      extractedData.tempo = parseFloat(
        activityTime / 60 / extractedData.distance
      ).toFixed(2);
      extractedData.avg_hr = Math.round(getAverageHeartRate(file));
    }
  }

  return extractedData;
};
