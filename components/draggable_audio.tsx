import type {
  UserSuppliedAudioDragData,
  UserSuppliedDragData,
} from "@canva/design";
import { addAudioTrack, ui } from "@canva/design";
import * as React from "react";
import { AudioCover } from "./audio_cover";
import styles from "./draggable_audio.css";

type ElementProps = React.HTMLAttributes<HTMLDivElement> &
  Omit<UserSuppliedAudioDragData, "type"> & {
    /*
     * Url of the audio to play in the app when the user clicks the play button.
     * Best practice is for it to be no longer than 20 seconds.
     */
    previewUrl: string;
  };

function formatDuration(durationMs: number) {
  const duration = Number(durationMs) / 1e3;
  return `${Math.floor(duration / 60)}:${Math.floor(duration % 60)
    .toString()
    .padStart(2, "0")}`;
}

const getDragDataAndProps = (
  props: ElementProps
): {
  data: UserSuppliedAudioDragData;
  props: React.HTMLAttributes<HTMLDivElement> & {
    previewUrl: string;
  };
} => {
  const { title, durationMs, resolveAudioRef, ...elementProps } = props;
  const rawDragData = {
    title,
    durationMs,
    resolveAudioRef,
    type: "AUDIO",
  };

  return {
    data: Object.keys(rawDragData).reduce(
      (data, key) =>
        rawDragData[key] ? { ...data, [key]: rawDragData[key] } : data,
      {} as UserSuppliedAudioDragData & Pick<UserSuppliedAudioDragData, "type">
    ),
    props: elementProps,
  };
};

export const DraggableAudio = (props: ElementProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [node, setNode] = React.useState<HTMLDivElement | null>();
  const {
    data: dragData,
    props: { previewUrl, ...imgProps },
  } = getDragDataAndProps(props);
  const opacity = isDragging ? 0 : props.style?.opacity || 1;

  const makeDraggable = (node: HTMLDivElement) => {
    if (!node) {
      return;
    }

    const _dragData: UserSuppliedDragData = {
      ...dragData,
      type: "AUDIO",
    };

    try {
      ui.makeDraggable({
        node: node,
        dragData: _dragData,
        onDragEnd: () => setIsDragging(false),
        onDragStart: () => setIsDragging(true),
      });
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (!node) {
      return;
    }

    try {
      makeDraggable(node);
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div
      {...imgProps}
      role="button"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={setNode}
      style={{ opacity }}
      className={styles.draggableAudioContainer}
      onClick={async () => {
        const audio = await props.resolveAudioRef();
        addAudioTrack({
          ref: audio.ref,
        });
      }}
    >
      <div className={styles.draggableAudioInner}>
        <AudioCover url={previewUrl} isHovering={isHovering} />
        <div className={styles.draggableAudioDetails}>
          <div className={styles.draggableAudioText}>{dragData.title}</div>
          <div className={styles.draggableAudioText}>
            <div className={styles.draggableAudioDuration}>
              {formatDuration(dragData.durationMs)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
