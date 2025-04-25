
import React from "react";
import Loadable from "../components/Loadable";
import PrivateRoute from "../gurads/PrivateRoutes";
import DashboardLayout from "../layouts/DashboardLayout";


const DashBoardPage = Loadable(React.lazy(() => import("../pages/manager/DashBoardPage")));
const VaccinationPage = Loadable(React.lazy(() => import('../pages/manager/VaccinationPage')));
const AppointmentPage = Loadable(React.lazy(() => import('../pages/manager/AppointmentPage')));
const MemberPage = Loadable(React.lazy(() => import("../pages/manager/MemberPage")));
const AllergyPage = Loadable(React.lazy(() => import('../pages/manager/AllergyPage')));
const MedicationPage = Loadable(React.lazy(() => import('../pages/manager/MedicationPage')));
const EmergencyContactPage = Loadable(React.lazy(() => import('../pages/manager/EmergencyContactPage')));
const HelpPage = Loadable(React.lazy(() => import('../pages/manager/HelpPage')));
const MedicalRecordPage = Loadable(React.lazy(() => import('../pages/manager/MedicalRecordPage')));
const DocumentPage = Loadable(React.lazy(() => import('../pages/manager/DocumentPage')));
const HealthStatsPage = Loadable(React.lazy(() => import('../pages/manager/HealthStatsPage')))
const AccountSettingPage = Loadable(React.lazy(() => import('../pages/manager/AccountSettingPage')))
const ChatPage = Loadable(React.lazy(() => import('../pages/manager/Chatpage')))
const NotePage = Loadable(React.lazy(() => import('../pages/manager/Notepage')))


export const DashboardRoutes = [
  {
    path: '/manager',
    element: <PrivateRoute element={<DashboardLayout />} />,
    children: [
      {
        path: "",
        element: <DashBoardPage />
      },
      {
        path: 'members',
        element: <MemberPage />
      },
      {
        path: 'allergies',
        element: <AllergyPage />
      },
      {
        path: 'medications',
        element: <MedicationPage />
      },
      {
        path: 'vaccinations',
        element: <VaccinationPage />
      },
      {
        path: 'emergency-contacts',
        element: <EmergencyContactPage />
      },
      {
        path: 'account-settings',
        element: <AccountSettingPage />
      },
      {
        path: 'help-support',
        element: <HelpPage />
      },
      {
        path: 'health-stats',
        element: <HealthStatsPage />
      },
      {
        path: 'medical-records',
        // element: <PrivateRoute element={<MedicalRecordPage />} />
        element: <MedicalRecordPage />
      },
      {
        path: 'documents',
        // element: <PrivateRoute element={<DocumentPage />} />
        element: <DocumentPage />
      },
      {
        path: 'appointments',
        element: <AppointmentPage />
      },
      {
        path: 'notes',
        element: <NotePage />
      },
      {
        path: 'chat-ai',
        element: <ChatPage />
      }
    ],
  },
]
