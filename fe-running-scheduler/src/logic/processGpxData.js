import haversine from "haversine-distance";
import parseGpxData from "@/utils/parseGpxData";

const processGpxData = (file) => {
  if (file) {
    let processedData = {};
    const parsedGpx = parseGpxData(file);
    // console.log("parsedGpx: ", parsedGpx);

    // To array normalized data of tracks and segments, regardless of how many tracks/segments are in the file
    const trackArray = parsedGpx.gpx.trk;

    // Total distance and speed
    let totalDistance = 0;
    let totalTime = 0;
    // Distance and Time "active" i.e. excluding pauses
    let activityDistance = 0;
    let activityTime = 0;
    // array of velocities for graph
    const velocities = [];
    // array of heart rates
    const heartRates = [];

    // Calculate distance, time, and velocity for each track and for each segment and add to total
    for (let i = 0; i < trackArray.length; i++) {
      const track = trackArray[i];
      const trackSegmentArray = track.trkseg;

      for (let j = 0; j < trackSegmentArray.length; j++) {
        const trackSegment = trackSegmentArray[j];
        const points = trackSegment.trkpt;

        heartRates.push(...getHeartRate(points));

        if (points.length > 1) {
          for (let i = 1; i < points.length; i++) {
            const prevPoint = points[i - 1];
            const currentPoint = points[i];

            // Calculate distance between two points
            const prevCoords = {
              lat: prevPoint._attributes.lat,
              lon: prevPoint._attributes.lon,
            };
            const currentCoords = {
              lat: currentPoint._attributes.lat,
              lon: currentPoint._attributes.lon,
            };
            const segmentDistance = haversine(prevCoords, currentCoords);

            totalDistance += segmentDistance;

            // Calculate time difference in seconds
            const prevTime = new Date(prevPoint.time._text).getTime();
            const currentTime = new Date(currentPoint.time._text).getTime();
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
        }
      }
    }
    // Smooth velocity data
    const smoothedVelocities = smoothVelocity(velocities);
    // Reduce array size for plotting
    const reducedSmoothedVelocities = reduceArray(smoothedVelocities, 10);

    // console.log("heartRates: ", heartRates);

    // Set processed data
    processedData.name = trackArray[0].name._text
      ? trackArray[0].name._text
      : "Run"; // Choose first track name or default to "Run"

    processedData.date = parsedGpx.gpx.metadata?.time?._text
      ? new Date(parsedGpx.gpx.metadata.time._text).toISOString()
      : new Date(trackArray[0].trkseg[0].trkpt[0].time._text).toISOString(); // if no metadata time, use first point time

    processedData.duration = activityTime; // duration in seconds
    processedData.totalTime = totalTime; // duration in seconds
    processedData.distance = parseFloat(totalDistance / 1000).toFixed(2); // convert meters to kilometers

    processedData.speed = (activityDistance / activityTime) * 3.6; // convert m/s to km/h
    processedData.tempo = parseFloat(
      activityTime / 60 / processedData.distance
    ).toFixed(2); // convert seconds per kilometer to minutes per kilometer

    // Set average heart rate
    processedData.avg_hr =
      Math.round(
        heartRates.reduce((acc, hr) => acc + hr, 0) / heartRates.length
      ) || null;

    // Get average heart rate
    // processedData.avg_hr = Math.round(getAverageHeartRate(file))
    //   ? Math.round(getAverageHeartRate(file))
    //   : null;
    // console.log("avg_hr: ", extractedData.avg_hr);

    // extractedData.velocityArray = velocities.map((v) =>
    //   parseFloat(16.666666667 / v.velocity).toFixed(2)
    // ); // convert m/s to min/km
    // extractedData.timeArray = velocities.map((v) =>
    //   parseFloat(v.time / 60).toFixed(1)
    // ); // convert seconds to minutes

    processedData.velocityArray = reducedSmoothedVelocities.map((v) => {
      if (v.velocity > 0) {
        return parseFloat(16.666666667 / v.velocity).toFixed(2);
      } else {
        return 0;
      }
    }); // convert m/s to min/km
    processedData.timeArray = reducedSmoothedVelocities.map((v) =>
      parseFloat(v.time / 60).toFixed(1)
    ); // convert seconds to minutes

    return processedData;
  } else {
    throw new Error("No valid file provided");
  }
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

const getHeartRate = (trackPoints) => {
  const heartRateTags = [
    "gpxtpx:hr",
    "hr",
    "heart_rate",
    "gpxdata:hr",
    "gpxtpx:TrackPointExtension",
    "gpxtpx:hr",
  ];
  const heartRates = [];
//   let usedFirstTag = null;
//   let usedSecondTag = null;

  trackPoints.forEach((trkpt) => {
    let heartRate = null;

    // Search within extensions or other nested tags
    if (!heartRate && trkpt.extensions) {
      heartRateTags.forEach((tag) => {
        if (trkpt.extensions[tag]) {
        //   usedFirstTag = tag;
          heartRate = parseInt(trkpt.extensions[tag]._text, 10);
        }
      });
    }

    // Multi nested tags
    if (!heartRate && trkpt.extensions) {
      heartRateTags.forEach((tag) => {
        if (trkpt.extensions[tag]) {
        //   usedFirstTag = tag;
          heartRateTags.forEach((secondTag) => {
            if (trkpt.extensions[tag][secondTag]) {
            //   usedSecondTag = secondTag;
              heartRate = parseInt(trkpt.extensions[tag][secondTag]._text, 10);
            }
          });
        }
      });
    }

    // Check for inline heart rate tags
    heartRateTags.forEach((tag) => {
      if (!heartRate && trkpt[tag]) {
        heartRate = parseInt(trkpt[tag], 10);
      }
    });

    // If heart rate found, add to the result
    if (heartRate) {
      heartRates.push(heartRate);
    }
  });

//   console.log("usedFirstTag: ", usedFirstTag);
//   console.log("usedSecondTag: ", usedSecondTag);

  return heartRates;
};


export default processGpxData;
