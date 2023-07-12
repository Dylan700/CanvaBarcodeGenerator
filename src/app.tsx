import { Button, Columns, FormField, LoadingIndicator, NumberInput, Rows, Select, Text, TextInput } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";

import generateBarcode from "./BarcodeGenerator";
import BarcodeFormat from "./BarcodeFormat";

type UserInput = {
  format: BarcodeFormat;
  data: string;
  resolution: number;
  color: string;
}

const defaultInput: UserInput = {
  format: BarcodeFormat.CODE128,
  data: "123456789",
  resolution: 10,
  color: "#000000"
}

export const App = () => {

  const [input, setInput] = React.useState<UserInput>(defaultInput);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | boolean>(false);

  const onClick = () => {
    setIsGenerating(true);
    clearErrorMessage();
    try{
      addNativeElement({
        type: "IMAGE",
        dataUrl: generateBarcode(input.data, input.format, input.resolution, input.color),
      });
    }catch(e: any){
      setErrorMessage(e);
    }
    setIsGenerating(false);
  };

  const setErrorMessage = (e: string) => {
    setIsGenerating(false);
    setError(e);
  }

  const clearErrorMessage = () => {
    setError(false);
  }

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          Enter the details of the barcode you wish to generate below.
        </Text>
        <FormField
          label="Barcode Type"
          description="The type of barcode encoding format."
          control={(props) => (
            <Select
              {...props}
              options={Object.values(BarcodeFormat).map(v => ({value: v.toString(), label: v.toString()}))}
              onChange={value => setInput(i => ({...i, format: BarcodeFormat[value]}))}
            />
          )}
        />
        <FormField error={error} label="Data" description="The data to encode into the barcode." control={props => (
          <TextInput onChange={data => setInput(i => ({...i, data: data}))} placeholder="123456789" />
        )} />
        <FormField label="Resolution" description="The quality of the barcode image." control={props => (
          <NumberInput onChange={data => setInput(i => ({...i, resolution: data ? data : i.resolution}))} placeholder="10" />
        )} />
        <FormField label="Color" description="The color of the barcode image." control={props => (
          <TextInput onChange={data => setInput(i => ({...i, color: data}))} placeholder="#000000" />
        )} />
        <Button variant="primary" onClick={onClick} stretch disabled={isGenerating}>
          Generate Barcode
        </Button>
        {isGenerating && 
            <Columns spacing="0">
              <LoadingIndicator size="medium" />
              <Text>Generating barcode...</Text> 
            </Columns>
        }
      </Rows>
    </div>
  );
};
;