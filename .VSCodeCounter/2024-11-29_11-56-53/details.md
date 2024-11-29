# Details

Date : 2024-11-29 11:56:53

Directory c:\\Daten\\workspaces\\workspaceWD\\FinalProject\\running-scheduler

Total : 186 files,  17406 codes, 791 comments, 1047 blanks, all 19244 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [README.md](/README.md) | Markdown | 24 | 0 | 14 | 38 |
| [be-running-scheduler/controllers/authController.js](/be-running-scheduler/controllers/authController.js) | JavaScript | 110 | 29 | 22 | 161 |
| [be-running-scheduler/controllers/imageController.js](/be-running-scheduler/controllers/imageController.js) | JavaScript | 33 | 0 | 9 | 42 |
| [be-running-scheduler/controllers/journalController.js](/be-running-scheduler/controllers/journalController.js) | JavaScript | 62 | 1 | 9 | 72 |
| [be-running-scheduler/controllers/performedController.js](/be-running-scheduler/controllers/performedController.js) | JavaScript | 2 | 0 | 1 | 3 |
| [be-running-scheduler/controllers/runsController.js](/be-running-scheduler/controllers/runsController.js) | JavaScript | 55 | 41 | 20 | 116 |
| [be-running-scheduler/controllers/scheduleController.js](/be-running-scheduler/controllers/scheduleController.js) | JavaScript | 71 | 6 | 16 | 93 |
| [be-running-scheduler/controllers/scheduledController.js](/be-running-scheduler/controllers/scheduledController.js) | JavaScript | 25 | 1 | 5 | 31 |
| [be-running-scheduler/controllers/userController.js](/be-running-scheduler/controllers/userController.js) | JavaScript | 116 | 8 | 19 | 143 |
| [be-running-scheduler/db/index.js](/be-running-scheduler/db/index.js) | JavaScript | 8 | 0 | 2 | 10 |
| [be-running-scheduler/index.js](/be-running-scheduler/index.js) | JavaScript | 41 | 14 | 12 | 67 |
| [be-running-scheduler/joi/equipmentSchema.js](/be-running-scheduler/joi/equipmentSchema.js) | JavaScript | 15 | 0 | 3 | 18 |
| [be-running-scheduler/joi/imageSchema.js](/be-running-scheduler/joi/imageSchema.js) | JavaScript | 10 | 0 | 3 | 13 |
| [be-running-scheduler/joi/runsSchema.js](/be-running-scheduler/joi/runsSchema.js) | JavaScript | 39 | 0 | 5 | 44 |
| [be-running-scheduler/joi/schedulesSchema.js](/be-running-scheduler/joi/schedulesSchema.js) | JavaScript | 29 | 1 | 5 | 35 |
| [be-running-scheduler/joi/userSchema.js](/be-running-scheduler/joi/userSchema.js) | JavaScript | 10 | 0 | 2 | 12 |
| [be-running-scheduler/middleware/demoProtectionMiddleware.js](/be-running-scheduler/middleware/demoProtectionMiddleware.js) | JavaScript | 13 | 3 | 4 | 20 |
| [be-running-scheduler/middleware/errorHandler.js](/be-running-scheduler/middleware/errorHandler.js) | JavaScript | 5 | 0 | 2 | 7 |
| [be-running-scheduler/middleware/index.js](/be-running-scheduler/middleware/index.js) | JavaScript | 4 | 0 | 1 | 5 |
| [be-running-scheduler/middleware/validateJOI.js](/be-running-scheduler/middleware/validateJOI.js) | JavaScript | 6 | 0 | 3 | 9 |
| [be-running-scheduler/middleware/verifyTokenMiddleware.js](/be-running-scheduler/middleware/verifyTokenMiddleware.js) | JavaScript | 24 | 7 | 9 | 40 |
| [be-running-scheduler/models/Equipment.js](/be-running-scheduler/models/Equipment.js) | JavaScript | 16 | 1 | 3 | 20 |
| [be-running-scheduler/models/Image.js](/be-running-scheduler/models/Image.js) | JavaScript | 22 | 0 | 3 | 25 |
| [be-running-scheduler/models/Journal.js](/be-running-scheduler/models/Journal.js) | JavaScript | 90 | 0 | 5 | 95 |
| [be-running-scheduler/models/Runs.js](/be-running-scheduler/models/Runs.js) | JavaScript | 96 | 10 | 9 | 115 |
| [be-running-scheduler/models/Schedule.js](/be-running-scheduler/models/Schedule.js) | JavaScript | 58 | 67 | 10 | 135 |
| [be-running-scheduler/models/User.js](/be-running-scheduler/models/User.js) | JavaScript | 16 | 0 | 4 | 20 |
| [be-running-scheduler/models/index.js](/be-running-scheduler/models/index.js) | JavaScript | 7 | 0 | 1 | 8 |
| [be-running-scheduler/models/subSchemas/index.js](/be-running-scheduler/models/subSchemas/index.js) | JavaScript | 3 | 0 | 1 | 4 |
| [be-running-scheduler/models/subSchemas/performedSchema.js](/be-running-scheduler/models/subSchemas/performedSchema.js) | JavaScript | 49 | 7 | 2 | 58 |
| [be-running-scheduler/models/subSchemas/scheduledSchema.js](/be-running-scheduler/models/subSchemas/scheduledSchema.js) | JavaScript | 23 | 0 | 3 | 26 |
| [be-running-scheduler/package-lock.json](/be-running-scheduler/package-lock.json) | JSON | 2,497 | 0 | 1 | 2,498 |
| [be-running-scheduler/package.json](/be-running-scheduler/package.json) | JSON | 30 | 0 | 1 | 31 |
| [be-running-scheduler/routes/authRouter.js](/be-running-scheduler/routes/authRouter.js) | JavaScript | 11 | 0 | 3 | 14 |
| [be-running-scheduler/routes/imageRouter.js](/be-running-scheduler/routes/imageRouter.js) | JavaScript | 26 | 4 | 5 | 35 |
| [be-running-scheduler/routes/index.js](/be-running-scheduler/routes/index.js) | JavaScript | 18 | 0 | 2 | 20 |
| [be-running-scheduler/routes/journalRouter.js](/be-running-scheduler/routes/journalRouter.js) | JavaScript | 13 | 0 | 4 | 17 |
| [be-running-scheduler/routes/performedRouter.js](/be-running-scheduler/routes/performedRouter.js) | JavaScript | 5 | 0 | 3 | 8 |
| [be-running-scheduler/routes/runsRouter.js](/be-running-scheduler/routes/runsRouter.js) | JavaScript | 23 | 4 | 6 | 33 |
| [be-running-scheduler/routes/scheduleRouter.js](/be-running-scheduler/routes/scheduleRouter.js) | JavaScript | 34 | 3 | 5 | 42 |
| [be-running-scheduler/routes/scheduledRouter.js](/be-running-scheduler/routes/scheduledRouter.js) | JavaScript | 11 | 0 | 4 | 15 |
| [be-running-scheduler/routes/userRouter.js](/be-running-scheduler/routes/userRouter.js) | JavaScript | 26 | 2 | 4 | 32 |
| [be-running-scheduler/utils/ErrorResponse.js](/be-running-scheduler/utils/ErrorResponse.js) | JavaScript | 7 | 0 | 2 | 9 |
| [be-running-scheduler/utils/asyncHandler.js](/be-running-scheduler/utils/asyncHandler.js) | JavaScript | 2 | 0 | 2 | 4 |
| [be-running-scheduler/utils/index.js](/be-running-scheduler/utils/index.js) | JavaScript | 3 | 0 | 1 | 4 |
| [be-running-scheduler/utils/resizeImage.js](/be-running-scheduler/utils/resizeImage.js) | JavaScript | 6 | 0 | 2 | 8 |
| [fe-running-scheduler/README.md](/fe-running-scheduler/README.md) | Markdown | 5 | 0 | 4 | 9 |
| [fe-running-scheduler/eslint.config.js](/fe-running-scheduler/eslint.config.js) | JavaScript | 38 | 0 | 2 | 40 |
| [fe-running-scheduler/index.html](/fe-running-scheduler/index.html) | HTML | 13 | 0 | 1 | 14 |
| [fe-running-scheduler/package-lock.json](/fe-running-scheduler/package-lock.json) | JSON | 7,170 | 0 | 1 | 7,171 |
| [fe-running-scheduler/package.json](/fe-running-scheduler/package.json) | JSON | 49 | 0 | 1 | 50 |
| [fe-running-scheduler/postcss.config.js](/fe-running-scheduler/postcss.config.js) | JavaScript | 6 | 0 | 1 | 7 |
| [fe-running-scheduler/src/App.jsx](/fe-running-scheduler/src/App.jsx) | JavaScript JSX | 139 | 7 | 4 | 150 |
| [fe-running-scheduler/src/actions/getFormData.js](/fe-running-scheduler/src/actions/getFormData.js) | JavaScript | 5 | 0 | 1 | 6 |
| [fe-running-scheduler/src/components/ButtonDelete.jsx](/fe-running-scheduler/src/components/ButtonDelete.jsx) | JavaScript JSX | 11 | 0 | 2 | 13 |
| [fe-running-scheduler/src/components/ButtonHiddenInput.jsx](/fe-running-scheduler/src/components/ButtonHiddenInput.jsx) | JavaScript JSX | 20 | 0 | 2 | 22 |
| [fe-running-scheduler/src/components/ButtonLoadingState.jsx](/fe-running-scheduler/src/components/ButtonLoadingState.jsx) | JavaScript JSX | 16 | 0 | 3 | 19 |
| [fe-running-scheduler/src/components/ButtonSave.jsx](/fe-running-scheduler/src/components/ButtonSave.jsx) | JavaScript JSX | 12 | 0 | 1 | 13 |
| [fe-running-scheduler/src/components/ButtonScrollToRef.jsx](/fe-running-scheduler/src/components/ButtonScrollToRef.jsx) | JavaScript JSX | 31 | 2 | 7 | 40 |
| [fe-running-scheduler/src/components/ButtonScrollTop.jsx](/fe-running-scheduler/src/components/ButtonScrollTop.jsx) | JavaScript JSX | 27 | 2 | 6 | 35 |
| [fe-running-scheduler/src/components/ButtonToggle.jsx](/fe-running-scheduler/src/components/ButtonToggle.jsx) | JavaScript JSX | 15 | 0 | 1 | 16 |
| [fe-running-scheduler/src/components/Calendar/ButtonCalendarNavigate.jsx](/fe-running-scheduler/src/components/Calendar/ButtonCalendarNavigate.jsx) | JavaScript JSX | 16 | 0 | 2 | 18 |
| [fe-running-scheduler/src/components/Calendar/Calendar.jsx](/fe-running-scheduler/src/components/Calendar/Calendar.jsx) | JavaScript JSX | 10 | 0 | 3 | 13 |
| [fe-running-scheduler/src/components/Calendar/CalendarBar.jsx](/fe-running-scheduler/src/components/Calendar/CalendarBar.jsx) | JavaScript JSX | 119 | 4 | 11 | 134 |
| [fe-running-scheduler/src/components/Calendar/CalendarBody.jsx](/fe-running-scheduler/src/components/Calendar/CalendarBody.jsx) | JavaScript JSX | 26 | 0 | 4 | 30 |
| [fe-running-scheduler/src/components/Calendar/CalendarWeekRow.jsx](/fe-running-scheduler/src/components/Calendar/CalendarWeekRow.jsx) | JavaScript JSX | 69 | 37 | 6 | 112 |
| [fe-running-scheduler/src/components/Calendar/CardBody.jsx](/fe-running-scheduler/src/components/Calendar/CardBody.jsx) | JavaScript JSX | 13 | 0 | 2 | 15 |
| [fe-running-scheduler/src/components/Calendar/CardContainer.jsx](/fe-running-scheduler/src/components/Calendar/CardContainer.jsx) | JavaScript JSX | 12 | 3 | 3 | 18 |
| [fe-running-scheduler/src/components/Calendar/CardDetails.jsx](/fe-running-scheduler/src/components/Calendar/CardDetails.jsx) | JavaScript JSX | 50 | 0 | 5 | 55 |
| [fe-running-scheduler/src/components/Calendar/RunCard.jsx](/fe-running-scheduler/src/components/Calendar/RunCard.jsx) | JavaScript JSX | 31 | 2 | 7 | 40 |
| [fe-running-scheduler/src/components/Calendar/SummaryCard.jsx](/fe-running-scheduler/src/components/Calendar/SummaryCard.jsx) | JavaScript JSX | 60 | 1 | 6 | 67 |
| [fe-running-scheduler/src/components/Calendar/TrainingCard.jsx](/fe-running-scheduler/src/components/Calendar/TrainingCard.jsx) | JavaScript JSX | 43 | 0 | 7 | 50 |
| [fe-running-scheduler/src/components/Calendar/WeekDaysBar.jsx](/fe-running-scheduler/src/components/Calendar/WeekDaysBar.jsx) | JavaScript JSX | 14 | 0 | 4 | 18 |
| [fe-running-scheduler/src/components/Calendar/index.js](/fe-running-scheduler/src/components/Calendar/index.js) | JavaScript | 7 | 0 | 1 | 8 |
| [fe-running-scheduler/src/components/CardElementCloseButton.jsx](/fe-running-scheduler/src/components/CardElementCloseButton.jsx) | JavaScript JSX | 27 | 0 | 2 | 29 |
| [fe-running-scheduler/src/components/CardModal.jsx](/fe-running-scheduler/src/components/CardModal.jsx) | JavaScript JSX | 34 | 0 | 3 | 37 |
| [fe-running-scheduler/src/components/CarouselComponent.jsx](/fe-running-scheduler/src/components/CarouselComponent.jsx) | JavaScript JSX | 74 | 2 | 9 | 85 |
| [fe-running-scheduler/src/components/CookieNote.jsx](/fe-running-scheduler/src/components/CookieNote.jsx) | JavaScript JSX | 18 | 0 | 3 | 21 |
| [fe-running-scheduler/src/components/CreateSchedule/CreateScheduleControls.jsx](/fe-running-scheduler/src/components/CreateSchedule/CreateScheduleControls.jsx) | JavaScript JSX | 26 | 0 | 5 | 31 |
| [fe-running-scheduler/src/components/CreateSchedule/CreateScheduleForm.jsx](/fe-running-scheduler/src/components/CreateSchedule/CreateScheduleForm.jsx) | JavaScript JSX | 204 | 0 | 4 | 208 |
| [fe-running-scheduler/src/components/CreateSchedule/index.js](/fe-running-scheduler/src/components/CreateSchedule/index.js) | JavaScript | 3 | 0 | 1 | 4 |
| [fe-running-scheduler/src/components/Equipment/ButtonHiddenInput.jsx](/fe-running-scheduler/src/components/Equipment/ButtonHiddenInput.jsx) | JavaScript JSX | 22 | 0 | 2 | 24 |
| [fe-running-scheduler/src/components/Equipment/ButtonSubmit.jsx](/fe-running-scheduler/src/components/Equipment/ButtonSubmit.jsx) | JavaScript JSX | 12 | 0 | 2 | 14 |
| [fe-running-scheduler/src/components/Equipment/ButtonUpload.jsx](/fe-running-scheduler/src/components/Equipment/ButtonUpload.jsx) | JavaScript JSX | 13 | 0 | 2 | 15 |
| [fe-running-scheduler/src/components/Equipment/EquipmentCard.jsx](/fe-running-scheduler/src/components/Equipment/EquipmentCard.jsx) | JavaScript JSX | 43 | 0 | 3 | 46 |
| [fe-running-scheduler/src/components/Equipment/FormEquipmentStats.jsx](/fe-running-scheduler/src/components/Equipment/FormEquipmentStats.jsx) | JavaScript JSX | 106 | 0 | 5 | 111 |
| [fe-running-scheduler/src/components/Equipment/ImageContainer.jsx](/fe-running-scheduler/src/components/Equipment/ImageContainer.jsx) | JavaScript JSX | 24 | 0 | 3 | 27 |
| [fe-running-scheduler/src/components/Equipment/ImagePreviewGroup.jsx](/fe-running-scheduler/src/components/Equipment/ImagePreviewGroup.jsx) | JavaScript JSX | 12 | 4 | 2 | 18 |
| [fe-running-scheduler/src/components/Equipment/ImageUploader.jsx](/fe-running-scheduler/src/components/Equipment/ImageUploader.jsx) | JavaScript JSX | 26 | 8 | 4 | 38 |
| [fe-running-scheduler/src/components/Equipment/index.js](/fe-running-scheduler/src/components/Equipment/index.js) | JavaScript | 18 | 0 | 2 | 20 |
| [fe-running-scheduler/src/components/Footer.jsx](/fe-running-scheduler/src/components/Footer.jsx) | JavaScript JSX | 42 | 0 | 2 | 44 |
| [fe-running-scheduler/src/components/Icons.jsx](/fe-running-scheduler/src/components/Icons.jsx) | JavaScript JSX | 42 | 0 | 3 | 45 |
| [fe-running-scheduler/src/components/InputErrorBar.jsx](/fe-running-scheduler/src/components/InputErrorBar.jsx) | JavaScript JSX | 10 | 0 | 2 | 12 |
| [fe-running-scheduler/src/components/Loading.jsx](/fe-running-scheduler/src/components/Loading.jsx) | JavaScript JSX | 23 | 0 | 1 | 24 |
| [fe-running-scheduler/src/components/Modal.jsx](/fe-running-scheduler/src/components/Modal.jsx) | JavaScript JSX | 18 | 0 | 3 | 21 |
| [fe-running-scheduler/src/components/NavBar/NavBar.jsx](/fe-running-scheduler/src/components/NavBar/NavBar.jsx) | JavaScript JSX | 71 | 1 | 8 | 80 |
| [fe-running-scheduler/src/components/NavBar/NavBarDropDownMenu.jsx](/fe-running-scheduler/src/components/NavBar/NavBarDropDownMenu.jsx) | JavaScript JSX | 37 | 0 | 1 | 38 |
| [fe-running-scheduler/src/components/NavBar/NavBarNavButtons.jsx](/fe-running-scheduler/src/components/NavBar/NavBarNavButtons.jsx) | JavaScript JSX | 14 | 0 | 3 | 17 |
| [fe-running-scheduler/src/components/OverflowSpanTooltip.jsx](/fe-running-scheduler/src/components/OverflowSpanTooltip.jsx) | JavaScript JSX | 13 | 0 | 2 | 15 |
| [fe-running-scheduler/src/components/Overview/ChartSection.jsx](/fe-running-scheduler/src/components/Overview/ChartSection.jsx) | JavaScript JSX | 44 | 2 | 5 | 51 |
| [fe-running-scheduler/src/components/Overview/OverviewBlock.jsx](/fe-running-scheduler/src/components/Overview/OverviewBlock.jsx) | JavaScript JSX | 74 | 0 | 5 | 79 |
| [fe-running-scheduler/src/components/Overview/OverviewControls.jsx](/fe-running-scheduler/src/components/Overview/OverviewControls.jsx) | JavaScript JSX | 17 | 0 | 2 | 19 |
| [fe-running-scheduler/src/components/RunAndTrainingDetails/TypeSelectOptions.jsx](/fe-running-scheduler/src/components/RunAndTrainingDetails/TypeSelectOptions.jsx) | JavaScript JSX | 35 | 0 | 2 | 37 |
| [fe-running-scheduler/src/components/RunAndTrainingDetails/index.js](/fe-running-scheduler/src/components/RunAndTrainingDetails/index.js) | JavaScript | 2 | 0 | 1 | 3 |
| [fe-running-scheduler/src/components/SocialMedia.jsx](/fe-running-scheduler/src/components/SocialMedia.jsx) | JavaScript JSX | 19 | 1 | 1 | 21 |
| [fe-running-scheduler/src/components/StartupDelay.jsx](/fe-running-scheduler/src/components/StartupDelay.jsx) | JavaScript JSX | 12 | 0 | 1 | 13 |
| [fe-running-scheduler/src/components/charts/LineChart.jsx](/fe-running-scheduler/src/components/charts/LineChart.jsx) | JavaScript JSX | 34 | 5 | 4 | 43 |
| [fe-running-scheduler/src/components/charts/LineChartTimeVelocity.jsx](/fe-running-scheduler/src/components/charts/LineChartTimeVelocity.jsx) | JavaScript JSX | 38 | 4 | 4 | 46 |
| [fe-running-scheduler/src/components/index.js](/fe-running-scheduler/src/components/index.js) | JavaScript | 40 | 0 | 2 | 42 |
| [fe-running-scheduler/src/context/AuthContext.jsx](/fe-running-scheduler/src/context/AuthContext.jsx) | JavaScript JSX | 8 | 0 | 3 | 11 |
| [fe-running-scheduler/src/context/AuthContextProvider.jsx](/fe-running-scheduler/src/context/AuthContextProvider.jsx) | JavaScript JSX | 44 | 6 | 11 | 61 |
| [fe-running-scheduler/src/context/ModalContext.jsx](/fe-running-scheduler/src/context/ModalContext.jsx) | JavaScript JSX | 8 | 0 | 3 | 11 |
| [fe-running-scheduler/src/context/ModalContextProvider.jsx](/fe-running-scheduler/src/context/ModalContextProvider.jsx) | JavaScript JSX | 21 | 0 | 5 | 26 |
| [fe-running-scheduler/src/context/index.js](/fe-running-scheduler/src/context/index.js) | JavaScript | 5 | 0 | 1 | 6 |
| [fe-running-scheduler/src/data/auth.js](/fe-running-scheduler/src/data/auth.js) | JavaScript | 68 | 0 | 6 | 74 |
| [fe-running-scheduler/src/data/image.js](/fe-running-scheduler/src/data/image.js) | JavaScript | 30 | 1 | 8 | 39 |
| [fe-running-scheduler/src/data/runs.js](/fe-running-scheduler/src/data/runs.js) | JavaScript | 106 | 5 | 16 | 127 |
| [fe-running-scheduler/src/data/schedules.js](/fe-running-scheduler/src/data/schedules.js) | JavaScript | 103 | 1 | 9 | 113 |
| [fe-running-scheduler/src/data/user.js](/fe-running-scheduler/src/data/user.js) | JavaScript | 72 | 0 | 8 | 80 |
| [fe-running-scheduler/src/index.css](/fe-running-scheduler/src/index.css) | CSS | 37 | 8 | 5 | 50 |
| [fe-running-scheduler/src/layouts/AuthLayout.jsx](/fe-running-scheduler/src/layouts/AuthLayout.jsx) | JavaScript JSX | 7 | 2 | 6 | 15 |
| [fe-running-scheduler/src/layouts/RootLayout.jsx](/fe-running-scheduler/src/layouts/RootLayout.jsx) | JavaScript JSX | 35 | 8 | 8 | 51 |
| [fe-running-scheduler/src/layouts/index.js](/fe-running-scheduler/src/layouts/index.js) | JavaScript | 3 | 0 | 1 | 4 |
| [fe-running-scheduler/src/lib/fileHandling.js](/fe-running-scheduler/src/lib/fileHandling.js) | JavaScript | 37 | 1 | 7 | 45 |
| [fe-running-scheduler/src/lib/hooks/index.js](/fe-running-scheduler/src/lib/hooks/index.js) | JavaScript | 5 | 0 | 1 | 6 |
| [fe-running-scheduler/src/lib/hooks/miscDataHooks.js](/fe-running-scheduler/src/lib/hooks/miscDataHooks.js) | JavaScript | 35 | 69 | 13 | 117 |
| [fe-running-scheduler/src/lib/hooks/useCalendarLoading.js](/fe-running-scheduler/src/lib/hooks/useCalendarLoading.js) | JavaScript | 77 | 4 | 14 | 95 |
| [fe-running-scheduler/src/lib/hooks/useCalendarViewToggles.js](/fe-running-scheduler/src/lib/hooks/useCalendarViewToggles.js) | JavaScript | 12 | 1 | 5 | 18 |
| [fe-running-scheduler/src/lib/hooks/useCreateScheduleForm.js](/fe-running-scheduler/src/lib/hooks/useCreateScheduleForm.js) | JavaScript | 45 | 0 | 7 | 52 |
| [fe-running-scheduler/src/lib/hooks/useEquipmentData.js](/fe-running-scheduler/src/lib/hooks/useEquipmentData.js) | JavaScript | 65 | 0 | 10 | 75 |
| [fe-running-scheduler/src/lib/hooks/useEquipmentDetails.js](/fe-running-scheduler/src/lib/hooks/useEquipmentDetails.js) | JavaScript | 130 | 0 | 17 | 147 |
| [fe-running-scheduler/src/lib/hooks/useEquipmentForm.js](/fe-running-scheduler/src/lib/hooks/useEquipmentForm.js) | JavaScript | 81 | 5 | 10 | 96 |
| [fe-running-scheduler/src/lib/hooks/useGetCalendarOrder.js](/fe-running-scheduler/src/lib/hooks/useGetCalendarOrder.js) | JavaScript | 19 | 3 | 7 | 29 |
| [fe-running-scheduler/src/lib/hooks/useProcessGpxData.js](/fe-running-scheduler/src/lib/hooks/useProcessGpxData.js) | JavaScript | 75 | 6 | 11 | 92 |
| [fe-running-scheduler/src/lib/hooks/useSaveNewSchedule.js](/fe-running-scheduler/src/lib/hooks/useSaveNewSchedule.js) | JavaScript | 33 | 1 | 7 | 41 |
| [fe-running-scheduler/src/lib/inputVerification.js](/fe-running-scheduler/src/lib/inputVerification.js) | JavaScript | 79 | 0 | 4 | 83 |
| [fe-running-scheduler/src/lib/logicConstants.js](/fe-running-scheduler/src/lib/logicConstants.js) | JavaScript | 2 | 0 | 0 | 2 |
| [fe-running-scheduler/src/lib/uiConstants.js](/fe-running-scheduler/src/lib/uiConstants.js) | JavaScript | 3 | 0 | 0 | 3 |
| [fe-running-scheduler/src/loader/calendarIndexLoader.js](/fe-running-scheduler/src/loader/calendarIndexLoader.js) | JavaScript | 10 | 4 | 5 | 19 |
| [fe-running-scheduler/src/loader/index.js](/fe-running-scheduler/src/loader/index.js) | JavaScript | 3 | 0 | 2 | 5 |
| [fe-running-scheduler/src/loader/overviewLoader.js](/fe-running-scheduler/src/loader/overviewLoader.js) | JavaScript | 14 | 0 | 3 | 17 |
| [fe-running-scheduler/src/logic/processFormDataFromScheduler.js](/fe-running-scheduler/src/logic/processFormDataFromScheduler.js) | JavaScript | 185 | 34 | 29 | 248 |
| [fe-running-scheduler/src/logic/processGpxData.js](/fe-running-scheduler/src/logic/processGpxData.js) | JavaScript | 173 | 31 | 39 | 243 |
| [fe-running-scheduler/src/main.jsx](/fe-running-scheduler/src/main.jsx) | JavaScript JSX | 9 | 0 | 2 | 11 |
| [fe-running-scheduler/src/pages/CalendarEditModal.jsx](/fe-running-scheduler/src/pages/CalendarEditModal.jsx) | JavaScript JSX | 95 | 0 | 11 | 106 |
| [fe-running-scheduler/src/pages/CalendarView.jsx](/fe-running-scheduler/src/pages/CalendarView.jsx) | JavaScript JSX | 55 | 4 | 7 | 66 |
| [fe-running-scheduler/src/pages/CreateEquipment.jsx](/fe-running-scheduler/src/pages/CreateEquipment.jsx) | JavaScript JSX | 28 | 0 | 3 | 31 |
| [fe-running-scheduler/src/pages/CreateScheduleModal.jsx](/fe-running-scheduler/src/pages/CreateScheduleModal.jsx) | JavaScript JSX | 36 | 0 | 4 | 40 |
| [fe-running-scheduler/src/pages/Datenschutz.jsx](/fe-running-scheduler/src/pages/Datenschutz.jsx) | JavaScript JSX | 183 | 32 | 20 | 235 |
| [fe-running-scheduler/src/pages/EquipmentDetails.jsx](/fe-running-scheduler/src/pages/EquipmentDetails.jsx) | JavaScript JSX | 51 | 0 | 6 | 57 |
| [fe-running-scheduler/src/pages/EquipmentModal.jsx](/fe-running-scheduler/src/pages/EquipmentModal.jsx) | JavaScript JSX | 40 | 0 | 4 | 44 |
| [fe-running-scheduler/src/pages/Error.jsx](/fe-running-scheduler/src/pages/Error.jsx) | JavaScript JSX | 26 | 0 | 4 | 30 |
| [fe-running-scheduler/src/pages/Impressum.jsx](/fe-running-scheduler/src/pages/Impressum.jsx) | JavaScript JSX | 36 | 0 | 3 | 39 |
| [fe-running-scheduler/src/pages/Login.jsx](/fe-running-scheduler/src/pages/Login.jsx) | JavaScript JSX | 139 | 0 | 8 | 147 |
| [fe-running-scheduler/src/pages/NotFound.jsx](/fe-running-scheduler/src/pages/NotFound.jsx) | JavaScript JSX | 13 | 0 | 2 | 15 |
| [fe-running-scheduler/src/pages/Overview.jsx](/fe-running-scheduler/src/pages/Overview.jsx) | JavaScript JSX | 51 | 0 | 7 | 58 |
| [fe-running-scheduler/src/pages/Profile.jsx](/fe-running-scheduler/src/pages/Profile.jsx) | JavaScript JSX | 134 | 8 | 13 | 155 |
| [fe-running-scheduler/src/pages/RunDetailsModal.jsx](/fe-running-scheduler/src/pages/RunDetailsModal.jsx) | JavaScript JSX | 326 | 25 | 22 | 373 |
| [fe-running-scheduler/src/pages/SignUp.jsx](/fe-running-scheduler/src/pages/SignUp.jsx) | JavaScript JSX | 166 | 0 | 8 | 174 |
| [fe-running-scheduler/src/pages/TrainingDayDetailsModal.jsx](/fe-running-scheduler/src/pages/TrainingDayDetailsModal.jsx) | JavaScript JSX | 120 | 5 | 13 | 138 |
| [fe-running-scheduler/src/pages/Welcome.jsx](/fe-running-scheduler/src/pages/Welcome.jsx) | JavaScript JSX | 53 | 94 | 9 | 156 |
| [fe-running-scheduler/src/pages/index.js](/fe-running-scheduler/src/pages/index.js) | JavaScript | 36 | 0 | 2 | 38 |
| [fe-running-scheduler/src/svg/animated.jsx](/fe-running-scheduler/src/svg/animated.jsx) | JavaScript JSX | 11 | 0 | 1 | 12 |
| [fe-running-scheduler/src/unused/JsonFileHandler.jsx](/fe-running-scheduler/src/unused/JsonFileHandler.jsx) | JavaScript JSX | 52 | 13 | 10 | 75 |
| [fe-running-scheduler/src/unused/LineChartAllWeeksDistanceTime.jsx](/fe-running-scheduler/src/unused/LineChartAllWeeksDistanceTime.jsx) | JavaScript JSX | 55 | 2 | 5 | 62 |
| [fe-running-scheduler/src/unused/LineChartAllWeeksPaceHeartRate.jsx](/fe-running-scheduler/src/unused/LineChartAllWeeksPaceHeartRate.jsx) | JavaScript JSX | 53 | 6 | 5 | 64 |
| [fe-running-scheduler/src/unused/LineChartDistanceTime.jsx](/fe-running-scheduler/src/unused/LineChartDistanceTime.jsx) | JavaScript JSX | 55 | 2 | 5 | 62 |
| [fe-running-scheduler/src/unused/LineChartPaceHeartRate.jsx](/fe-running-scheduler/src/unused/LineChartPaceHeartRate.jsx) | JavaScript JSX | 52 | 6 | 5 | 63 |
| [fe-running-scheduler/src/unused/authLoader.js](/fe-running-scheduler/src/unused/authLoader.js) | JavaScript | 12 | 2 | 4 | 18 |
| [fe-running-scheduler/src/unused/calendarByIdLoader.js](/fe-running-scheduler/src/unused/calendarByIdLoader.js) | JavaScript | 16 | 0 | 2 | 18 |
| [fe-running-scheduler/src/unused/calendarCycling.js](/fe-running-scheduler/src/unused/calendarCycling.js) | JavaScript | 107 | 1 | 7 | 115 |
| [fe-running-scheduler/src/unused/calendarLoader.js](/fe-running-scheduler/src/unused/calendarLoader.js) | JavaScript | 19 | 0 | 1 | 20 |
| [fe-running-scheduler/src/unused/getCurrentPreviousNextCalendars.js](/fe-running-scheduler/src/unused/getCurrentPreviousNextCalendars.js) | JavaScript | 80 | 4 | 11 | 95 |
| [fe-running-scheduler/src/unused/handleGpxUpload.js](/fe-running-scheduler/src/unused/handleGpxUpload.js) | JavaScript | 131 | 36 | 33 | 200 |
| [fe-running-scheduler/src/unused/useCalendarCycling.js](/fe-running-scheduler/src/unused/useCalendarCycling.js) | JavaScript | 70 | 27 | 15 | 112 |
| [fe-running-scheduler/src/utils/arrayBufferToBase64.js](/fe-running-scheduler/src/utils/arrayBufferToBase64.js) | JavaScript | 9 | 5 | 2 | 16 |
| [fe-running-scheduler/src/utils/calculateSummariesForOverview.js](/fe-running-scheduler/src/utils/calculateSummariesForOverview.js) | JavaScript | 53 | 0 | 7 | 60 |
| [fe-running-scheduler/src/utils/calculateWeeklySummary.js](/fe-running-scheduler/src/utils/calculateWeeklySummary.js) | JavaScript | 66 | 0 | 8 | 74 |
| [fe-running-scheduler/src/utils/cn.js](/fe-running-scheduler/src/utils/cn.js) | JavaScript | 6 | 0 | 2 | 8 |
| [fe-running-scheduler/src/utils/formatDate.js](/fe-running-scheduler/src/utils/formatDate.js) | JavaScript | 11 | 0 | 2 | 13 |
| [fe-running-scheduler/src/utils/getOverviewData.js](/fe-running-scheduler/src/utils/getOverviewData.js) | JavaScript | 167 | 15 | 20 | 202 |
| [fe-running-scheduler/src/utils/normalizeToArray.js](/fe-running-scheduler/src/utils/normalizeToArray.js) | JavaScript | 4 | 0 | 2 | 6 |
| [fe-running-scheduler/src/utils/parseGpxData.js](/fe-running-scheduler/src/utils/parseGpxData.js) | JavaScript | 16 | 1 | 6 | 23 |
| [fe-running-scheduler/src/utils/processRunningDataHelper.js](/fe-running-scheduler/src/utils/processRunningDataHelper.js) | JavaScript | 41 | 17 | 6 | 64 |
| [fe-running-scheduler/tailwind.config.js](/fe-running-scheduler/tailwind.config.js) | JavaScript | 11 | 1 | 2 | 14 |
| [fe-running-scheduler/vite.config.js](/fe-running-scheduler/vite.config.js) | JavaScript | 14 | 1 | 3 | 18 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)