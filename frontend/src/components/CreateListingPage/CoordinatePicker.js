import { Feature, Map, View } from 'ol';
import { Point } from "ol/geom";
import { Vector as VectorL } from "ol/layer";
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, toLonLat, transform } from "ol/proj";
import { Vector as VectorS } from "ol/source";
import OSM from 'ol/source/OSM';
import { useEffect, useRef, useState } from "react";
import constants from "../../constants.json";

const CoordinatePicker = ({ onChange }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current === null) return;

    const map = new Map({
      target: ref.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(constants.UTM_LOCATION),
        zoom: 15,
      }),
    });

    const layer = new VectorL({
      source: new VectorS({
        features: [
          new Feature({
            geometry: new Point(fromLonLat(constants.UTM_LOCATION))
          })
        ]
      })
    });
    map.addLayer(layer);

    map.on("click", (e) => {
      const source = layer.getSource();
      source.clear();
      source.addFeature(new Feature({
        geometry: new Point(e.coordinate)
      }));
      
      const [longitude, latitude] = toLonLat(e.coordinate);
      onChange({ target: { name: "latitude", value: latitude } });
      onChange({ target: { name: "longitude", value: longitude } });
    });
  }, []);

  return (
    <>
      <div ref={ref} style={{ width: 600, height: 400 }}></div>
    </>
  );
}

export default CoordinatePicker;