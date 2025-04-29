import { Button, Form, Input, Modal, Select, Row, DatePicker, Col, message, Tabs } from "antd";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { UpdateMedicalRecordParams, useMedicalRecordsStore } from "../../stores/medicalRecordStore";
import { useUpdateMedicalRecord } from "../../api/medicalRecords/update-medical-records";
import dayjs from "dayjs";
import { MedicalRecord } from "../../types";
import moment from "moment";
import MemberInfoForm from "./MemberInfoForm";
import MedicationList from "./MedicationList";
import DocumentList from "./DocumentList";
import FooterButtons from "./FooterButtons";

interface UpdateMedicalRecordModalProps {
  open: boolean;
  handleCancel: () => void;
  selectedMedicalRecord: UpdateMedicalRecordParams | null;
}




const UpdateMedicalRecordModal: React.FC<UpdateMedicalRecordModalProps> = ({ open, handleCancel, selectedMedicalRecord }) => {
  const [form] = Form.useForm();
  const [tab, setTab] = useState("0");
  const {
    medicalRecord,
    setMedicalRecord,
    openUpdateModal,
    setOpenUpdateModal,
    listDocuments,
    listMedications,
    setListMedication,
    setListDocument,
    clearListMedication,
    clearListDocument
  } = useMedicalRecordsStore();


  useEffect(() => {
    if (medicalRecord) {
      setTab("0");
      form.setFieldValue("memberId", medicalRecord?.member.memberId);
      form.setFieldValue("facilityName", medicalRecord?.facilityName);
      form.setFieldValue("date", moment(medicalRecord?.date));
      form.setFieldValue("doctor", medicalRecord?.doctor);
      form.setFieldValue("symptoms", medicalRecord?.symptoms);
      form.setFieldValue("diagnosis", medicalRecord?.diagnosis);
      form.setFieldValue("treatment", medicalRecord?.treatment);
      setListMedication(medicalRecord?.medications);
      setListDocument(medicalRecord?.documents);
    }
  }, [medicalRecord]);

  const onFinish = (values: MedicalRecord) => {
    values["medications"] = listMedications;
    values["documents"] = listDocuments;
    console.log("Values", values);
  };

  const items = [
    { key: "0", label: "Thông tin", children: <MemberInfoForm form={form} /> },
    { key: "1", label: "Thuốc", children: <MedicationList /> },
    { key: "2", label: "Tài liệu", children: <DocumentList /> },
  ];


  return (
    <Modal
      title="Hồ sơ y tế"
      width={1000}
      open={open}
      centered={true}
      onCancel={() => {
        setOpenUpdateModal(false),
          setMedicalRecord(null),
          clearListMedication();
        clearListDocument();
      }}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical">
        <Tabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
        <FooterButtons />
      </Form>
    </Modal>
  );
}
export default UpdateMedicalRecordModal;