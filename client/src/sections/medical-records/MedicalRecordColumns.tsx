import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { MedicalRecord, useMedicalRecordsStore } from "../../stores/medicalRecordStore";
import { useDeleteMedicalRecord } from "../../api/medicalRecords/delete-medical-records";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";

const useMedicalRecordColumns = () => {
  const { setOpenUpdateModal, setMedicalRecord } = useMedicalRecordsStore((state) => state);

  const mutateDelete = useDeleteMedicalRecord({
    onSuccess: () => {
      message.success("Deleted medical record successfully");
    },
    onError: (error) => {
      message.error(
        `Failed to delete medical record. Reason: ${error.message}`
      );
    },
  });

  const t = useTranslation();

  const handleEdit = (medicalRecord: MedicalRecord) => {
    setMedicalRecord(medicalRecord);
    setOpenUpdateModal(true);
  };

  const handleDelete = (id: number) => {
    mutateDelete.mutate(id);
  };

  const columns = useMemo<ColumnType<MedicalRecord>[]>(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "Thành viên",
        dataIndex: "memberName",
        key: "memberName"
      },
      {
        title: "Tên cơ sở",
        dataIndex: "facilityName",
        key: "facilityName",
      },
      {
        title: "Ngày",
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      {
        title: "Bác sĩ",
        dataIndex: "doctor",
        key: "doctor",
      },
      {
        title: "Triệu chứng",
        dataIndex: "symptoms",
        key: "symptoms",
      },
      {
        title: "Chuẩn đoán",
        dataIndex: "diagnosis",
        key: "diagnosis",
      },
      {
        title: "Điều trị",
        dataIndex: "treatment",
        key: "treatment",
      },
      {
        title: "Action",
        key: "action",
        render: (_, medicalRecord) => (
          <Space>
            <Button
              onClick={() => handleEdit(medicalRecord)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="Remove medical record"
              description="Are you sure to remove this medical record ?"
              onConfirm={() => handleDelete(medicalRecord.recordID)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t]
  );
  return columns
};

export default useMedicalRecordColumns;