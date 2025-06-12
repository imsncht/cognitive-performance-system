// File: frontend/src/layouts/index.js

import TaskListLayout from './TaskListLayout';
import ZenFocusLayout from './ZenFocusLayout';
import PomodoroLayout from './PomodoroLayout';
import KanbanLayout from './KanbanLayout';
// --- NEW: Importing the 5 new layouts ---
import TimeBoxerLayout from './TimeBoxerLayout';
import WriterLayout from './WriterLayout';
import ReviewDeckLayout from './ReviewDeckLayout';
import GoalPyramidLayout from './GoalPyramidLayout';
import EnergyMonitorLayout from './EnergyMonitorLayout';
// --- REPLACEMENT: Preparing for the Step Sequencer ---
import StepSequencerLayout from './StepSequencerLayout';

export const layouts = {
  TaskListLayout,
  ZenFocusLayout,
  PomodoroLayout,
  KanbanLayout,
  // --- NEW: Adding the new layouts to the registry ---
  TimeBoxerLayout,
  WriterLayout,
  ReviewDeckLayout,
  GoalPyramidLayout,
  EnergyMonitorLayout,
  StepSequencerLayout,
};