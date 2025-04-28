import { useState } from "react";
import {
	Button,
	Input,
	DatePicker,
	Space,
	Flex,
	Empty,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";

// Định nghĩa type cho một form thuốc
interface MedicationForm {
	index: number;
	name: string;
	dosage: string;
	startDate: string;
	endDate: string;
}

const MedicationList = () => {
	const [formListMedication, setFormListMedication] = useState<MedicationForm[]>([
		{
			index: 1,
			name: "Thuốc cảm",
			dosage: "1 viên",
			startDate: "2021-09-01",
			endDate: "2021-09-10",
		},
	]);

	const addForm = () => {
		setFormListMedication((prev) => [
			...prev,
			{
				index: prev.length + 1,
				name: "",
				dosage: "",
				startDate: "",
				endDate: "",
			},
		]);
	};

	const removeForm = (index: number) => {
		setFormListMedication((prev) => prev.filter((form) => form.index !== index));
	};

	const handleInputChange = (
		index: number,
		field: keyof MedicationForm,
		value: string
	) => {
		setFormListMedication((prev) =>
			prev.map((form) =>
				form.index === index ? { ...form, [field]: value } : form
			)
		);
	};

	return (
		<Flex vertical gap={4}>
			{formListMedication.length > 0 ? (
				formListMedication.map((form) => (
					<Space
						key={form.index}
						direction="horizontal"
						style={{
							marginBottom: 16,
							padding: 16,
							border: "1px solid #f0f0f0",
							borderRadius: 8,
						}}
					>
						<Input
							placeholder="Tên thuốc"
							value={form.name}
							onChange={(e) =>
								handleInputChange(form.index, "name", e.target.value)
							}
							style={{ width: 150 }}
						/>
						<Input
							placeholder="Liều lượng"
							value={form.dosage}
							onChange={(e) =>
								handleInputChange(form.index, "dosage", e.target.value)
							}
							style={{ width: 100 }}
						/>
						<DatePicker
							placeholder="Ngày bắt đầu"
							value={form.startDate ? moment(form.startDate) : null}
							onChange={(date: Moment | null) =>
								handleInputChange(
									form.index,
									"startDate",
									date ? date.format("YYYY-MM-DD") : ""
								)
							}
						/>
						<DatePicker
							placeholder="Ngày kết thúc"
							value={form.endDate ? moment(form.endDate) : null}
							onChange={(date: Moment | null) =>
								handleInputChange(
									form.index,
									"endDate",
									date ? date.format("YYYY-MM-DD") : ""
								)
							}
						/>
						<Button
							type="text"
							danger
							icon={<CloseOutlined />}
							onClick={() => removeForm(form.index)}
						/>
					</Space>
				))
			) : (
				<Flex justify="center" align="center" className="mb-4">
					<Empty
						image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
						imageStyle={{
							height: 60,
						}}
					/>
				</Flex>
			)}
			<Flex justify="center" align="center">
				<Button type="primary" onClick={addForm}>
					Thêm
				</Button>
			</Flex>
		</Flex>
	);
};

export default MedicationList;
