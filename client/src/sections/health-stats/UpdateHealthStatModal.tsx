import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, DatePicker, Row, Col, message, Select } from "antd";
import moment from "moment";
import { HealthStat, useHealthStatsStore } from "../../stores/healthStatStore";
import { useUpdateHealthStat } from "../../api/health-stats/update-health-stat";
import dayjs from "dayjs";


type PropsCreate = {
  open: boolean,
  handleCancel?: () => void
}


const UpdateHealthStatModal = ({ open, handleCancel }: PropsCreate) => {
  const [form] = Form.useForm();
  const { openUpdateModal, setOpenUpdateModal, healthStat } = useHealthStatsStore((state) => state);
  const [selectedStatType, setSelectedStatType] = useState("Blood Pressure");

  // Đồng bộ selectedStatType với healthStat khi healthStat thay đổi
  useEffect(() => {
    if (healthStat) {
      setSelectedStatType(healthStat.statType);
      form.setFieldsValue({
        ...healthStat,
        date: healthStat.date
      });
    } else {
    }
  }, [healthStat, form]);

  const mutation = useUpdateHealthStat({
    onSuccess: () => {
      form.resetFields();
      message.success("Health status updated successfully");
    },
    onError: () => {
      message.error("Failed to update health status");
    },
  });

  const handleChange = (value: string) => {
    setSelectedStatType(value);
  };

  const onFinish = (values: HealthStat) => {
    const formattedValues = {
      ...values,
      statType: selectedStatType,
    };
    console.log(formattedValues)
    if (typeof healthStat?.id === "number") {
      mutation.mutate({
        id: healthStat.id,
        data: formattedValues,
      });
      setOpenUpdateModal(false);
    }
  };

  const setPlaceholderOfStatValue = () => {
    switch (selectedStatType) {
      case "Blood Pressure":
        return "mmHg";
      case "Blood Glucose":
        return "mg/dL";
      case "Heart Rate":
        return "bpm";
      default:
        return "";
    }
  };

  return (
    <Modal
      title="Update Health Status"
      open={open}
      onCancel={() => setOpenUpdateModal(false)}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" variant="filled">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Status type" name="statType">
              <Select
                value={selectedStatType} // Sử dụng value để đồng bộ với selectedStatType
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
                options={[
                  { value: "Blood Pressure", label: "Blood Pressure" },
                  { value: "Blood Glucose", label: "Blood Glucose" },
                  { value: "Heart Rate", label: "Heart Rate" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status Value"
              name="statValue"
              rules={[{ required: true, message: "Please enter status value" }]}
            >
              <Input
                placeholder={setPlaceholderOfStatValue()}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.keyCode !== 8 && e.keyCode !== 46) {
                    e.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Date and time"
              name="date"
              rules={[{ required: true, message: "Please select date" }]}
              getValueProps={(value) => ({
                value: value ? dayjs(value).isValid() ? dayjs(value) : null : null,
              })}
              getValueFromEvent={(date) => date ? date.format("YYYY-MM-DD") : ""}
            >
              <DatePicker
                placeholder="Select the date and time of measurement."
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="pt-4 m-0">
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateHealthStatModal;