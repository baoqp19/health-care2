import { useState } from 'react';
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Flex, Select, Space } from "antd";
import { useHealthStatsStore } from '../../stores/healthStatStore';
import ConfirmModal from '../../components/modals/ConfirmModal';
import PageHeader from '../../components/page-header';
import BloodPressureContainer from '../../sections/health-stats/BloodPressureContainer';
import BloodGlucoseContainer from '../../sections/health-stats/BloodGlucoseContainer';
import HeartRateContainer from '../../sections/health-stats/HeartRateContainer';
import CreateHealthStatModal from '../../sections/health-stats/CreateHealthStatModal';
import UpdateHealthStatModal from '../../sections/health-stats/UpdateHealthStatModal';
import { useMembersByUser } from '../../api/members/get-members';
const { Option } = Select;
const HealthStatsPage = () => {
  // const { t } = useTranslation();
  const {
    openDeleteModal,
    openCreateModal,
    openUpdateModal,
    setOpenDeleteModal,
    setOpenCreateModal,
    setOpenUpdateModal
  } = useHealthStatsStore();

  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);

  const handleMemberChange = (memberId: number) => {
    setSelectedMemberId(memberId);
    // Có thể thêm logic gọi API để tải thống kê sức khỏe cho memberId đã chọn
  };

  const handleCreate = () => setOpenCreateModal(true);
  const handleDeleteCancel = () => setOpenDeleteModal(false);
  const handleCreateCancel = () => setOpenCreateModal(false);
  const handleUpdateCancel = () => setOpenUpdateModal(false);

  const { data: members } = useMembersByUser();

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-2">
        <PageHeader
          heading={"Health Stats"}
          links={[
            { title: "Dashboard", href: "/manager" },
            { title: "Health Stats" },
          ]}
        />
        <Space>
          <Select
            className="w-[250px]"
            placeholder="Select member..."
            value={selectedMemberId}
            onChange={handleMemberChange}
          >
            <Option value="">All Members</Option>
            {members?.map((member) => (
              <Option key={member.id} value={member.id}>
                {member.fullName}
              </Option>
            ))}
          </Select>
          <Button
            onClick={handleCreate} // Đảm bảo rằng hàm này được gọi khi nhấn nút
            type="primary"
            icon={<PlusSquareOutlined />}
            disabled={!selectedMemberId} // Vô hiệu hóa nếu không có member nào được chọn
          >
            {"Add"}
          </Button>
        </Space>
      </Flex>
      <div style={{ paddingTop: 20 }}>
        <BloodPressureContainer selectedMemberId={selectedMemberId} />
      </div>
      <div style={{ paddingTop: 20 }}>
        <BloodGlucoseContainer selectedMemberId={selectedMemberId} />
      </div>
      <div style={{ paddingTop: 20 }}>
        <HeartRateContainer selectedMemberId={selectedMemberId} />
      </div>

      <ConfirmModal
        title="Are you sure to delete Health Stat?"
        content="Coming Soon"
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => { }}
      />
      <CreateHealthStatModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
        selectedMemberId={selectedMemberId} // Truyền selectedMemberId vào đây
      />
      <UpdateHealthStatModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
      />
    </>
  );
};

export default HealthStatsPage;