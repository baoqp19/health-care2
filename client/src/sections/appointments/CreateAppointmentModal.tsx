
import { Button, Form, Input, Modal, DatePicker, Row, Col, Select, message } from "antd";
import { Flex } from "antd";
import { useEffect } from "react";
import { useAppointmentsStore } from "../../stores/appointmentStore";
import { useMembers, useMembersByUser } from "../../api/members/get-members";
import { useCreateAppointment } from "../../api/appointments/create-appointment";
import { Member } from "../../stores/MemberStore";
import { Appointment123, MemberAndUser } from "../../types";

const { Option } = Select;

type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const CreateAppointmentModal = ({ open, handleCancel }: PropsCreate) => {
  const [form] = Form.useForm();

  const { openCreateModal, setOpenCreateModal } = useAppointmentsStore();

  const { data: members } = useMembersByUser();

  const MembersArray = Array.isArray(members) ? members : [];

  useEffect(() => {
    if (openCreateModal) {
      form.resetFields();
    }
  }, [openCreateModal, form]);

  const mutation = useCreateAppointment({
    onSuccess: () => {
      setOpenCreateModal(false);
      message.success("Appointment created successfully");
    },
    onError: () => {
      message.error("Failed to create appointment");
    },
  });

  const onFinish = (values: Appointment123) => {
    console.log("Received values:", values);
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Create Vaccination"
      open={open}
      onCancel={() => setOpenCreateModal(false)}
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        className="pt-4"
        layout="vertical"
        variant="filled"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Member"
              name="memberId"
              rules={[{ required: true, message: "Please select member" }]}
            >
              <Select placeholder="Select member...">
                {MembersArray?.map((member: MemberAndUser) => (<Option key={member.id} value={member.id}>{member.fullName}</Option>))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Time"
              name="time"
              rules={[
                { required: true, message: "Please enter appointment time" },
              ]}
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Doctor"
              name="doctor"
              rules={[
                { required: true, message: "Please enter doctor name" },
              ]}
            >
              <Input placeholder="Enter doctor name..." />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please enter location" },
              ]}
            >
              <Input placeholder="Enter location..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <Flex justify="end" className="gap-3">
            <Button loading={false} type="default" htmlType="reset">
              Reset
            </Button>
            <Button loading={false} type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAppointmentModal;















