enum BarcodeFormat {
  CODE128 = "CODE128",
  EAN13 = "EAN13",
  EAN8 = "EAN8",
  UPC = "UPC",
  CODE39 = "CODE39",
  ITF14 = "ITF14",
  MSI = "MSI",
  Pharmacode = "PHARMACODE",
  Codabar = "CODABAR",
}

enum BarcodeFormatDescriptions {
  CODE128 = "supports all 128 ASCII characters and can encode numbers",
  EAN13 = "must be 12 or 13 digits",
  EAN8 = "must be 7 or 8 digits",
  UPC = "must be 11 or 12 digits",
  CODE39 = "supports all 128 ASCII characters and can encode numbers",
  ITF14 = "must be 13 or 14 digits",
  MSI = "should only contain digits",
  Pharmacode = "must be 1 to 6 digits",
  Codabar = "supports all 128 ASCII characters and can encode numbers",
}

export default BarcodeFormat;
export { BarcodeFormatDescriptions };
