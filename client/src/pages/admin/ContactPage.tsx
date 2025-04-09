import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { useContactsStore } from "../../stores/contacts/contactStore";
import PageHeader from "../../components/page-header";
import { ContactTable } from "../../sections/contacts/ContactTable";
import ConfirmModal from "../../components/modals/ConfirmModal";

const ContactPage = () => {
  const { openUpdateModal, setOpenUpdateModal, } = useContactsStore((state) => state);
  const { t } = useTranslation();
  const handleUpdateSeenStateContact = () => {
    setOpenUpdateModal(false);
  };


  return (
    <>
      <Flex align="center" justify="space-between" className="mb-1">
        <PageHeader
          heading={t("Contacts")}
          links={[
            { title: t("Dashboard"), href: "/admin" },
            { title: t("Contacts") },
          ]}
        />
      </Flex>
      <ContactTable />
      <ConfirmModal
        title={'t("warning_change.User")'}
        content={"Coming Soon"}
        open={openUpdateModal}
        handleCancel={handleUpdateSeenStateContact}
        handleOk={() => { }}
      />
    </>
  );
};
export default ContactPage;