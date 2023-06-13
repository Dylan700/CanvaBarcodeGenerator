import { initAppElement } from "@canva/design";
import {
  Button,
  Column,
  Columns,
  FormField,
  NumberInput,
  Rows,
  Text,
  TextInput,
  Title,
} from "@canva/app-ui-kit";
import React from "react";
import PlusIcon from "assets/icons/plus.svg";
import styles from "styles/components.css";

type AppElementData = {
  paths: {
    d: string;
    fill: {
      color: string;
    };
  }[];
  viewBox: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  width: number;
  height: number;
  rotation: number;
};

type UIState = AppElementData;

const initialState: UIState = {
  paths: [
    {
      d: "M 0 0 H 100 V 100 H 0 L 0 0",
      fill: {
        color: "#ff0099",
      },
    },
  ],
  viewBox: {
    width: 100,
    height: 100,
    top: 0,
    left: 0,
  },
  width: 100,
  height: 100,
  rotation: 0,
};

const appElementClient = initAppElement<AppElementData>({
  render: (data) => {
    return [{ type: "SHAPE", top: 0, left: 0, ...data }];
  },
});

export const App = () => {
  const [state, setState] = React.useState<UIState>(initialState);
  const { paths, viewBox, width, height, rotation } = state;
  const disabled = paths.length < 1;

  React.useEffect(() => {
    appElementClient.registerOnElementChange((appElement) => {
      setState(appElement ? appElement.data : initialState);
    });
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="3u">
        <Text>
          This example demonstrates how apps can create shape elements inside
          app elements. This makes the element re-editable and lets apps control
          additional properties, such as the width and height.
        </Text>
        <Rows spacing="1u">
          <Columns spacing="0" alignY="center">
            <Column>
              <Title size="small">Paths</Title>
            </Column>
            <Column width="content">
              {paths.length < 7 && (
                <button
                  onClick={() => {
                    setState((prevState) => {
                      return {
                        ...prevState,
                        paths: [
                          ...prevState.paths,
                          {
                            d: "",
                            fill: {
                              color: "#000000",
                            },
                          },
                        ],
                      };
                    });
                  }}
                  style={{
                    appearance: "none",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <PlusIcon />
                </button>
              )}
            </Column>
          </Columns>
          {paths.map((path, outerIndex) => {
            return (
              <Rows spacing="2u">
                <FormField
                  label="Line commands"
                  value={path.d}
                  control={(props) => (
                    <TextInput
                      {...props}
                      onChange={(value) => {
                        setState((prevState) => {
                          return {
                            ...prevState,
                            paths: prevState.paths.map((path, innerIndex) => {
                              if (outerIndex === innerIndex) {
                                return {
                                  ...path,
                                  d: value,
                                };
                              }
                              return path;
                            }),
                          };
                        });
                      }}
                    />
                  )}
                />
                <FormField
                  label="Color"
                  value={paths[outerIndex].fill.color}
                  control={(props) => (
                    <TextInput
                      {...props}
                      onChange={(value) => {
                        setState((prevState) => {
                          return {
                            ...prevState,
                            paths: prevState.paths.map((path, innerIndex) => {
                              if (outerIndex === innerIndex) {
                                return {
                                  ...path,
                                  fill: {
                                    ...path.fill,
                                    color: value,
                                  },
                                };
                              }
                              return path;
                            }),
                          };
                        });
                      }}
                    />
                  )}
                />
              </Rows>
            );
          })}
        </Rows>
        <Rows spacing="2u">
          <Title size="small">Viewbox</Title>
          <FormField
            label="Width"
            value={viewBox.width}
            control={(props) => (
              <NumberInput
                {...props}
                min={1}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      viewBox: {
                        ...prevState.viewBox,
                        width: Number(value || 0),
                      },
                    };
                  });
                }}
              />
            )}
          />
          <FormField
            label="Height"
            value={viewBox.height}
            control={(props) => (
              <NumberInput
                {...props}
                min={1}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      viewBox: {
                        ...prevState.viewBox,
                        height: Number(value || 0),
                      },
                    };
                  });
                }}
              />
            )}
          />
          <FormField
            label="Top"
            value={viewBox.top}
            control={(props) => (
              <NumberInput
                {...props}
                min={0}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      viewBox: {
                        ...prevState.viewBox,
                        top: Number(value || 0),
                      },
                    };
                  });
                }}
              />
            )}
          />
          <FormField
            label="Left"
            value={viewBox.left}
            control={(props) => (
              <NumberInput
                {...props}
                min={0}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      viewBox: {
                        ...prevState.viewBox,
                        left: Number(value || 0),
                      },
                    };
                  });
                }}
              />
            )}
          />
        </Rows>
        <Rows spacing="2u">
          <Title size="small">Position</Title>
          <FormField
            label="Width"
            value={width}
            control={(props) => (
              <NumberInput
                {...props}
                min={1}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      width: Number(value || 0),
                    };
                  });
                }}
              />
            )}
          />
          <FormField
            label="Height"
            value={height}
            control={(props) => (
              <NumberInput
                {...props}
                min={1}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      height: Number(value || 0),
                    };
                  });
                }}
              />
            )}
          />
          <FormField
            label="Rotation"
            value={rotation}
            control={(props) => (
              <NumberInput
                {...props}
                min={-180}
                max={180}
                onChange={(value) => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      rotation: Number(value || 0),
                    };
                  });
                }}
              />
            )}
          />
        </Rows>
        <Rows spacing="1u">
          <Button
            variant="secondary"
            onClick={() => {
              setState(initialState);
            }}
            stretch
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              appElementClient.addOrUpdateElement(state);
            }}
            disabled={disabled}
            stretch
          >
            Add shape to design
          </Button>
        </Rows>
      </Rows>
    </div>
  );
};
