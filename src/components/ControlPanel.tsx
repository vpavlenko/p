import * as React from "react";
import { Voicing, VOICINGS, VoicingConfig } from "../constants/voicings";
import { ScaleMode, SCALE_MODES } from "../constants/scales";
import { ColorMode } from "./types";
import {
  CHORD_PROGRESSIONS,
  ChordProgression,
} from "../constants/progressions";

interface ControlPanelProps {
  currentVoicing: Voicing;
  onVoicingChange: (voicing: Voicing) => void;
  currentScaleMode: ScaleMode;
  onScaleModeChange: (mode: ScaleMode) => void;
  currentColorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
  onPlayProgression: (progression: ChordProgression) => void;
  onStopProgression: () => void;
  isProgressionPlaying: boolean;
  onPlayFullRange: () => void;
}

const buttonStyle = (isActive: boolean) => ({
  background: isActive ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  color: "white",
  padding: "10px 15px",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "all 0.2s",
  width: "150px",
  textAlign: "left" as const,
});

export const ControlPanel: React.FC<ControlPanelProps> = ({
  currentVoicing,
  onVoicingChange,
  currentScaleMode,
  onScaleModeChange,
  currentColorMode,
  onColorModeChange,
  onPlayProgression,
  onStopProgression,
  isProgressionPlaying,
  onPlayFullRange,
}) => (
  <>
    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "white",
        fontSize: "14px",
        padding: "15px",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Voicing</div>
        {(Object.entries(VOICINGS) as [Voicing, VoicingConfig][]).map(
          ([voicing, config]) => (
            <button
              key={voicing}
              onClick={() => onVoicingChange(voicing)}
              style={buttonStyle(voicing === currentVoicing)}
            >
              {config.label}
            </button>
          )
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          Scale Mode
        </div>
        {Object.entries(SCALE_MODES).map(([mode, config]) => (
          <button
            key={mode}
            onClick={() => onScaleModeChange(mode as ScaleMode)}
            style={buttonStyle(mode === currentScaleMode)}
          >
            {config.label}
          </button>
        ))}
      </div>
    </div>

    <div
      style={{
        position: "fixed",
        left: "20px",
        top: "20px",
        color: "white",
        fontSize: "14px",
        padding: "15px",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Color Mode</div>
      {["chromatic", "traditional"].map((mode) => (
        <button
          key={mode}
          onClick={() => onColorModeChange(mode as ColorMode)}
          style={buttonStyle(mode === currentColorMode)}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>

    <div
      style={{
        position: "fixed",
        left: "20px",
        bottom: "20px",
        color: "white",
        fontSize: "14px",
        padding: "15px",
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
        Chord Progressions
      </div>
      {CHORD_PROGRESSIONS.map((progression) => (
        <button
          key={progression.id}
          onClick={() => {
            if (isProgressionPlaying) {
              onStopProgression();
            } else {
              onPlayProgression(progression);
            }
          }}
          style={{
            ...buttonStyle(false),
            opacity: isProgressionPlaying ? 0.5 : 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "200px",
          }}
          disabled={isProgressionPlaying && progression.id !== "stop"}
        >
          <span>{progression.label}</span>
          {isProgressionPlaying && (
            <span style={{ fontSize: "12px", opacity: 0.7 }}>Playing...</span>
          )}
        </button>
      ))}

      <div
        style={{
          marginTop: "10px",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
          paddingTop: "10px",
        }}
      >
        <button
          onClick={onPlayFullRange}
          disabled={isProgressionPlaying}
          style={{
            ...buttonStyle(false),
            width: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Test Full Range</span>
          {isProgressionPlaying && (
            <span style={{ fontSize: "12px", opacity: 0.7 }}>Playing...</span>
          )}
        </button>
      </div>
    </div>
  </>
);