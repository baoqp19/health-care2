import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import useUserColumns from "./UserColumn";
import { useUsers } from "../../api/user/get-users";

export const UserTable = () => {
  const columns = useUserColumns();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(ROW_PER_PAGE);
  const [keyword, setKeyword] = useState("");
  const { data: users, isLoading } = useUsers({ page, size: pageSize, keyword });

  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(users?.items) ? users?.items : []}
        size="small"
        rowKey={(record) => record.id}
        pagination={{
          current: users?.meta?.current_page,
          pageSize: users?.meta?.per_page,
          total: users?.meta?.total_elements,
          showSizeChanger: true,
          pageSizeOptions: ["8", "10", "20", "50", "100"],
          onShowSizeChange: (current, size) => {
            setPageSize(size);
            setPage(1);
          },
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search user..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export <Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};