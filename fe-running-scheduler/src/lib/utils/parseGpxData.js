import xml2js from "xml-js";
import { normalizeToArray } from "@/lib/utils";

export const parseGpxData = (file) => {
  let convert = xml2js;
  let parsedGpx = convert.xml2js(file, { compact: true, spaces: 4 });

  // Handle cases in which the GPX file has multiple tracks and multiple segments by normalizing the data to an array
  parsedGpx = normalizeTrackAndSegment(parsedGpx);

  return parsedGpx;
};

const normalizeTrackAndSegment = (parsedGpx) => {
  parsedGpx.gpx.trk = normalizeToArray(parsedGpx.gpx.trk);
  parsedGpx.gpx.trk.forEach((track) => {
    track.trkseg = normalizeToArray(track.trkseg);
  });
  return parsedGpx;
};
