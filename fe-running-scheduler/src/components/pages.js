// Re-Export of all components used in the react-router setup
import { Welcome, Login, SignUp } from "./Welcome";
import {
    NotFound,
    Error,
    ErrorPage,
    Datenschutz,
    Impressum,
    CookieNote,
} from "./misc";
import { RootLayout, AuthLayout, StartPageLayout } from "./layouts";
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
    ErrorPage,
    Datenschutz,
    Impressum,
    CookieNote,
    RootLayout,
    AuthLayout,
    StartPageLayout,
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
