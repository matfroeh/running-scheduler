// Re-Export of all components used in the react-router setup
import { Welcome, Login, SignUp } from "./Welcome";
import { NotFound, Error, Datenschutz, Impressum, CookieNote } from "./misc";
import { RootLayout, AuthLayout } from "./layouts";
import { Profile } from "./Profile";
import { Overview } from "./Overview";
import { CalendarView, CalendarEditModal } from "./CalendarView";

// Belongs logically to CalendarView but could be separated
import { CreateScheduleModal } from "./CreateSchedule";
import {
    RunDetailsModal,
    TrainingDayDetailsModal,
} from "./RunAndTrainingDetails";

import { EquipmentModal, EquipmentDetails, CreateEquipment } from "./Equipment";

export {
  Welcome,
  Login,
  SignUp,
  NotFound,
  Error,
  Datenschutz,
  Impressum,
  CookieNote,
  RootLayout,
  AuthLayout,
  Profile,
  Overview,
  CalendarView,
  CalendarEditModal,
  CreateScheduleModal,
  RunDetailsModal,
  TrainingDayDetailsModal,
  EquipmentModal,
  EquipmentDetails,
  CreateEquipment,
};
