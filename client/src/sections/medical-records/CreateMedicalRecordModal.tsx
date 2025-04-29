import { useMedicalRecordsStore } from "../../stores/medicalRecordStore";
import { useCreateMedicalRecord } from "../../api/medicalRecords/create-medical-records";
import MemberInfoForm from "./MemberInfoForm";
import MedicationList from "./MedicationList";
import FooterButtons from "./FooterButtons";
import { Form, Modal, Select, Tabs } from "antd";
import DocumentList from "./DocumentList";
import { useEffect, useState } from "react";
import { MedicalRecord } from "../../types";
const { Option } = Select;

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const CreateMedicalRecordModal = ({ open, handleCancel }: PropsCreate) => {

  const [form] = Form.useForm();
  const [tab, setTab] = useState("0");
  const { openCreateModal, setOpenCreateModal, listDocuments, listMedications, clearListMedication,
    clearListDocument } = useMedicalRecordsStore();




  const mutation = useCreateMedicalRecord({
    onSuccess: () => { },
    onError: () => { },
  });

  console.log("tab", tab);

  const items = [
    { key: "0", label: "Thông tin", children: <MemberInfoForm form={form} /> },
    { key: "1", label: "Thuốc", children: <MedicationList /> },
    { key: "2", label: "Tài liệu", children: <DocumentList /> },
  ];

  useEffect(() => {
    setTab("0");
    form.resetFields();
    clearListMedication();
    clearListDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCreateModal]);

  const onFinish = (values: MedicalRecord) => {
    values["medications"] = listMedications;
    values["documents"] = listDocuments;
    console.log("Values", values);
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Hồ sơ y tế"
      width={1000}
      open={open}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical">
        <Tabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
        <FooterButtons />
      </Form>
    </Modal>
  );
};

export default CreateMedicalRecordModal;