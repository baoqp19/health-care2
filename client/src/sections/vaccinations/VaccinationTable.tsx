import { ExportOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Table, Tag } from "antd";
import { ROW_PER_PAGE } from "../../config/constants";
import { useState } from "react";
import useVaccinationColumns from "./VaccinationColumn";
import { useVaccinations } from "../../api/vaccinations/get-vaccination";
import { useMembersByUser } from "../../api/members/get-members";



export const VaccinationTable = () => {
  const columns = useVaccinationColumns();
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [pageSize, setPageSize] = useState(ROW_PER_PAGE);
  const [memberID, setMemberId] = useState<number>(0);

  const { data, isLoading } = useVaccinations({
    page,
    size: pageSize,
    keyword,
    memberID
  });
  const { data: members } = useMembersByUser();

  return (
    <>
      <Table
        columns={columns}
        dataSource={Array.isArray(data?.items) ? data.items : []} // 
        size="middle"
        rowKey={(record) => record.vaccinationID}
        pagination={{
          current: page,
          pageSize: ROW_PER_PAGE,
          total: 4,

          onChange: (newPage) => setPage(newPage),
        }}
        loading={isLoading}
        title={() => (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input.Search
              placeholder="Search employee..."
              className="w-[250px]"
              allowClear
              onSearch={(value) => {
                setKeyword(value);
                setPage(1);
              }}
            />
            <Button icon={<ExportOutlined />}>
              Export<Tag color="blue">Coming Soon</Tag>
            </Button>
          </div>
        )}
      />
    </>
  );
};
