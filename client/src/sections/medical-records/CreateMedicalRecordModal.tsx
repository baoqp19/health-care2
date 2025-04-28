import { MedicalRecord, useMedicalRecordsStore } from "../../stores/medicalRecordStore";
import { useCreateMedicalRecord } from "../../api/medicalRecords/create-medical-records";
import MemberInfoForm from "./MemberInfoForm";
import MedicationList from "./MedicationList";
import DocumentUploadForm from "./DocumentUploadForm";
import FooterButtons from "./FooterButtons";
import { Form, message, Modal, Select, Tabs } from "antd";
const { Option } = Select;

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const CreateMedicalRecordModal = ({ open, handleCancel }: PropsCreate) => {
  const [form] = Form.useForm();


  const memberOptions: any[] = [];
  const { openCreateModal, setOpenCreateModal } = useMedicalRecordsStore();

  const mutation = useCreateMedicalRecord({
    onSuccess: () => {
      form.resetFields();
      setOpenCreateModal(false);
      message.success("New medical record added successfully");
    },
    onError: () => {
      message.error("Failed to add new medical record");
    },
  });

  const items = [
    { key: "0", label: "Thông tin", children: <MemberInfoForm form={form} /> },
    { key: "1", label: "Thuốc", children: <MedicationList /> },
    { key: "2", label: "Tài liệu", children: <DocumentUploadForm /> },
  ];

  const onFinish = (values: MedicalRecord) => {
    console.log(values)
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Medical Record"
      width={1000}
      open={open}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} className="pt-4" layout="vertical">
        <Tabs defaultActiveKey="0" items={items} />
        <FooterButtons />
      </Form>
    </Modal>
  );
};

export default CreateMedicalRecordModal;