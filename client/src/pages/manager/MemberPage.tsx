import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Space } from "antd";

import PageHeader from "../../components/page-header";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { MemberTable } from "../../sections/members/MemberTable";
import CreateMemberModal from "../../sections/members/CreateMemberModal";
import UpdateMemberModal from "../../sections/members/UpdateMemberModal";
import { useMembersStore } from "../../stores/MemberStore";
import { useTranslation } from "react-i18next";


const MemberPage = () => {

  const { t } = useTranslation();

  const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useMembersStore((state) => state);

  const handleDeleteCancel = () => {
    setOpenDeleteModal(false);
  };

  const handleCreate = () => {
    setOpenCreateModal(true);
  };

  const handleCreateCancel = () => {
    setOpenCreateModal(false);
  };

  const handleUpdateCancel = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Flex align="center" justify="space-between" className="mb-1">
            <PageHeader
              heading={t("Members")}
              links={[
                { title: t("Dashboard"), href: "/manager" },
                { title: t("Members") },
              ]}
            />
            <Space>
              <Button
                onClick={handleCreate}
                type="primary"
                icon={<PlusSquareOutlined />}
              >
                Add
              </Button>
            </Space>
          </Flex>
          <MemberTable />
        </Col>
      </Row>
      <ConfirmModal
        title={'t("warning_delete.Member")'}
        content={"oming Soon"}
        open={openDeleteModal}
        handleCancel={handleDeleteCancel}
        handleOk={() => { }}
      />
      <CreateMemberModal
        open={openCreateModal}
        handleCancel={handleCreateCancel}
      />
      <UpdateMemberModal
        open={openUpdateModal}
        handleCancel={handleUpdateCancel}
        selectedMember={null}
      />
    </>
  );
};
export default MemberPage;
