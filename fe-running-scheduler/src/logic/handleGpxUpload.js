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
    console.log("parsedGpx: ", parsedGpx);
    
    // const track = parsedGpx.gpx.trk[0];

    // for (let i = 0; i < track.trkseg.length; i++) {
    //   const trackSegment = track.trkseg[i];

    const trackPointsArray = parsedGpx.gpx.trk.trkseg[0].trkpt;
    console.log("trackPointsArray: ", trackPointsArray);
    
    let accHeartRate = 0;
    let numberOfTrackPointsWithHrData = trackPointsArray.length;
    for (let i = 0; i < trackPointsArray.length; i++) {
      // console.log(trackPointsArray[i].extensions?.["gpxdata:hr"]);

      if (trackPointsArray[i]?.extensions?.["gpxdata:hr"]?._text) {
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

      // array of velocities for graph
      const velocities = [];

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

        // Calculate velocity
        if (timeDiff > 0) {
          const velocity = segmentDistance / timeDiff; // m/s
          if (velocity > 0 && velocity < 15) {
            // 15 m/s = 1.1 min/km : exclude outliers
            velocities.push({
              time: totalTime,
              velocity: velocity,
            });
          } else if (isNaN(velocity)) {
            velocities.push({
              time: totalTime,
              velocity: 0,
            });
          } else {
            velocities.push({
              time: totalTime,
              velocity: 0,
            });
          }
        }

        // Calculate "active" distance and time if speed is greater than threshold
        if (segmentDistance / timeDiff > 0.4) {
          activityDistance += segmentDistance;
          activityTime += timeDiff;
        }
      }
      // console.log("velocities: ", velocities);

      // Smooth velocity data
      const smoothedVelocities = smoothVelocity(velocities);
      // console.log(smoothedVelocities);

      // Reduce array size for plotting
      const reducedSmoothedVelocities = reduceArray(smoothedVelocities, 10);

      // console.log("activityTime: ", activityTime);
      // console.log("total time: ", totalTime);
      // console.log("activityDistance: ", activityDistance);
      // console.log("total distance: ", totalDistance);

      // set run data
      extractedData.name = gpxParser.tracks[0].name;
      extractedData.date = gpxParser.metadata.time
        ? new Date(gpxParser.metadata.time).toISOString()
        : new Date(points[0].time).toISOString(); // carries the date
      extractedData.duration = activityTime; // duration in seconds
      extractedData.totalTime = totalTime; // duration in seconds
      extractedData.distance = parseFloat(totalDistance / 1000).toFixed(2); // convert meters to kilometers
      extractedData.speed = (activityDistance / activityTime) * 3.6; // convert m/s to km/h
      extractedData.tempo = parseFloat(
        activityTime / 60 / extractedData.distance
      ).toFixed(2); // convert seconds per kilometer to minutes per kilometer
      extractedData.avg_hr = Math.round(getAverageHeartRate(file))
        ? Math.round(getAverageHeartRate(file))
        : null;
      // console.log("avg_hr: ", extractedData.avg_hr);

      // extractedData.velocityArray = velocities.map((v) =>
      //   parseFloat(16.666666667 / v.velocity).toFixed(2)
      // ); // convert m/s to min/km
      // extractedData.timeArray = velocities.map((v) =>
      //   parseFloat(v.time / 60).toFixed(1)
      // ); // convert seconds to minutes

      extractedData.velocityArray = reducedSmoothedVelocities.map((v) => {
        if (v.velocity > 0) {
          return parseFloat(16.666666667 / v.velocity).toFixed(2);
        } else {
          return 0;
        }
      }); // convert m/s to min/km
      extractedData.timeArray = reducedSmoothedVelocities.map((v) =>
        parseFloat(v.time / 60).toFixed(1)
      ); // convert seconds to minutes
    }
  }
  // console.log("extractedData: ", extractedData);

  return extractedData;
};

function smoothVelocity(velocities, smoothingInterval = 30) {
  const smoothedVelocities = [];

  for (let i = 0; i < velocities.length; i++) {
    const currentTime = velocities[i].time;

    // Get points within the smoothing interval
    const intervalVelocities = velocities.filter(
      (v) => v.time >= currentTime - smoothingInterval && v.time <= currentTime
    );

    // Calculate average velocity within interval
    const averageVelocity =
      intervalVelocities.reduce((sum, v) => sum + v.velocity, 0) /
      intervalVelocities.length;

    smoothedVelocities.push({
      time: currentTime,
      velocity: averageVelocity,
    });
  }

  return smoothedVelocities;
}

function reduceArray(array, interval) {
  const reducedArray = [];

  array.reduce((acc, curr, index) => {
    if (index % interval === 0) {
      acc.push(curr);
    }
    return acc;
  }, reducedArray);

  return reducedArray;
}
