import { Button, Form, Input, Modal } from "antd";
import { message } from "antd";
import moment from "moment";
import { useNotesStore } from "../../stores/notes/noteStore";
import { useNotes } from "../../api/notes/get-note";
import { useCreateNote } from "../../api/notes/create-note";

type PropsCreate = {
	open: boolean,
	handleCancel?: () => void
}


const CreateNoteModal = ({ open, handleCancel }: PropsCreate) => {
	const [form] = Form.useForm();
	const { openCreateModal, setOpenCreateModal } = useNotesStore();
	const { data: notes } = useNotes({});

	const mutation = useCreateNote({
		onSuccess: () => {
			form.resetFields();
			handleCancel?.();
			setOpenCreateModal(false);
			message.success("New note added successfully");
		},
		onError: () => {
			message.error("Failed to add new note");
		},
	});

	type valuseCreate = {
		title: string
		content: string
	}

	const onFinish = (values: valuseCreate) => {
		const listNotes = notes || [];
		const now = moment(new Date()).format('YYYY-MM-DD');
		console.log(now);
		const formattedValues = {
			...values,
			noteIndex: listNotes.length + 1,
			createAt: now,
		};
		console.log("Create", formattedValues);
		mutation.mutate(formattedValues);
	};
	return (
		<Modal
			title="Add Note"
			open={open}
			onCancel={() => setOpenCreateModal(false)}
			footer={null}
		>
			<Form onFinish={onFinish}>
				<Form.Item
					name="title"
					label="Title"
					rules={[{ required: true, message: "Please input the title!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="content"
					label="Content"
					rules={[{ required: true, message: "Please input the content!" }]}
				>
					<Input.TextArea />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default CreateNoteModal;
