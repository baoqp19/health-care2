import { Button, Form, Input, Modal, message } from "antd";
import { useEffect } from "react";
import { useNotesStore } from "../../stores/notes/noteStore";
import { useUpdateNote } from "../../api/notes/update-note";

interface UpdateNoteModalProps {
	open: boolean;
	handleCancel: () => void;
	selectedMember: null;
}

const UpdateNoteModal: React.FC<UpdateNoteModalProps> = ({ open, handleCancel, selectedMember }) => {
	const [form] = Form.useForm();
	const { openUpdateModal, setOpenUpdateModal, note } = useNotesStore((state) => state);

	const mutation = useUpdateNote({
		onSuccess: () => {
			handleCancel();
			message.success("Note change recorded successfully");
		},
		onError: () => {
			message.error("Failed to update note");
		},
	});

	const onFinish = (values: { title: string; content: string }) => {
		const formattedValues = { ...values, noteIndex: note?.noteIndex, createAt: note?.createAt };
		if (note?.noteID) {
			mutation.mutate({
				noteId: note.noteID,
				data: formattedValues,
			});
			setOpenUpdateModal(false);
		}
	};

	useEffect(() => {
		if (note) {
			form.setFieldsValue(note);
		}
	}, [note, form]);

	return (
		<Modal title="Edit Note" open={open} onCancel={handleCancel} footer={null}>
			<Form form={form} onFinish={onFinish}>
				<Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
					<Input />
				</Form.Item>
				<Form.Item name="content" label="Content" rules={[{ required: true, message: "Please input the content!" }]}>
					<Input.TextArea />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Save
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default UpdateNoteModal;
