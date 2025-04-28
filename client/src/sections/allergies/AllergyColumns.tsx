import { Button, message, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAllergiesStore } from "../../stores/allergyStore";
import { useDeleteAllergy } from "../../api/allergies/delete-allergy";
import { useMemo } from "react";
import { ColumnType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { Allergy123 } from "../../types";

const useAllergyColumns = () => {

    const { t } = useTranslation();

    const { setOpenUpdateModal, setAllergy } = useAllergiesStore(
        (state) => state
    );

    const mutateDelete = useDeleteAllergy({
        onSuccess: () => {
            message.success("Deleted allergy successfully");
        },
        onError: (error) => {
            message.error(`Failed to delete allergy. Reason: ${error.message}`);
        },
    });

    const handleEdit = (allergy: Allergy123) => {
        setAllergy(allergy);
        setOpenUpdateModal(true);
    };

    const handleDelete = (id: number) => {
        mutateDelete.mutate(id);
    };

    const columns = useMemo<ColumnType<Allergy123>[]>(
        () => [
            {
                title: t("ID"),
                dataIndex: "id",
                key: "id",
                align: "center",
            },
            {
                title: "Member",
                key: "memberName",
                align: "center",
                render: (_, allergy) => allergy.member.fullName,
            },
            {
                title: t("AllergyPage.AllergyType"),
                dataIndex: "allergyType",
                key: "allergyType",
            },
            {
                title: t("AllergyPage.Severity"),
                dataIndex: "severity",
                key: "severity",
            },
            {
                title: t("AllergyPage.Symptoms"),
                dataIndex: "symptoms",
                key: "symptoms",
            },
            {
                title: t("Action"),
                key: "action",
                render: (_, allergy) => (
                    <Space>
                        <Button
                            onClick={() => handleEdit(allergy)}
                            icon={<EditOutlined />}
                        />
                        <Popconfirm
                            title="Remove allergy"
                            description="Are you sure to remove this allergy ?"
                            onConfirm={() => handleDelete(allergy.id)}
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

export default useAllergyColumns;