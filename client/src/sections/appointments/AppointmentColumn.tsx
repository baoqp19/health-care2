import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Appointment, useAppointmentsStore } from "../../stores/appointments/appointmentStore";
import { useDeleteAppointment } from "../../api/appointments/delete-appointment";
import { ColumnType } from "antd/es/table";

const useAppointmentColumns = () => {
  const { t } = useTranslation();

  const { setOpenUpdateModal, setAppointment } = useAppointmentsStore((state) => state);

  const mutateDelete = useDeleteAppointment({
    onSuccess: () => {
      message.success("Delete appointment successfully");
    },
    onError: (error) => {
      message.error(`Delete appointment failed. Reason: ${error.message}`);
    },
  });

  const handleEdit = (appointment: Appointment) => {
    setAppointment(appointment);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };

  const columns = useMemo<ColumnType<Appointment>[]>(
    () => [
      {
        title: "ID",
        dataIndex: "appointmentID",
        key: "appointmentID",
        align: "center",
      },
      {
        title: "Time",
        dataIndex: "time",
        key: "time",
        align: "center",
        render: (text: string) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "Member",
        key: "memberName",
        align: "center",
        render: (_, appointment) => appointment.member.fullName
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        key: "doctor",
        align: "center",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        align: "center",
      },
      {
        title: t("Action"),
        key: "action",
        render: (_, appointment) => (
          <Space>
            <Button
              onClick={() => handleEdit(appointment)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Delete the appointment"
              description="Are you sure to delete this appointment?"
              onConfirm={() => handleDelete(appointment.appointmentID)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t]
  );
  return columns
};

export default useAppointmentColumns;