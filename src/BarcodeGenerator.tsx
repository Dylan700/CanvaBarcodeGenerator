import JsBarcode from "jsbarcode";
import BarcodeFormat from "./BarcodeFormat";

const generateBarcode = (
  data: string,
  format: BarcodeFormat,
  resolution: number = 10,
  color: string = "#000",
  width: number = 2,
  height: number = 100
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 100 + width * resolution;
  canvas.height = 100 + height * resolution;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Can't get CanvasRenderingContext2D");
  }

  JsBarcode(canvas, data, {
    format: format,
    lineColor: color,
    background: "#00000000",
    width: width * resolution,
    height: height * resolution,
    fontSize: 12 * resolution,
  });

  return canvas.toDataURL();
};

export default generateBarcode;
