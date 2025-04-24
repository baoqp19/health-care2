import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { Card, Col } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { Note } from "../../stores/notes/noteStore";
import { memo } from "react";

// Định nghĩa các props cho SortableItem
interface SortableItemProps {
  id: number;
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (index: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = memo(({ id, note, onEdit, onDelete }) => {


  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  const handleClickEdit = (e: React.MouseEvent) => {
    e.stopPropagation();  // Ngừng sự kiện mặc định
    console.log("Edit icon clicked");  // Kiểm tra xem click có được nhận
    onEdit(note);  // Gọi onEdit khi click vào icon
  };

  return (
    <Col
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      span={6}
      className="mb-6"
    >
      <Card
        className="w-full"
        title={note.title}
        actions={[
          <EditOutlined
            key="edit"
            onClick={handleClickEdit}  // Gọi handleClickEdit thay vì xử lý trực tiếp tại đây
          />,
          <DeleteOutlined key="delete" onClick={() => onDelete(note.noteID)} />,
        ]}
      >
        {note.content}
      </Card>
    </Col>
  );
});

export default SortableItem;
