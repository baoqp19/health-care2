import { useMemo } from "react";
import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDeleteMember } from "../../api/members/delete-member";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { Member, useMembersStore } from "../../stores/MemberStore";


const useMemberColumns = () => {

    const { t } = useTranslation();

    const { setOpenUpdateModal, setMembers } = useMembersStore((state) => state);
    // const { openDeleteModal, openCreateModal, openUpdateModal, setOpenDeleteModal, setOpenCreateModal, setOpenUpdateModal } = useMembersStore((state) => state);

    const mutateDelete = useDeleteMember({
        onSuccess: () => {
            message.success("Delete member successfully");
        },
        onError: (error) => {
            message.error(`Delete member failed. Reason: ${error.message}`);
        },
    });

    const handleEdit = (member: Member) => {
        setMembers(member);
        setOpenUpdateModal(true);
    };

    const handleDelete = (id: number) => {
        mutateDelete.mutate(id);
    };

    const columns = useMemo<ColumnType<Member>[]>(
        () => [
            {
                title: t("ID"),
                dataIndex: "id",
                key: "id",
                align: "center",
            },
            {
                title: t("MemberPage.FullName"),
                dataIndex: "fullName",
                key: "fullName",
                align: "center",
            },
            {
                title: t("MemberPage.DateOfBirth"),
                dataIndex: "dateOfBirth",
                key: "dateOfBirth",
            },
            {
                title: t("MemberPage.Gender"),
                dataIndex: "gender",
                key: "gender",
            },
            {
                title: t("MemberPage.Relationship"),
                dataIndex: "relationship",
                key: "relationship",
            },
            {
                title: t("MemberPage.BloodType"),
                dataIndex: "bloodType",
                key: "bloodType",
            },
            {
                title: t("MemberPage.Height"),
                dataIndex: "height",
                key: "height",
            },
            {
                title: t("MemberPage.Weight"),
                dataIndex: "weight",
                key: "weight",
            },
            {
                title: t("Action"),
                key: "action",
                render: (_, member) => (
                    <Space>
                        <Button
                            onClick={() => handleEdit(member)}
                            icon={<EditOutlined />}
                        />
                        <Popconfirm
                            title="Delete the member"
                            description="Are you sure to delete this member?"
                            onConfirm={() => handleDelete(member.id)}
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

    return columns;
};

export default useMemberColumns;
