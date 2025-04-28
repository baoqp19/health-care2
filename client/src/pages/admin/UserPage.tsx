import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { useUsersStore } from "../../stores/userStore";
import PageHeader from "../../components/page-header";
import { UserTable } from "../../sections/users/UserTable";
import ConfirmModal from "../../components/modals/ConfirmModal";


const UserPage = () => {
	const {
		openUpdateModal,
		setOpenUpdateModal,
	} = useUsersStore((state) => state);
	const { t } = useTranslation();
	const handleUpdateBlockStateUser = () => {
		setOpenUpdateModal(false);
	};


	return (
		<>
			<Flex align="center" justify="space-between" className="mb-1">
				<PageHeader
					heading={t("Users")}
					links={[
						{ title: t("Dashboard"), href: "/admin" },
						{ title: t("Users") },
					]}
				/>
			</Flex>
			<UserTable />
			<ConfirmModal
				title={'t("warning_change.User")'}
				content={"Coming Soon"}
				open={openUpdateModal}
				handleCancel={handleUpdateBlockStateUser}
				handleOk={() => { }}
			/>
		</>
	);
};
export default UserPage;