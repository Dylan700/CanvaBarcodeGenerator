import type { Placement } from "@canva/design";
import {
  addNativeElement,
  getCurrentPageContext,
  initAppElement,
} from "@canva/design";
import {
  Box,
  Button,
  FormField,
  Rows,
  Select,
  Text,
  TextInput,
} from "@canva/app-ui-kit";
import cat from "assets/images/cat.jpg";
import dog from "assets/images/dog.jpg";
import rabbit from "assets/images/rabbit.jpg";
import clsx from "clsx";
import React from "react";
import styles from "styles/components.css";

// Below values are only for demonstration purposes.0
// You can position your elements anywhere on the page by providing arbitrary
// values for placement attributes: top, left, width, height and rotation.
const enum ElementPlacement {
  DEFAULT = "default",
  TOP_LEFT = "top_left",
  TOP_RIGHT = "top_right",
  BOTTOM_LEFT = "bottom_left",
  BOTTOM_RIGHT = "bottom_right",
}

// We can't store the image's data URL in the app element's data, since it
// exceeds the 5kb limit. We can, however, store an ID that references the
// image.
type AppElementData = {
  imageId: string;
};

type UIState = AppElementData & {
  dataUrl: string;
  placement?: ElementPlacement;
  isEditingAppElement: boolean;
};

const images = {
  dog: {
    title: "Dog",
    imageSrc: dog,
  },
  cat: {
    title: "Cat",
    imageSrc: cat,
  },
  rabbit: {
    title: "Rabbit",
    imageSrc: rabbit,
  },
};

const initialState: UIState = {
  imageId: "dog",
  dataUrl: images.dog.imageSrc,
  placement: ElementPlacement.DEFAULT,
  isEditingAppElement: false,
};

const appElementClient = initAppElement<AppElementData>({
  render: (data) => {
    return [
      {
        type: "IMAGE",
        dataUrl: images[data.imageId].imageSrc,
        top: 0,
        left: 0,
        width: 400,
        height: 400,
      },
    ];
  },
});

export const App = () => {
  const [state, setState] = React.useState<UIState>(initialState);
  const { imageId } = state;
  const disabled = !imageId || imageId.trim().length < 1;

  const getPlacement = async (
    placement?: ElementPlacement
  ): Promise<Placement | undefined> => {
    const pageContext = await getCurrentPageContext();
    const pageDimensions = pageContext.dimensions;
    if (!pageDimensions) {
      // Current doctype doesn't support absolute positioning
      return;
    }

    const elementSize =
      Math.min(pageDimensions.height, pageDimensions.width) / 2;
    switch (placement) {
      case ElementPlacement.TOP_LEFT:
        return {
          top: 0,
          left: 0,
          width: elementSize,
          height: elementSize,
          rotation: 0,
        };
      case ElementPlacement.TOP_RIGHT:
        return {
          top: 0,
          left: pageDimensions.width - elementSize,
          width: elementSize,
          height: elementSize,
          rotation: 0,
        };
      case ElementPlacement.BOTTOM_LEFT:
        return {
          top: pageDimensions.height - elementSize,
          left: 0,
          width: elementSize,
          height: elementSize,
          rotation: 0,
        };
      case ElementPlacement.BOTTOM_RIGHT:
        return {
          top: pageDimensions.height - elementSize,
          left: pageDimensions.width - elementSize,
          width: elementSize,
          height: elementSize,
          rotation: 0,
        };
      default:
        return undefined;
    }
  };

  const items = Object.entries(images).map(([key, value]) => {
    const { title, imageSrc } = value;
    return {
      key,
      title,
      imageSrc,
      active: imageId === key,
      onClick: () => {
        setState((prevState) => {
          return {
            ...prevState,
            imageId: key,
            dataUrl: imageSrc,
          };
        });
      },
    };
  });

  React.useEffect(() => {
    appElementClient.registerOnElementChange((appElement) => {
      setState((prevState) => {
        return appElement
          ? {
              ...prevState,
              ...appElement.data,
              isEditingAppElement: Boolean(appElement.data),
            }
          : { ...prevState, isEditingAppElement: false };
      });
    });
  }, []);

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>
          This example demonstrates how apps can get the dimensions of the
          current page and create elements at specific positions on that page.
        </Text>
        <FormField
          label="Select an image"
          control={(props) => (
            <Box id={props.id} paddingTop="1u">
              <div className={styles.thumbnailGrid}>
                {items.map((item) => (
                  <img
                    className={clsx(
                      styles.thumbnail,
                      item.active && styles.active
                    )}
                    key={item.key}
                    src={item.imageSrc}
                    onClick={item.onClick}
                    alt={item.title}
                  />
                ))}
              </div>
            </Box>
          )}
        />
        <FormField
          label="Data URL"
          value={images[imageId].imageSrc}
          control={(props) => <TextInput {...props} />}
        />
        <FormField
          label="Placement"
          value={state.placement}
          control={(props) => (
            <Select
              {...props}
              options={[
                { value: ElementPlacement.DEFAULT, label: "Default" },
                { value: ElementPlacement.TOP_LEFT, label: "Top Left" },
                { value: ElementPlacement.TOP_RIGHT, label: "Top Right" },
                { value: ElementPlacement.BOTTOM_LEFT, label: "Bottom Left" },
                { value: ElementPlacement.BOTTOM_RIGHT, label: "Bottom Right" },
              ]}
              onChange={(event) => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    placement: event,
                  };
                });
              }}
              stretch
            />
          )}
        />
        <Rows spacing="3u">
          <Button
            variant="secondary"
            onClick={async () => {
              const placement = await getPlacement(state.placement);
              appElementClient.addOrUpdateElement(
                { imageId: state.imageId },
                placement
              );
            }}
            disabled={disabled}
          >
            {state.isEditingAppElement
              ? "Update app element"
              : "Add app element"}
          </Button>
          <Button
            variant="secondary"
            onClick={async () => {
              const placement = await getPlacement(state.placement);
              addNativeElement({
                type: "IMAGE",
                dataUrl: state.dataUrl,
                ...placement,
              });
            }}
            disabled={disabled}
          >
            Add native element
          </Button>
        </Rows>
      </Rows>
    </div>
  );
};
