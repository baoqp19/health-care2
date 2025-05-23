import { useTranslation } from "react-i18next";
import { useUpdateSeenStateContact } from "../../api/contacts/update-seen-state-contact";
import { Button, message, Popconfirm, Space } from "antd";
import { useMemo } from "react";
import { CheckCircleOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Contacts } from "../../stores/contactStore";
import { ColumnType } from "antd/es/table";

const useContactColumns = () => {
  const { t } = useTranslation();

  const mutateUpdateSeenStateContact = useUpdateSeenStateContact({
    onSuccess: () => {
      message.success("Seen contact successfully");
    },
    onError: (error) => {
      message.error(`Seen contact failed. Reason: ${error.message}`);
    },
  });

  const handleUpdateSeenStateContact = (id: number) => {
    mutateUpdateSeenStateContact.mutate(id);
  };


  const columns = useMemo<ColumnType<Contacts>[]>(
    () => [
      {
        title: t("Contact ID"),
        dataIndex: "contactID",
        key: "contactID",
        align: "center",
      },
      {
        title: t("Email"),
        dataIndex: "email",
        key: "email",
        align: "center",
      },
      {
        title: t("Content"),
        dataIndex: "content",
        key: "content",
        align: "center",
      },
      {
        title: t("Date"),
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      {
        title: t("Status"),
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (status) => (status ? t("Seen") : t("Unseen")),
      },
      {
        title: t("Action"),
        key: "action",
        render: (_, contact) => (
          <Space>
            <Popconfirm
              title={t("Seen contact of user")}
              description={t("Are you sure to seen this contact?")}
              onConfirm={() => handleUpdateSeenStateContact(contact.contactID)}
              okText={t("Yes")}
              cancelText={t("No")}
            >
              <Button
                type={contact.status == 1 ? "primary" : "default"} // Chuyển sang xanh lá cây khi active
                icon={<CheckCircleOutlined />}
                style={contact.status == 1 ? { pointerEvents: 'none' } : {}}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [t]
  );
  return columns;
};

export default useContactColumns;